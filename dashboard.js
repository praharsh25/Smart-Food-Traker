/**
 * Smart Food Saver - Dashboard JavaScript
 * Handles food logging, statistics, and data management
 */

// Get current user for user-specific storage
function getCurrentUser() {
  try {
    const user = localStorage.getItem('smartFoodSaver_currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
}

const currentUser = getCurrentUser();
const STORAGE_KEY = currentUser ? `smartFoodSaver_logs_${currentUser.id}` : 'smartFoodSaver_logs';

// State Management
let foodLogs = [];
let currentFilter = 'all';
let currentSearch = '';

// Constants
const CO2_PER_KG = 2.5; // Average kg CO2 per kg of food waste
const LEVELS = [
  { level: 1, name: 'Waste Warrior', emoji: '🏆', points: 0 },
  { level: 2, name: 'Eco Beginner', emoji: '🌱', points: 100 },
  { level: 3, name: 'Green Guardian', emoji: '♻️', points: 250 },
  { level: 4, name: 'Sustainability Star', emoji: '⭐', points: 500 },
  { level: 5, name: 'Planet Protector', emoji: '🌍', points: 1000 },
  { level: 6, name: 'Eco Legend', emoji: '👑', points: 2000 },
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initializeEventListeners();
  displayDate();
  updateDisplay();
  initializeChart();
});

/**
 * Display current date
 */
function displayDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateToday').textContent = today.toLocaleDateString('en-IN', options);
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Form submission
  document.getElementById('foodForm').addEventListener('submit', handleFormSubmit);

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });

  // Search and filter
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById('filterStatus').addEventListener('change', handleFilter);

  // Export buttons
  document.getElementById('downloadJSON').addEventListener('click', exportJSON);
  document.getElementById('downloadCSV').addEventListener('click', exportCSV);
  document.getElementById('clearAll').addEventListener('click', confirmClearAll);

  // Status field change
  document.getElementById('status').addEventListener('change', handleStatusChange);
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form values
  const foodName = document.getElementById('foodName').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const estimatedCost = parseFloat(document.getElementById('estimatedCost').value) || 0;
  const expiryDate = document.getElementById('expiryDate').value;
  const status = document.getElementById('status').value;
  const reason = document.getElementById('reason').value.trim();

  // Validation
  if (!foodName) {
    showError('foodName', 'Please enter a food name');
    return;
  }

  // Create food log object
  const foodLog = {
    id: Date.now(),
    foodName,
    quantity,
    estimatedCost,
    expiryDate,
    status,
    reason,
    createdAt: new Date().toISOString(),
  };

  // Add to array and save
  foodLogs.unshift(foodLog);
  saveData();
  updateDisplay();

  // Show success message
  showToast(`${foodName} added successfully!`, 'success');

  // Reset form
  document.getElementById('foodForm').reset();
  clearError('foodName');
}

/**
 * Show/hide reason field based on status
 */
function handleStatusChange(e) {
  const reasonField = document.getElementById('reason');
  const reasonLabel = reasonField.previousElementSibling;
  
  if (e.target.value === 'wasted') {
    reasonField.required = true;
    reasonLabel.textContent = 'Reason (if wasted) *';
  } else {
    reasonField.required = false;
    reasonLabel.textContent = 'Reason (if wasted)';
  }
}

/**
 * Handle tab switching
 */
function handleTabClick(e) {
  const targetId = e.currentTarget.dataset.target;

  // Update tab states
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  e.currentTarget.classList.add('active');
  e.currentTarget.setAttribute('aria-selected', 'true');

  // Update content visibility
  document.querySelectorAll('.tab-content').forEach(content => {
    content.hidden = true;
  });
  document.getElementById(targetId).hidden = false;

  // Update specific tab content
  if (targetId === 'expiryAlerts') {
    displayExpiryAlerts();
  } else {
    displayFoodHistory();
  }
}

/**
 * Handle search input
 */
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase();
  displayFoodHistory();
}

/**
 * Handle filter selection
 */
function handleFilter(e) {
  currentFilter = e.target.value;
  displayFoodHistory();
}

/**
 * Display food history with filters
 */
function displayFoodHistory() {
  const container = document.getElementById('foodHistory');
  
  // Apply filters
  let filtered = foodLogs;
  
  if (currentFilter !== 'all') {
    filtered = filtered.filter(log => log.status === currentFilter);
  }
  
  if (currentSearch) {
    filtered = filtered.filter(log => 
      log.foodName.toLowerCase().includes(currentSearch) ||
      (log.quantity && log.quantity.toLowerCase().includes(currentSearch)) ||
      (log.reason && log.reason.toLowerCase().includes(currentSearch))
    );
  }

  // Display results
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa fa-inbox"></i>
        <h3>No entries found</h3>
        <p class="muted">Start logging your food to see them here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(log => createFoodItemHTML(log)).join('');

  // Add delete listeners
  container.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteFood(parseInt(btn.dataset.id)));
  });
}

/**
 * Display expiring soon alerts
 */
function displayExpiryAlerts() {
  const container = document.getElementById('expiryAlerts');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter items expiring within 3 days
  const expiringSoon = foodLogs.filter(log => {
    if (!log.expiryDate || log.status === 'wasted' || log.status === 'donated') return false;
    
    const expiryDate = new Date(log.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
  });

  if (expiringSoon.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa fa-check-circle"></i>
        <h3>All Clear!</h3>
        <p class="muted">No items expiring soon. Great job!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = expiringSoon.map(log => {
    const expiryDate = new Date(log.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    const warningText = daysUntilExpiry === 0 ? 'Expires today!' : 
                       daysUntilExpiry === 1 ? 'Expires tomorrow!' : 
                       `Expires in ${daysUntilExpiry} days`;
    
    return `
      ${createFoodItemHTML(log)}
      <div class="expiry-warning" style="margin-top: -1rem; margin-bottom: 1rem;">
        <i class="fa fa-exclamation-triangle"></i>
        <strong>${warningText}</strong>
      </div>
    `;
  }).join('');

  // Add delete listeners
  container.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteFood(parseInt(btn.dataset.id)));
  });
}

/**
 * Create HTML for a food item
 */
function createFoodItemHTML(log) {
  const date = new Date(log.createdAt).toLocaleDateString('en-IN');
  const statusIcon = {
    saved: '✅',
    wasted: '❌',
    donated: '🤝'
  };

  return `
    <div class="food-item">
      <div class="food-item-header">
        <div class="food-item-title">
          ${statusIcon[log.status]} ${log.foodName}
          <span class="status-badge status-${log.status}">${log.status}</span>
        </div>
        <div class="food-item-actions">
          <button class="btn-icon btn-delete" data-id="${log.id}" aria-label="Delete ${log.foodName}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="food-item-details">
        ${log.quantity ? `
          <div class="food-item-detail">
            <i class="fa fa-weight"></i>
            <span>${log.quantity}</span>
          </div>
        ` : ''}
        ${log.estimatedCost > 0 ? `
          <div class="food-item-detail">
            <i class="fa fa-rupee-sign"></i>
            <span>₹${log.estimatedCost.toFixed(2)}</span>
          </div>
        ` : ''}
        ${log.expiryDate ? `
          <div class="food-item-detail">
            <i class="fa fa-calendar"></i>
            <span>${new Date(log.expiryDate).toLocaleDateString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="food-item-detail">
          <i class="fa fa-clock"></i>
          <span>${date}</span>
        </div>
      </div>
      ${log.reason ? `
        <div class="food-item-detail" style="margin-top: 0.5rem;">
          <i class="fa fa-comment"></i>
          <span><em>${log.reason}</em></span>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Delete a food log
 */
function deleteFood(id) {
  const log = foodLogs.find(l => l.id === id);
  if (!log) return;

  showConfirmModal(
    `Delete ${log.foodName}?`,
    'This action cannot be undone.',
    () => {
      foodLogs = foodLogs.filter(l => l.id !== id);
      saveData();
      updateDisplay();
      showToast('Entry deleted successfully', 'success');
    }
  );
}

/**
 * Update all statistics and displays
 */
function updateDisplay() {
  updateStats();
  updateLevel();
  displayFoodHistory();
  updateChart();
}

/**
 * Update statistics
 */
function updateStats() {
  const stats = {
    wasted: 0,
    saved: 0,
    donated: 0,
    moneySaved: 0,
    moneyWasted: 0,
  };

  foodLogs.forEach(log => {
    if (log.status === 'wasted') {
      stats.wasted++;
      stats.moneyWasted += log.estimatedCost || 0;
    } else if (log.status === 'saved') {
      stats.saved++;
      stats.moneySaved += log.estimatedCost || 0;
    } else if (log.status === 'donated') {
      stats.donated++;
      stats.moneySaved += log.estimatedCost || 0;
    }
  });

  // Calculate CO2 saved (rough estimate: 2.5kg CO2 per kg of food saved)
  const co2Saved = (stats.saved + stats.donated) * CO2_PER_KG;

  // Update DOM
  document.getElementById('totalWasted').textContent = stats.wasted;
  document.getElementById('totalSaved').textContent = stats.saved;
  document.getElementById('totalDonated').textContent = stats.donated;
  document.getElementById('moneySaved').textContent = `₹${stats.moneySaved.toFixed(0)}`;
  document.getElementById('co2Saved').textContent = `${co2Saved.toFixed(1)}kg`;
}

/**
 * Update level and progress
 */
function updateLevel() {
  // Calculate total points
  const points = foodLogs.reduce((total, log) => {
    if (log.status === 'saved') return total + 10;
    if (log.status === 'donated') return total + 15;
    return total;
  }, 0);

  // Find current level
  let currentLevel = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].points) {
      currentLevel = LEVELS[i];
      break;
    }
  }

  // Find next level
  const nextLevelIndex = LEVELS.findIndex(l => l.level === currentLevel.level) + 1;
  const nextLevel = nextLevelIndex < LEVELS.length ? LEVELS[nextLevelIndex] : currentLevel;
  const nextLevelPoints = nextLevel.points;
  const pointsToNext = nextLevelPoints - points;
  const progress = ((points - currentLevel.points) / (nextLevelPoints - currentLevel.points)) * 100;

  // Update DOM
  document.getElementById('userLevel').textContent = currentLevel.level;
  document.getElementById('levelName').textContent = currentLevel.name;
  document.getElementById('levelEmoji').textContent = currentLevel.emoji;
  document.getElementById('levelPoints').textContent = `${points} pts`;
  document.getElementById('nextLevelPoints').textContent = nextLevelPoints;
  document.getElementById('levelBar').style.width = `${Math.min(progress, 100)}%`;

  // Update progress bar aria
  const progressBar = document.querySelector('.progress');
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }
}

// Chart instance
let impactChart = null;

/**
 * Initialize chart
 */
function initializeChart() {
  const ctx = document.getElementById('impactChart');
  if (!ctx) return;

  impactChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Saved',
          data: [],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Wasted',
          data: [],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Donated',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });

  updateChart();
}

/**
 * Update chart with current data
 */
function updateChart() {
  if (!impactChart) return;

  // Group data by date (last 7 days)
  const today = new Date();
  const last7Days = [];
  const dataMap = {};

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    last7Days.push(dateStr);
    dataMap[dateStr] = { saved: 0, wasted: 0, donated: 0 };
  }

  // Count logs by date
  foodLogs.forEach(log => {
    const logDate = new Date(log.createdAt);
    const dateStr = logDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    
    if (dataMap[dateStr]) {
      if (log.status === 'saved') dataMap[dateStr].saved++;
      else if (log.status === 'wasted') dataMap[dateStr].wasted++;
      else if (log.status === 'donated') dataMap[dateStr].donated++;
    }
  });

  // Update chart data
  impactChart.data.labels = last7Days;
  impactChart.data.datasets[0].data = last7Days.map(date => dataMap[date].saved);
  impactChart.data.datasets[1].data = last7Days.map(date => dataMap[date].wasted);
  impactChart.data.datasets[2].data = last7Days.map(date => dataMap[date].donated);
  impactChart.update();
}

/**
 * Export data as JSON
 */
function exportJSON() {
  if (foodLogs.length === 0) {
    showToast('No data to export', 'warning');
    return;
  }

  const dataStr = JSON.stringify(foodLogs, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(blob, `food-logs-${Date.now()}.json`);
  showToast('JSON exported successfully', 'success');
}

/**
 * Export data as CSV
 */
function exportCSV() {
  if (foodLogs.length === 0) {
    showToast('No data to export', 'warning');
    return;
  }

  const headers = ['Food Name', 'Quantity', 'Cost (₹)', 'Expiry Date', 'Status', 'Reason', 'Date Added'];
  const rows = foodLogs.map(log => [
    log.foodName,
    log.quantity || '',
    log.estimatedCost || '',
    log.expiryDate || '',
    log.status,
    log.reason || '',
    new Date(log.createdAt).toLocaleDateString('en-IN'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadFile(blob, `food-logs-${Date.now()}.csv`);
  showToast('CSV exported successfully', 'success');
}

/**
 * Download file helper
 */
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Confirm clear all data
 */
function confirmClearAll() {
  if (foodLogs.length === 0) {
    showToast('No data to clear', 'warning');
    return;
  }

  showConfirmModal(
    'Clear All Data?',
    'This will permanently delete all your food logs. This action cannot be undone.',
    () => {
      foodLogs = [];
      saveData();
      updateDisplay();
      showToast('All data cleared successfully!', 'success');
    }
  );
}

/**
 * Show confirmation modal
 */
function showConfirmModal(title, message, onConfirm) {
  const modal = document.getElementById('confirmModal');
  if (!modal) {
    console.error('Modal not found');
    return;
  }

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  
  // Show modal
  modal.hidden = false;
  modal.style.display = 'flex';

  // Remove any existing event listeners by cloning buttons
  const confirmBtn = document.getElementById('modalConfirm');
  const cancelBtn = document.getElementById('modalCancel');
  
  const newConfirmBtn = confirmBtn.cloneNode(true);
  const newCancelBtn = cancelBtn.cloneNode(true);
  
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

  const closeModal = () => {
    modal.hidden = true;
    modal.style.display = 'none';
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  newConfirmBtn.addEventListener('click', handleConfirm);
  newCancelBtn.addEventListener('click', handleCancel);

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
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

/**
 * Show form error
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
 * Clear form error
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
 * Save data to localStorage
 */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foodLogs));
  } catch (error) {
    console.error('Error saving data:', error);
    showToast('Error saving data. Storage may be full.', 'error');
  }
}

/**
 * Load data from localStorage
 */
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      foodLogs = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data:', error);
    showToast('Error loading saved data', 'error');
    foodLogs = [];
  }
}