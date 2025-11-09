/**
 * Smart Food Saver - Recipes JavaScript
 * Handles recipe display and filtering
 */

// Recipe Database
const recipes = [
  {
    id: 1,
    title: 'Bread Pudding',
    icon: '🍞',
    category: 'bread',
    time: '45 mins',
    difficulty: 'Easy',
    description: 'Transform stale bread into a delicious dessert with milk, eggs, and sugar.',
    ingredients: [
      '4-6 slices stale bread, cubed',
      '2 cups milk',
      '2 eggs',
      '1/2 cup sugar',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon',
      '2 tbsp butter',
      'Raisins (optional)',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C). Grease a baking dish.',
      'Place bread cubes in the baking dish.',
      'Whisk together milk, eggs, sugar, vanilla, and cinnamon.',
      'Pour mixture over bread. Let soak for 10 minutes.',
      'Dot with butter and add raisins if desired.',
      'Bake for 35-40 minutes until golden and set.',
      'Serve warm with cream or ice cream.',
    ],
    tips: 'Day-old or slightly stale bread works best. You can also add chocolate chips or nuts for extra flavor.',
  },
  {
    id: 2,
    title: 'Vegetable Stir Fry',
    icon: '🥕',
    category: 'vegetables',
    time: '20 mins',
    difficulty: 'Easy',
    description: 'A quick and healthy way to use up leftover vegetables.',
    ingredients: [
      'Any leftover vegetables (carrots, bell peppers, broccoli, etc.)',
      '2 tbsp oil',
      '3 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp oyster sauce (optional)',
      '1 tsp sesame oil',
      'Salt and pepper to taste',
      'Cooked rice or noodles to serve',
    ],
    instructions: [
      'Heat oil in a wok or large pan over high heat.',
      'Add garlic and stir-fry for 30 seconds.',
      'Add harder vegetables first (carrots, broccoli). Cook for 3-4 minutes.',
      'Add softer vegetables (bell peppers, cabbage). Cook for 2 minutes.',
      'Add soy sauce, oyster sauce, and sesame oil. Toss well.',
      'Season with salt and pepper.',
      'Serve hot over rice or noodles.',
    ],
    tips: 'Cut vegetables into similar sizes for even cooking. Keep the heat high for that authentic stir-fry flavor.',
  },
  {
    id: 3,
    title: 'Veggie Omelette',
    icon: '🥚',
    category: 'vegetables',
    time: '10 mins',
    difficulty: 'Easy',
    description: 'Use up leftover vegetables in a nutritious breakfast omelette.',
    ingredients: [
      '3 eggs',
      'Leftover vegetables, chopped',
      '2 tbsp milk',
      '1 tbsp butter',
      'Salt and pepper to taste',
      'Cheese (optional)',
      'Fresh herbs (optional)',
    ],
    instructions: [
      'Beat eggs with milk, salt, and pepper.',
      'Heat butter in a non-stick pan over medium heat.',
      'Add vegetables and sauté for 2 minutes.',
      'Pour egg mixture over vegetables.',
      'Cook until edges set, then gently push edges in, tilting pan to let uncooked egg flow.',
      'When almost set, add cheese if using.',
      'Fold in half and serve hot.',
    ],
    tips: 'Pre-cook harder vegetables before adding to the omelette. Add fresh herbs for extra flavor.',
  },
  {
    id: 4,
    title: 'Fried Rice',
    icon: '🍚',
    category: 'rice',
    time: '15 mins',
    difficulty: 'Easy',
    description: 'Perfect way to use leftover rice with vegetables and protein.',
    ingredients: [
      '3 cups cooked rice (day-old works best)',
      '2 eggs, beaten',
      'Mixed vegetables (peas, carrots, corn)',
      '3 tbsp soy sauce',
      '2 cloves garlic, minced',
      '1 onion, diced',
      '2 tbsp oil',
      'Green onions for garnish',
    ],
    instructions: [
      'Heat 1 tbsp oil in a large wok or pan.',
      'Scramble the eggs, then set aside.',
      'Add remaining oil and sauté garlic and onion.',
      'Add vegetables and cook for 3-4 minutes.',
      'Add rice and break up clumps. Stir-fry for 3-4 minutes.',
      'Add soy sauce and scrambled eggs. Mix well.',
      'Garnish with green onions and serve hot.',
    ],
    tips: 'Day-old rice works best as it\'s drier. Add protein like chicken, shrimp, or tofu for a complete meal.',
  },
  {
    id: 5,
    title: 'Fruit Smoothie Bowl',
    icon: '🍌',
    category: 'fruits',
    time: '10 mins',
    difficulty: 'Easy',
    description: 'Blend overripe fruits into a delicious and healthy smoothie bowl.',
    ingredients: [
      '2 overripe bananas, frozen',
      '1 cup mixed berries (frozen)',
      '1/2 cup yogurt',
      '1/4 cup milk or juice',
      'Toppings: granola, nuts, fresh fruit, chia seeds',
    ],
    instructions: [
      'Blend frozen bananas, berries, yogurt, and milk until smooth and thick.',
      'Pour into a bowl.',
      'Top with granola, nuts, fresh fruit, and chia seeds.',
      'Enjoy immediately with a spoon.',
    ],
    tips: 'Freeze overripe bananas in advance. Use any combination of fruits you have on hand.',
  },
  {
    id: 6,
    title: 'French Toast',
    icon: '🍞',
    category: 'bread',
    time: '15 mins',
    difficulty: 'Easy',
    description: 'Classic breakfast using stale bread.',
    ingredients: [
      '4 slices stale bread',
      '2 eggs',
      '1/4 cup milk',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon',
      'Butter for cooking',
      'Maple syrup and berries to serve',
    ],
    instructions: [
      'Whisk together eggs, milk, vanilla, and cinnamon.',
      'Heat butter in a pan over medium heat.',
      'Dip bread slices in egg mixture, coating both sides.',
      'Cook for 2-3 minutes per side until golden brown.',
      'Serve hot with maple syrup and fresh berries.',
    ],
    tips: 'Stale bread absorbs the egg mixture better than fresh bread. Add a pinch of nutmeg for extra flavor.',
  },
  {
    id: 7,
    title: 'Paneer from Sour Milk',
    icon: '🧀',
    category: 'dairy',
    time: '30 mins',
    difficulty: 'Medium',
    description: 'Turn sour milk into fresh paneer (Indian cottage cheese).',
    ingredients: [
      '4 cups milk (slightly sour)',
      '2 tbsp lemon juice or vinegar',
      'Cheesecloth',
      'Salt (optional)',
    ],
    instructions: [
      'Heat milk in a heavy-bottomed pan until it comes to a boil.',
      'Add lemon juice and stir gently. Milk will curdle.',
      'Once separated, turn off heat.',
      'Strain through cheesecloth over a bowl.',
      'Rinse curds with cold water to remove sourness.',
      'Gather cheesecloth and squeeze out excess water.',
      'Place under a weight for 15-20 minutes to set.',
      'Cut into cubes and use in curries or fry as snacks.',
    ],
    tips: 'The whey (liquid) can be used in bread making or for plants. Fresh paneer can be refrigerated for 2-3 days.',
  },
  {
    id: 8,
    title: 'Vegetable Soup',
    icon: '🥣',
    category: 'vegetables',
    time: '40 mins',
    difficulty: 'Easy',
    description: 'A hearty soup using any vegetables you have on hand.',
    ingredients: [
      'Assorted vegetables (carrots, celery, potatoes, etc.)',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '6 cups vegetable broth',
      '2 tbsp oil',
      'Herbs (thyme, bay leaf)',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Heat oil in a large pot. Sauté onion and garlic until soft.',
      'Add harder vegetables first. Cook for 5 minutes.',
      'Add broth and herbs. Bring to a boil.',
      'Reduce heat and simmer for 20-25 minutes.',
      'Add softer vegetables. Cook for 10 more minutes.',
      'Season with salt and pepper.',
      'Serve hot with bread.',
    ],
    tips: 'Save vegetable scraps in the freezer to make homemade broth. Blend for a creamy soup.',
  },
  {
    id: 9,
    title: 'Banana Bread',
    icon: '🍌',
    category: 'fruits',
    time: '60 mins',
    difficulty: 'Medium',
    description: 'Sweet bread using overripe bananas.',
    ingredients: [
      '3 overripe bananas, mashed',
      '1/3 cup melted butter',
      '3/4 cup sugar',
      '1 egg, beaten',
      '1 tsp vanilla',
      '1 tsp baking soda',
      'Pinch of salt',
      '1.5 cups flour',
      'Optional: chocolate chips, nuts',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C). Grease a loaf pan.',
      'Mix mashed bananas with melted butter.',
      'Stir in sugar, egg, and vanilla.',
      'Sprinkle baking soda and salt over mixture. Mix well.',
      'Add flour and mix until just combined.',
      'Fold in chocolate chips or nuts if using.',
      'Pour into loaf pan.',
      'Bake for 50-60 minutes until toothpick comes out clean.',
      'Cool before slicing.',
    ],
    tips: 'The blacker the bananas, the sweeter the bread. Freeze overripe bananas for later use.',
  },
  {
    id: 10,
    title: 'Croutons',
    icon: '🍞',
    category: 'bread',
    time: '20 mins',
    difficulty: 'Easy',
    description: 'Crispy croutons from stale bread for salads and soups.',
    ingredients: [
      'Stale bread, cubed',
      '3 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tsp dried herbs (oregano, basil)',
      'Salt and pepper',
      'Grated parmesan (optional)',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Toss bread cubes with olive oil, garlic, herbs, salt, and pepper.',
      'Spread in a single layer on a baking sheet.',
      'Bake for 10-15 minutes, stirring halfway, until golden and crispy.',
      'Sprinkle with parmesan if using.',
      'Cool and store in an airtight container.',
    ],
    tips: 'Store croutons in an airtight container for up to a week. Great for salads, soups, or snacking.',
  },
];

// State
let currentCategory = 'all';
let currentSearch = '';

/**
 * Initialize page
 */
document.addEventListener('DOMContentLoaded', () => {
  displayRecipes();
  initializeEventListeners();
});

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
  // Search
  const searchInput = document.getElementById('recipeSearch');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Category filters
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', handleCategoryClick);
  });
}

/**
 * Handle search input
 */
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase();
  displayRecipes();
}

/**
 * Handle category filter click
 */
function handleCategoryClick(e) {
  currentCategory = e.target.dataset.category;

  // Update active state
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('active');
  });
  e.target.classList.add('active');

  displayRecipes();
}

/**
 * Display filtered recipes
 */
function displayRecipes() {
  const container = document.getElementById('recipesGrid');
  if (!container) return;

  // Filter recipes
  let filtered = recipes;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(recipe => recipe.category === currentCategory);
  }

  if (currentSearch) {
    filtered = filtered.filter(recipe =>
      recipe.title.toLowerCase().includes(currentSearch) ||
      recipe.description.toLowerCase().includes(currentSearch) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(currentSearch))
    );
  }

  // Display results
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-recipes">
        <i class="fa fa-search"></i>
        <h3>No recipes found</h3>
        <p class="muted">Try adjusting your search or filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(recipe => createRecipeCard(recipe)).join('');

  // Add click listeners to each card
  filtered.forEach(recipe => {
    const card = document.querySelector(`[data-recipe-id="${recipe.id}"]`);
    if (card) {
      card.addEventListener('click', () => {
        console.log('Clicked recipe:', recipe.title); // Debug log
        showRecipeModal(recipe.id);
      });
      
      // Add hover effect
      card.style.cursor = 'pointer';
    }
  });
}

/**
 * Create recipe card HTML
 */
function createRecipeCard(recipe) {
  return `
    <article class="recipe-card" data-recipe-id="${recipe.id}">
      <div class="recipe-image">
        <span style="font-size: 4rem;">${recipe.icon}</span>
      </div>
      <div class="recipe-content">
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-meta">
          <div class="recipe-meta-item">
            <i class="fa fa-clock"></i>
            <span>${recipe.time}</span>
          </div>
          <div class="recipe-meta-item">
            <i class="fa fa-signal"></i>
            <span>${recipe.difficulty}</span>
          </div>
        </div>
        <div class="recipe-tags">
          <span class="recipe-tag">${recipe.category}</span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Show recipe modal
 */
function showRecipeModal(recipeId) {
  console.log('Opening modal for recipe ID:', recipeId); // Debug log
  
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) {
    console.error('Recipe not found:', recipeId);
    return;
  }

  const modal = document.getElementById('recipeModal');
  const modalBody = document.getElementById('recipeModalBody');

  if (!modal || !modalBody) {
    console.error('Modal elements not found');
    return;
  }

  modalBody.innerHTML = `
    <div class="modal-recipe-header">
      <div class="modal-recipe-icon">${recipe.icon}</div>
      <h2 class="modal-recipe-title" id="recipeModalTitle">${recipe.title}</h2>
      <div class="recipe-meta">
        <div class="recipe-meta-item">
          <i class="fa fa-clock"></i>
          <span>${recipe.time}</span>
        </div>
        <div class="recipe-meta-item">
          <i class="fa fa-signal"></i>
          <span>${recipe.difficulty}</span>
        </div>
      </div>
    </div>
    <div class="modal-recipe-body">
      <div class="recipe-section">
        <h3><i class="fa fa-shopping-basket"></i> Ingredients</h3>
        <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
      <div class="recipe-section">
        <h3><i class="fa fa-list-ol"></i> Instructions</h3>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
      <div class="recipe-tips">
        <h4><i class="fa fa-lightbulb"></i> Tips</h4>
        <p>${recipe.tips}</p>
      </div>
    </div>
  `;

  // Show modal
  modal.hidden = false;
  modal.style.display = 'flex';
  
  console.log('Modal displayed'); // Debug log

  // Set focus to modal for accessibility
  setTimeout(() => {
    modal.focus();
  }, 100);

  // Setup close button
  setupModalClose(modal);
}

/**
 * Setup modal close handlers
 */
function setupModalClose(modal) {
  // Close button handler
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    // Remove old listeners by cloning
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    // Add new listener
    newCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeRecipeModal();
    });
  }

  // Close on background click
  const handleBackgroundClick = (e) => {
    if (e.target === modal) {
      closeRecipeModal();
      modal.removeEventListener('click', handleBackgroundClick);
    }
  };
  modal.addEventListener('click', handleBackgroundClick);

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeRecipeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

/**
 * Close recipe modal
 */
function closeRecipeModal() {
  console.log('Closing modal'); // Debug log
  
  const modal = document.getElementById('recipeModal');
  if (modal) {
    modal.hidden = true;
    modal.style.display = 'none';
  }
}