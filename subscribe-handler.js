// Email subscription handler for Gaia AI website
// This script handles the /api/subscribe endpoint and stores emails in a file

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const PORT = 3004; // Use a different port than the GAIA agent
const EMAILS_FILE = path.join(__dirname, 'subscribed-emails.json');

// Ensure the emails file exists
if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify({
        emails: [],
        timestamp: new Date().toISOString()
    }, null, 2));
    console.log(`Created emails file at ${EMAILS_FILE}`);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.statusCode = 204; // No content
        res.end();
        return;
    }
    
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Handle the /subscribe endpoint
    if (pathname === '/subscribe' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const email = data.email;
                
                if (!email || !isValidEmail(email)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Invalid email address' }));
                    return;
                }
                
                // Read the current emails
                const emailsData = JSON.parse(fs.readFileSync(EMAILS_FILE, 'utf8'));
                
                // Check if email already exists
                if (emailsData.emails.includes(email)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, message: 'Email already subscribed' }));
                    return;
                }
                
                // Add the new email
                emailsData.emails.push(email);
                emailsData.timestamp = new Date().toISOString();
                
                // Write the updated emails back to the file
                fs.writeFileSync(EMAILS_FILE, JSON.stringify(emailsData, null, 2));
                
                console.log(`New email subscription: ${email}`);
                
                // Send success response
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Subscription successful' }));
            } catch (error) {
                console.error('Error processing subscription:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Server error' }));
            }
        });
    } else {
        // Handle 404 for any other endpoint
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'Not found' }));
    }
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Start the server
server.listen(PORT, () => {
    console.log(`Email subscription handler running on port ${PORT}`);
    console.log(`Storing emails in ${EMAILS_FILE}`);
});
