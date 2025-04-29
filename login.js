const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

const data = [
  {
    name: "harsh",
    email: "Harsh@gmail.com",
    password: "Password123" // Meets validation criteria
  }
];

// Validation regex for email
const emailRegex = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Validation regex for password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const signUpForm = document.querySelector('.sign-up-container form');
const emailInput = signUpForm.querySelector('input[placeholder="Email"]');
const passwordInput = signUpForm.querySelector('input[placeholder="Password"]');
const nameInput = signUpForm.querySelector('input[placeholder="Name"]');

// Create error messages for email and password validation
const emailError = document.createElement('div');
emailError.style.color = "red";
emailError.style.fontSize = "0.9rem";
emailError.style.marginTop = "5px";
emailInput.parentElement.appendChild(emailError);

const passwordError = document.createElement('div');
passwordError.style.color = "red";
passwordError.style.fontSize = "0.9rem";
passwordError.style.marginTop = "5px";
passwordInput.parentElement.appendChild(passwordError);

// Real-time email validation
emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();

  if (!emailRegex.test(email)) {
    emailError.textContent = 'Email must be at least 5 characters long, with one uppercase and one lowercase letter.';
  } else {
    emailError.textContent = ''; // Clear error message when valid
  }
});

// Real-time password validation
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value.trim();

  if (!passwordRegex.test(password)) {
    passwordError.textContent = 'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one number.';
  } else {
    passwordError.textContent = ''; // Clear error message when valid
  }
});

// Sign-Up form submission
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Check for email and password validity
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please fix the email validation errors above.';
    return;
  }

  if (!passwordRegex.test(password)) {
    passwordError.textContent = 'Please fix the password validation errors above.';
    return;
  }

  const userExists = data.some(user => user.email === email);
  
  if (userExists) {
    alert('User already exists. Please sign in.');
  } else {
    data.push({ name, email, password });
    alert('Registration successful! Please sign in.');
    container.classList.remove("right-panel-active");
  }
});

const signInForm = document.querySelector('.sign-in-container form');
const signInEmailInput = signInForm.querySelector('input[placeholder="Email"]');
const signInPasswordInput = signInForm.querySelector('input[placeholder="Password"]');

// Create error messages for sign-in validation
const signInEmailError = document.createElement('div');
signInEmailError.style.color = "red";
signInEmailError.style.fontSize = "0.9rem";
signInEmailError.style.marginTop = "5px";
signInEmailInput.parentElement.appendChild(signInEmailError);

const signInPasswordError = document.createElement('div');
signInPasswordError.style.color = "red";
signInPasswordError.style.fontSize = "0.9rem";
signInPasswordError.style.marginTop = "5px";
signInPasswordInput.parentElement.appendChild(signInPasswordError);

// Real-time email validation in sign-in
signInEmailInput.addEventListener('input', () => {
  const email = signInEmailInput.value.trim();

  if (!emailRegex.test(email)) {
    signInEmailError.textContent = 'Email must be at least 5 characters long, with one uppercase and one lowercase letter.';
  } else {
    signInEmailError.textContent = ''; // Clear error message when valid
  }
});

// Real-time password validation in sign-in
signInPasswordInput.addEventListener('input', () => {
  const password = signInPasswordInput.value.trim();

  if (!passwordRegex.test(password)) {
    signInPasswordError.textContent = 'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one number.';
  } else {
    signInPasswordError.textContent = ''; // Clear error message when valid
  }
});

// Sign-In form submission
signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = signInEmailInput.value.trim();
  const password = signInPasswordInput.value.trim();

  // Check for email and password validity
  if (!emailRegex.test(email)) {
    signInEmailError.textContent = 'Please fix the email validation errors above.';
    return;
  }

  if (!passwordRegex.test(password)) {
    signInPasswordError.textContent = 'Please fix the password validation errors above.';
    return;
  }

  const user = data.find(user => user.email === email && user.password === password);
  
  if (user) {
    alert(`Welcome back, ${user.name}!`);
    window.location.href = '/Users/harshgarg/Desktop/FEE Projects /PROJECT FEE/subject.html';
  } else {
    alert('Invalid email or password.');
  }
});

