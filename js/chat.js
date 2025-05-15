// Chat Interface for GAIA Agent
document.addEventListener('DOMContentLoaded', function() {
    // Create chat interface elements
    createChatInterface();
    
    // Initialize variables
    let selectedAgentId = null;
    let agents = [];
    let isChatOpen = false;
    let isMinimized = false;
    
    // DOM elements
    const chatContainer = document.getElementById('chat-container');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const minimizeBtn = document.getElementById('minimize-btn');
    const closeBtn = document.getElementById('close-btn');
    const agentSelector = document.getElementById('agent-selector');
    
    // Event listeners
    chatToggleBtn.addEventListener('click', toggleChat);
    chatSendBtn.addEventListener('click', sendMessage);
    minimizeBtn.addEventListener('click', minimizeChat);
    closeBtn.addEventListener('click', closeChat);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    agentSelector.addEventListener('change', function() {
        selectedAgentId = this.value;
        // Clear chat when changing agents
        chatMessages.innerHTML = '';
        // Add welcome message from the selected agent
        const selectedAgent = agents.find(agent => agent.id === selectedAgentId);
        if (selectedAgent) {
            addAgentMessage(`Hello! I'm ${selectedAgent.character.name}. How can I help you today?`);
        }
    });
    
    // Initialize chat
    initializeChat();
    
    // Functions
    function createChatInterface() {
        // Create chat toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'chat-toggle-btn';
        toggleBtn.className = 'chat-toggle-btn';
        toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>';
        document.body.appendChild(toggleBtn);
        
        // Create chat container
        const container = document.createElement('div');
        container.id = 'chat-container';
        container.className = 'chat-container hidden';
        
        // Chat header
        const header = document.createElement('div');
        header.className = 'chat-header';
        header.innerHTML = `
            <div class="chat-title">GAIA Agent</div>
            <div class="chat-controls">
                <button id="minimize-btn" class="chat-control-btn">−</button>
                <button id="close-btn" class="chat-control-btn">×</button>
            </div>
        `;
        
        // Agent selector
        const selectorContainer = document.createElement('div');
        selectorContainer.style.padding = '10px';
        selectorContainer.innerHTML = `
            <select id="agent-selector" class="agent-selector">
                <option value="" disabled selected>Select an agent</option>
            </select>
        `;
        
        // Chat messages
        const messages = document.createElement('div');
        messages.id = 'chat-messages';
        messages.className = 'chat-messages';
        
        // Chat input
        const inputContainer = document.createElement('div');
        inputContainer.className = 'chat-input-container';
        inputContainer.innerHTML = `
            <textarea id="chat-input" class="chat-input" placeholder="Type your message..." rows="1"></textarea>
            <button id="chat-send-btn" class="chat-send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        `;
        
        // Assemble chat container
        container.appendChild(header);
        container.appendChild(selectorContainer);
        container.appendChild(messages);
        container.appendChild(inputContainer);
        
        document.body.appendChild(container);
    }
    
    async function initializeChat() {
        try {
            // Fetch available agents
            agents = await gaiaApi.getAgents();
            
            // Populate agent selector
            if (agents && agents.length > 0) {
                agentSelector.innerHTML = '<option value="" disabled selected>Select an agent</option>';
                
                agents.forEach(agent => {
                    const option = document.createElement('option');
                    option.value = agent.id;
                    option.textContent = agent.character.name;
                    agentSelector.appendChild(option);
                });
                
                // Enable agent selector
                agentSelector.disabled = false;
            } else {
                agentSelector.innerHTML = '<option value="" disabled selected>No agents available</option>';
                agentSelector.disabled = true;
            }
        } catch (error) {
            console.error('Failed to initialize chat:', error);
            addSystemMessage('Failed to connect to GAIA agent. Please try again later.');
        }
    }
    
    function toggleChat() {
        if (isChatOpen) {
            if (isMinimized) {
                // If minimized, restore it
                chatContainer.classList.remove('minimized');
                isMinimized = false;
            } else {
                // If open, close it
                chatContainer.classList.add('hidden');
                isChatOpen = false;
            }
        } else {
            // If closed, open it
            chatContainer.classList.remove('hidden');
            isChatOpen = true;
            isMinimized = false;
        }
    }
    
    function minimizeChat() {
        chatContainer.classList.toggle('minimized');
        isMinimized = !isMinimized;
    }
    
    function closeChat() {
        chatContainer.classList.add('hidden');
        isChatOpen = false;
    }
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        
        if (!message || !selectedAgentId) {
            return;
        }
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        try {
            // Send message to agent
            const response = await gaiaApi.sendMessage(selectedAgentId, message);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add agent response to chat
            if (response && response.text) {
                addAgentMessage(response.text);
            } else {
                addSystemMessage('Received empty response from agent.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add error message
            addSystemMessage('Failed to get response from agent. Please try again.');
        }
    }
    
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user-message';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addAgentMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message agent-message';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message agent-message';
        messageElement.style.backgroundColor = '#fff0f0';
        messageElement.style.borderColor = '#ffcccc';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message agent-message loading';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingIndicator.appendChild(dot);
        }
        
        typingElement.appendChild(typingIndicator);
        chatMessages.appendChild(typingElement);
        scrollToBottom();
        
        return typingElement;
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
