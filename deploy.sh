#!/bin/bash

# Deployment script for Gaia AI website
# This script deploys the website files and sets up the email subscription handler

# Configuration
WEBSITE_DIR="/var/www/symbiocenelabs"
NGINX_CONF_DIR="/etc/nginx/sites-available"
NGINX_CONF_FILE="symbiocenelabs"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# Create website directory if it doesn't exist
mkdir -p "$WEBSITE_DIR"

# Copy website files
echo "Copying website files..."
cp -r ./* "$WEBSITE_DIR/"

# Set proper permissions
echo "Setting permissions..."
chown -R www-data:www-data "$WEBSITE_DIR"
chmod -R 755 "$WEBSITE_DIR"

# Make scripts executable
chmod +x "$WEBSITE_DIR/run-subscription-handler.sh"
chmod +x "$WEBSITE_DIR/start-subscription-handler.sh"
chmod +x "$WEBSITE_DIR/stop-subscription-handler.sh"
chmod +x "$WEBSITE_DIR/deploy.sh"

# Create Nginx configuration if it doesn't exist
if [ ! -f "$NGINX_CONF_DIR/$NGINX_CONF_FILE" ]; then
  echo "Creating Nginx configuration..."
  cat > "$NGINX_CONF_DIR/$NGINX_CONF_FILE" << EOF
server {
    listen 80;
    server_name symbiocenelabs.com www.symbiocenelabs.com;
    
    # Include the Gaia AI website configuration
    include $WEBSITE_DIR/nginx.conf;
    
    # Additional server configurations can be added here
}
EOF

  # Enable the site
  ln -sf "$NGINX_CONF_DIR/$NGINX_CONF_FILE" /etc/nginx/sites-enabled/

  # Test Nginx configuration
  nginx -t

  # Reload Nginx
  systemctl reload nginx
fi

# Start the subscription handler service
echo "Starting subscription handler service..."
"$WEBSITE_DIR/start-subscription-handler.sh"

echo "Deployment completed successfully!"
