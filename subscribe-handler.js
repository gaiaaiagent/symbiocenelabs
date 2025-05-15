/**
 * Email Subscription Handler for Gaia AI Website
 * 
 * This script handles email subscription requests and stores them in a JSON file.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 3001;
const SUBSCRIBED_EMAILS_FILE = path.join(__dirname, 'subscribed-emails.json');

// Ensure the subscribed emails file exists
if (!fs.existsSync(SUBSCRIBED_EMAILS_FILE)) {
  fs.writeFileSync(SUBSCRIBED_EMAILS_FILE, JSON.stringify({ emails: [] }));
}

/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Add an email to the subscribed emails file
 * @param {string} email - The email to add
 * @returns {boolean} - Whether the email was added successfully
 */
function addEmail(email) {
  try {
    const data = JSON.parse(fs.readFileSync(SUBSCRIBED_EMAILS_FILE, 'utf8'));
    
    // Check if the email is already subscribed
    if (data.emails.includes(email)) {
      return { success: false, message: 'Email already subscribed' };
    }
    
    // Add the email to the list
    data.emails.push(email);
    
    // Write the updated list back to the file
    fs.writeFileSync(SUBSCRIBED_EMAILS_FILE, JSON.stringify(data, null, 2));
    
    return { success: true, message: 'Email subscribed successfully' };
  } catch (error) {
    console.error('Error adding email:', error);
    return { success: false, message: 'Server error' };
  }
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Only handle POST requests to /api/subscribe
  if (req.method === 'POST' && req.url === '/api/subscribe') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { email } = JSON.parse(body);
        
        // Validate the email
        if (!email || !isValidEmail(email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Invalid email address' }));
          return;
        }
        
        // Add the email to the subscribed emails file
        const result = addEmail(email);
        
        res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid request' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Not found' }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Subscription handler running on port ${PORT}`);
});
