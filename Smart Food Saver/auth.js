/**
 * Smart Food Saver - Authentication JavaScript
 * Handles user login and signup
 */

const USERS_KEY = 'smartFoodSaver_users';
const CURRENT_USER_KEY = 'smartFoodSaver_currentUser';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeAuthListeners();
  
  // Check if user is already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Redirect to dashboard if already logged in
    window.location.href = 'dashboard.html';
  }
});

/**
 * Initialize event listeners
 */
function initializeAuthListeners() {
  // Login form
  document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
  
  // Signup form
  document.getElementById('signupFormElement').addEventListener('submit', handleSignup);
}

/**
 * Show signup form
 */
function showSignup() {
  document.getElementById('loginForm').hidden = true;
  document.getElementById('signupForm').hidden = false;
}

/**
 * Show login form
 */
function showLogin() {
  document.getElementById('signupForm').hidden = true;
  document.getElementById('loginForm').hidden = false;
}

/**
 * Toggle password visibility
 */
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentElement.querySelector('.toggle-password i');
  
  if (input.type === 'password') {
    input.type = 'text';
    button.classList.remove('fa-eye');
    button.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    button.classList.remove('fa-eye-slash');
    button.classList.add('fa-eye');
  }
}

/**
 * Handle login
 */
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  // Clear previous errors
  clearError('loginEmail');
  clearError('loginPassword');
  
  // Validate
  if (!email) {
    showError('loginEmail', 'Please enter your email');
    return;
  }
  
  if (!password) {
    showError('loginPassword', 'Please enter your password');
    return;
  }
  
  // Get users
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    showError('loginEmail', 'Account not found. Please sign up first.');
    showToast('Account not found! Please create an account.', 'error');
    return;
  }
  
  if (user.password !== password) {
    showError('loginPassword', 'Incorrect password');
    showToast('Incorrect password. Please try again.', 'error');
    return;
  }
  
  // Login successful
  setCurrentUser(user);
  showToast('Login successful! Redirecting...', 'success');
  
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

/**
 * Handle signup
 */
function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  // Clear previous errors
  clearError('signupName');
  clearError('signupEmail');
  clearError('signupPassword');
  clearError('signupConfirmPassword');
  
  // Validate
  if (!name) {
    showError('signupName', 'Please enter your name');
    return;
  }
  
  if (!email) {
    showError('signupEmail', 'Please enter your email');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('signupEmail', 'Please enter a valid email');
    return;
  }
  
  if (!password) {
    showError('signupPassword', 'Please enter a password');
    return;
  }
  
  if (password.length < 6) {
    showError('signupPassword', 'Password must be at least 6 characters');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('signupConfirmPassword', 'Passwords do not match');
    return;
  }
  
  // Check if user already exists
  const users = getUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    showError('signupEmail', 'Email already registered. Please login.');
    showToast('Email already exists! Please login.', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  showToast('Account created successfully! Logging you in...', 'success');
  
  // Auto login
  setTimeout(() => {
    setCurrentUser(newUser);
    window.location.href = 'dashboard.html';
  }, 1500);
}

/**
 * Get all users
 */
function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

/**
 * Save users
 */
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

/**
 * Get current logged in user
 */
function getCurrentUser() {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
}

/**
 * Set current user
 */
function setCurrentUser(user) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
}

/**
 * Validate email
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Show error
 */
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}Error`);
  
  field.classList.add('error');
  if (errorSpan) {
    errorSpan.textContent = message;
  }
  field.focus();
}

/**
 * Clear error
 */
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}Error`);
  
  field.classList.remove('error');
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}

/**
 * Show toast
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('authToast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.hidden = false;
  toast.style.display = 'flex';

  setTimeout(() => {
    toast.hidden = true;
    toast.style.display = 'none';
  }, 3000);
}