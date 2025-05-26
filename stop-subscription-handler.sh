#!/bin/bash

# Script to stop the email subscription handler
# This script stops the Node.js server that handles email subscriptions

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Stopping email subscription handler...${NC}"

# Check if the PID file exists
if [ ! -f "/var/run/gaia-subscription.pid" ]; then
    echo -e "${RED}Error: PID file not found. The subscription handler may not be running.${NC}"
    exit 1
fi

# Get the PID from the file
PID=$(cat /var/run/gaia-subscription.pid)

# Check if the process is running
if ! ps -p $PID > /dev/null; then
    echo -e "${YELLOW}Process with PID $PID is not running. Removing PID file.${NC}"
    rm /var/run/gaia-subscription.pid
    exit 0
fi

# Kill the process
kill $PID

# Wait for the process to terminate
echo -e "${YELLOW}Waiting for the process to terminate...${NC}"
for i in {1..10}; do
    if ! ps -p $PID > /dev/null; then
        echo -e "${GREEN}Process terminated.${NC}"
        rm /var/run/gaia-subscription.pid
        exit 0
    fi
    sleep 1
done

# If the process is still running after 10 seconds, force kill it
echo -e "${YELLOW}Process is still running. Force killing...${NC}"
kill -9 $PID

# Check if the process is still running
if ps -p $PID > /dev/null; then
    echo -e "${RED}Failed to kill the process.${NC}"
    exit 1
else
    echo -e "${GREEN}Process terminated.${NC}"
    rm /var/run/gaia-subscription.pid
    exit 0
fi
