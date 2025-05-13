// predefinedDishes.js - Database of predefined menu items
// This file contains the predefined dishes database that can be imported into other components

const predefinedDishes = [
  {
    category: "Starters",
    items: [
      {
        name: "Bruschetta",
        description: "toasted bread topped with diced tomatoes, fresh basil, garlic and olive oil",
        price: 9,
        vegetarian: true,
        tags: ["italian", "appetizer", "tomato"],
        variants: [
          { name: "Classic", price: 9 },
          { name: "With Mozzarella", price: 11 }
        ],
        addOns: [
          { name: "Extra Basil", price: 1 },
          { name: "Balsamic Glaze", price: 1.5 }
        ]
      },
      {
        name: "Spring Rolls",
        description: "crispy rolls filled with vegetables and served with sweet chili sauce",
        price: 8,
        vegetarian: true,
        tags: ["asian", "appetizer", "crispy"],
        variants: [
          { name: "Vegetable", price: 8 },
          { name: "Chicken", price: 9 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 1 }
        ]
      },
      {
        name: "Samosa",
        description: "crispy triangular pastry filled with spiced potatoes and peas",
        price: 7,
        vegetarian: true,
        tags: ["indian", "appetizer", "spicy"],
        variants: [
          { name: "Vegetable", price: 7 },
          { name: "Paneer", price: 8 },
          { name: "Keema", price: 9 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Tamarind Chutney", price: 1 }
        ]
      },
      {
        name: "Paneer Tikka",
        description: "cubes of cottage cheese marinated in spices and grilled in tandoor",
        price: 12,
        vegetarian: true,
        tags: ["indian", "appetizer", "tandoor"],
        variants: [
          { name: "Classic", price: 12 },
          { name: "Hariyali (Green Herbs)", price: 13 },
          { name: "Achari (Pickled Spices)", price: 13 }
        ],
        addOns: [
          { name: "Extra Paneer", price: 3 },
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Pani Puri",
        description: "hollow crispy puris filled with spicy tangy water, potatoes, and chickpeas",
        price: 8,
        vegetarian: true,
        tags: ["indian", "chaat", "street food"],
        variants: [
          { name: "Classic", price: 8 },
          { name: "Ragda (with Yellow Peas)", price: 9 }
        ],
        addOns: [
          { name: "Extra Puri", price: 2 },
          { name: "Sweet Chutney", price: 1 }
        ]
      },
      {
        name: "Papdi Chaat",
        description: "crispy flour crackers topped with potatoes, chickpeas, yogurt and chutneys",
        price: 9,
        vegetarian: true,
        tags: ["indian", "chaat", "street food"],
        variants: [
          { name: "Regular", price: 9 },
          { name: "Dahi Papdi", price: 10 }
        ],
        addOns: [
          { name: "Extra Yogurt", price: 1 },
          { name: "Pomegranate", price: 1.5 }
        ]
      },
      {
        name: "Chicken 65",
        description: "spicy deep-fried chicken pieces marinated in aromatic spices",
        price: 12,
        vegetarian: false,
        tags: ["indian", "appetizer", "spicy"],
        variants: [
          { name: "Classic", price: 12 },
          { name: "Extra Spicy", price: 12.5 }
        ],
        addOns: [
          { name: "Onion Rings", price: 1 },
          { name: "Lemon Wedges", price: 0.5 }
        ]
      }
    ]
  },
  {
    category: "Main Course",
    items: [
      {
        name: "Margherita Pizza",
        description: "classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 15,
        vegetarian: true,
        tags: ["italian", "pizza", "classic"],
        variants: [
          { name: "Small", price: 15 },
          { name: "Medium", price: 19 },
          { name: "Large", price: 23 }
        ],
        addOns: [
          { name: "Extra Cheese", price: 2 },
          { name: "Mushrooms", price: 1.5 },
          { name: "Olives", price: 1.5 }
        ]
      },
      {
        name: "Beef Burger",
        description: "juicy beef patty with lettuce, tomato, cheese and special sauce in a brioche bun",
        price: 17,
        vegetarian: false,
        tags: ["american", "burger", "beef"],
        variants: [
          { name: "Classic", price: 17 },
          { name: "Double Patty", price: 20 },
          { name: "Cheese Lover's", price: 19 }
        ],
        addOns: [
          { name: "Bacon", price: 2 },
          { name: "Fried Egg", price: 1.5 },
          { name: "Avocado", price: 2.5 }
        ]
      },
      {
        name: "Butter Chicken",
        description: "tender chicken cooked in a rich, creamy tomato sauce with butter and spices",
        price: 16,
        vegetarian: false,
        tags: ["indian", "curry", "creamy"],
        variants: [
          { name: "Regular", price: 16 },
          { name: "Boneless", price: 18 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Chicken", price: 4 }
        ]
      },
      {
        name: "Chicken Tikka Masala",
        description: "grilled chicken pieces in a spiced creamy tomato sauce",
        price: 17,
        vegetarian: false,
        tags: ["indian", "curry", "tandoor"],
        variants: [
          { name: "Regular", price: 17 },
          { name: "Extra Spicy", price: 17.5 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Chicken", price: 4 }
        ]
      },
      {
        name: "Paneer Butter Masala",
        description: "cottage cheese cubes in a rich, creamy tomato gravy",
        price: 15,
        vegetarian: true,
        tags: ["indian", "curry", "creamy"],
        variants: [
          { name: "Regular", price: 15 },
          { name: "Kadai Style", price: 16 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Paneer", price: 3 }
        ]
      },
      {
        name: "Palak Paneer",
        description: "cottage cheese cubes in a creamy spinach gravy",
        price: 15,
        vegetarian: true,
        tags: ["indian", "curry", "healthy"],
        variants: [
          { name: "Regular", price: 15 },
          { name: "With Corn", price: 16 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Paneer", price: 3 }
        ]
      },
      {
        name: "Dal Makhani",
        description: "black lentils and kidney beans slow-cooked with butter and cream",
        price: 13,
        vegetarian: true,
        tags: ["indian", "lentils", "creamy"],
        variants: [
          { name: "Regular", price: 13 },
          { name: "Tadka Special", price: 14 }
        ],
        addOns: [
          { name: "Extra Butter", price: 1 },
          { name: "Extra Cream", price: 1 }
        ]
      },
      {
        name: "Chana Masala",
        description: "spiced chickpeas cooked in a tangy tomato gravy",
        price: 12,
        vegetarian: true,
        tags: ["indian", "curry", "protein"],
        variants: [
          { name: "Regular", price: 12 },
          { name: "Amritsari Style", price: 13 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 2 },
          { name: "Lemon Wedges", price: 0.5 }
        ]
      },
      {
        name: "Vegetable Biryani",
        description: "fragrant basmati rice cooked with mixed vegetables and aromatic spices",
        price: 14,
        vegetarian: true,
        tags: ["indian", "rice", "aromatic"],
        variants: [
          { name: "Regular", price: 14 },
          { name: "Hyderabadi Style", price: 15 }
        ],
        addOns: [
          { name: "Raita", price: 2 },
          { name: "Salan Gravy", price: 2.5 }
        ]
      },
      {
        name: "Chicken Biryani",
        description: "fragrant basmati rice cooked with chicken and aromatic spices",
        price: 16,
        vegetarian: false,
        tags: ["indian", "rice", "aromatic"],
        variants: [
          { name: "Regular", price: 16 },
          { name: "Hyderabadi Style", price: 17 },
          { name: "Lucknowi Style", price: 17 }
        ],
        addOns: [
          { name: "Raita", price: 2 },
          { name: "Salan Gravy", price: 2.5 },
          { name: "Extra Chicken", price: 4 }
        ]
      },
      {
        name: "Mutton Biryani",
        description: "fragrant basmati rice cooked with tender mutton and aromatic spices",
        price: 18,
        vegetarian: false,
        tags: ["indian", "rice", "aromatic"],
        variants: [
          { name: "Regular", price: 18 },
          { name: "Hyderabadi Style", price: 19 },
          { name: "Kolkata Style", price: 19 }
        ],
        addOns: [
          { name: "Raita", price: 2 },
          { name: "Salan Gravy", price: 2.5 },
          { name: "Extra Mutton", price: 5 }
        ]
      },
      {
        name: "Malai Kofta",
        description: "deep-fried potato and paneer dumplings in a rich, creamy gravy",
        price: 14,
        vegetarian: true,
        tags: ["indian", "curry", "creamy"],
        variants: [
          { name: "Regular", price: 14 },
          { name: "Stuffed Kofta", price: 15 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Kofta", price: 3 }
        ]
      },
      {
        name: "Fish Curry",
        description: "fish pieces cooked in a tangy and spicy gravy",
        price: 17,
        vegetarian: false,
        tags: ["indian", "seafood", "spicy"],
        variants: [
          { name: "Bengali Style", price: 17 },
          { name: "Goan Style", price: 18 },
          { name: "Kerala Style", price: 18 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Fish", price: 5 }
        ]
      },
      {
        name: "Prawn Curry",
        description: "prawns cooked in a coconut-based spicy gravy",
        price: 19,
        vegetarian: false,
        tags: ["indian", "seafood", "spicy"],
        variants: [
          { name: "Goan Style", price: 19 },
          { name: "Kerala Style", price: 19 },
          { name: "Malvani Style", price: 20 }
        ],
        addOns: [
          { name: "Extra Gravy", price: 3 },
          { name: "Extra Prawns", price: 6 }
        ]
      }
    ]
  },
  {
    category: "Breads & Sides",
    items: [
      {
        name: "Naan",
        description: "soft leavened flatbread baked in tandoor oven",
        price: 3,
        vegetarian: true,
        tags: ["indian", "bread", "tandoor"],
        variants: [
          { name: "Plain", price: 3 },
          { name: "Butter", price: 3.5 },
          { name: "Garlic", price: 4 },
          { name: "Cheese", price: 5 }
        ],
        addOns: [
          { name: "Butter Brush", price: 0.5 }
        ]
      },
      {
        name: "Roti",
        description: "whole wheat flatbread cooked in tandoor",
        price: 2.5,
        vegetarian: true,
        tags: ["indian", "bread", "healthy"],
        variants: [
          { name: "Plain", price: 2.5 },
          { name: "Butter", price: 3 }
        ],
        addOns: [
          { name: "Butter Brush", price: 0.5 }
        ]
      },
      {
        name: "Paratha",
        description: "layered whole wheat flatbread cooked with ghee",
        price: 3.5,
        vegetarian: true,
        tags: ["indian", "bread", "layered"],
        variants: [
          { name: "Plain", price: 3.5 },
          { name: "Aloo (Potato)", price: 5 },
          { name: "Paneer", price: 5.5 },
          { name: "Gobi (Cauliflower)", price: 5 }
        ],
        addOns: [
          { name: "Extra Butter", price: 0.5 },
          { name: "Pickle", price: 1 }
        ]
      },
      {
        name: "Kulcha",
        description: "soft leavened flatbread stuffed with various fillings",
        price: 4,
        vegetarian: true,
        tags: ["indian", "bread", "stuffed"],
        variants: [
          { name: "Plain", price: 4 },
          { name: "Aloo (Potato)", price: 5 },
          { name: "Paneer", price: 5.5 },
          { name: "Onion", price: 4.5 }
        ],
        addOns: [
          { name: "Butter Brush", price: 0.5 },
          { name: "Amritsari Chole", price: 3 }
        ]
      },
      {
        name: "Bhatura",
        description: "deep-fried leavened bread, puffy and soft",
        price: 4,
        vegetarian: true,
        tags: ["indian", "bread", "fried"],
        variants: [
          { name: "Regular", price: 4 },
          { name: "Stuffed", price: 5 }
        ],
        addOns: [
          { name: "Chole", price: 3 },
          { name: "Pickle", price: 1 }
        ]
      },
      {
        name: "Jeera Rice",
        description: "basmati rice tempered with cumin seeds",
        price: 7,
        vegetarian: true,
        tags: ["indian", "rice", "simple"],
        variants: [
          { name: "Regular", price: 7 },
          { name: "Ghee Rice", price: 8 }
        ],
        addOns: [
          { name: "Extra Ghee", price: 1 }
        ]
      },
      {
        name: "Raita",
        description: "yogurt mixed with vegetables and mild spices",
        price: 5,
        vegetarian: true,
        tags: ["indian", "side", "cooling"],
        variants: [
          { name: "Boondi", price: 5 },
          { name: "Cucumber", price: 5 },
          { name: "Mixed Vegetable", price: 5.5 },
          { name: "Pineapple", price: 6 }
        ],
        addOns: [
          { name: "Extra Yogurt", price: 1 },
          { name: "Fresh Herbs", price: 0.5 }
        ]
      },
      {
        name: "Papadum",
        description: "thin, crisp, disc-shaped food made from seasoned dough",
        price: 3,
        vegetarian: true,
        tags: ["indian", "crispy", "appetizer"],
        variants: [
          { name: "Plain", price: 3 },
          { name: "Masala", price: 3.5 },
          { name: "Roasted", price: 3 },
          { name: "Fried", price: 3 }
        ],
        addOns: [
          { name: "Mango Chutney", price: 1 },
          { name: "Mint Chutney", price: 1 }
        ]
      }
    ]
  },
  {
    category: "South Indian Specialties",
    items: [
      {
        name: "Masala Dosa",
        description: "crispy rice crepe filled with spiced potato filling",
        price: 11,
        vegetarian: true,
        tags: ["south indian", "breakfast", "crispy"],
        variants: [
          { name: "Regular", price: 11 },
          { name: "Paper Dosa", price: 12 },
          { name: "Mysore Masala", price: 12.5 },
          { name: "Rava Dosa", price: 12 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Idli",
        description: "steamed rice cakes served with sambar and chutney",
        price: 8,
        vegetarian: true,
        tags: ["south indian", "breakfast", "steamed"],
        variants: [
          { name: "Plain (4 pcs)", price: 8 },
          { name: "Rava Idli (4 pcs)", price: 9 },
          { name: "Mini Idli Sambar (10 pcs)", price: 10 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Vada",
        description: "savory donut-shaped fritter made from lentil batter",
        price: 7,
        vegetarian: true,
        tags: ["south indian", "breakfast", "fried"],
        variants: [
          { name: "Plain (2 pcs)", price: 7 },
          { name: "Medu Vada (2 pcs)", price: 7 },
          { name: "Sambar Vada (2 pcs)", price: 8 },
          { name: "Dahi Vada (2 pcs)", price: 8 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Uttapam",
        description: "thick pancake topped with vegetables, similar to pizza",
        price: 10,
        vegetarian: true,
        tags: ["south indian", "breakfast", "savory"],
        variants: [
          { name: "Plain", price: 10 },
          { name: "Onion", price: 11 },
          { name: "Mixed Vegetable", price: 12 },
          { name: "Tomato", price: 11 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Pongal",
        description: "savory rice and lentil porridge seasoned with pepper, cumin and ghee",
        price: 9,
        vegetarian: true,
        tags: ["south indian", "breakfast", "comfort food"],
        variants: [
          { name: "Ven Pongal", price: 9 },
          { name: "Khara Pongal", price: 9.5 }
        ],
        addOns: [
          { name: "Extra Ghee", price: 1 },
          { name: "Coconut Chutney", price: 1.5 }
        ]
      }
    ]
  },
  {
    category: "Indo-Chinese",
    items: [
      {
        name: "Veg Manchurian",
        description: "vegetable balls in a spicy, sweet and tangy sauce",
        price: 13,
        vegetarian: true,
        tags: ["indo-chinese", "fusion", "spicy"],
        variants: [
          { name: "Dry", price: 13 },
          { name: "With Gravy", price: 14 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 2 },
          { name: "Extra Vegetables", price: 2 }
        ]
      },
      {
        name: "Chilli Paneer",
        description: "cottage cheese cubes tossed in spicy chilli sauce with onions and bell peppers",
        price: 14,
        vegetarian: true,
        tags: ["indo-chinese", "fusion", "spicy"],
        variants: [
          { name: "Dry", price: 14 },
          { name: "With Gravy", price: 15 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 2 },
          { name: "Extra Paneer", price: 3 }
        ]
      },
      {
        name: "Hakka Noodles",
        description: "stir-fried noodles with vegetables in Indo-Chinese style",
        price: 12,
        vegetarian: true,
        tags: ["indo-chinese", "noodles", "stir-fried"],
        variants: [
          { name: "Vegetable", price: 12 },
          { name: "Chicken", price: 14 },
          { name: "Egg", price: 13 }
        ],
        addOns: [
          { name: "Extra Vegetables", price: 2 },
          { name: "Extra Chilli", price: 0.5 }
        ]
      },
      {
        name: "Fried Rice",
        description: "stir-fried rice with vegetables in Indo-Chinese style",
        price: 12,
        vegetarian: true,
        tags: ["indo-chinese", "rice", "stir-fried"],
        variants: [
          { name: "Vegetable", price: 12 },
          { name: "Chicken", price: 14 },
          { name: "Egg", price: 13 }
        ],
        addOns: [
          { name: "Extra Vegetables", price: 2 },
          { name: "Extra Chilli", price: 0.5 }
        ]
      }
    ]
  },
  {
    category: "Thali",
    items: [
      {
        name: "Veg Thali",
        description: "complete Indian meal with rice, breads, curries, dal, raita, dessert and papadum",
        price: 18,
        vegetarian: true,
        tags: ["indian", "complete meal", "traditional"],
        variants: [
          { name: "Regular", price: 18 },
          { name: "Deluxe", price: 22 },
          { name: "Punjabi Special", price: 24 }
        ],
        addOns: [
          { name: "Extra Sweet", price: 3 },
          { name: "Extra Bread", price: 2 }
        ]
      },
      {
        name: "Non-Veg Thali",
        description: "complete Indian meal with rice, breads, chicken/mutton curry, dal, raita, dessert and papadum",
        price: 22,
        vegetarian: false,
        tags: ["indian", "complete meal", "traditional"],
        variants: [
          { name: "Chicken", price: 22 },
          { name: "Mutton", price: 25 },
          { name: "Mixed", price: 26 }
        ],
        addOns: [
          { name: "Extra Sweet", price: 3 },
          { name: "Extra Bread", price: 2 }
        ]
      },
      {
        name: "South Indian Thali",
        description: "complete South Indian meal with rice, sambhar, rasam, vegetables, buttermilk and dessert",
        price: 20,
        vegetarian: true,
        tags: ["south indian", "complete meal", "traditional"],
        variants: [
          { name: "Regular", price: 20 },
          { name: "Deluxe", price: 24 }
        ],
        addOns: [
          { name: "Extra Payasam", price: 3 },
          { name: "Extra Pappadam", price: 1 }
        ]
      }
    ]
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Tiramisu",
        description: "coffee-flavored italian dessert made of ladyfingers dipped in coffee with mascarpone cheese",
        price: 9,
        vegetarian: true,
        tags: ["italian", "coffee", "sweet"],
        variants: [
          { name: "Classic", price: 9 },
          { name: "Chocolate", price: 10 }
        ],
        addOns: [
          { name: "Extra Cocoa", price: 0.5 },
          { name: "Whipped Cream", price: 1 }
        ]
      },
      {
        name: "Chocolate Lava Cake",
        description: "warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
        price: 10,
        vegetarian: true,
        tags: ["chocolate", "hot", "sweet"],
        variants: [
          { name: "Single", price: 10 },
          { name: "Double", price: 18 }
        ],
        addOns: [
          { name: "Extra Ice Cream", price: 2 },
          { name: "Berries", price: 2.5 }
        ]
      },
      {
        name: "Gulab Jamun",
        description: "deep-fried milk solids soaked in sweet rose-flavored syrup",
        price: 7,
        vegetarian: true,
        tags: ["indian", "sweet", "warm"],
        variants: [
          { name: "Regular (2 pcs)", price: 7 },
          { name: "With Ice Cream", price: 9 }
        ],
        addOns: [
          { name: "Extra Piece", price: 2 },
          { name: "Rabri Topping", price: 3 }
        ]
      },
      {
        name: "Rasgulla",
        description: "soft spongy cottage cheese balls soaked in light sugar syrup",
        price: 7,
        vegetarian: true,
        tags: ["indian", "sweet", "bengali"],
        variants: [
          { name: "Regular (2 pcs)", price: 7 },
          { name: "Malai Rasgulla (2 pcs)", price: 8 }
        ],
        addOns: [
          { name: "Extra Piece", price: 2 },
          { name: "Saffron Garnish", price: 1 }
        ]
      },
      {
        name: "Rasmalai",
        description: "flattened cottage cheese patties soaked in sweetened, thickened milk with nuts",
        price: 8,
        vegetarian: true,
        tags: ["indian", "sweet", "creamy"],
        variants: [
          { name: "Regular (2 pcs)", price: 8 },
          { name: "Saffron Flavored (2 pcs)", price: 9 }
        ],
        addOns: [
          { name: "Extra Piece", price: 2.5 },
          { name: "Pistachio Garnish", price: 1 }
        ]
      },
      {
        name: "Kulfi",
        description: "traditional Indian ice cream made with thickened milk and flavored with nuts and cardamom",
        price: 7,
        vegetarian: true,
        tags: ["indian", "frozen", "creamy"],
        variants: [
          { name: "Malai", price: 7 },
          { name: "Pistachio", price: 8 },
          { name: "Mango", price: 8 }
        ],
        addOns: [
          { name: "Falooda", price: 2 },
          { name: "Rose Syrup", price: 1 }
        ]
      }
       ]
  },
      
  {
    category: "Kids Menu",
    items: [
      {
        name: "Mini Cheese Pizza",
        description: "small pizza with tomato sauce and cheese",
        price: 8,
        vegetarian: true,
        tags: ["kids", "pizza", "cheese"],
        variants: [
          { name: "Regular", price: 8 },
          { name: "With Chicken", price: 9 }
        ],
        addOns: [
          { name: "Extra Cheese", price: 1 }
        ]
      }
    ]
  }
];

export default predefinedDishes;