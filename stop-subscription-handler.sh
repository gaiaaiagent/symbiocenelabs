#!/bin/bash

# Stop the subscription handler service
# This script is used to stop and disable the subscription handler systemd service

# Check if the service is running
if systemctl is-active --quiet gaia-subscription.service; then
    echo "Stopping Gaia AI Email Subscription Handler..."
    
    # Stop the service
    systemctl stop gaia-subscription.service
    
    # Disable the service so it doesn't start on boot
    systemctl disable gaia-subscription.service
    
    echo "Service stopped and disabled."
else
    echo "Gaia AI Email Subscription Handler is not running."
fi

# Optionally, remove the service file
read -p "Do you want to remove the service file? (y/n): " remove_service
if [[ "$remove_service" == "y" || "$remove_service" == "Y" ]]; then
    # Remove the service file
    rm -f /etc/systemd/system/gaia-subscription.service
    
    # Reload systemd to recognize the changes
    systemctl daemon-reload
    
    echo "Service file removed."
fi

# Check the status of the service
systemctl status gaia-subscription.service || echo "Service not found."
