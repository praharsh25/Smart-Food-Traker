/**
 * Smart Food Saver - Authentication Check
 * Checks if user is logged in before accessing protected pages
 */

const CURRENT_USER_KEY = 'smartFoodSaver_currentUser';

/**
 * Check if user is logged in
 */
function checkAuth() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    // User is not logged in, redirect to auth page
    window.location.href = 'auth.html';
    return false;
  }
  
  return true;
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
 * Logout user
 */
function logout() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'auth.html';
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

/**
 * Display user info in navbar
 */
function displayUserInfo() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  // Add user info to navbar
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle && themeToggle.parentElement) {
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.innerHTML = `
      <span class="user-name">${currentUser.name}</span>
      <button onclick="logout()" class="btn-logout" title="Logout">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    `;
    themeToggle.parentElement.insertBefore(userInfo, themeToggle);
  }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    displayUserInfo();
  }
});