# Gaia AI Website with GAIA Agent Integration

This repository contains the Gaia AI website with integration to the GAIA AI agent. The website includes a chat interface that connects to the GAIA agent running on the same server.

## Overview

The Gaia AI website is a static website that showcases the mission, features, and services of Gaia AI. It includes a chat interface that allows visitors to interact with the GAIA AI agent directly from the website.

## Features

- Responsive static website
- Interactive chat interface
- Integration with GAIA AI agent
- Email newsletter subscription system
- Nginx configuration for hosting and API proxying

## Local Development

To test the site locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/gaiaaiagent/symbiocenelabs.git
   cd symbiocenelabs
   ```

2. Start the local server:
   ```bash
   ./serve.sh
   ```
   
   Or alternatively:
   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

The site will run locally without requiring the GAIA agent backend - the chat interface will use fallback responses for testing.

## Production Deployment

### Prerequisites

- A server with Ubuntu/Debian (or other Linux distribution)
- GAIA agent running on the same server (typically on port 3000)
- Root or sudo access to the server

### Installation

### Automatic Installation

1. Clone this repository to your server:
   ```bash
   git clone https://github.com/gaiaaiagent/symbiocenelabs.git
   cd symbiocenelabs
   ```

2. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

3. Run the deployment script with sudo:
   ```bash
   sudo ./deploy.sh
   ```

The script will:
- Install Nginx if it's not already installed
- Copy the website files to `/var/www/symbiocenelabs`
- Configure Nginx to serve the website and proxy API requests to the GAIA agent
- Restart Nginx to apply the changes

### Manual Installation

If you prefer to install manually:

1. Install Nginx:
   ```bash
   sudo apt-get update
   sudo apt-get install -y nginx
   ```

2. Create the website directory:
   ```bash
   sudo mkdir -p /var/www/symbiocenelabs
   ```

3. Copy the website files:
   ```bash
   sudo cp -r ./* /var/www/symbiocenelabs/
   sudo rm -f /var/www/symbiocenelabs/deploy.sh /var/www/symbiocenelabs/nginx.conf
   ```

4. Set proper permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/symbiocenelabs
   sudo chmod -R 755 /var/www/symbiocenelabs
   ```

5. Configure Nginx:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/symbiocenelabs
   sudo ln -s /etc/nginx/sites-available/symbiocenelabs /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## How It Works

### Website Structure

- `index.html`: Main page of the website
- `css/`: Contains CSS files for styling
- `js/`: Contains JavaScript files for functionality
- `js/api-client.js`: API client for communicating with the GAIA agent
- `js/chat.js`: Chat interface functionality
- `nginx.conf`: Nginx configuration for hosting and API proxying
- `deploy.sh`: Deployment script

### API Integration

The website communicates with the GAIA agent through a REST API. The API client (`js/api-client.js`) handles the communication with the following endpoints:

- `GET /api/agents`: Get a list of available agents
- `GET /api/agents/{agentId}`: Get details about a specific agent
- `POST /api/{agentId}/message`: Send a message to a specific agent
- `POST /api/{agentId}/tts`: Text-to-speech conversion
- `POST /api/{agentId}/whisper`: Speech-to-text conversion
- `POST /api/subscribe`: Subscribe an email to the newsletter

Nginx is configured to proxy most API requests to the GAIA agent running on port 3003, while email subscription requests are proxied to a dedicated subscription handler running on port 3004.

### Email Subscription System

The website includes an email subscription system that allows visitors to sign up for the newsletter. The system consists of:

- A subscription form in the website
- A Node.js server (`subscribe-handler.js`) that handles subscription requests
- A JSON file (`subscribed-emails.json`) that stores the subscribed emails

When a visitor submits their email through the subscription form, the email is sent to the `/api/subscribe` endpoint, which is handled by the subscription handler. The handler validates the email, checks for duplicates, and stores it in the JSON file.

#### Running the Subscription Handler Locally

For local development, you can run the subscription handler using the provided script:

```bash
./run-subscription-handler.sh
```

This will start the subscription handler on port 3004. You'll need to have Node.js installed on your system.

#### Subscription Handler Deployment

There are two ways to run the subscription handler in production:

1. **Using the start/stop scripts:**

   The repository includes scripts to start and stop the subscription handler:

   ```bash
   # To start the subscription handler
   sudo /var/www/symbiocenelabs/start-subscription-handler.sh

   # To stop the subscription handler
   sudo /var/www/symbiocenelabs/stop-subscription-handler.sh
   ```

   The start script runs the subscription handler in the background and saves the PID to `/var/run/gaia-subscription.pid`. Logs are written to `/var/log/gaia/subscription-handler.log`.

2. **Using systemd (if available):**

   The deployment script (`deploy.sh`) attempts to set up the subscription handler as a systemd service, ensuring it runs continuously and starts automatically on system boot.

   ```bash
   # To check the status of the service
   sudo systemctl status gaia-subscription.service

   # To start/stop/restart the service
   sudo systemctl start gaia-subscription.service
   sudo systemctl stop gaia-subscription.service
   sudo systemctl restart gaia-subscription.service
   ```

## Configuration

### Nginx Configuration

The Nginx configuration (`nginx.conf`) is set up to:

1. Serve the static website files from `/var/www/symbiocenelabs`
2. Proxy most API requests with the `/api/` prefix to the GAIA agent running on port 3003
3. Proxy email subscription requests to the subscription handler running on port 3004
4. Enable gzip compression for better performance
5. Add security headers

### HTTPS Setup

To enable HTTPS, you can use Let's Encrypt with Certbot:

1. Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain and install a certificate:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Troubleshooting

### Chat Interface Not Connecting to GAIA Agent

1. Make sure the GAIA agent is running on port 3003:
   ```bash
   ps aux | grep "node.*agent"
   ```

2. Check if the GAIA agent is accessible locally:
   ```bash
   curl http://localhost:3003/agents
   ```

3. Check Nginx error logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Email Subscription Not Working

1. Make sure the subscription handler is running on port 3004:
   ```bash
   ps aux | grep "node.*subscribe-handler.js"
   ```

2. Check if the subscription handler is accessible locally:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com"}' http://localhost:3004/subscribe
   ```

3. Check the subscription handler logs:
   ```bash
   sudo journalctl -u gaia-subscription.service
   ```

4. Check if the subscribed-emails.json file exists and is writable:
   ```bash
   ls -la /var/www/symbiocenelabs/subscribed-emails.json
   ```

### Nginx Configuration Issues

If you encounter issues with the Nginx configuration:

1. Check the syntax:
   ```bash
   sudo nginx -t
   ```

2. Check the status:
   ```bash
   sudo systemctl status nginx
   ```

3. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact Gaia AI at [contact@gaiaai.org](mailto:contact@gaiaai.org).
