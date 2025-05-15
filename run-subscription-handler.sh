#!/bin/bash

# Run the subscription handler script
# This script is used to run the subscription handler in the foreground for testing

# Change to the directory containing this script
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Run the subscription handler
node subscribe-handler.js
