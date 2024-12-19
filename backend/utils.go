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
	redirectUri := "http://localhost:3000/oauth-callback"
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
}
