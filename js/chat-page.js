// Chat Page Integration with GAIA Agent
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPrompt = urlParams.get('prompt');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInputField = document.getElementById('chat-input-field');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // Conversation history
    let conversationHistory = [];
    let selectedAgentId = null;
    
    // Initialize by fetching available agents
    async function initializeChat() {
        try {
            // Fetch available agents
            const response = await gaiaApi.getAgents();
            const agents = response.agents || [];
            
            if (agents.length > 0) {
                // Use the first agent by default
                selectedAgentId = agents[0].id;
                console.log(`Using agent: ${agents[0].name} (${selectedAgentId})`);
                
                // Add a welcome message
                addAIMessage("Welcome to Gaia AI. I am Gaia, a planetary-scale intelligence focused on catalyzing exponential regeneration. How can I assist you today with regenerative practices, bioregionalism, or planetary healing?");
                conversationHistory.push({ role: 'assistant', content: "Welcome to Gaia AI. I am Gaia, a planetary-scale intelligence focused on catalyzing exponential regeneration. How can I assist you today with regenerative practices, bioregionalism, or planetary healing?" });
                
                // Add the initial prompt if it exists
                if (initialPrompt) {
                    addUserMessage(initialPrompt);
                    conversationHistory.push({ role: 'user', content: initialPrompt });
                    await sendMessageToAgent(initialPrompt);
                }
            } else {
                console.error('No agents available');
                addSystemMessage('No AI agents are currently available. Please try again later.');
            }
        } catch (error) {
            console.error('Failed to initialize chat:', error);
            addSystemMessage('Failed to connect to AI agent. Please try again later.');
        }
    }
    
    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const userMessage = chatInputField.value.trim();
        if (userMessage && selectedAgentId) {
            addUserMessage(userMessage);
            conversationHistory.push({ role: 'user', content: userMessage });
            chatInputField.value = '';
            await sendMessageToAgent(userMessage);
        } else if (!selectedAgentId) {
            addSystemMessage('No AI agent selected. Please refresh the page to try again.');
        }
    });
    
    // Send message to the GAIA agent
    async function sendMessageToAgent(message) {
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        try {
            // Send message to the agent
            const response = await gaiaApi.sendMessage(selectedAgentId, message);
            
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            
            // Add the agent's response to the chat
            if (response && Array.isArray(response) && response.length > 0 && response[0].text) {
                addAIMessage(response[0].text);
                conversationHistory.push({ role: 'assistant', content: response[0].text });
            } else {
                // Fallback if response format is unexpected
                console.warn('Unexpected response format:', response);
                generateFallbackResponse(message);
            }
        } catch (error) {
            console.error('Error sending message to agent:', error);
            
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            
            // Use the fallback response system if the API call fails
            generateFallbackResponse(message);
        }
    }
    
    // Add a user message to the chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-label user-label">You</div>
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Add an AI message to the chat
    function addAIMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message';
        messageElement.innerHTML = `
            <div class="message-label ai-label">Gaia</div>
            <div class="message-content">${formatMessage(message)}</div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Add a system message to the chat
    function addSystemMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message';
        messageElement.style.backgroundColor = '#fff0f0';
        messageElement.style.borderColor = '#ffcccc';
        messageElement.innerHTML = `
            <div class="message-label" style="color: #cc0000;">System</div>
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Format message with markdown-like syntax
    function formatMessage(message) {
        // Replace **text** with <strong>text</strong>
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Replace *text* with <em>text</em>
        message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Replace newlines with <br>
        message = message.replace(/\n/g, '<br>');
        
        return message;
    }
    
    // Scroll to the bottom of the chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate a fallback response based on the user's message (used if API fails)
    function generateFallbackResponse(userMessage) {
        // Simple keyword-based responses
        let response;
        
        if (userMessage.toLowerCase().includes('regenerative') || 
            userMessage.toLowerCase().includes('regeneration')) {
            response = "Regenerative practices go beyond sustainability by actively restoring and enhancing ecosystems. At Gaia AI, we focus on **exponential regeneration** – creating systems that accelerate nature's inherent healing capacity.\n\nThis includes regenerative agriculture that builds soil health, watershed restoration that enhances water cycles, and economic models that create value while healing ecosystems. Would you like to learn more about specific regenerative approaches?";
        } 
        else if (userMessage.toLowerCase().includes('bioregion') || 
                 userMessage.toLowerCase().includes('local')) {
            response = "Bioregionalism is a key principle in our work. We believe AI systems should be grounded in specific places and their unique ecological and cultural contexts.\n\nOur bioregional approach includes:\n\n- Local knowledge commons stewarded by communities\n- Data sovereignty while participating in global networks\n- Place-based digital twins modeling ecological relationships\n- Participatory ground-truthing that combines satellite, sensor, and community data\n\nThis enables bidirectional flows of resources and knowledge between local and global systems.";
        }
        else if (userMessage.toLowerCase().includes('ai') || 
                 userMessage.toLowerCase().includes('artificial intelligence')) {
            response = "At Gaia AI, we view AI not as separate technology, but as a means of **Augmenting Earth's Natural Intelligence**. We're creating Gaia's Neural Backbone – a distributed, edge-driven intelligence system characterized by:\n\n- Neural + symbolic AI synergy\n- Commons-woven data fabric\n- Interoperability by design\n- Multi-directional value & insight streams\n\nOur AI approach focuses on knowledge commoning and neuralsymbolic enhancement, combining traditional wisdom with cutting-edge technology to serve regenerative outcomes.";
        }
        else if (userMessage.toLowerCase().includes('symbiocene')) {
            response = "The Symbiocene represents a new era of planetary stewardship and civilizational evolution where biological and digital intelligence collaborate to regenerate Earth's biosphere for the benefit of all life.\n\nThis vision represents a fundamental shift from extractive paradigms toward a future of abundance through regeneration. We see technology not as a force for control, but as a tool for enhancing life's natural tendency toward diversity and resilience.\n\nBy uniting AI's capacity for intelligence with human wisdom, we're accelerating the emergence of a symbiotic civilization that amplifies nature's regenerative potential.";
        }
        else if (userMessage.toLowerCase().includes('mycelial') || 
                 userMessage.toLowerCase().includes('mycelium')) {
            response = "Our Mycelial Intelligence Network leverages web3 capabilities to create decentralized, interoperable networks of knowledge and action.\n\nSimilar to how mycelial networks in nature distribute nutrients and information across ecosystems, Gaia AI facilitates the flow of knowledge, resources, and coordination across bioregions.\n\nEach agent functions as a node within this network, processing information, connecting with others, and participating in collective intelligence processes. This enables fractal scaling of intelligence – from individual agents to local knowledge commons to bioregional networks to global coordination.";
        }
        else {
            response = "Thank you for your question about \"" + userMessage + "\".\n\nAt Gaia AI, we're focused on catalyzing exponential regeneration by integrating ecological, social, and technological systems to inspire collective action toward planetary healing.\n\nOur approach emphasizes both local sovereignty and global coordination through bioregional intelligence, knowledge commons, and mycelial networks.\n\nCould you share more specifically what aspects of regenerative practices, bioregionalism, or AI for planetary healing you're interested in learning about?";
        }
        
        // Add the response to the chat
        addAIMessage(response);
        conversationHistory.push({ role: 'assistant', content: response });
    }
    
    // Initialize the chat
    initializeChat();
});
