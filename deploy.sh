#!/bin/bash

# Deployment script for Gaia AI website with GAIA agent integration
# This script will set up the website and configure Nginx to proxy API requests to the GAIA agent

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment of Gaia AI website...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root or with sudo${NC}"
  exit 1
fi

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Nginx not found. Installing...${NC}"
    apt-get update
    apt-get install -y nginx
    echo -e "${GREEN}Nginx installed successfully${NC}"
else
    echo -e "${GREEN}Nginx is already installed${NC}"
fi

# Create website directory
WEBSITE_DIR="/var/www/symbiocenelabs"
echo -e "${YELLOW}Creating website directory at ${WEBSITE_DIR}...${NC}"
mkdir -p $WEBSITE_DIR

# Copy website files
echo -e "${YELLOW}Copying website files...${NC}"
cp -r ./* $WEBSITE_DIR/
# Remove unnecessary files from the web directory
rm -f $WEBSITE_DIR/deploy.sh $WEBSITE_DIR/nginx.conf

# Set proper permissions
echo -e "${YELLOW}Setting permissions...${NC}"
chown -R www-data:www-data $WEBSITE_DIR
chmod -R 755 $WEBSITE_DIR

# Configure Nginx
echo -e "${YELLOW}Configuring Nginx...${NC}"
NGINX_CONF="/etc/nginx/sites-available/symbiocenelabs"
cp nginx.conf $NGINX_CONF

# Create symbolic link to enable the site
if [ ! -f /etc/nginx/sites-enabled/symbiocenelabs ]; then
    ln -s $NGINX_CONF /etc/nginx/sites-enabled/
    echo -e "${GREEN}Nginx site enabled${NC}"
else
    echo -e "${GREEN}Nginx site already enabled${NC}"
fi

# Check Nginx configuration
echo -e "${YELLOW}Checking Nginx configuration...${NC}"
nginx -t

# Restart Nginx
echo -e "${YELLOW}Restarting Nginx...${NC}"
systemctl restart nginx

# Check if GAIA agent is running
if pgrep -f "node.*agent" > /dev/null; then
    echo -e "${GREEN}GAIA agent appears to be running${NC}"
else
    echo -e "${YELLOW}Warning: GAIA agent does not appear to be running.${NC}"
    echo -e "${YELLOW}Make sure to start the GAIA agent on port 3000 for the API integration to work.${NC}"
    echo -e "${YELLOW}You can start it with: cd /path/to/gaia && pnpm start${NC}"
fi

# Set up and start the email subscription handler
echo -e "${YELLOW}Setting up email subscription handler...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found. Installing...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}Node.js installed successfully${NC}"
else
    echo -e "${GREEN}Node.js is already installed${NC}"
fi

# Create systemd service for the subscription handler
SUBSCRIPTION_SERVICE="/etc/systemd/system/gaia-subscription.service"
echo -e "${YELLOW}Creating systemd service for subscription handler...${NC}"

cat > $SUBSCRIPTION_SERVICE << EOF
[Unit]
Description=Gaia AI Email Subscription Handler
After=network.target

[Service]
ExecStart=/usr/bin/node /var/www/symbiocenelabs/subscribe-handler.js
WorkingDirectory=/var/www/symbiocenelabs
Restart=always
User=www-data
Group=www-data
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Set proper permissions
chmod 644 $SUBSCRIPTION_SERVICE

# Enable and start the service
echo -e "${YELLOW}Starting subscription handler service...${NC}"
systemctl daemon-reload
systemctl enable gaia-subscription.service
systemctl restart gaia-subscription.service

# Check if the service is running
if systemctl is-active --quiet gaia-subscription.service; then
    echo -e "${GREEN}Email subscription handler is running${NC}"
else
    echo -e "${RED}Failed to start email subscription handler. Check logs with: journalctl -u gaia-subscription.service${NC}"
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website is now available at http://your-server-ip${NC}"
echo -e "${GREEN}The chat interface will connect to the GAIA agent running on this server.${NC}"
echo -e "${YELLOW}Note: If you want to use HTTPS, you should set up SSL certificates using Let's Encrypt.${NC}"
echo -e "${YELLOW}Example: certbot --nginx -d yourdomain.com${NC}"
