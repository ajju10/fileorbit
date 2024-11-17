package main

import (
	"context"
	"errors"
	"golang.org/x/oauth2"
)

func getOAuthAccessToken(provider *Provider, code string) (interface{}, error) {
	switch provider.Id {
	case 1:
		return getGoogleOAuthAccessToken(code)
	default:
		return nil, errors.New("unsupported provider")
	}
}

func getGoogleOAuthAccessToken(code string) (*oauth2.Token, error) {
	//tokenUrl := "https://oauth2.googleapis.com/token"
	redirectUri := "http://localhost:3000/oauth-callback"
	//queryParams := url.Values{}
	//queryParams.Set("code", code)
	//queryParams.Set("client_id", app.Config.Get("GCP_CLIENT_ID"))
	//queryParams.Set("client_secret", app.Config.Get("GCP_CLIENT_SECRET"))
	//queryParams.Set("redirect_uri", redirectUri)
	//queryParams.Set("grant_type", "authorization_code")

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	oauthConfig := &oauth2.Config{
		ClientID:     app.Config.Get("GCP_CLIENT_ID"),
		ClientSecret: app.Config.Get("GCP_CLIENT_SECRET"),
		RedirectURL:  redirectUri,
	}
	token, err := oauthConfig.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}

	return token, nil

	//req, err := http.NewRequest("POST", tokenUrl, strings.NewReader(queryParams.Encode()))
	//if err != nil {
	//	return nil, err
	//}
	//
	//req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	//client := &http.Client{}
	//res, err := client.Do(req)
	//if err != nil {
	//	return nil, err
	//}
	//
	//defer res.Body.Close()
	//body, err := io.ReadAll(res.Body)
	//if err != nil {
	//	return nil, err
	//}
	//
	//var jsonData map[string]interface{}
	//if err := json.Unmarshal(body, &jsonData); err != nil {
	//	return nil, err
	//}
	//
	//return jsonData, nil
}
