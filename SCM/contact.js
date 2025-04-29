// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Clear previous invalid feedback
    name.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    message.classList.remove('is-invalid');

    // Validate form fields
    let isValid = true;

    if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        isValid = false;
    }
    if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    if (message.value.trim() === '') {
        message.classList.add('is-invalid');
        isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
        alert('Message Sent Successfully!');
        // Reset form
        document.getElementById('contactForm').reset();
    }
});

// Email validation function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
