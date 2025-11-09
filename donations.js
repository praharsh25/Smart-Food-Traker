/**
 * Smart Food Saver - Donations JavaScript
 * Handles donation center display and search
 */

// Sample donation centers data
const donationCenters = [
  {
    id: 1,
    name: 'Mumbai Food Bank',
    type: 'Food Bank',
    address: 'Andheri East, Mumbai, Maharashtra',
    phone: '+91 22 1234 5678',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    website: 'https://example.com',
    accepts: ['Non-perishables', 'Fresh produce', 'Packaged goods'],
  },
  {
    id: 2,
    name: 'Pune Community Kitchen',
    type: 'Community Center',
    address: 'Kothrud, Pune, Maharashtra',
    phone: '+91 20 9876 5432',
    hours: 'Daily: 8:00 AM - 8:00 PM',
    website: 'https://example.com',
    accepts: ['Fresh food', 'Cooked meals', 'Groceries'],
  },
  {
    id: 3,
    name: 'Akshaya Patra Foundation',
    type: 'NGO',
    address: 'Multiple locations across India',
    phone: '+91 80 3046 4000',
    hours: 'Mon-Fri: 10:00 AM - 5:00 PM',
    website: 'https://www.akshayapatra.org',
    accepts: ['Bulk donations', 'Monetary donations', 'Grains & pulses'],
  },
  {
    id: 4,
    name: 'Feeding India - Pimpri Chinchwad',
    type: 'Food Bank',
    address: 'Pimpri, Pune, Maharashtra',
    phone: '+91 20 5555 6666',
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
    website: 'https://www.feedingindia.org',
    accepts: ['Packaged food', 'Fresh vegetables', 'Dairy products'],
  },
  {
    id: 5,
    name: 'Goonj - Clothing & Food',
    type: 'NGO',
    address: 'Wakad, Pune, Maharashtra',
    phone: '+91 20 7777 8888',
    hours: 'Tue-Sun: 10:00 AM - 6:00 PM',
    website: 'https://www.goonj.org',
    accepts: ['Food', 'Clothing', 'Household items'],
  },
  {
    id: 6,
    name: 'Robin Hood Army - Pune',
    type: 'Volunteer Group',
    address: 'Various locations in Pune',
    phone: '+91 98765 43210',
    hours: 'Contact for schedule',
    website: 'https://www.robinhoodarmy.com',
    accepts: ['Surplus food', 'Packaged meals', 'Fresh produce'],
  },
];

// Community drives data
const communityDrives = [
  {
    name: 'Weekend Food Drive',
    date: 'Every Saturday',
    location: 'Community Center, Pimpri',
    description: 'Weekly food collection drive for local families in need.',
  },
  {
    name: 'Monthly Meal Distribution',
    date: 'First Sunday of every month',
    location: 'Various locations',
    description: 'Join us in preparing and distributing meals to the homeless.',
  },
  {
    name: 'Harvest Festival Food Drive',
    date: 'October 15-20, 2025',
    location: 'Multiple drop-off points',
    description: 'Special collection drive during harvest season.',
  },
];

// NGO partners data
const ngoPartners = [
  {
    name: 'Akshaya Patra Foundation',
    focus: 'Mid-day meals for school children',
    website: 'https://www.akshayapatra.org',
    description: 'One of the world\'s largest NGOs running mid-day meal programs.',
  },
  {
    name: 'Feeding India',
    focus: 'Food waste management & hunger relief',
    website: 'https://www.feedingindia.org',
    description: 'Connects food donors with NGOs and communities in need.',
  },
  {
    name: 'The Akshara Foundation',
    focus: 'Child nutrition and education',
    website: 'https://www.akshara.org.in',
    description: 'Works towards ensuring nutritious meals for underprivileged children.',
  },
];

/**
 * Initialize page
 */
document.addEventListener('DOMContentLoaded', () => {
  displayDonationCenters();
});

/**
 * Display all donation centers
 */
function displayDonationCenters(searchTerm = '') {
  const container = document.getElementById('centersGrid');

  let filtered = donationCenters;

  if (searchTerm) {
    filtered = donationCenters.filter(center =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-centers">
        <i class="fa fa-map-marker-alt"></i>
        <h3>No centers found</h3>
        <p class="muted">Try adjusting your search location.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(center => createCenterCard(center)).join('');
}

/**
 * Create donation center card HTML
 */
function createCenterCard(center) {
  return `
    <article class="center-card">
      <div class="center-header">
        <div class="center-icon">
          <i class="fa fa-hand-holding-heart"></i>
        </div>
        <div class="center-info">
          <h3>${center.name}</h3>
          <span class="center-type">${center.type}</span>
        </div>
      </div>
      <div class="center-details">
        <div class="center-detail">
          <i class="fa fa-map-marker-alt"></i>
          <span>${center.address}</span>
        </div>
        <div class="center-detail">
          <i class="fa fa-phone"></i>
          <span>${center.phone}</span>
        </div>
        <div class="center-detail">
          <i class="fa fa-clock"></i>
          <span>${center.hours}</span>
        </div>
        <div class="center-detail">
          <i class="fa fa-check-circle"></i>
          <span>Accepts: ${center.accepts.join(', ')}</span>
        </div>
      </div>
      <div class="center-actions">
        <button class="btn btn-outline" onclick="window.open('tel:${center.phone}')">
          <i class="fa fa-phone"></i> Call
        </button>
        <button class="btn" onclick="window.open('${center.website}', '_blank')">
          <i class="fa fa-external-link-alt"></i> Visit
        </button>
      </div>
    </article>
  `;
}

/**
 * Search locations
 */
function searchLocations() {
  const searchTerm = document.getElementById('locationSearch').value;
  displayDonationCenters(searchTerm);
}

/**
 * Show local centers section
 */
function showLocalCenters() {
  document.querySelector('.donation-centers').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('locationSearch').focus();
}

/**
 * Show community drives modal
 */
function showCommunityDrives() {
  const modal = createModal('Community Food Drives', 
    communityDrives.map(drive => `
      <div style="background: var(--bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border);">
        <h4 style="color: var(--text); margin-bottom: 0.5rem;">${drive.name}</h4>
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">
          <i class="fa fa-calendar"></i> ${drive.date}
        </p>
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">
          <i class="fa fa-map-marker-alt"></i> ${drive.location}
        </p>
        <p style="color: var(--text-muted);">${drive.description}</p>
      </div>
    `).join('')
  );
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * Show NGOs modal
 */
function showNGOs() {
  const modal = createModal('NGO Partners', 
    ngoPartners.map(ngo => `
      <div style="background: var(--bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border);">
        <h4 style="color: var(--text); margin-bottom: 0.5rem;">${ngo.name}</h4>
        <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.5rem;">
          <i class="fa fa-bullseye"></i> ${ngo.focus}
        </p>
        <p style="color: var(--text-muted); margin-bottom: 1rem;">${ngo.description}</p>
        <button class="btn btn-outline" onclick="window.open('${ngo.website}', '_blank')" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
          <i class="fa fa-external-link-alt"></i> Visit Website
        </button>
      </div>
    `).join('')
  );
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * Create modal helper
 */
function createModal(title, content) {
  const modal = document.createElement('div');
  modal.className = 'recipe-modal';
  modal.innerHTML = `
    <div class="recipe-modal-content" style="max-width: 700px;">
      <button class="modal-close" onclick="this.closest('.recipe-modal').remove()">&times;</button>
      <div style="padding: 2rem; padding-top: 3rem;">
        <h2 style="font-size: 2rem; margin-bottom: 2rem; color: var(--text);">${title}</h2>
        ${content}
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  return modal;
}

/**
 * Allow search on Enter key
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('locationSearch');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchLocations();
      }
    });
  }
});