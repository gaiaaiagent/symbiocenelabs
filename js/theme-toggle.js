// Dark Mode Toggle Functionality
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Create toggle button
        this.createToggleButton();
        
        // Add event listeners
        this.addEventListeners();
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.setAttribute('title', 'Toggle dark/light mode');
        
        document.body.appendChild(button);
        this.toggleButton = button;
    }

    addEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    setTheme(theme) {
        console.log('Setting theme to:', theme);
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        console.log('data-theme attribute set to:', document.documentElement.getAttribute('data-theme'));
        
        if (this.toggleButton) {
            this.toggleButton.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Trigger canvas redraw if mycelium network exists
        if (window.redrawCanvas) {
            window.redrawCanvas();
        }
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});