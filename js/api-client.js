/**
 * API Client for the Gaia AI website
 */
class ApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a GET request to the API
   * @param {string} endpoint - The API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} - The response data
   */
  async get(endpoint, params = {}) {
    const url = new URL(this.baseUrl + endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Make a POST request to the API
   * @param {string} endpoint - The API endpoint
   * @param {Object} data - The request body
   * @returns {Promise<any>} - The response data
   */
  async post(endpoint, data = {}) {
    const url = this.baseUrl + endpoint;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Subscribe an email to the newsletter
   * @param {string} email - The email to subscribe
   * @returns {Promise<any>} - The response data
   */
  async subscribeEmail(email) {
    return this.post('/api/subscribe', { email });
  }
}

// Create a global instance of the API client
const apiClient = new ApiClient();
