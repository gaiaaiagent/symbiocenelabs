// Mycelium Network Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'mycelium-background';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Set canvas to full screen and absolute position (to move with scrolling)
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    // canvas.style.height is set by canvas.height attribute in resizeCanvas
    canvas.style.zIndex = '-2'; // Ensure it's behind the watershed pseudo-element
    
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
            { selector: '.flex.flex-col.gap-1', name: 'Text Block' },
            { selector: '.logo-v', name: 'Logo Image' },
            { selector: '.text-xl.font-bold', name: 'Site Name' },
            { selector: 'nav .flex:last-child', name: 'Navigation Links' }
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
    
    // Set canvas size to cover the entire document
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        
        // Get the document height to cover the entire page
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        canvas.height = docHeight;
        canvas.style.height = docHeight + 'px'; // Explicitly set CSS height
        updateRestrictedZones(); // Update restricted zones when canvas resizes
    }
    
    // Call resize initially and on window resize
    resizeCanvas(); // This will also call updateRestrictedZones the first time
    window.addEventListener('resize', function() {
        resizeCanvas();
        // Re-initialize network after resize to ensure proper distribution
        // Only re-initialize if the network was already initialized
        if (networkInitialized) {
            initNetwork();
        }
    });

    // Initial update after DOM is ready and styles likely applied
    // A small delay can help ensure elements have their final dimensions
    setTimeout(updateRestrictedZones, 100); 
    
    // Track if network has been initialized
    let networkInitialized = false;
    
    // For images, it's often better to wait for the 'load' event if their size isn't fixed by CSS
    window.addEventListener('load', () => {
        updateRestrictedZones();
        // Only initialize if not already done
        if (!networkInitialized) {
            initNetwork();
            networkInitialized = true;
        }
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
    
    // Node class
    class Node {
        constructor(x, y, isSmall = false) {
            this.x = x;
            this.y = y;
            this.isSmall = isSmall;
            
            if (isSmall) {
                // Small nodes (0.4-1.2px) - increased minimum size to eliminate very tiny nodes
                this.radius = 0.4 + Math.random() * 0.8;
                // Lower opacity for small nodes to reduce visual weight
                this.opacity = 0.15 + Math.random() * 0.2; 
            } else {
                // Regular nodes with less variation (0.8-4px) - increased minimum size
                this.radius = 0.8 + Math.random() * 3.2;
                // Adjusted opacity for regular nodes
                this.opacity = 0.3 + (this.radius / 4) * 0.5; 
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
                // Slightly thicker edges between small nodes (0.2-0.4px) - increased minimum thickness
                this.thickness = 0.2 + Math.random() * 0.2;
                // Increased opacity for small-to-small connections for better visibility
                this.opacity = 0.15 + Math.random() * 0.15; 
            } else if (oneSmall) {
                // Thin edges for connections to small nodes (0.2-0.7px) - increased minimum thickness
                this.thickness = 0.2 + Math.random() * 0.5;
                // Increased opacity for small connections
                this.opacity = 0.2 + Math.random() * 0.25; 
            } else {
                // Regular edges with less variation (0.3-2px) - increased minimum thickness
                this.thickness = 0.3 + Math.random() * 1.7;
                // Adjusted opacity for regular edges
                this.opacity = 0.3 + (this.thickness / 2) * 0.4; 
            }
            
            // Calculate length for gradient animation
            const dx = endNode.x - startNode.x;
            const dy = endNode.y - startNode.y;
            this.length = Math.sqrt(dx * dx + dy * dy);
            
            // Add gradient animation properties
            this.gradientProgress = Math.random(); // Random starting position
            this.gradientSpeed = 0.05 + Math.random() * 0.05; // Randomize speed slightly
        }
        
        update() {
            // Update gradient position
            this.gradientProgress += this.gradientSpeed / 100;
            if (this.gradientProgress > 1) {
                this.gradientProgress = 0;
            }
        }
        
        draw() {
            const startX = this.startNode.x;
            const startY = this.startNode.y;
            const endX = this.endNode.x;
            const endY = this.endNode.y;
            
            // Create gradient
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            
            // Calculate gradient offset based on animation progress
            const offset = this.gradientProgress;
            
            // Add color stops similar to the text gradient pattern
            // Shifted by offset to create animation
            gradient.addColorStop((0 + offset) % 1, '#6beac4');
            gradient.addColorStop((0.15 + offset) % 1, '#15cdd4');
            gradient.addColorStop((0.35 + offset) % 1, '#15cdd4');
            gradient.addColorStop((0.5 + offset) % 1, '#6beac4');
            gradient.addColorStop((0.5 + offset) % 1, '#6beac4');
            gradient.addColorStop((0.65 + offset) % 1, '#15cdd4');
            gradient.addColorStop((0.85 + offset) % 1, '#15cdd4');
            gradient.addColorStop((1 + offset) % 1, '#6beac4');
            
            // Draw the edge with gradient
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            
            // Apply gradient with opacity
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.thickness;
            ctx.stroke();
            ctx.globalAlpha = 1.0; // Reset global alpha
        }
    }
    
    
    // Initialize network
    function initNetwork() {
        // Clear existing network
        nodes = [];
        edges = [];
        
    // Create regular nodes - reduced density for better performance
    const regularNodeCount = Math.floor(canvas.width * canvas.height / 8000); // Reduced density of regular nodes
    
    // Create regular nodes
        for (let i = 0; i < regularNodeCount; i++) {
            let x, y, attempts = 0;
            const MAX_NODE_PLACEMENT_ATTEMPTS = 50; // Prevent infinite loop
            const padding = 20; // Extra space around the restricted zone for nodes
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height; // Use the full canvas height
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
        
    // Create additional small nodes - reduced density of small nodes to improve performance
    const smallNodeCount = Math.floor(canvas.width * canvas.height / 2000); // Reduced density of small nodes
        
        // Create small nodes
        for (let i = 0; i < smallNodeCount; i++) {
            let x, y, attempts = 0;
            const MAX_NODE_PLACEMENT_ATTEMPTS = 50;
            const padding = 15; // Smaller padding for smaller nodes
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height; // Use the full canvas height
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
                    
                    // Different connection rules based on node types - reduced connections for better performance
                    let shouldConnect = false;
                    
                    if (node.isSmall && otherNode.isSmall) {
                        // Small nodes connect at shorter distances with fewer connections
                        shouldConnect = distance < 100 && node.connections.length < 4 && otherNode.connections.length < 4;
                    } else if (node.isSmall || otherNode.isSmall) {
                        // Mixed connections (small to regular) - reduced distance and connections
                        shouldConnect = distance < 130 && node.connections.length < 5 && otherNode.connections.length < 5;
                    } else {
                        // Regular nodes - prioritize these connections
                        shouldConnect = distance < 180 && node.connections.length < 4 && otherNode.connections.length < 4;
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
    
    
    // Update network for scrolling and animations
    function updateNetwork() {
        // Update edge gradients
        edges.forEach(edge => edge.update());
    }
    
    // Draw the entire network
    function drawNetwork() {
        // Clear canvas
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Sort edges by thickness (largest first)
        const sortedEdges = [...edges].sort((a, b) => b.thickness - a.thickness);
        
        // Draw edges (largest first)
        sortedEdges.forEach(edge => edge.draw());
        
        // Sort nodes by radius (largest first)
        const sortedNodes = [...nodes].sort((a, b) => b.radius - a.radius);
        
        // Draw nodes (largest first)
        sortedNodes.forEach(node => node.draw());
    }
    
    // Animation loop
    function animate() {
        updateNetwork();
        drawNetwork();
        requestAnimationFrame(animate);
    }
    
    // Handle scrolling
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        // No need to adjust canvas position as it's absolute and moves with scrolling
    });
    
    // Initialize and start animation
    if (!networkInitialized) {
        initNetwork();
        networkInitialized = true;
    }
    animate();
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});
