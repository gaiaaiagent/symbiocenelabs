// Mycelium Network Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'mycelium-background';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Set canvas to full screen and fixed position
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Network parameters
    const backgroundColor = '#FFFFFF'; // White background
    const lightTeal = '#6beac4'; // Light teal
    const darkTeal = '#15cdd4'; // Darker teal
    const nodeColor = 'rgba(107, 234, 196, 0.8)'; // Light teal nodes
    const edgeColor = 'rgba(21, 205, 212, 0.6)'; // Darker teal edges
    const pulseColor = 'rgba(21, 205, 212, 0.8)'; // Teal pulse
    
    // Network structure
    let nodes = [];
    let edges = [];
    let pulses = [];
    
    // Node class
    class Node {
        constructor(x, y, isSmall = false) {
            this.x = x;
            this.y = y;
            this.isSmall = isSmall;
            
            if (isSmall) {
                // Small nodes (0.2-1.5px)
                this.radius = 0.2 + Math.random() * 1.3;
                // Very low opacity for small nodes (0.05-0.2)
                this.opacity = 0.05 + Math.random() * 0.15;
            } else {
                // Regular nodes with more variation (0.5-8px)
                this.radius = 0.5 + Math.random() * 7.5;
                // Enhanced depth perception - regular nodes (0.15-0.9)
                this.opacity = 0.15 + (this.radius / 8) * 0.75;
            }
            
            this.connections = [];
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Color spectrum from light teal to darker teal based on size
            // Small nodes are more light teal, large nodes are more darker teal
            const tealIntensity = this.radius / 8; // 0-1 scale based on radius
            
            // Interpolate between light teal (#6beac4) and darker teal (#15cdd4)
            const r = Math.round(107 - (86 * tealIntensity)); // 107 -> 21
            const g = Math.round(234 - (29 * tealIntensity)); // 234 -> 205
            const b = Math.round(196 + (16 * tealIntensity)); // 196 -> 212
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Edge class
    class Edge {
        constructor(startNode, endNode) {
            this.startNode = startNode;
            this.endNode = endNode;
            
            // Determine edge properties based on connected nodes
            const bothSmall = startNode.isSmall && endNode.isSmall;
            const oneSmall = startNode.isSmall || endNode.isSmall;
            
            if (bothSmall) {
                // Very thin edges between small nodes (0.1-0.5px)
                this.thickness = 0.1 + Math.random() * 0.4;
                // Very faded for small-to-small connections (0.03-0.1)
                this.opacity = 0.03 + Math.random() * 0.07;
            } else if (oneSmall) {
                // Thin edges for connections to small nodes (0.2-1px)
                this.thickness = 0.2 + Math.random() * 0.8;
                // More faded for small connections (0.05-0.3)
                this.opacity = 0.05 + Math.random() * 0.25;
            } else {
                // Regular edges with more variation (0.2-4px)
                this.thickness = 0.2 + Math.random() * 3.8;
                // Regular opacity (0.1-0.85)
                this.opacity = 0.1 + (this.thickness / 4) * 0.75;
            }
            
            // Calculate length for pulse animation
            const dx = endNode.x - startNode.x;
            const dy = endNode.y - startNode.y;
            this.length = Math.sqrt(dx * dx + dy * dy);
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.startNode.x, this.startNode.y);
            ctx.lineTo(this.endNode.x, this.endNode.y);
            
            // Color spectrum from light teal to darker teal based on thickness
            // Thin edges are more light teal, thick edges are more darker teal
            const tealIntensity = this.thickness / 4; // 0-1 scale based on thickness
            
            // Interpolate between light teal (#6beac4) and darker teal (#15cdd4)
            const r = Math.round(107 - (86 * tealIntensity)); // 107 -> 21
            const g = Math.round(234 - (29 * tealIntensity)); // 234 -> 205
            const b = Math.round(196 + (16 * tealIntensity)); // 196 -> 212
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.lineWidth = this.thickness;
            ctx.stroke();
        }
    }
    
    // Pulse class for the flowing light effect
    class Pulse {
        constructor(edge) {
            this.edge = edge;
            this.progress = 0;
            
            // Determine if this is a pulse on a small edge
            const bothSmall = edge.startNode.isSmall && edge.endNode.isSmall;
            const oneSmall = edge.startNode.isSmall || edge.endNode.isSmall;
            
            if (bothSmall) {
                // Very subtle pulses for small-to-small connections
                this.speed = 0.03 + Math.random() * 0.07; // Slower
                this.size = 0.5 + Math.random() * 0.5; // Smaller
                this.opacity = 0.3 + Math.random() * 0.2; // More transparent
            } else if (oneSmall) {
                // Moderate pulses for small-to-regular connections
                this.speed = 0.04 + Math.random() * 0.1;
                this.size = 0.7 + Math.random() * 0.8;
                this.opacity = 0.5 + Math.random() * 0.3;
            } else {
                // Regular pulses for regular connections
                this.speed = 0.05 + Math.random() * 0.15;
                this.size = 1 + Math.random() * 2;
                this.opacity = 0.8; // Full opacity
            }
        }
        
        update() {
            this.progress += this.speed / this.edge.length;
            return this.progress <= 1;
        }
        
        draw() {
            const startX = this.edge.startNode.x;
            const startY = this.edge.startNode.y;
            const endX = this.edge.endNode.x;
            const endY = this.edge.endNode.y;
            
            // Calculate current position along the edge
            const x = startX + (endX - startX) * this.progress;
            const y = startY + (endY - startY) * this.progress;
            
            // Draw pulse glow - size based on edge type
            const radius = (1 + this.edge.thickness * 2) * this.size;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            
            // Teal pulse with varying intensity based on size
            // Larger pulses are more darker teal, smaller are more light teal
            const tealIntensity = this.size / 3; // 0-1 scale based on size
            
            // Center color (more darker teal)
            const r1 = Math.round(107 - (86 * tealIntensity)); // 107 -> 21
            const g1 = Math.round(234 - (29 * tealIntensity)); // 234 -> 205
            const b1 = Math.round(196 + (16 * tealIntensity)); // 196 -> 212
            
            // Mid color (more light teal)
            const r2 = Math.round(107 - (43 * tealIntensity)); // 107 -> 64
            const g2 = Math.round(234 - (14 * tealIntensity)); // 234 -> 220
            const b2 = Math.round(196 + (8 * tealIntensity)); // 196 -> 204
            
            // Adjust color based on opacity
            const baseColor = `rgba(${r1}, ${g1}, ${b1}, ${this.opacity})`;
            const fadeColor1 = `rgba(${r2}, ${g2}, ${b2}, ${this.opacity * 0.5})`;
            const fadeColor2 = `rgba(255, 255, 255, 0)`;
            
            gradient.addColorStop(0, baseColor);
            gradient.addColorStop(0.6, fadeColor1);
            gradient.addColorStop(1, fadeColor2);
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Initialize network
    function initNetwork() {
        // Clear existing network
        nodes = [];
        edges = [];
        pulses = [];
        
        // Create regular nodes - maintain the current amount
        const regularNodeCount = Math.floor(canvas.width * canvas.height / 3000);
        
        // Create regular nodes
        for (let i = 0; i < regularNodeCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 3); // Create nodes beyond viewport for scrolling
            nodes.push(new Node(x, y, false)); // false = regular node
        }
        
        // Create additional small nodes - significantly more
        const smallNodeCount = Math.floor(canvas.width * canvas.height / 1000); // 3x more than regular nodes
        
        // Create small nodes
        for (let i = 0; i < smallNodeCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 3);
            nodes.push(new Node(x, y, true)); // true = small node
        }
        
        // Create edges between nodes that are close to each other
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Find nearby nodes to connect
            for (let j = 0; j < nodes.length; j++) {
                if (i !== j) {
                    const otherNode = nodes[j];
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Different connection rules based on node types
                    let shouldConnect = false;
                    
                    if (node.isSmall && otherNode.isSmall) {
                        // Small nodes connect at shorter distances but can have more connections
                        shouldConnect = distance < 100 && node.connections.length < 8 && otherNode.connections.length < 8;
                    } else if (node.isSmall || otherNode.isSmall) {
                        // Mixed connections (small to regular)
                        shouldConnect = distance < 150 && node.connections.length < 6 && otherNode.connections.length < 6;
                    } else {
                        // Regular nodes - maintain current behavior
                        shouldConnect = distance < 180 && node.connections.length < 5 && otherNode.connections.length < 5;
                    }
                    
                    if (shouldConnect) {
                        // Avoid duplicate edges
                        const edgeExists = edges.some(edge => 
                            (edge.startNode === node && edge.endNode === otherNode) || 
                            (edge.startNode === otherNode && edge.endNode === node)
                        );
                        
                        if (!edgeExists) {
                            const edge = new Edge(node, otherNode);
                            edges.push(edge);
                            node.connections.push(otherNode);
                            otherNode.connections.push(node);
                        }
                    }
                }
            }
        }
    }
    
    // Create new pulse randomly
    function createPulse() {
        if (edges.length > 0 && Math.random() < 0.15) { // Increased pulse frequency (3x more)
            const randomEdge = edges[Math.floor(Math.random() * edges.length)];
            pulses.push(new Pulse(randomEdge));
        }
    }
    
    // Update network for scrolling
    function updateNetwork() {
        // Update pulses
        pulses = pulses.filter(pulse => pulse.update());
        
        // Create new pulses
        createPulse();
    }
    
    // Draw the entire network
    function drawNetwork() {
        // Clear canvas
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw edges
        edges.forEach(edge => edge.draw());
        
        // Draw nodes
        nodes.forEach(node => node.draw());
        
        // Draw pulses
        pulses.forEach(pulse => pulse.draw());
    }
    
    // Animation loop
    function animate() {
        updateNetwork();
        drawNetwork();
        requestAnimationFrame(animate);
    }
    
    // Handle scrolling - adjust node positions
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        // No need to adjust canvas position as it's fixed
    });
    
    // Initialize and start animation
    initNetwork();
    animate();
});
