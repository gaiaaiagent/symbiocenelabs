#!/bin/bash

# Start the subscription handler as a background service
# This script is used to start the subscription handler as a systemd service

# Change to the directory containing this script
cd "$(dirname "$0")"

# Create the systemd service file
cat > /etc/systemd/system/gaia-subscription.service << EOF
[Unit]
Description=Gaia AI Email Subscription Handler
After=network.target

[Service]
ExecStart=/usr/bin/node $(pwd)/subscribe-handler.js
WorkingDirectory=$(pwd)
Restart=always
User=$(whoami)
Environment=NODE_ENV=production
StandardOutput=append:/var/log/gaia/subscription-handler.log
StandardError=append:/var/log/gaia/subscription-handler.log

[Install]
WantedBy=multi-user.target
EOF

# Create the log directory if it doesn't exist
mkdir -p /var/log/gaia

# Reload systemd to recognize the new service
systemctl daemon-reload

# Enable and start the service
systemctl enable gaia-subscription.service
systemctl start gaia-subscription.service

# Check the status of the service
systemctl status gaia-subscription.service
