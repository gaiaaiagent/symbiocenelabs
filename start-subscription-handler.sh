#!/bin/bash

# Script to start the email subscription handler
# This script starts the Node.js server that handles email subscriptions

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting email subscription handler...${NC}"

# Use the Node.js executable from NVM
NODE_EXECUTABLE="/root/.nvm/versions/node/v23.6.1/bin/node"

# Check if Node.js executable exists
if [ ! -f "$NODE_EXECUTABLE" ]; then
    echo -e "${RED}Node.js executable not found at $NODE_EXECUTABLE.${NC}"
    echo -e "${YELLOW}Please install Node.js or update the script with the correct path.${NC}"
    exit 1
fi

# Check if the subscription handler script exists
if [ ! -f "/var/www/symbiocenelabs/subscribe-handler.js" ]; then
    echo -e "${RED}Error: subscribe-handler.js not found in /var/www/symbiocenelabs.${NC}"
    exit 1
fi

# Create the log directory if it doesn't exist
mkdir -p /var/log/gaia

# Run the subscription handler in the background
nohup $NODE_EXECUTABLE /var/www/symbiocenelabs/subscribe-handler.js > /var/log/gaia/subscription-handler.log 2>&1 &

# Save the PID to a file
echo $! > /var/run/gaia-subscription.pid

echo -e "${GREEN}Email subscription handler started with PID $(cat /var/run/gaia-subscription.pid)${NC}"
echo -e "${GREEN}Logs are being written to /var/log/gaia/subscription-handler.log${NC}"
