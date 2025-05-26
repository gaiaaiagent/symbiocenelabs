// GAIA Agent API Client
// This file handles communication with the GAIA agent running on the same server

class GaiaApiClient {
    constructor(baseUrl = '') {
        // If no baseUrl is provided, use the current origin (same server)
        this.baseUrl = baseUrl || window.location.origin;
        this.apiPath = '/api'; // The API endpoint path
    }
    
    /**
     * Submit an email for the newsletter
     * @param {string} email - The email address to subscribe
     * @returns {Promise<Object>} Subscription result
     */
    async subscribeEmail(email) {
        try {
            const response = await fetch(`${this.baseUrl}${this.apiPath}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to subscribe email: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error subscribing email:', error);
            throw error;
        }
    }

    /**
     * Get a list of all available agents
     * @returns {Promise<Array>} List of available agents
     */
    async getAgents() {
        try {
            const response = await fetch(`${this.baseUrl}${this.apiPath}/agents`);
            if (!response.ok) {
                throw new Error(`Failed to fetch agents: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching agents:', error);
            throw error;
        }
    }

    /**
     * Get details about a specific agent
     * @param {string} agentId - The ID of the agent
     * @returns {Promise<Object>} Agent details
     */
    async getAgent(agentId) {
        try {
            const response = await fetch(`${this.baseUrl}${this.apiPath}/agents/${agentId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch agent: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching agent ${agentId}:`, error);
            throw error;
        }
    }

    /**
     * Send a message to a specific agent
     * @param {string} agentId - The ID of the agent
     * @param {string} message - The message to send
     * @param {File} [file] - Optional file to send with the message
     * @returns {Promise<Object>} Agent response
     */
    async sendMessage(agentId, message, file = null) {
        try {
            const formData = new FormData();
            formData.append('text', message);
            formData.append('user', 'user');
            
            if (file) {
                formData.append('file', file);
            }
            
            const response = await fetch(`${this.baseUrl}${this.apiPath}/${agentId}/message`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    /**
     * Convert text to speech using the agent's voice
     * @param {string} agentId - The ID of the agent
     * @param {string} text - The text to convert to speech
     * @returns {Promise<Blob>} Audio blob
     */
    async textToSpeech(agentId, text) {
        try {
            const response = await fetch(`${this.baseUrl}${this.apiPath}/${agentId}/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg',
                    'Transfer-Encoding': 'chunked'
                },
                body: JSON.stringify({ text })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to convert text to speech: ${response.status} ${response.statusText}`);
            }
            
            return await response.blob();
        } catch (error) {
            console.error('Error converting text to speech:', error);
            throw error;
        }
    }

    /**
     * Convert speech to text using the agent's whisper capability
     * @param {Blob} audioBlob - The audio blob to convert to text
     * @param {string} agentId - The ID of the agent
     * @returns {Promise<Object>} Transcription result
     */
    async speechToText(audioBlob, agentId) {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            
            const response = await fetch(`${this.baseUrl}${this.apiPath}/${agentId}/whisper`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Failed to convert speech to text: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error converting speech to text:', error);
            throw error;
        }
    }
}

// Create a global instance of the API client
const gaiaApi = new GaiaApiClient();

// Export the client for use in other scripts
window.gaiaApi = gaiaApi;
