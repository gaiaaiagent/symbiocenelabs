#!/bin/bash

# Script to run the email subscription handler locally for development
# This script starts the Node.js server that handles email subscriptions

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting email subscription handler for local development...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js to run this script.${NC}"
    echo -e "${YELLOW}You can download it from https://nodejs.org/${NC}"
    exit 1
fi

# Check if the subscription handler script exists
if [ ! -f "subscribe-handler.js" ]; then
    echo -e "${RED}Error: subscribe-handler.js not found in the current directory.${NC}"
    exit 1
fi

# Run the subscription handler
echo -e "${YELLOW}Running subscription handler on port 3004...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
node subscribe-handler.js
