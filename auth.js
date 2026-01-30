document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;

            // Simple demo logic
            const userData = {
                email: email,
                role: role,
                name: email.split('@')[0]
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));

            if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'patient-dashboard.html';
            }
        });
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

const regForm = document.getElementById('registerForm');

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPass').value;
        const confirmPass = document.getElementById('regPassConfirm').value;

        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate creating a user record
        const newUser = {
            name: name,
            email: email,
            role: 'patient'
        };

        // Save to "Database" (localStorage)
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert("Account created successfully! Redirecting to your dashboard...");
        window.location.href = 'patient-dashboard.html';
    });
}

