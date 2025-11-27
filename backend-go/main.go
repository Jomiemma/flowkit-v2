package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/flowkit/backend/config"
	"github.com/flowkit/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	config.LoadEnv()

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	client, err := config.ConnectDB(ctx)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		}
	}()

	// Initialize database
	config.InitDB(client)
	log.Println("✅ MongoDB Connected Successfully")

	// Set Gin mode
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	r := gin.Default()

	// Add security and cache control headers middleware
	r.Use(func(c *gin.Context) {
		// Cache control - prevent caching
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate, private, max-age=0")

		// Security headers
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")

		c.Next()
	})

	// Configure CORS - Simple middleware that allows all origins for development
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		// Allow the requesting origin
		if origin != "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		} else {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400") // 24 hours

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Setup routes
	routes.SetupRoutes(r)

	// Get port from environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "5001"
	}

	// Start server - bind to 0.0.0.0 to allow both localhost and network access
	log.Printf("🚀 Server running on 0.0.0.0:%s (accessible from localhost and network)", port)
	if err := r.Run("0.0.0.0:" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
