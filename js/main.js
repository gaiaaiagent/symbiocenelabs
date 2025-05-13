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

    let restrictedZones = []; // To store coordinates of multiple blocks to avoid

    // Helper function to check line segment intersection
    function lineSegmentIntersects(p1, q1, p2, q2) {
        function orientation(p, q, r) {
            const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
            if (val === 0) return 0; // Collinear
            return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
        }

        function onSegment(p, q, r) {
            return (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                    q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y));
        }

        const o1 = orientation(p1, q1, p2);
        const o2 = orientation(p1, q1, q2);
        const o3 = orientation(p2, q2, p1);
        const o4 = orientation(p2, q2, q1);

        if (o1 !== o2 && o3 !== o4) return true;

        if (o1 === 0 && onSegment(p1, p2, q1)) return true;
        if (o2 === 0 && onSegment(p1, q2, q1)) return true;
        if (o3 === 0 && onSegment(p2, p1, q2)) return true;
        if (o4 === 0 && onSegment(p2, q1, q2)) return true;

        return false;
    }

    // Helper function to check if a line (defined by two nodes) intersects a rectangle
    function lineIntersectsRect(node1, node2, rect) {
        if (!rect) return false;

        const p1 = { x: node1.x, y: node1.y };
        const p2 = { x: node2.x, y: node2.y };

        const minX = rect.left;
        const maxX = rect.right;
        const minY = rect.top;
        const maxY = rect.bottom;

        // Check intersection with each of the 4 rectangle sides
        if (lineSegmentIntersects(p1, p2, {x: minX, y: minY}, {x: maxX, y: minY})) return true; // Top edge
        if (lineSegmentIntersects(p1, p2, {x: minX, y: maxY}, {x: maxX, y: maxY})) return true; // Bottom edge
        if (lineSegmentIntersects(p1, p2, {x: minX, y: minY}, {x: minX, y: maxY})) return true; // Left edge
        if (lineSegmentIntersects(p1, p2, {x: maxX, y: minY}, {x: maxX, y: maxY})) return true; // Right edge
        
        // Optional: Check if the segment is entirely inside (though node placement should prevent this for endpoints)
        // if (p1.x > minX && p1.x < maxX && p1.y > minY && p1.y < maxY &&
        //     p2.x > minX && p2.x < maxX && p2.y > minY && p2.y < maxY) {
        //     return true;
        // }

        return false;
    }

    // Function to update the restricted zones based on element positions
    function updateRestrictedZones() {
        restrictedZones = []; // Clear previous zones

        const elementsToAvoid = [
            { selector: '.flex.flex-col.gap-1', name: 'Text Block' }
            // Removed: { selector: '.rivers-map-image', name: 'Rivers Map Image' }
        ];

        elementsToAvoid.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) { // Only add if element is visible and has dimensions
                    restrictedZones.push({
                        left: rect.left,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                        width: rect.width,
                        height: rect.height,
                        name: item.name // For debugging
                    });
                    // console.log(`Restricted zone for ${item.name} updated:`, restrictedZones[restrictedZones.length-1]);
                } else {
                    // console.warn(`Element for restricted zone ('${item.selector}') found but has no dimensions. Not adding zone.`);
                }
            } else {
                console.warn(`Element for restricted zone ('${item.selector}') not found. Network may overlap this element.`);
            }
        });
    }
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateRestrictedZones(); // Update restricted zones when canvas resizes
    }
    
    // Call resize initially and on window resize
    resizeCanvas(); // This will also call updateRestrictedZones the first time
    window.addEventListener('resize', resizeCanvas);

    // Initial update after DOM is ready and styles likely applied
    // A small delay can help ensure elements have their final dimensions
    setTimeout(updateRestrictedZones, 100); 
    // For images, it's often better to wait for the 'load' event if their size isn't fixed by CSS
    window.addEventListener('load', () => {
        updateRestrictedZones();
        // Re-initialize network if zones changed significantly after load
        // This might be too aggressive, but consider if initial placement is off
        // initNetwork(); 
    });
    
    // Network parameters
    const backgroundColor = '#FFFFFF'; // White background
    const lightTeal = '#F0FFFD'; // Extremely Lighter light teal (240, 255, 253)
    const darkTeal = '#B0FFF0'; // Extremely Lighter dark teal (176, 255, 240)
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
                // Further Increased opacity for small nodes
                this.opacity = 0.2 + Math.random() * 0.2; 
            } else {
                // Regular nodes with more variation (0.5-8px)
                this.radius = 0.5 + Math.random() * 7.5;
                // Further Increased opacity for regular nodes
                this.opacity = 0.4 + (this.radius / 8) * 0.55; 
            }
            
            this.connections = [];
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Color spectrum from light teal to darker teal based on size
            // Small nodes are more light teal, large nodes are more darker teal
            const tealIntensity = this.radius / 8; // 0-1 scale based on radius
            
            // Interpolate between new light teal (240,255,253) and new darker teal (176,255,240)
            const r = Math.round(240 - (64 * tealIntensity)); // 240 -> 176
            const g = 255; // Green is constant
            const b = Math.round(253 - (13 * tealIntensity)); // 253 -> 240
            
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
                // Further Increased opacity for small-to-small connections
                this.opacity = 0.15 + Math.random() * 0.15; 
            } else if (oneSmall) {
                // Thin edges for connections to small nodes (0.2-1px)
                this.thickness = 0.2 + Math.random() * 0.8;
                // Further Increased opacity for small connections
                this.opacity = 0.25 + Math.random() * 0.3; 
            } else {
                // Regular edges with more variation (0.2-4px)
                this.thickness = 0.2 + Math.random() * 3.8;
                // Further Increased opacity for regular edges
                this.opacity = 0.35 + (this.thickness / 4) * 0.55; 
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
            
            // Interpolate between new light teal (240,255,253) and new darker teal (176,255,240)
            const r = Math.round(240 - (64 * tealIntensity)); // 240 -> 176
            const g = 255; // Green is constant
            const b = Math.round(253 - (13 * tealIntensity)); // 253 -> 240
            
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
                this.speed = 0.04 + Math.random() * 0.08; 
                this.size = 0.8 + Math.random() * 0.7; 
                this.opacity = 0.7 + Math.random() * 0.2; // Further Increased opacity
            } else if (oneSmall) {
                // Moderate pulses for small-to-regular connections
                this.speed = 0.05 + Math.random() * 0.12; 
                this.size = 1.0 + Math.random() * 1.0; 
                this.opacity = 0.8 + Math.random() * 0.15; // Further Increased opacity
            } else {
                // Regular pulses for regular connections
                this.speed = 0.06 + Math.random() * 0.18; 
                this.size = 1.5 + Math.random() * 2.5; 
                this.opacity = 0.9; // Further Increased opacity
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
            
            // Center color (interpolates from new light teal (240,255,253) to new dark teal (176,255,240))
            const r1 = Math.round(240 - (64 * tealIntensity)); // 240 -> 176
            const g1 = 255;
            const b1 = Math.round(253 - (13 * tealIntensity)); // 253 -> 240
            
            // Mid color (interpolated towards new light teal)
            const r2 = Math.round(240 - (32 * tealIntensity)); // 240 -> 208
            const g2 = 255;
            const b2 = Math.round(253 - (7 * tealIntensity));  // 253 -> 246 (approx)
            
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
        
        // Create regular nodes - increased density
        const regularNodeCount = Math.floor(canvas.width * canvas.height / 1800); // Was 3000
        
        // Create regular nodes
        for (let i = 0; i < regularNodeCount; i++) {
            let x, y, attempts = 0;
            const MAX_NODE_PLACEMENT_ATTEMPTS = 50; // Prevent infinite loop
            const padding = 20; // Extra space around the restricted zone for nodes
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * (canvas.height * 3); // Nodes can be outside initial viewport
                attempts++;
                if (attempts > MAX_NODE_PLACEMENT_ATTEMPTS) {
                    console.warn("Max attempts reached for placing a regular node outside restricted zones.");
                    break; 
                }
            } while (restrictedZones.some(zone => 
                     x > zone.left - padding && x < zone.right + padding &&
                     y > zone.top - padding && y < zone.bottom + padding));
            nodes.push(new Node(x, y, false)); // false = regular node
        }
        
        // Create additional small nodes - significantly more, increased density
        const smallNodeCount = Math.floor(canvas.width * canvas.height / 600); // Was 1000
        
        // Create small nodes
        for (let i = 0; i < smallNodeCount; i++) {
            let x, y, attempts = 0;
            const MAX_NODE_PLACEMENT_ATTEMPTS = 50;
            const padding = 15; // Smaller padding for smaller nodes
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * (canvas.height * 3);
                attempts++;
                if (attempts > MAX_NODE_PLACEMENT_ATTEMPTS) {
                    console.warn("Max attempts reached for placing a small node outside restricted zones.");
                    break;
                }
            } while (restrictedZones.some(zone =>
                     x > zone.left - padding && x < zone.right + padding &&
                     y > zone.top - padding && y < zone.bottom + padding));
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

                    // Additional check: do not connect if the edge would cross any restricted zone
                    if (shouldConnect && restrictedZones.length > 0) {
                        for (const zone of restrictedZones) {
                            if (lineIntersectsRect(node, otherNode, zone)) {
                                shouldConnect = false;
                                break; 
                            }
                        }
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
        if (edges.length > 0 && Math.random() < 0.45) { // Significantly increased pulse frequency
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
