package main

import (
	"fmt"
	"golang.org/x/oauth2"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
	"os"
	"time"

	"github.com/clerk/clerk-sdk-go/v2"
	"gofr.dev/pkg/gofr"
	"gofr.dev/pkg/gofr/http/response"
)

const (
	GoogleOauthTokenUrl string = "https://oauth2.googleapis.com/token"
)

var app *gofr.App

func main() {
	if app != nil {
		fmt.Println("Fatal error occurred")
		os.Exit(1)
	}

	app = gofr.New()

	clerkSecretKey := app.Config.Get("CLERK_SECRET_KEY")
	if clerkSecretKey == "" {
		fmt.Println("Could not load Clerk Secret Key")
		os.Exit(1)
	}

	clerk.SetKey(clerkSecretKey)

	app.UseMiddleware(authMiddleware())

	app.GET("/api/v1/provider", func(ctx *gofr.Context) (interface{}, error) {
		query := "SELECT id, name, endpoint FROM providers WHERE is_active = true"
		rows, err := ctx.SQL.QueryContext(ctx, query)
		if err != nil {
			return nil, err
		}

		var providers []Provider
		for rows.Next() {
			var provider Provider
			if err := rows.Scan(&provider.Id, &provider.Name, &provider.Endpoint); err != nil {
				return nil, err
			}
			providers = append(providers, provider)
		}

		res := response.Raw{
			Data: APIResponse{
				Success: true,
				Data:    providers,
			},
		}
		return res, nil
	})

	app.POST("/api/v1/oauth-token", func(ctx *gofr.Context) (interface{}, error) {
		var body OAuthRequestBody
		err := ctx.Bind(&body)
		if err != nil {
			return nil, err
		}

		// only google for now
		oauthTokenRes, err := getOAuthAccessToken(body.Provider, body.Code)
		if err != nil {
			return nil, err
		}

		clerkUser := ctx.Context.Value(clerkUser).(*clerk.User)
		email := clerkUser.EmailAddresses[0].EmailAddress
		query := `INSERT INTO connected_accounts (provider_id, user_id, name, email, access_token, refresh_token, expires_at)
					VALUES ($1, $2, $3, $4, $5, $6, $7)`
		token := oauthTokenRes.(*oauth2.Token)
		expiryTime := time.Now().Add(time.Duration(token.ExpiresIn) * time.Second)
		result, err := ctx.SQL.ExecContext(
			ctx, query, body.Provider.Id, clerkUser.ID, body.DriveName, email, token.AccessToken, token.RefreshToken, expiryTime,
		)
		if err != nil {
			return nil, err
		}

		insertedID, _ := result.LastInsertId()
		fmt.Println("Inserted ID", insertedID)
		res := response.Raw{
			Data: APIResponse{
				Success: true,
				Data:    insertedID,
			},
		}
		return res, nil
	})

	app.GET("/api/v1/connected-account", func(ctx *gofr.Context) (interface{}, error) {
		clerkUser := ctx.Context.Value(clerkUser).(*clerk.User)
		query := `SELECT connected_accounts.id, connected_accounts.name, connected_accounts.provider_id, providers.name 
					FROM connected_accounts
					INNER JOIN providers
					ON connected_accounts.provider_id = providers.id
					WHERE user_id = $1`
		rows, err := ctx.SQL.QueryContext(ctx, query, clerkUser.ID)
		if err != nil {
			return nil, err
		}

		var connectedAccounts []ConnectedAccount
		for rows.Next() {
			var connectedAccount ConnectedAccount
			if err := rows.Scan(&connectedAccount.Id, &connectedAccount.Name, &connectedAccount.ProviderID, &connectedAccount.ProviderName); err != nil {
				return nil, err
			}
			connectedAccounts = append(connectedAccounts, connectedAccount)
		}

		res := response.Raw{
			Data: APIResponse{
				Success: true,
				Data:    connectedAccounts,
			},
		}

		return res, nil
	})

	// handler for fetching files
	app.GET("/api/v1/files/{account_id}", func(ctx *gofr.Context) (interface{}, error) {
		clerkUser := ctx.Context.Value(clerkUser).(*clerk.User)
		accountId := ctx.Request.PathParam("account_id")
		query := `SELECT access_token, refresh_token, expires_at
					FROM connected_accounts
					WHERE user_id = $1
					AND id = $2`
		rows := ctx.SQL.QueryRowContext(ctx, query, clerkUser.ID, accountId)
		var accessToken, refreshToken string
		var expiresAt time.Time
		if err := rows.Scan(&accessToken, &refreshToken, &expiresAt); err != nil {
			return nil, err
		}

		if expiresAt.Before(time.Now()) {
			config := &oauth2.Config{
				ClientID:     app.Config.Get("GCP_CLIENT_ID"),
				ClientSecret: app.Config.Get("GCP_CLIENT_SECRET"),
				Endpoint: oauth2.Endpoint{
					TokenURL: GoogleOauthTokenUrl,
				},
			}
			tokenSource := config.TokenSource(ctx, &oauth2.Token{
				RefreshToken: refreshToken,
			})
			token, err := tokenSource.Token()
			if err != nil {
				return nil, err
			}

			accessToken = token.AccessToken
			updateQuery := `UPDATE connected_accounts 
								SET access_token = $1
								WHERE id = $2
								AND user_id = $3`

			_, err = ctx.SQL.ExecContext(ctx, updateQuery, accessToken, accountId, clerkUser.ID)
			if err != nil {
				return nil, err
			}
		}

		tokenSource := oauth2.StaticTokenSource(&oauth2.Token{
			AccessToken: accessToken,
		})
		client, err := drive.NewService(ctx, option.WithTokenSource(tokenSource))
		if err != nil {
			return nil, err
		}

		files, err := client.Files.List().PageSize(10).Fields("nextPageToken, files(id, name)").Do()
		if err != nil {
			return nil, err
		}

		var filesResponse []drive.File
		for _, file := range files.Files {
			filesResponse = append(filesResponse, *file)
		}
		res := response.Raw{
			Data: APIResponse{
				Success: true,
				Data:    filesResponse,
			},
		}
		return res, nil
	})

	app.Run()
}
