/**
 * ERP Leave Management JavaScript
 * Handles tab switching, filtering, and row actions
 */

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
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Filter functionality
    const filters = document.querySelectorAll('.filter-dropdown, .filter-date');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    function applyFilters() {
        const leaveType = document.querySelector('.filter-dropdown').value;
        const status = document.querySelectorAll('.filter-dropdown')[1].value;
        const startDate = document.querySelectorAll('.filter-date')[0].value;
        const endDate = document.querySelectorAll('.filter-date')[1].value;

        // In a real app, this would filter the table rows
        console.log(`Filtering by: ${leaveType}, ${status}, ${startDate} - ${endDate}`);
    }

    // Row actions
    const leaveRows = document.querySelectorAll('.leave-table tbody tr');
    
    leaveRows.forEach(row => {
        const editBtn = row.querySelector('.edit-icon');
        const deleteBtn = row.querySelector('.delete-icon');

        // Edit button click
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                const leaveType = row.querySelector('td:nth-child(3)').textContent;
                console.log(`Editing leave request for ${leaveType}`);
                // In a real application, this would open an edit modal
            });
        }

        // Delete button click
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                const leaveType = row.querySelector('td:nth-child(3)').textContent;
                
                if (confirm(`Are you sure you want to delete "${leaveType}"?`)) {
                    row.remove();
                    console.log(`Deleted "${leaveType}"`);
                    // In a real app, this would send a DELETE request
                }
            });
        }
    });

    // Initialize dynamic greeting (matches dashboard.js behavior)
    initializeGreeting();
});

/**
 * Update greeting based on time of day and session storage
 */
function initializeGreeting() {
    const greeting = document.getElementById('dynamicGreeting');
    if (!greeting) return;
    
    const hour = new Date().getHours();
    const name = sessionStorage.getItem('username') || "User";
    
    let timeGreeting;
    if (hour < 12) timeGreeting = "Bom dia";
    else if (hour < 18) timeGreeting = "Boa tarde";
    else timeGreeting = "Boa noite";
    
    greeting.textContent = `${timeGreeting}, ${name}!`;
}