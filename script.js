document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        mobile: document.getElementById('mobile').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/login.html';
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }
    } catch (err) {
        console.error('Error during registration:', err);
        alert('An unexpected error occurred.');
    }
});

