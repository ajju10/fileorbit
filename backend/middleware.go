package main

import (
	"context"
	"net/http"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/clerk/clerk-sdk-go/v2/user"
	gofrHTTP "gofr.dev/pkg/gofr/http"
)

type key string

const clerkUser = key("clerkUser")

func authMiddleware() gofrHTTP.Middleware {
	return func(inner http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
				return
			}

			sessionToken := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
			claims, err := jwt.Verify(r.Context(), &jwt.VerifyParams{
				Token: sessionToken,
			})
			if err != nil {
				http.Error(w, "Invalid authorization token", http.StatusUnauthorized)
				return
			}

			usr, err := user.Get(r.Context(), claims.Subject)
			if err != nil {
				http.Error(w, "Invalid authorization token", http.StatusUnauthorized)
				return
			}

			reqContext := r.Context()
			newContext := context.WithValue(reqContext, clerkUser, usr)
			inner.ServeHTTP(w, r.WithContext(newContext))
		})
	}
}
