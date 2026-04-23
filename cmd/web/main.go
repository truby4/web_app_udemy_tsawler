package main

import (
	"log"
	"net/http"

	"github.com/truby4/web_app_udemy_tsawler/internal/handlers"
)

const portNumber = ":8080"

func main() {
	http.HandleFunc("/", handlers.Home)
	http.HandleFunc("/about", handlers.About)

	log.Printf("starting server on port %s\n", portNumber)
	http.ListenAndServe(portNumber, nil)
}
