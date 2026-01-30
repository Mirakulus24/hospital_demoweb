document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) window.location.href = 'login.html';

    // Update UI with user info
    if (document.getElementById('welcomeText')) {
        document.getElementById('welcomeText').innerText = `Welcome, ${user.name}`;
    }

    // Appointment Simulation
    const dummyAppts = [
        { patient: 'John Doe', doctor: 'Dr. Smith', date: '2026-02-15', status: 'Confirmed' },
        { patient: 'Jane Doe', doctor: 'Dr. Adams', date: '2026-02-18', status: 'Pending' }
    ];

    // Render Admin Table
    const adminTable = document.getElementById('adminApptTable');
    if (adminTable) {
        dummyAppts.forEach(appt => {
            const row = `<tr>
                <td>${appt.patient}</td>
                <td>${appt.doctor}</td>
                <td>${appt.date}</td>
                <td><span class="status status-${appt.status.toLowerCase()}">${appt.status}</span></td>
                <td><button class="btn-primary" style="font-size:0.7rem">Manage</button></td>
            </tr>`;
            adminTable.innerHTML += row;
        });
    }

    // Patient Booking Logic
    const bookBtn = document.getElementById('bookBtn');
    const bookingSection = document.getElementById('bookingSection');
    if(bookBtn) {
        bookBtn.onclick = () => bookingSection.style.display = 'block';
    }

    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Appointment requested successfully!');
            bookingSection.style.display = 'none';
        };
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// --- Report Dispatch Logic ---
function openReportModal() {
    document.getElementById('reportModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
}

// Add a trigger button in your Admin Table actions or Header
// Example: <button onclick="openReportModal()">Send Report</button>

document.getElementById('reportForm').onsubmit = (e) => {
    e.preventDefault();
    const doc = document.getElementById('targetDoctor').value;
    alert(`Report successfully dispatched to ${doc}. Notification sent.`);
    closeModal();
};

// --- Chatbot Logic ---
function toggleChat() {
    const body = document.getElementById('chatBody');
    const input = document.querySelector('.chat-input');
    const icon = document.getElementById('chatIcon');
    
    const isHidden = body.style.display === 'none' || body.style.display === '';
    body.style.display = isHidden ? 'flex' : 'none';
    body.style.flexDirection = 'column';
    input.style.display = isHidden ? 'flex' : 'none';
    icon.className = isHidden ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    if (!input.value) return;

    // Add User Message
    body.innerHTML += `<div class="msg user">${input.value}</div>`;
    
    // Simulate Bot Response
    setTimeout(() => {
        body.innerHTML += `<div class="msg bot">Processing request for "${input.value}"... I've flagged this for review.</div>`;
        body.scrollTop = body.scrollHeight;
    }, 800);

    input.value = '';
}

// --- Emergency Logic ---
function triggerEmergency() {
    const confirmAction = confirm("ACTIVATE EMERGENCY PROTOCOL? This will alert all on-duty staff.");
    if (confirmAction) {
        document.body.style.border = "10px solid #ef4444";
        alert("Emergency signals dispatched. Hospital status: CODE RED.");
        setTimeout(() => document.body.style.border = "none", 5000);
    }
}

// --- Toast Notification System ---
function showToast(title, message, type = 'info') {
    // Create container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icons based on type
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]}" style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-in forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// --- Update the Report Dispatch Logic ---
document.getElementById('reportForm').onsubmit = (e) => {
    e.preventDefault();
    const doc = document.getElementById('targetDoctor').value;
    
    // Instead of alert(), use the new toast!
    showToast('Report Dispatched', `Data sent to ${doc} successfully.`, 'success');
    
    closeModal();
};

// --- Update the Booking Logic (for Patient Dashboard) ---
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        // ... existing logic ...
        showToast('Booking Pending', 'Your request has been sent to the admin team.', 'info');
    });
}