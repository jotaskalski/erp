document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            
            if (targetPane) {
                targetPane.classList.add('active');
            } else {
                console.error(`Tab pane with id="${tabId}" not found`);
            }
        });
    });

    // Fallback: Ensure at least one tab is active on page load
    if (!document.querySelector('.tab-btn.active')) {
        const defaultButton = document.querySelector('.tab-btn');
        const defaultPane = document.querySelector('.tab-pane');
        if (defaultButton && defaultPane) {
            defaultButton.classList.add('active');
            defaultPane.classList.add('active');
        }
    }

    // Project card hover animation
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 12px 20px -5px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Initialize greeting
    initializeDashboard();
});

function initializeDashboard() {
    updateGreeting();
}

function updateGreeting() {
    const greeting = document.querySelector('.greeting-section h1');
    if (!greeting) return;
    
    const hour = new Date().getHours();
    const name = sessionStorage.getItem('username') || "User";
    
    let timeGreeting;
    if (hour < 12) timeGreeting = "Bom dia";
    else if (hour < 18) timeGreeting = "Boa tarde";
    else timeGreeting = "Boa noite";
    
    greeting.textContent = `${timeGreeting}, ${name}!`;
}