const predefinedDishes = [
  {
    category: "Starters",
    items: [
      {
        name: "Bruschetta",
        description: "toasted bread topped with diced tomatoes, fresh basil, garlic and olive oil",
        price: 9,
        vegetarian: true,
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
        tags: ["tandoor"],
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
        tags: ["street food"],
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
        tags: ["street food"],
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
        tags: ["spicy"],
        variants: [
          { name: "Classic", price: 12 },
          { name: "Extra Spicy", price: 12.5 }
        ],
        addOns: [
          { name: "Onion Rings", price: 1 },
          { name: "Lemon Wedges", price: 0.5 }
        ]
      },
      {
        name: "Onion Bhaji",
        description: "crispy spiced onion fritters made with chickpea flour",
        price: 7,
        vegetarian: true,
        tags: ["crispy", "classic"],
        variants: [
          { name: "Regular", price: 7 },
          { name: "Mixed Vegetable", price: 8 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Tamarind Chutney", price: 1 }
        ]
      },
      {
        name: "Tandoori Chicken",
        description: "chicken marinated in yogurt and spices, cooked in clay oven",
        price: 14,
        vegetarian: false,
        tags: ["tandoor", "popular"],
        variants: [
          { name: "Half", price: 14 },
          { name: "Full", price: 26 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Sliced Onions", price: 1 }
        ]
      },
      {
        name: "Seekh Kebab",
        description: "minced meat skewers with herbs and spices, grilled in tandoor",
        price: 13,
        vegetarian: false,
        variants: [
          { name: "Lamb", price: 13 },
          { name: "Chicken", price: 12 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Onion Salad", price: 1.5 }
        ]
      },
      {
        name: "Aloo Tikki",
        description: "spiced potato patties served with chutneys",
        price: 7,
        vegetarian: true,
        tags: ["street food"],
        variants: [
          { name: "Plain", price: 7 },
          { name: "Tikki Chaat", price: 9 }
        ],
        addOns: [
          { name: "Yogurt", price: 1 },
          { name: "Chopped Onions", price: 0.5 }
        ]
      },
      {
        name: "Dahi Vada",
        description: "lentil dumplings soaked in yogurt topped with spices and chutneys",
        price: 8,
        vegetarian: true,
        variants: [
          { name: "Classic", price: 8 },
          { name: "With Extra Yogurt", price: 9 }
        ],
        addOns: [
          { name: "Sweet Chutney", price: 1 },
          { name: "Pomegranate", price: 1.5 }
        ]
      },
      {
        name: "Vegetable Pakora",
        description: "assorted vegetables dipped in spiced chickpea batter and fried",
        price: 8,
        vegetarian: true,
        variants: [
          { name: "Mixed Vegetables", price: 8 },
          { name: "Spinach Pakora", price: 9 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Tamarind Chutney", price: 1 }
        ]
      },
      {
        name: "Hara Bhara Kebab",
        description: "spinach and pea patties with herbs and spices",
        price: 9,
        vegetarian: true,
        tags: ["healthy", "green"],
        variants: [
          { name: "Regular", price: 9 },
          { name: "With Paneer", price: 10 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Fish Amritsari",
        description: "fish fillets marinated with carom seeds and spices",
        price: 14,
        vegetarian: false,
        tags: ["punjabi"],
        variants: [
          { name: "Regular", price: 14 },
          { name: "Extra Spicy", price: 14.5 }
        ],
        addOns: [
          { name: "Chaat Masala", price: 0.5 },
          { name: "Lemon Wedges", price: 0.5 }
        ]
      },
      {
        name: "Bhel Puri",
        description: "puffed rice mixed with vegetables, chutneys and sev",
        price: 7,
        vegetarian: true,
        tags: ["street food", "light"],
        variants: [
          { name: "Regular", price: 7 },
          { name: "Sukha (Dry)", price: 7 }
        ],
        addOns: [
          { name: "Extra Sev", price: 1 },
          { name: "Pomegranate", price: 1.5 }
        ]
      },
      {
        name: "Dahi Puri",
        description: "crispy puris filled with potatoes, topped with yogurt and chutneys",
        price: 8,
        vegetarian: true,
        variants: [
          { name: "Regular", price: 8 },
          { name: "Extra Yogurt", price: 9 }
        ],
        addOns: [
          { name: "Sweet Chutney", price: 1 },
          { name: "Spicy Chutney", price: 1 }
        ]
      },
      {
        name: "Chilli Garlic Mushrooms",
        description: "button mushrooms sautéed with garlic and chilli sauce",
        price: 10,
        vegetarian: true,
        tags: ["spicy", "umami"],
        variants: [
          { name: "Regular", price: 10 },
          { name: "Extra Garlic", price: 10.5 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 1.5 }
        ]
      },
      {
        name: "Corn Cheese Balls",
        description: "deep-fried corn and cheese mixture coated with breadcrumbs",
        price: 9,
        vegetarian: true,
        variants: [
          { name: "Regular", price: 9 },
          { name: "Spicy", price: 9.5 }
        ],
        addOns: [
          { name: "Mayonnaise", price: 1 },
          { name: "Spicy Ketchup", price: 1 }
        ]
      },
      {
        name: "Medu Vada",
        description: "crispy savory doughnut made from urad dal",
        price: 7,
        vegetarian: true,
        tags: ["south indian", "crispy"],
        variants: [
          { name: "Plain", price: 7 },
          { name: "With Sambar", price: 9 }
        ],
        addOns: [
          { name: "Coconut Chutney", price: 1 },
          { name: "Extra Sambar", price: 2 }
        ]
      },
      {
        name: "Mozzarella Sticks",
        description: "breaded and fried mozzarella cheese served with marinara sauce",
        price: 9,
        vegetarian: true,
        tags: ["cheesy"],
        variants: [
          { name: "Regular", price: 9 },
          { name: "With Herbs", price: 9.5 }
        ],
        addOns: [
          { name: "Extra Marinara", price: 1.5 },
          { name: "Ranch Dip", price: 1.5 }
        ]
      },
      {
        name: "Shrimp Koliwada",
        description: "spiced and batter-fried shrimp originated from Koli community",
        price: 15,
        vegetarian: false,
        variants: [
          { name: "Regular", price: 15 },
          { name: "Extra Spicy", price: 15.5 }
        ],
        addOns: [
          { name: "Lemon Wedges", price: 0.5 },
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Tandoori Prawns",
        description: "marinated prawns cooked in clay oven",
        price: 16,
        vegetarian: false,
        tags: ["tandoor", "seafood"],
        variants: [
          { name: "Regular", price: 16 },
          { name: "Garlic Flavor", price: 17 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Lemon Butter", price: 1.5 }
        ]
      },
      {
        name: "Dahi Ke Kebab",
        description: "shallow-fried yogurt patties with herbs and spices",
        price: 10,
        vegetarian: true,
        variants: [
          { name: "Regular", price: 10 },
          { name: "With Cheese", price: 11.5 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Veg Cutlet",
        description: "mixed vegetable patties with potato and spices",
        price: 8,
        vegetarian: true,
        variants: [
          { name: "Plain", price: 8 },
          { name: "Cheese Stuffed", price: 9.5 }
        ],
        addOns: [
          { name: "Tomato Ketchup", price: 0.5 },
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Hummus with Pita",
        description: "creamy chickpea dip served with warm pita bread",
        price: 10,
        vegetarian: true,
        tags: ["mediterranean", "healthy"],
        variants: [
          { name: "Classic", price: 10 },
          { name: "Roasted Red Pepper", price: 11 },
          { name: "Garlic", price: 11 }
        ],
        addOns: [
          { name: "Extra Pita", price: 2 },
          { name: "Vegetable Sticks", price: 2 }
        ]
      },
      {
        name: "Malai Broccoli",
        description: "broccoli florets marinated in cream and spices, grilled in tandoor",
        price: 12,
        vegetarian: true,
        tags: ["tandoor", "healthy"],
        variants: [
          { name: "Regular", price: 12 },
          { name: "With Paneer", price: 14 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 }
        ]
      },
      {
        name: "Achari Paneer Tikka",
        description: "cottage cheese marinated in pickling spices, grilled in tandoor",
        price: 13,
        vegetarian: true,
        variants: [
          { name: "Regular", price: 13 },
          { name: "With Vegetables", price: 14 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Onion Salad", price: 1.5 }
        ]
      },
      {
        name: "Loaded Nachos",
        description: "tortilla chips topped with cheese, jalapeños, salsa, and sour cream",
        price: 12,
        vegetarian: true,
        tags: ["mexican", "shareable"],
        variants: [
          { name: "Vegetarian", price: 12 },
          { name: "With Chicken", price: 14 },
          { name: "With Beef", price: 15 }
        ],
        addOns: [
          { name: "Guacamole", price: 2 },
          { name: "Extra Cheese", price: 2 }
        ]
      },
      {
        name: "Ajwaini Fish Tikka",
        description: "fish marinated with carom seeds and spices, cooked in tandoor",
        price: 15,
        vegetarian: false,
        tags: ["tandoor"],
        variants: [
          { name: "Regular", price: 15 },
          { name: "Mustard Flavor", price: 16 }
        ],
        addOns: [
          { name: "Mint Chutney", price: 1 },
          { name: "Onion Salad", price: 1.5 }
        ]
      },
      {
        name: "Chicken Lollipop",
        description: "frenched chicken winglets marinated and fried",
        price: 12,
        vegetarian: false,
        tags: ["popular", "spicy"],
        variants: [
          { name: "Regular", price: 12 },
          { name: "Schezwan Style", price: 13 }
        ],
        addOns: [
          { name: "Schezwan Sauce", price: 1.5 },
          { name: "Mayonnaise", price: 1 }
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
        name: "Butter Chicken",
        description: "tender chicken cooked in a rich, creamy tomato sauce with butter and spices",
        price: 16,
        vegetarian: false,
        tags: ["creamy"],
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
        tags: ["tandoor"],
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
        tags: ["creamy"],
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
        tags: ["creamy"],
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
        tags: ["aromatic"],
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
        tags: ["aromatic"],
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
        tags: ["creamy"],
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
        tags: ["seafood"],
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
        tags: ["seafood"],
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
        tags: ["tandoor"],
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
        tags: ["south indian", "breakfast"],
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
        name: "Paper Dosa",
        description: "thin and crispy rice crepe served with sambar and chutney",
        price: 10,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Plain", price: 10 },
          { name: "Ghee", price: 11 },
          { name: "Extra Long", price: 14 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Rava Dosa",
        description: "crispy crepe made from semolina, rice flour and spices",
        price: 12,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Plain", price: 12 },
          { name: "Onion Rava", price: 13 },
          { name: "Masala Rava", price: 14 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Set Dosa",
        description: "soft, spongy small dosas usually served in sets of 3",
        price: 11,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Plain (3 pcs)", price: 11 },
          { name: "With Chutney Podi", price: 12 }
        ],
        addOns: [
          { name: "Extra Sambar", price: 2 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Ghee Roast Dosa",
        description: "crispy dosa generously roasted with ghee",
        price: 13,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Plain", price: 13 },
          { name: "Masala", price: 14 }
        ],
        addOns: [
          { name: "Extra Ghee", price: 1.5 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Onion Dosa",
        description: "dosa topped with finely chopped onions and spices",
        price: 12,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Regular", price: 12 },
          { name: "Masala", price: 13 }
        ],
        addOns: [
          { name: "Extra Onions", price: 1 },
          { name: "Extra Chutney", price: 1.5 }
        ]
      },
      {
        name: "Idli",
        description: "steamed rice cakes served with sambar and chutney",
        price: 8,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
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
        name: "Idli Vada Combo",
        description: "combination of idli and vada served with sambar and chutney",
        price: 10,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Standard (2 Idli, 1 Vada)", price: 10 },
          { name: "Special (2 Idli, 2 Vada)", price: 12 }
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
        tags: ["south indian", "breakfast"],
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
        tags: ["south indian", "breakfast"],
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
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Ven Pongal", price: 9 },
          { name: "Khara Pongal", price: 9.5 }
        ],
        addOns: [
          { name: "Extra Ghee", price: 1 },
          { name: "Coconut Chutney", price: 1.5 }
        ]
      },
      {
        name: "Appam",
        description: "bowl-shaped thin pancake made with fermented rice batter and coconut milk",
        price: 9,
        vegetarian: true,
        tags: ["south indian", "kerala"],
        variants: [
          { name: "Plain (2 pcs)", price: 9 },
          { name: "Egg Appam (2 pcs)", price: 11 }
        ],
        addOns: [
          { name: "Coconut Milk", price: 2 },
          { name: "Vegetable Stew", price: 4 }
        ]
      },
      {
        name: "Puttu",
        description: "steamed cylindrical rice cake with coconut shavings",
        price: 8,
        vegetarian: true,
        tags: ["south indian", "kerala"],
        variants: [
          { name: "Rice Puttu", price: 8 },
          { name: "Ragi Puttu", price: 9 }
        ],
        addOns: [
          { name: "Kadala Curry", price: 3 },
          { name: "Banana", price: 1 }
        ]
      },
      {
        name: "Upma",
        description: "savory semolina porridge with vegetables and spices",
        price: 8,
        vegetarian: true,
        tags: ["south indian", "breakfast"],
        variants: [
          { name: "Regular", price: 8 },
          { name: "Rava Kesari Combo", price: 11 }
        ],
        addOns: [
          { name: "Coconut Chutney", price: 1.5 },
          { name: "Sambar", price: 2 }
        ]
      },
      {
        name: "Bisi Bele Bath",
        description: "hot lentil rice dish with vegetables and spices",
        price: 11,
        vegetarian: true,
        tags: ["south indian", "karnataka"],
        variants: [
          { name: "Regular", price: 11 },
          { name: "Extra Spicy", price: 11.5 }
        ],
        addOns: [
          { name: "Papad", price: 1 },
          { name: "Raita", price: 2 }
        ]
      },
      {
        name: "Pesarattu",
        description: "green gram dosa served with upma or chutney",
        price: 10,
        vegetarian: true,
        tags: ["south indian", "andhra"],
        variants: [
          { name: "Plain", price: 10 },
          { name: "MLA Pesarattu (with Upma)", price: 12 }
        ],
        addOns: [
          { name: "Ginger Chutney", price: 1.5 },
          { name: "Extra Upma", price: 3 }
        ]
      },
      {
        name: "Curd Rice",
        description: "soft rice mixed with yogurt, tempered with mustard seeds and curry leaves",
        price: 9,
        vegetarian: true,
        tags: ["south indian", "comfort food"],
        variants: [
          { name: "Plain", price: 9 },
          { name: "Vegetable Curd Rice", price: 10 }
        ],
        addOns: [
          { name: "Mango Pickle", price: 1 },
          { name: "Papad", price: 1 }
        ]
      },
      {
        name: "Lemon Rice",
        description: "rice flavored with lemon juice, turmeric, and tempering",
        price: 9,
        vegetarian: true,
        tags: ["south indian"],
        variants: [
          { name: "Regular", price: 9 },
          { name: "Extra Tangy", price: 9.5 }
        ],
        addOns: [
          { name: "Papad", price: 1 },
          { name: "Raita", price: 2 }
        ]
      }
    ]
  },
  {
    category: "South Indian Curries",
    items: [
      {
        name: "Sambar",
        description: "lentil stew with vegetables and tamarind",
        price: 8,
        vegetarian: true,
        tags: ["south indian", "tangy"],
        variants: [
          { name: "Regular", price: 8 },
          { name: "Drumstick Sambar", price: 9 }
        ],
        addOns: [
          { name: "Extra Vegetables", price: 2 }
        ]
      },
      {
        name: "Rasam",
        description: "thin, tangy, spicy soup prepared with tamarind and pepper",
        price: 7,
        vegetarian: true,
        tags: ["south indian", "tangy"],
        variants: [
          { name: "Regular", price: 7 },
          { name: "Tomato Rasam", price: 7.5 },
          { name: "Pepper Rasam", price: 7.5 }
        ],
        addOns: [
          { name: "Papad", price: 1 }
        ]
      },
      {
        name: "Avial",
        description: "medley of vegetables in coconut and yogurt sauce",
        price: 10,
        vegetarian: true,
        tags: ["south indian", "kerala"],
        variants: [
          { name: "Regular", price: 10 },
          { name: "Dry Style", price: 10.5 }
        ],
        addOns: [
          { name: "Extra Coconut", price: 1.5 }
        ]
      },
      {
        name: "Poriyal",
        description: "stir-fried vegetables with coconut and spices",
        price: 9,
        vegetarian: true,
        variants: [
          { name: "Beans Poriyal", price: 9 },
          { name: "Cabbage Poriyal", price: 9 },
          { name: "Carrot Poriyal", price: 9 }
        ],
        addOns: [
          { name: "Extra Spice", price: 0.5 }
        ]
      },
      {
        name: "Kootu",
        description: "vegetables cooked with lentils and ground coconut",
        price: 9.5,
        vegetarian: true,
        tags: ["south indian", "healthy"],
        variants: [
          { name: "Regular", price: 9.5 },
          { name: "Chow Chow Kootu", price: 10 }
        ],
        addOns: [
          { name: "Extra Dal", price: 1.5 }
        ]
      },
      {
        name: "Meen Curry",
        description: "fish simmered in coconut milk with tamarind and spices",
        price: 14,
        vegetarian: false,
        tags: ["kerala", "spicy"],
        variants: [
          { name: "Regular", price: 14 },
          { name: "King Fish", price: 16 }
        ],
        addOns: [
          { name: "Extra Fish", price: 4 }
        ]
      },
      {
        name: "Chettinad Chicken Curry",
        description: "fiery chicken curry with signature Chettinad spices",
        price: 13,
        vegetarian: false,
        variants: [
          { name: "Regular", price: 13 },
          { name: "Boneless", price: 14 }
        ],
        addOns: [
          { name: "Extra Chicken", price: 3 }
        ]
      },
      {
        name: "Vatha Kuzhambu",
        description: "tangy tamarind-based gravy with sundried vegetables",
        price: 10,
        vegetarian: true,
        tags: ["tamil", "authentic"],
        variants: [
          { name: "Regular", price: 10 },
          { name: "Drumstick", price: 11 }
        ],
        addOns: [
          { name: "Fried Sundakkai", price: 1 }
        ]
      },
      {
        name: "Mor Kuzhambu",
        description: "yogurt-based curry tempered with mustard seeds and curry leaves",
        price: 9,
        vegetarian: true,
        variants: [
          { name: "Regular", price: 9 },
          { name: "With Vegetables", price: 10 }
        ],
        addOns: [
          { name: "Extra Yogurt", price: 1 }
        ]
      },
      {
        name: "Urulai Roast",
        description: "spicy potato roast with curry leaves and pepper",
        price: 8.5,
        vegetarian: true,
        tags: ["south indian", "dry"],
        variants: [
          { name: "Regular", price: 8.5 },
          { name: "Extra Spicy", price: 8.5 }
        ],
        addOns: [
          { name: "Extra Potatoes", price: 2 }
        ]
      }
    ]
  },
  {
  category: "North Indian Specialties",
  items: [
    {
      name: "Butter Chicken",
      description: "tender chicken in a rich, creamy tomato sauce",
      price: 14,
      vegetarian: false,
      tags: ["punjabi", "creamy"],
      variants: [
        { name: "Regular", price: 14 },
        { name: "Boneless", price: 15 }
      ],
      addOns: [
        { name: "Extra Chicken", price: 3 },
        { name: "Extra Gravy", price: 2 }
      ]
    },
    {
      name: "Paneer Tikka Masala",
      description: "grilled cottage cheese cubes in spiced tomato gravy",
      price: 13,
      vegetarian: true,
      tags: ["popular", "tangy"],
      variants: [
        { name: "Regular", price: 13 },
        { name: "Extra Spicy", price: 13 }
      ],
      addOns: [
        { name: "Extra Paneer", price: 3 }
      ]
    },
    {
      name: "Dal Makhani",
      description: "black lentils slow-cooked with butter and cream",
      price: 10,
      vegetarian: true,
      tags: ["punjabi", "rich"],
      variants: [
        { name: "Regular", price: 10 },
        { name: "Extra Creamy", price: 11 }
      ],
      addOns: [
        { name: "Tadka on Top", price: 1.5 }
      ]
    },
    {
      name: "Chole Bhature",
      description: "spiced chickpea curry served with fried bread",
      price: 12,
      vegetarian: true,
      variants: [
        { name: "Regular (2 Bhature)", price: 12 },
        { name: "Extra Bhature (4)", price: 14 }
      ],
      addOns: [
        { name: "Pickled Onions", price: 1 }
      ]
    },
    {
      name: "Kadai Chicken",
      description: "chicken cooked with bell peppers in a spicy masala",
      price: 14.5,
      vegetarian: false,
      variants: [
        { name: "Regular", price: 14.5 },
        { name: "Boneless", price: 15.5 }
      ],
      addOns: [
        { name: "Extra Chicken", price: 3 }
      ]
    },
    {
      name: "Malai Kofta",
      description: "fried vegetable and cheese dumplings in a creamy sauce",
      price: 13,
      vegetarian: true,
      tags: ["festive", "rich"],
      variants: [
        { name: "Regular", price: 13 },
        { name: "Dry", price: 13 }
      ],
      addOns: [
        { name: "Extra Kofta", price: 3 }
      ]
    },
    {
      name: "Rogan Josh",
      description: "aromatic lamb curry with Kashmiri spices",
      price: 16,
      vegetarian: false,
      tags: ["kashmiri", "aromatic"],
      variants: [
        { name: "Regular", price: 16 },
        { name: "Boneless", price: 17 }
      ],
      addOns: [
        { name: "Extra Meat", price: 4 }
      ]
    },
    {
      name: "Sarson Da Saag",
      description: "mustard greens puree tempered with spices",
      price: 11,
      vegetarian: true,
      variants: [
        { name: "With Makki Roti", price: 14 },
        { name: "Only Saag", price: 11 }
      ],
      addOns: [
        { name: "White Butter", price: 1.5 }
      ]
    },
    {
      name: "Rajma Chawal",
      description: "kidney bean curry served with steamed rice",
      price: 11,
      vegetarian: true,
      tags: ["comfort food", "punjabi"],
      variants: [
        { name: "Regular", price: 11 },
        { name: "Extra Rajma", price: 12 }
      ],
      addOns: [
        { name: "Papad", price: 1 }
      ]
    },
    {
      name: "Aloo Gobi",
      description: "potato and cauliflower dry curry with spices",
      price: 10,
      vegetarian: true,
      variants: [
        { name: "Regular", price: 10 },
        { name: "With Gravy", price: 11 }
      ],
      addOns: [
        { name: "Extra Vegetables", price: 2 }
      ]
    }
  ]
},
{
  category: "North Indian Curries",
  items: [
    {
      name: "Chicken Curry",
      description: "classic spiced chicken in onion-tomato gravy",
      price: 13,
      vegetarian: false,
      tags: ["popular", "spicy"],
      variants: [
        { name: "Regular", price: 13 },
        { name: "Boneless", price: 14 }
      ],
      addOns: [
        { name: "Extra Chicken", price: 3 }
      ]
    },
    {
      name: "Shahi Paneer",
      description: "paneer in a rich cashew and cream sauce",
      price: 13,
      vegetarian: true,
      tags: ["creamy", "rich"],
      variants: [
        { name: "Regular", price: 13 },
        { name: "Extra Creamy", price: 14 }
      ],
      addOns: [
        { name: "Extra Paneer", price: 3 }
      ]
    },
    {
      name: "Bhindi Masala",
      description: "okra cooked with onions, tomatoes and spices",
      price: 11,
      vegetarian: true,
      variants: [
        { name: "Regular", price: 11 },
        { name: "Extra Crispy", price: 11.5 }
      ],
      addOns: [
        { name: "Extra Spice", price: 0.5 }
      ]
    },
    {
      name: "Dal Tadka",
      description: "yellow lentils tempered with cumin, garlic and spices",
      price: 9,
      vegetarian: true,
      tags: ["everyday", "simple"],
      variants: [
        { name: "Regular", price: 9 },
        { name: "Extra Tadka", price: 10 }
      ],
      addOns: [
        { name: "Ghee Tadka", price: 1.5 }
      ]
    },
    {
      name: "Palak Paneer",
      description: "cottage cheese cubes in a pureed spinach gravy",
      price: 13,
      vegetarian: true,
      tags: ["healthy", "popular"],
      variants: [
        { name: "Regular", price: 13 },
        { name: "Extra Garlic", price: 13.5 }
      ],
      addOns: [
        { name: "Extra Paneer", price: 3 }
      ]
    },
    {
      name: "Goat Curry",
      description: "slow-cooked goat meat in aromatic spiced gravy",
      price: 16,
      vegetarian: false,
      variants: [
        { name: "Regular", price: 16 },
        { name: "Extra Spicy", price: 16 }
      ],
      addOns: [
        { name: "Extra Meat", price: 4 }
      ]
    },
    {
      name: "Egg Curry",
      description: "boiled eggs in a flavorful onion-tomato gravy",
      price: 11,
      vegetarian: false,
      variants: [
        { name: "Regular (2 eggs)", price: 11 },
        { name: "Extra (4 eggs)", price: 13 }
      ],
      addOns: [
        { name: "Extra Gravy", price: 2 }
      ]
    },
    {
      name: "Baingan Bharta",
      description: "smoked eggplant mash cooked with onions and tomatoes",
      price: 11,
      vegetarian: true,
      tags: ["smoky", "punjabi"],
      variants: [
        { name: "Regular", price: 11 },
        { name: "Extra Smoky", price: 11.5 }
      ],
      addOns: [
        { name: "Green Chilies", price: 0.5 }
      ]
    },
    {
      name: "Navratan Korma",
      description: "nine vegetable curry in a rich cashew and cream sauce",
      price: 12,
      vegetarian: true,
      tags: ["royal", "festive"],
      variants: [
        { name: "Regular", price: 12 },
        { name: "With Paneer", price: 13.5 }
      ],
      addOns: [
        { name: "Extra Dry Fruits", price: 2 }
      ]
    },
    {
      name: "Fish Curry",
      description: "fish fillets cooked in a tangy tomato-based curry",
      price: 15,
      vegetarian: false,
      variants: [
        { name: "Regular", price: 15 },
        { name: "Extra Spicy", price: 15 }
      ],
      addOns: [
        { name: "Extra Fish", price: 4 }
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
      },
      {
        name: "Schezwan Noodles",
        description: "spicy noodles tossed in fiery Schezwan sauce",
        price: 13,
        vegetarian: true,
        tags: ["spicy", "popular"],
        variants: [
          { name: "Vegetable", price: 13 },
          { name: "Chicken", price: 15 },
          { name: "Egg", price: 14 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 2 },
          { name: "Extra Vegetables", price: 2 }
        ]
      },
      {
        name: "Gobi Manchurian",
        description: "crispy cauliflower florets in sweet and spicy sauce",
        price: 13,
        vegetarian: true,
        variants: [
          { name: "Dry", price: 13 },
          { name: "With Gravy", price: 14 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 2 }
        ]
      },
      {
        name: "Chilli Chicken",
        description: "chicken pieces tossed with bell peppers and onions in spicy sauce",
        price: 15,
        vegetarian: false,
        tags: ["popular", "spicy"],
        variants: [
          { name: "Dry", price: 15 },
          { name: "With Gravy", price: 16 }
        ],
        addOns: [
          { name: "Extra Chicken", price: 3 },
          { name: "Extra Spicy", price: 0.5 }
        ]
      },
      {
        name: "Schezwan Fried Rice",
        description: "rice stir-fried with vegetables in spicy Schezwan sauce",
        price: 13,
        vegetarian: true,
        variants: [
          { name: "Vegetable", price: 13 },
          { name: "Chicken", price: 15 },
          { name: "Egg", price: 14 }
        ],
        addOns: [
          { name: "Extra Vegetables", price: 2 }
        ]
      },
      {
        name: "Sweet and Sour Vegetables",
        description: "mixed vegetables in a tangy sweet and sour sauce",
        price: 13,
        vegetarian: true,
        tags: ["tangy", "sweet"],
        variants: [
          { name: "Regular", price: 13 },
          { name: "Extra Sauce", price: 14 }
        ],
        addOns: [
          { name: "Extra Vegetables", price: 2 }
        ]
      },
      {
        name: "Honey Chilli Potato",
        description: "crispy potato fingers tossed in honey chilli sauce",
        price: 12,
        vegetarian: true,
        tags: ["sweet", "spicy"],
        variants: [
          { name: "Regular", price: 12 },
          { name: "Extra Crispy", price: 12.5 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 1.5 }
        ]
      },
      {
        name: "Singapore Noodles",
        description: "thin rice noodles stir-fried with curry powder and vegetables",
        price: 14,
        vegetarian: true,
        variants: [
          { name: "Vegetable", price: 14 },
          { name: "Chicken", price: 16 },
          { name: "Shrimp", price: 17 }
        ],
        addOns: [
          { name: "Extra Curry Flavor", price: 1 }
        ]
      },
      {
        name: "Manchow Soup",
        description: "spicy and sour soup with vegetables and crispy noodles",
        price: 7,
        vegetarian: true,
        tags: ["soup", "spicy"],
        variants: [
          { name: "Vegetable", price: 7 },
          { name: "Chicken", price: 8 }
        ],
        addOns: [
          { name: "Extra Crispy Noodles", price: 1 }
        ]
      },
      {
        name: "Dragon Chicken",
        description: "fiery chicken strips with bell peppers in a spicy sauce",
        price: 15,
        vegetarian: false,
        variants: [
          { name: "Regular", price: 15 },
          { name: "Extra Spicy", price: 15.5 }
        ],
        addOns: [
          { name: "Extra Chicken", price: 3 }
        ]
      },
      {
        name: "American Chop Suey",
        description: "crispy noodle cake topped with sweet and sour vegetables and sauce",
        price: 14,
        vegetarian: true,
        tags: ["fusion", "sweet-sour"],
        variants: [
          { name: "Vegetable", price: 14 },
          { name: "Chicken", price: 16 }
        ],
        addOns: [
          { name: "Extra Sauce", price: 2 }
        ]
      },
      {
  name: "Paneer 65",
  description: "crispy fried paneer tossed with South-Indian style Indo-Chinese spices",
  price: 14,
  vegetarian: true,
  tags: ["spicy", "fusion"],
  variants: [
    { name: "Dry", price: 14 },
    { name: "With Gravy", price: 15 }
  ],
  addOns: [
    { name: "Extra Paneer", price: 3 },
    { name: "Extra Curry Leaves", price: 1 }
  ]
},
{
  name: "Crispy Corn Chilli Pepper",
  description: "golden fried sweet corn kernels tossed in spicy chilli garlic sauce",
  price: 13,
  vegetarian: true,
  tags: ["popular"],
  variants: [
    { name: "Regular", price: 13 },
    { name: "Extra Crispy", price: 13.5 }
  ],
  addOns: [
    { name: "Extra Corn", price: 2 }
  ]
},
{
  name: "Chicken Lollipop",
  description: "drumettes marinated and fried, served with spicy Schezwan dip",
  price: 16,
  vegetarian: false,
  tags: ["starter", "spicy"],
  variants: [
    { name: "4 Pieces", price: 16 },
    { name: "6 Pieces", price: 20 }
  ],
  addOns: [
    { name: "Extra Dip", price: 1.5 }
  ]
},
{
  name: "Veg Spring Rolls",
  description: "crispy rolls stuffed with vegetables and served with sweet chilli sauce",
  price: 11,
  vegetarian: true,
  variants: [
    { name: "4 Pieces", price: 11 },
    { name: "6 Pieces", price: 13 }
  ],
  addOns: [
    { name: "Extra Sauce", price: 1 }
  ]
},
{
  name: "Egg Foo Young",
  description: "Chinese-style omelet served with light gravy and stir-fried vegetables",
  price: 13,
  vegetarian: false,
  variants: [
    { name: "Regular", price: 13 },
    { name: "Extra Egg", price: 14 }
  ],
  addOns: [
    { name: "Extra Gravy", price: 1.5 }
  ]
},
{
  name: "Burnt Garlic Fried Rice",
  description: "fried rice infused with burnt garlic flavor and vegetables",
  price: 13,
  vegetarian: true,
  tags: ["garlic-lover"],
  variants: [
    { name: "Vegetable", price: 13 },
    { name: "Chicken", price: 15 }
  ],
  addOns: [
    { name: "Extra Garlic", price: 1 },
    { name: "Extra Vegetables", price: 2 }
  ]
},
{
  name: "Chilli Garlic Noodles",
  description: "noodles tossed with garlic, chilli, and soy sauce",
  price: 13,
  vegetarian: true,
  tags: ["spicy"],
  variants: [
    { name: "Vegetable", price: 13 },
    { name: "Egg", price: 14 },
    { name: "Chicken", price: 15 }
  ],
  addOns: [
    { name: "Extra Garlic", price: 1 },
    { name: "Extra Noodles", price: 2 }
  ]
}
    ]
  },
  {
  category: "Thali",
  items: [
    {
      name: "South Indian Thali",
      description: "a wholesome platter with sambar, rasam, poriyal, kootu, rice, curd, papad, pickle, and dessert",
      price: 20,
      vegetarian: true,
      tags: ["south indian", "balanced"],
      variants: [
        { name: "Regular", price: 20 },
        { name: "Deluxe", price: 24 }
      ],
      addOns: [
        { name: "Extra Sambar", price: 2 },
        { name: "Extra Dessert", price: 3 }
      ]
    },
    {
      name: "Gujarati Thali",
      description: "sweet and savory flavors with dal, kadhi, thepla, sabzi, rice, farsan, and dessert",
      price: 19,
      vegetarian: true,
      variants: [
        { name: "Regular", price: 19 },
        { name: "Deluxe", price: 22 }
      ],
      addOns: [
        { name: "Extra Farsan", price: 2 },
        { name: "Extra Sweet", price: 3 }
      ]
    },
    {
      name: "Bengali Thali",
      description: "traditional Bengali meal with rice, shukto, dal, mixed veg, fish curry or mutton, and chutney",
      price: 23,
      vegetarian: false,
      tags: ["regional"],
      variants: [
        { name: "Fish", price: 23 },
        { name: "Mutton", price: 26 },
        { name: "Vegetarian", price: 20 }
      ],
      addOns: [
        { name: "Extra Fish Piece", price: 4 },
        { name: "Extra Sweet", price: 3 }
      ]
    },
    {
      name: "Mini Thali",
      description: "light meal with one curry, dal, rice, roti, and salad",
      price: 12,
      vegetarian: true,
      variants: [
        { name: "Vegetarian", price: 12 },
        { name: "Non-Vegetarian", price: 14 }
      ],
      addOns: [
        { name: "Extra Curry", price: 3 },
        { name: "Extra Roti", price: 1.5 }
      ]
    },
    {
      name: "Rajasthani Thali",
      description: "a royal spread featuring dal baati churma, gatte ki sabzi, ker sangri, and more",
      price: 22,
      vegetarian: true,
      tags: ["royal", "spicy"],
      variants: [
        { name: "Regular", price: 22 },
        { name: "Deluxe", price: 26 }
      ],
      addOns: [
        { name: "Extra Churma", price: 2 },
        { name: "Extra Baati", price: 2 }
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
      },
      {
      name: "Jalebi",
      description: "crispy, coiled deep-fried dessert soaked in saffron-infused sugar syrup",
      price: 5,
      vegetarian: true,
      tags: ["crispy", "festival special"],
      variants: [
        { name: "100g", price: 5 },
        { name: "200g", price: 9 }
      ],
      addOns: [
        { name: "Rabri Topping", price: 2 }
      ]
    },
    {
      name: "Moong Dal Halwa",
      description: "rich halwa made from moong lentils, ghee, and dry fruits",
      price: 7,
      vegetarian: true,
      tags: ["warm", "indulgent"],
      variants: [
        { name: "Single Serve", price: 7 },
        { name: "Family Bowl", price: 13 }
      ],
      addOns: [
        { name: "Extra Ghee", price: 1.5 }
      ]
    },
    {
      name: "Mysore Pak",
      description: "south Indian fudge made from ghee, gram flour, and sugar",
      price: 6,
      vegetarian: true,
      tags: ["south indian", "festive"],
      variants: [
        { name: "3 Pieces", price: 6 },
        { name: "6 Pieces", price: 10 }
      ],
      addOns: [
        { name: "Extra Ghee Coating", price: 1.5 }
      ]
    },
    {
      name: "Chocolate Sandesh",
      description: "Bengali sweet made from chenna and chocolate fusion",
      price: 7,
      vegetarian: true,
      tags: ["bengali", "fusion"],
      variants: [
        { name: "2 Pieces", price: 7 },
        { name: "4 Pieces", price: 12 }
      ],
      addOns: [
        { name: "Dry Fruit Garnish", price: 1 }
      ]
    }
    ]
  },
   {
  category: "Snacks",
  items: [
    {
      name: "Samosa Plate",
      description: "crisp, golden samosas filled with spicy potatoes and peas",
      price: 5,
      vegetarian: true,
      tags: ["fried", "popular"],
      variants: [
        { name: "2 Pieces", price: 5 },
        { name: "4 Pieces", price: 9 }
      ],
      addOns: [
        { name: "Chutney Pack", price: 1 },
        { name: "Extra Filling", price: 1.5 }
      ]
    },
    {
      name: "Pav Bhaji",
      description: "spiced mashed vegetables served with buttered pav and chopped onions",
      price: 10,
      vegetarian: true,
      tags: ["mumbai", "street food"],
      variants: [
        { name: "Regular", price: 10 },
        { name: "Cheese Pav Bhaji", price: 12 }
      ],
      addOns: [
        { name: "Extra Pav", price: 2 },
        { name: "Extra Butter", price: 1.5 }
      ]
    },
    {
      name: "Paneer Pakoda",
      description: "deep-fried paneer fritters coated in gram flour batter",
      price: 9,
      vegetarian: true,
      tags: ["fritters", "north indian"],
      variants: [
        { name: "6 Pieces", price: 9 },
        { name: "10 Pieces", price: 14 }
      ],
      addOns: [
        { name: "Mint Chutney", price: 1 },
        { name: "Spicy Dip", price: 1.5 }
      ]
    },
    {
      name: "Vada Pav",
      description: "spicy potato fritter sandwiched in a pav bun, served with chutneys",
      price: 6,
      vegetarian: true,
      tags: ["mumbai", "quick bite"],
      variants: [
        { name: "Single", price: 6 },
        { name: "Double", price: 10 }
      ],
      addOns: [
        { name: "Fried Green Chili", price: 1 }
      ]
    },
    {
      name: "Dhokla",
      description: "steamed savory cake made from fermented rice and gram flour batter",
      price: 6,
      vegetarian: true,
      tags: ["gujarati", "light snack"],
      variants: [
        { name: "Standard Plate", price: 6 },
        { name: "With Chutney", price: 7 }
      ],
      addOns: [
        { name: "Extra Green Chutney", price: 1 }
      ]
    },
    {
      name: "Chole Bhature",
      description: "spicy chickpeas served with deep-fried puffed bread",
      price: 10,
      vegetarian: true,
      tags: ["punjabi", "heavy snack"],
      variants: [
        { name: "Regular Plate", price: 10 },
        { name: "With Butter", price: 11.5 }
      ],
      addOns: [
        { name: "Extra Bhature", price: 3 },
        { name: "Extra Chole", price: 2.5 }
      ]
    },
    {
      name: "Onion Pakoda",
      description: "crispy onion fritters made with spiced gram flour batter",
      price: 7,
      vegetarian: true,
      tags: ["monsoon special", "crispy"],
      variants: [
        { name: "Small Plate", price: 7 },
        { name: "Large Plate", price: 10 }
      ],
      addOns: [
        { name: "Mint Chutney", price: 1 }
      ]
    },
    {
      name: "Bhel Puri",
      description: "puffed rice mixed with vegetables, tangy chutneys, and spices",
      price: 6,
      vegetarian: true,
      tags: ["chaat", "tangy"],
      variants: [
        { name: "Regular", price: 6 },
        { name: "Extra Spicy", price: 6.5 }
      ],
      addOns: [
        { name: "Extra Sev", price: 1 },
        { name: "Sweet Chutney", price: 1 }
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