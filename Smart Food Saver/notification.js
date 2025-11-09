/**
 * Smart Food Saver - Notification System
 * Handles expiry notifications and alerts
 */

const NOTIFICATION_PERMISSION_KEY = 'smartFoodSaver_notificationPermission';
const LAST_CHECK_KEY = 'smartFoodSaver_lastNotificationCheck';

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
      showToast('Notifications enabled! You\'ll get alerts for expiring items.', 'success');
      return true;
    }
  }

  return false;
}

/**
 * Show notification
 */
function showNotification(title, body, icon = '🔔') {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body: body,
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      tag: 'food-expiry',
      requireInteraction: false,
      silent: false,
    });

    notification.onclick = function() {
      window.focus();
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }
}

/**
 * Check for expiring items and send notifications
 */
function checkExpiringItems() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const STORAGE_KEY = `smartFoodSaver_logs_${currentUser.id}`;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const foodLogs = JSON.parse(stored);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get items expiring today or tomorrow
    const criticalItems = foodLogs.filter(log => {
      if (!log.expiryDate || log.status === 'wasted' || log.status === 'donated') return false;
      
      const expiryDate = new Date(log.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 2;
    });

    if (criticalItems.length > 0) {
      // Check if we already notified today
      const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
      const todayStr = today.toDateString();
      
      if (lastCheck !== todayStr) {
        // Send notification
        if (criticalItems.length === 1) {
          const item = criticalItems[0];
          const expiryDate = new Date(item.expiryDate);
          const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          
          let message = '';
          if (daysUntilExpiry === 0) {
            message = `${item.foodName} expires TODAY! Use it soon.`;
          } else if (daysUntilExpiry === 1) {
            message = `${item.foodName} expires TOMORROW!`;
          } else {
            message = `${item.foodName} expires in ${daysUntilExpiry} days.`;
          }
          
          showNotification('⚠️ Food Expiry Alert', message);
        } else {
          showNotification(
            '⚠️ Food Expiry Alert',
            `${criticalItems.length} items are expiring soon! Check your dashboard.`
          );
        }
        
        // Update last check
        localStorage.setItem(LAST_CHECK_KEY, todayStr);
      }
    }
  } catch (error) {
    console.error('Error checking expiring items:', error);
  }
}

/**
 * Show in-app alert for expiring items
 */
function showExpiryAlert() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const STORAGE_KEY = `smartFoodSaver_logs_${currentUser.id}`;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const foodLogs = JSON.parse(stored);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get items expiring in next 2 days
    const expiringItems = foodLogs.filter(log => {
      if (!log.expiryDate || log.status === 'wasted' || log.status === 'donated') return false;
      
      const expiryDate = new Date(log.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 2;
    });

    if (expiringItems.length > 0) {
      // Create alert banner
      const existingAlert = document.getElementById('expiryAlertBanner');
      if (existingAlert) return; // Already showing

      const alertBanner = document.createElement('div');
      alertBanner.id = 'expiryAlertBanner';
      alertBanner.className = 'expiry-alert-banner';
      alertBanner.innerHTML = `
        <div class="alert-content">
          <i class="fa fa-exclamation-triangle"></i>
          <div>
            <strong>⚠️ Expiry Alert!</strong>
            <p>${expiringItems.length} item${expiringItems.length > 1 ? 's are' : ' is'} expiring soon. Check the "Expiring Soon" tab!</p>
          </div>
          <button onclick="closeExpiryAlert()" class="alert-close">
            <i class="fa fa-times"></i>
          </button>
        </div>
      `;

      // Insert at top of container
      const container = document.querySelector('.container');
      if (container) {
        container.insertBefore(alertBanner, container.firstChild);
      }
    }
  } catch (error) {
    console.error('Error showing expiry alert:', error);
  }
}

/**
 * Close expiry alert banner
 */
function closeExpiryAlert() {
  const alertBanner = document.getElementById('expiryAlertBanner');
  if (alertBanner) {
    alertBanner.remove();
  }
}

/**
 * Initialize notification system
 */
function initNotifications() {
  // Check for expiring items on page load
  checkExpiringItems();
  showExpiryAlert();

  // Check every hour
  setInterval(checkExpiringItems, 60 * 60 * 1000);
}

/**
 * Enable notifications button handler
 */
function enableNotifications() {
  requestNotificationPermission().then(granted => {
    if (granted) {
      checkExpiringItems();
    } else {
      showToast('Please allow notifications in your browser settings', 'warning');
    }
  });
}