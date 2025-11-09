/**
 * Smart Food Saver - Recipes JavaScript
 * Handles recipe display and filtering with beautiful images
 */

// Recipe Database with Images
const recipes = [
  {
    id: 1,
    title: 'Bread Pudding',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1626256139204-8b4c568dd71b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWQlMjBwdWRkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
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
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZydWl0JTIwc21vb3RoaWUlMjBib3dsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
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
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80',
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
    image: 'https://media.istockphoto.com/id/2209167127/photo/indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-on-grey-background-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=PAn7GuHgdN5S4hlXW2lQcUV-OGegD5GuLyvKf-fsr4E=',
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
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&q=80',
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
  {
    id: 11,
    title: 'Potato Pancakes',
    icon: '🥔',
    image: 'https://media.istockphoto.com/id/1313535028/photo/potato-pancakes.webp?a=1&b=1&s=612x612&w=0&k=20&c=T7mtG3cYJrz5IfMVZolLWACPixQdfniElUDD1H_BcXU=',
    category: 'vegetables',
    time: '25 mins',
    difficulty: 'Easy',
    description: 'Crispy pancakes made from leftover mashed potatoes.',
    ingredients: [
      '2 cups leftover mashed potatoes',
      '1 egg, beaten',
      '1/4 cup flour',
      '2 green onions, chopped',
      'Salt and pepper to taste',
      'Oil for frying',
      'Sour cream and chives to serve',
    ],
    instructions: [
      'Mix mashed potatoes with egg, flour, and green onions.',
      'Season with salt and pepper.',
      'Heat oil in a pan over medium heat.',
      'Form mixture into patties and place in hot oil.',
      'Cook for 3-4 minutes per side until golden and crispy.',
      'Drain on paper towels.',
      'Serve hot with sour cream and chives.',
    ],
    tips: 'Add shredded cheese for extra flavor. Works great with sweet potatoes too!',
  },
  {
    id: 12,
    title: 'Rice Pudding',
    icon: '🍚',
    image: 'https://media.istockphoto.com/id/980089086/photo/rice-pudding-or-kheer-from-india-called-also-called-firnee-served-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=Rw_oIvR4K1lu_m81T5UlZ38YnrhbvNB3R4GCCKTU78M=',
    category: 'rice',
    time: '35 mins',
    difficulty: 'Easy',
    description: 'Creamy dessert made from leftover rice.',
    ingredients: [
      '2 cups cooked rice',
      '2 cups milk',
      '1/3 cup sugar',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon',
      'Pinch of salt',
      'Raisins (optional)',
      'Chopped nuts for garnish',
    ],
    instructions: [
      'Combine rice, milk, sugar, and salt in a saucepan.',
      'Bring to a boil, then reduce heat to low.',
      'Simmer for 25-30 minutes, stirring frequently, until thick and creamy.',
      'Stir in vanilla, cinnamon, and raisins if using.',
      'Serve warm or chilled, garnished with nuts.',
    ],
    tips: 'Use short-grain rice for creamier pudding. Add cardamom for an Indian twist.',
  },
  {
    id: 13,
    title: 'Apple Crumble',
    icon: '🍎',
    image: 'https://images.unsplash.com/photo-1511996946289-f0c071823341?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBwbGUlMjBjcnVtYmxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    category: 'fruits',
    time: '50 mins',
    difficulty: 'Easy',
    description: 'Warm dessert using bruised or soft apples.',
    ingredients: [
      '4-5 apples, peeled and sliced',
      '1/4 cup sugar',
      '1 tsp cinnamon',
      '3/4 cup flour',
      '1/2 cup brown sugar',
      '1/2 cup oats',
      '6 tbsp cold butter, cubed',
      'Pinch of salt',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C).',
      'Toss apples with sugar and cinnamon. Place in a baking dish.',
      'Mix flour, brown sugar, oats, and salt in a bowl.',
      'Cut in butter until mixture resembles coarse crumbs.',
      'Sprinkle crumble topping over apples.',
      'Bake for 40-45 minutes until golden and bubbly.',
      'Serve warm with vanilla ice cream.',
    ],
    tips: 'Mix different apple varieties for better flavor. Add a handful of berries for variation.',
  },
  {
    id: 14,
    title: 'Vegetable Fritters',
    icon: '🥕',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
    category: 'vegetables',
    time: '25 mins',
    difficulty: 'Easy',
    description: 'Crispy fritters using any leftover vegetables.',
    ingredients: [
      '2 cups grated or chopped vegetables',
      '1/2 cup flour',
      '1 egg',
      '2 tbsp milk',
      '1 tsp baking powder',
      '1 tsp cumin',
      'Salt and pepper',
      'Oil for frying',
      'Yogurt dip to serve',
    ],
    instructions: [
      'Squeeze excess moisture from grated vegetables.',
      'Mix vegetables with flour, egg, milk, baking powder, and spices.',
      'Heat oil in a pan over medium heat.',
      'Drop spoonfuls of batter into hot oil.',
      'Fry for 3-4 minutes per side until golden.',
      'Drain on paper towels.',
      'Serve hot with yogurt dip.',
    ],
    tips: 'Works great with zucchini, carrots, or corn. Add herbs like cilantro or parsley.',
  },
  {
    id: 15,
    title: 'Bread Crumb Coating',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
    category: 'bread',
    time: '15 mins',
    difficulty: 'Easy',
    description: 'Make breadcrumbs from stale bread for coating and toppings.',
    ingredients: [
      'Stale bread slices',
      '2 tbsp olive oil (optional)',
      'Dried herbs (optional)',
      'Garlic powder (optional)',
      'Salt and pepper',
    ],
    instructions: [
      'Preheat oven to 300°F (150°C).',
      'Tear bread into chunks and pulse in food processor until fine crumbs.',
      'Spread on a baking sheet.',
      'Toast for 10-12 minutes, stirring occasionally.',
      'For seasoned breadcrumbs: toss with oil, herbs, garlic powder, salt, and pepper.',
      'Store in an airtight container for up to a month.',
    ],
    tips: 'Use for coating chicken, fish, or topping casseroles. Freeze for longer storage.',
  },
  {
    id: 16,
    title: 'Yogurt Parfait',
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80',
    category: 'dairy',
    time: '10 mins',
    difficulty: 'Easy',
    description: 'Layer yogurt with fruits and granola for a healthy treat.',
    ingredients: [
      '2 cups yogurt (plain or vanilla)',
      'Overripe fruits, chopped',
      '1/2 cup granola',
      '2 tbsp honey',
      'Nuts and seeds',
      'Fresh mint for garnish',
    ],
    instructions: [
      'In glasses or bowls, layer yogurt at the bottom.',
      'Add a layer of chopped fruits.',
      'Sprinkle granola over fruits.',
      'Repeat layers.',
      'Drizzle with honey.',
      'Top with nuts, seeds, and mint.',
      'Serve immediately or chill for later.',
    ],
    tips: 'Use Greek yogurt for extra protein. Mix in a spoonful of jam for added sweetness.',
  },
  {
    id: 17,
    title: 'Mango Lassi',
    icon: '🥭',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80',
    category: 'fruits',
    time: '5 mins',
    difficulty: 'Easy',
    description: 'Refresh yourself with this Indian yogurt-based drink using overripe mangoes.',
    ingredients: [
      '1 cup overripe mango, chopped',
      '1 cup yogurt',
      '1/2 cup milk',
      '2 tbsp sugar (adjust to taste)',
      '1/4 tsp cardamom powder',
      'Ice cubes',
      'Saffron strands for garnish (optional)',
    ],
    instructions: [
      'Blend mango, yogurt, milk, sugar, and cardamom until smooth.',
      'Add ice cubes and blend again.',
      'Pour into glasses.',
      'Garnish with saffron strands if desired.',
      'Serve immediately.',
    ],
    tips: 'Adjust sweetness based on mango ripeness. Freeze for a smoothie-like consistency.',
  },
  {
    id: 18,
    title: 'Stuffed Bell Peppers',
    icon: '🫑',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&q=80',
    category: 'vegetables',
    time: '45 mins',
    difficulty: 'Medium',
    description: 'Use leftover rice and vegetables to create a hearty meal.',
    ingredients: [
      '4 bell peppers, tops cut off and seeded',
      '2 cups cooked rice',
      '1 cup mixed vegetables',
      '1 cup tomato sauce',
      '1 onion, diced',
      '2 cloves garlic, minced',
      '1 tsp Italian herbs',
      'Cheese for topping',
      'Salt and pepper',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Sauté onion and garlic in a pan.',
      'Add vegetables and cook for 3-4 minutes.',
      'Mix in rice, half the tomato sauce, herbs, salt, and pepper.',
      'Stuff bell peppers with rice mixture.',
      'Place in a baking dish. Pour remaining sauce around peppers.',
      'Top with cheese.',
      'Bake covered for 30 minutes, then uncovered for 10 minutes.',
      'Serve hot.',
    ],
    tips: 'Add ground meat or beans for extra protein. Use any color bell peppers you have.',
  },
  {
    id: 19,
    title: 'Cheese Sauce from Leftover Cheese',
    icon: '🧀',
    image: 'https://media.istockphoto.com/id/1003810138/photo/salsa-cheese-dip.webp?a=1&b=1&s=612x612&w=0&k=20&c=rSuJ3OhU_9DOfhjEZJGNJNz4b4ieng8vHBGFofRT9qk=',
    category: 'dairy',
    time: '15 mins',
    difficulty: 'Easy',
    description: 'Transform cheese scraps into a creamy sauce for pasta or vegetables.',
    ingredients: [
      '1 cup mixed leftover cheese, grated',
      '2 tbsp butter',
      '2 tbsp flour',
      '1.5 cups milk',
      '1/4 tsp mustard powder',
      'Salt and pepper',
      'Pinch of nutmeg',
    ],
    instructions: [
      'Melt butter in a saucepan over medium heat.',
      'Stir in flour and cook for 1 minute.',
      'Gradually whisk in milk until smooth.',
      'Cook, stirring constantly, until thickened.',
      'Remove from heat and stir in cheese until melted.',
      'Add mustard powder, salt, pepper, and nutmeg.',
      'Use immediately over pasta, vegetables, or baked potatoes.',
    ],
    tips: 'Mix different cheese types for complex flavor. Add a splash of wine for extra depth.',
  },
  {
    id: 20,
    title: 'Berry Compote',
    icon: '🍓',
    image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&q=80',
    category: 'fruits',
    time: '20 mins',
    difficulty: 'Easy',
    description: 'Save overripe berries by making a delicious compote.',
    ingredients: [
      '2 cups mixed berries (fresh or frozen)',
      '1/4 cup sugar',
      '2 tbsp lemon juice',
      '1 tsp vanilla extract',
      '1 tbsp cornstarch (optional, for thicker sauce)',
      'Pinch of cinnamon',
    ],
    instructions: [
      'Combine berries, sugar, and lemon juice in a saucepan.',
      'Bring to a simmer over medium heat.',
      'Cook for 10-15 minutes, stirring occasionally, until berries break down.',
      'If using cornstarch, mix with 2 tbsp water and stir in.',
      'Add vanilla and cinnamon.',
      'Cool and store in refrigerator for up to a week.',
      'Serve over pancakes, ice cream, or yogurt.',
    ],
    tips: 'Use as a filling for pastries or swirl into cheesecake. Freeze for longer storage.',
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
  currentSearch = e.target.value.toLowerCase().trim();
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
    filtered = filtered.filter(recipe => {
      const searchTerm = currentSearch;
      
      if (recipe.title.toLowerCase().includes(searchTerm)) return true;
      if (recipe.description.toLowerCase().includes(searchTerm)) return true;
      
      const ingredientMatch = recipe.ingredients.some(ingredient => {
        const ingredientLower = ingredient.toLowerCase();
        if (ingredientLower.includes(searchTerm)) return true;
        
        const searchWords = searchTerm.split(/\s+/);
        const ingredientWords = ingredientLower.split(/\s+/);
        
        return searchWords.some(searchWord => 
          ingredientWords.some(ingredientWord => 
            ingredientWord.includes(searchWord) || searchWord.includes(ingredientWord)
          )
        );
      });
      
      if (ingredientMatch) return true;
      
      const instructionMatch = recipe.instructions.some(instruction => 
        instruction.toLowerCase().includes(searchTerm)
      );
      
      if (instructionMatch) return true;
      if (recipe.category.toLowerCase().includes(searchTerm)) return true;
      
      return false;
    });
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

  // Add click listeners
  container.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const recipeId = parseInt(card.dataset.id);
      showRecipeModal(recipeId);
    });
  });
}

/**
 * Create recipe card HTML with beautiful images
 */
function createRecipeCard(recipe) {
  return `
    <article class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-image">
        <img src="${recipe.image}" 
             alt="${recipe.title}" 
             loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <span class="recipe-icon-fallback" style="display: none;">${recipe.icon}</span>
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
 * Show recipe modal - FIXED VERSION
 */
function showRecipeModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const modal = document.getElementById('recipeModal');
  const modalBody = document.getElementById('recipeModalBody');

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-recipe-header">
      <div class="modal-recipe-image" style="width: 100%; height: 300px; overflow: hidden; border-radius: 12px; margin-bottom: 1.5rem;">
        <img src="${recipe.image}" 
             alt="${recipe.title}"
             style="width: 100%; height: 100%; object-fit: cover;"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div class="modal-recipe-icon" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary), var(--secondary));">
          <span style="font-size: 6rem;">${recipe.icon}</span>
        </div>
      </div>
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

  // CRITICAL FIX: Remove ALL hidden attributes and inline styles
  modal.removeAttribute('hidden');
  modal.style.display = 'flex';
  
  // Set focus to modal for accessibility
  setTimeout(() => {
    modal.focus();
  }, 100);

  // Close button handler
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    newCloseBtn.addEventListener('click', closeRecipeModal);
  }

  // Close on background click
  const handleBackgroundClick = (e) => {
    if (e.target === modal) {
      closeRecipeModal();
      modal.removeEventListener('click', handleBackgroundClick);
    }
  };
  modal.addEventListener('click', handleBackgroundClick);

  // Close on escape
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeRecipeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

/**
 * Close recipe modal - FIXED VERSION
 */
function closeRecipeModal() {
  const modal = document.getElementById('recipeModal');
  if (modal) {
    // CRITICAL FIX: Add both hidden attribute AND inline style
    modal.setAttribute('hidden', '');
    modal.style.display = 'none';
  }
}