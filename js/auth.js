// Authentication logic
document.addEventListener('DOMContentLoaded', function() {
    const validUsername = "admin";
    const validPassword = "admin";

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('error');
            
            if (username === validUsername && password === validPassword) {
                // Store login state
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username); // Save username
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                errorElement.textContent = 'Invalid username or password';
            }
        });
    }

    // Check login status on protected pages
    const isProtectedPage = window.location.pathname.includes('dashboard.html') || 
                           window.location.pathname.includes('leaves.html');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (isProtectedPage && !isLoggedIn) {
        window.location.href = 'index.html';
    }

    // Inject logout button into sidebar (for dashboard.html and leaves.html)
    const navMenu = document.querySelector('.nav-menu ul');
    if (navMenu && isLoggedIn) {
        // Avoid duplicate logout button
        if (!document.getElementById('logoutBtnContainer')) {
            const logoutBtn = document.createElement('li');
            logoutBtn.id = 'logoutBtnContainer';
            logoutBtn.innerHTML = `
                <a href="#" id="logoutBtn">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </span>
                    <span>Logout</span>
                </a>
            `;
            navMenu.appendChild(logoutBtn);
        }

        // Handle logout click
        document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
});