package main

type Provider struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Endpoint string `json:"endpoint"`
}

type ConnectedAccount struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	ProviderID   int    `json:"provider_id"`
	ProviderName string `json:"provider_name"`
}

type OAuthRequestBody struct {
	Provider  *Provider `json:"provider"`
	DriveName string    `json:"drive_name"`
	Code      string    `json:"code"`
}

type Error struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details string `json:"details,omitempty"`
}

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *Error      `json:"error,omitempty"`
}
