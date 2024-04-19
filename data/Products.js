const products = [
  {
    id: "1a",
    image: "src/components/Assets/imagesAz/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    category: "men",
    new_price: 5.0,
    old_price: 8.0,
    rating: {
      stars: 4.5,
      count: 87
    },
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "2a",
    image: "src/components/Assets/imagesAz/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    category: "kid",
    new_price: 20.9,
    old_price: 28.0,
    rating: {
      stars: 4,
      count: 127
    },
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "3a",
    image: "src/components/Assets/imagesAz/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    category: "men",
    new_price: 7.5,
    old_price: 10.0,
    rating: {
      stars: 4.5,
      count: 56
    },
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
  },
  {
    id: "4a",
    image: "src/components/Assets/imagesAz/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    category: "kitchen",
    new_price: 18.9,
    old_price: 25.0,
    rating: {
      stars: 5,
      count: 2197
    },
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "5a",
    image: "src/components/Assets/imagesAz/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    category: "kitchen",
    new_price: 20.0,
    old_price: 28.5,
    rating: {
      stars: 4,
      count: 37
    },
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "6a",
    image: "src/components/Assets/imagesAz/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    category: "kitchen",
    new_price: 34.0,
    old_price: 41.5,
    rating: {
      stars: 4.5,
      count: 175
    },
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "7a",
    image: "src/components/Assets/imagesAz/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    category: "men",
    new_price: 8.0,
    old_price: 12.0,
    rating: {
      stars: 4.5,
      count: 317
    },
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "8a",
    image: "src/components/Assets/imagesAz/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    category: "bathroom",
    new_price: 15.0,
    old_price: 18.0,
    rating: {
      stars: 4.5,
      count: 144
    },
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "9a",
    image: "src/components/Assets/imagesAz/products/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    category: "bathroom",
    new_price: 3.50,
    old_price: 6.60,
    rating: {
      stars: 4.5,
      count: 305
    },
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "10a",
    image: "src/components/Assets/imagesAz/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    category: "men",
    new_price: 40.0,
    old_price: 50.0,
    rating: {
      stars: 4,
      count: 89
    },
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "11a",
    image: "src/components/Assets/imagesAz/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    category: "women",
    new_price: 5.0,
    old_price: 9.0,
    rating: {
      stars: 4.5,
      count: 235
    },
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "12a",
    image: "src/components/Assets/imagesAz/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    category: "accessories",
    new_price: 15.6,
    old_price: 6.60,
    rating: {
      stars: 4.5,
      count: 30
    },
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "13a",
    image: "src/components/Assets/imagesAz/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    category: "women",
    new_price: 2.6,
    old_price: 4.6,
    rating: {
      stars: 4.5,
      count: 562
    },
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "14a",
    image: "src/components/Assets/imagesAz/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    category: "home",
    new_price: 35.0,
    old_price: 40.0,
    rating: {
      stars: 4.5,
      count: 232
    },
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "15a",
    image: "src/components/Assets/imagesAz/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    category: "men",
    new_price: 16.0,
    old_price: 20.0,
    rating: {
      stars: 4,
      count: 160
    },
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "16a",
    image: "src/components/Assets/imagesAz/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    category: "home",
    new_price: 30.7,
    old_price: 37.6,
    rating: {
      stars: 5,
      count: 846
    },
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "17a",
    image: "src/components/Assets/imagesAz/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    category: "home",
    new_price: 15.6,
    old_price: 6.60,
    rating: {
      stars: 4,
      count: 99
    },
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "18a",
    image: "src/components/Assets/imagesAz/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    category: "women",
    new_price: 9.0,
    old_price: 13.0,
    rating: {
      stars: 4,
      count: 215
    },
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "19a",
    image: "src/components/Assets/imagesAz/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    category: "women",
    new_price: 17.9,
    old_price: 22.6,
    rating: {
      stars: 4.5,
      count: 52
    },
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "20a",
    image: "src/components/Assets/imagesAz/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    category: "women",
    new_price: 13.7,
    old_price: 16.0,
    rating: {
      stars: 4.5,
      count: 2465
    },
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
  },
  {
    id: "21a",
    image: "src/components/Assets/imagesAz/products/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    category: "home",
    new_price: 12.5,
    old_price: 16.0,
    rating: {
      stars: 4.5,
      count: 119
    },
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "22a",
    image: "src/components/Assets/imagesAz/products/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    category: "women",
    new_price: 12.5,
    old_price: 16.0,
    rating: {
      stars: 4,
      count: 326
    },
    keywords: [
      "shoes",
      "flats",
      "womens",
      "footwear"
    ]
  },
  {
    id: "23a",
    image: "src/components/Assets/imagesAz/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    category: "men",
    new_price: 5.5,
    old_price: 8.0,
    rating: {
      stars: 4.5,
      count: 2556
    },
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
  },
  {
    id: "24a",
    image: "src/components/Assets/imagesAz/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    category: "home",
    new_price: 25.0,
    old_price: 30.0,
    rating: {
      stars: 4.5,
      count: 2286
    },
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "25a",
    image: "src/components/Assets/imagesAz/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    category: "home",
    new_price: 10.5,
    old_price: 14.8,
    rating: {
      stars: 4,
      count: 456
    },
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "26a",
    image: "src/components/Assets/imagesAz/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    category: "women",
    new_price: 12.5,
    old_price: 15.0,
    rating: {
      stars: 5,
      count: 83
    },
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ]
  },
  {
    id: "27a",
    image: "src/components/Assets/imagesAz/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    category: "men",
    new_price: 7.0,
    old_price: 10.0,
    rating: {
      stars: 4.5,
      count: 9017
    },
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "28a",
    image: "src/components/Assets/imagesAz/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    category: "men",
    new_price: 8.0,
    old_price: 11.0,
    rating: {
      stars: 4,
      count: 229
    },
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "29a",
    image: "src/components/Assets/imagesAz/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    category: "men",
    new_price: 17.0,
    old_price: 20.0,
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 1690,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "30a",
    image: "src/components/Assets/imagesAz/products/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    category: "home",
    new_price: 47.0,
    old_price: 60.0,
    rating: {
      stars: 4.5,
      count: 511
    },
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "31a",
    image: "src/components/Assets/imagesAz/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    category: "home",
    new_price: 6.0,
    old_price: 10.0,
    rating: {
      stars: 4.5,
      count: 130
    },
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "32a",
    image: "src/components/Assets/imagesAz/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    category: "women",
    new_price: 14.0,
    old_price: 18.0,
    rating: {
      stars: 4.5,
      count: 248
    },
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ]
  },
  {
    id: "33a",
    image: "src/components/Assets/imagesAz/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    category: "women",
    new_price: 26.4,
    old_price: 30.0,
    rating: {
      stars: 4.5,
      count: 117
    },
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "34a",
    image: "src/components/Assets/imagesAz/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    category: "home",
    new_price: 16.0,
    old_price: 20.3,
    rating: {
      stars: 4,
      count: 126
    },
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "35a",
    image: "src/components/Assets/imagesAz/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    category: "home",
    new_price: 22.5,
    old_price: 27.7,
    rating: {
      stars: 4.5,
      count: 1211
    },
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36a",
    image: "src/components/Assets/imagesAz/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    category: "home",
    new_price: 26.0,
    old_price: 33.5,
    rating: {
      stars: 4.5,
      count: 363
    },
    keywords: [
      "bedroom",
      "home"
    ]
  }
];

// const products = [
//   {
//     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     image: "src/components/Assets/imagesAz/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87
//     },
//     priceCents: 1090,
//     keywords: [
//       "socks",
//       "sports",
//       "apparel"
//     ]
//   },
//   {
//     id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     image: "src/components/Assets/imagesAz/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127
//     },
//     priceCents: 2095,
//     keywords: [
//       "sports",
//       "basketballs"
//     ]
//   },
//   {
//     id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//     image: "src/components/Assets/imagesAz/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56
//     },
//     priceCents: 799,
//     keywords: [
//       "tshirts",
//       "apparel",
//       "mens"
//     ],
//     type: "clothing",
//     sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
//   },
//   {
//     id: "54e0eccd-8f36-462b-b68a-8182611d9add",
//     image: "src/components/Assets/imagesAz/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197
//     },
//     priceCents: 1899,
//     keywords: [
//       "toaster",
//       "kitchen",
//       "appliances"
//     ]
//   },
//   {
//     id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//     image: "src/components/Assets/imagesAz/products/6-piece-white-dinner-plate-set.jpg",
//     name: "6 Piece White Dinner Plate Set",
//     rating: {
//       stars: 4,
//       count: 37
//     },
//     priceCents: 2067,
//     keywords: [
//       "plates",
//       "kitchen",
//       "dining"
//     ]
//   },
//   {
//     id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
//     image: "src/components/Assets/imagesAz/products/6-piece-non-stick-baking-set.webp",
//     name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
//     rating: {
//       stars: 4.5,
//       count: 175
//     },
//     priceCents: 3499,
//     keywords: [
//       "kitchen",
//       "cookware"
//     ]
//   },
//   {
//     id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
//     image: "src/components/Assets/imagesAz/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
//     name: "Plain Hooded Fleece Sweatshirt",
//     rating: {
//       stars: 4.5,
//       count: 317
//     },
//     priceCents: 2400,
//     keywords: [
//       "hoodies",
//       "sweaters",
//       "apparel"
//     ]
//   },
//   {
//     id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
//     image: "src/components/Assets/imagesAz/products/luxury-tower-set-6-piece.jpg",
//     name: "Luxury Towel Set - Graphite Gray",
//     rating: {
//       stars: 4.5,
//       count: 144
//     },
//     priceCents: 3599,
//     keywords: [
//       "bathroom",
//       "washroom",
//       "restroom",
//       "towels",
//       "bath towels"
//     ]
//   },
//   {
//     id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
//     image: "src/components/Assets/imagesAz/products/liquid-laundry-detergent-plain.jpg",
//     name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
//     rating: {
//       stars: 4.5,
//       count: 305
//     },
//     priceCents: 2899,
//     keywords: [
//       "bathroom",
//       "cleaning"
//     ]
//   },
//   {
//     id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
//     image: "src/components/Assets/imagesAz/products/knit-athletic-sneakers-gray.jpg",
//     name: "Waterproof Knit Athletic Sneakers - Gray",
//     rating: {
//       stars: 4,
//       count: 89
//     },
//     priceCents: 3390,
//     keywords: [
//       "shoes",
//       "running shoes",
//       "footwear"
//     ]
//   },
//   {
//     id: "5968897c-4d27-4872-89f6-5bcb052746d7",
//     image: "src/components/Assets/imagesAz/products/women-chiffon-beachwear-coverup-black.jpg",
//     name: "Women's Chiffon Beachwear Cover Up - Black",
//     rating: {
//       stars: 4.5,
//       count: 235
//     },
//     priceCents: 2070,
//     keywords: [
//       "robe",
//       "swimsuit",
//       "swimming",
//       "bathing",
//       "apparel"
//     ],
//     type: "clothing",
//     sizeChartLink: "images/clothing-size-chart.png"
//   },
//   {
//     id: "aad29d11-ea98-41ee-9285-b916638cac4a",
//     image: "src/components/Assets/imagesAz/products/round-sunglasses-black.jpg",
//     name: "Round Sunglasses",
//     rating: {
//       stars: 4.5,
//       count: 30
//     },
//     priceCents: 1560,
//     keywords: [
//       "accessories",
//       "shades"
//     ]
//   },
//   {
//     id: "04701903-bc79-49c6-bc11-1af7e3651358",
//     image: "src/components/Assets/imagesAz/products/women-beach-sandals.jpg",
//     name: "Women's Two Strap Buckle Sandals - Tan",
//     rating: {
//       stars: 4.5,
//       count: 562
//     },
//     priceCents: 2499,
//     keywords: [
//       "footwear",
//       "sandals",
//       "womens",
//       "beach",
//       "summer"
//     ]
//   },
//   {
//     id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
//     image: "src/components/Assets/imagesAz/products/blackout-curtain-set-beige.webp",
//     name: "Blackout Curtains Set 4-Pack - Beige",
//     rating: {
//       stars: 4.5,
//       count: 232
//     },
//     priceCents: 4599,
//     keywords: [
//       "bedroom",
//       "curtains",
//       "home"
//     ]
//   },
//   {
//     id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
//     image: "src/components/Assets/imagesAz/products/men-slim-fit-summer-shorts-gray.jpg",
//     name: "Men's Slim-Fit Summer Shorts",
//     rating: {
//       stars: 4,
//       count: 160
//     },
//     priceCents: 1699,
//     keywords: [
//       "shorts",
//       "apparel",
//       "mens"
//     ]
//   },
//   {
//     id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
//     image: "src/components/Assets/imagesAz/products/electric-glass-and-steel-hot-water-kettle.webp",
//     name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
//     rating: {
//       stars: 5,
//       count: 846
//     },
//     priceCents: 3074,
//     keywords: [
//       "water boiler",
//       "appliances",
//       "kitchen"
//     ]
//   },
//   {
//     id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
//     image: "src/components/Assets/imagesAz/products/facial-tissue-2-ply-18-boxes.jpg",
//     name: "Ultra Soft Tissue 2-Ply - 18 Box",
//     rating: {
//       stars: 4,
//       count: 99
//     },
//     priceCents: 2374,
//     keywords: [
//       "kleenex",
//       "tissues",
//       "kitchen",
//       "tissues box",
//       "napkins"
//     ]
//   },
//   {
//     id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
//     image: "src/components/Assets/imagesAz/products/straw-sunhat.webp",
//     name: "Straw Lifeguard Sun Hat",
//     rating: {
//       stars: 4,
//       count: 215
//     },
//     priceCents: 2200,
//     keywords: [
//       "hats",
//       "straw hats",
//       "summer",
//       "apparel"
//     ]
//   },
//   {
//     id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
//     image: "src/components/Assets/imagesAz/products/sky-flower-stud-earrings.webp",
//     name: "Sterling Silver Sky Flower Stud Earrings",
//     rating: {
//       stars: 4.5,
//       count: 52
//     },
//     priceCents: 1799,
//     keywords: [
//       "jewelry",
//       "accessories",
//       "womens"
//     ]
//   },
//   {
//     id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
//     image: "src/components/Assets/imagesAz/products/women-stretch-popover-hoodie-black.jpg",
//     name: "Women's Stretch Popover Hoodie",
//     rating: {
//       stars: 4.5,
//       count: 2465
//     },
//     priceCents: 1374,
//     keywords: [
//       "hooded",
//       "hoodies",
//       "sweaters",
//       "womens",
//       "apparel"
//     ],
//     type: "clothing",
//     sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
//   },
//   {
//     id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
//     image: "src/components/Assets/imagesAz/products/bathroom-rug.jpg",
//     name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
//     rating: {
//       stars: 4.5,
//       count: 119
//     },
//     priceCents: 1250,
//     keywords: [
//       "bathmat",
//       "bathroom",
//       "home"
//     ]
//   },
//   {
//     id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
//     image: "src/components/Assets/imagesAz/products/women-knit-ballet-flat-black.jpg",
//     name: "Women's Knit Ballet Flat",
//     rating: {
//       stars: 4,
//       count: 326
//     },
//     priceCents: 2640,
//     keywords: [
//       "shoes",
//       "flats",
//       "womens",
//       "footwear"
//     ]
//   },
//   {
//     id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
//     image: "src/components/Assets/imagesAz/products/men-golf-polo-t-shirt-blue.jpg",
//     name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
//     rating: {
//       stars: 4.5,
//       count: 2556
//     },
//     priceCents: 1599,
//     keywords: [
//       "tshirts",
//       "shirts",
//       "apparel",
//       "mens"
//     ],
//     type: "clothing",
//     sizeChartLink: "src/components/Assets/imagesAz/clothing-size-chart.png"
//   },
//   {
//     id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
//     image: "src/components/Assets/imagesAz/products/trash-can-with-foot-pedal-50-liter.jpg",
//     name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
//     rating: {
//       stars: 4.5,
//       count: 2286
//     },
//     priceCents: 8300,
//     keywords: [
//       "garbage",
//       "bins",
//       "cans",
//       "kitchen"
//     ]
//   },
//   {
//     id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
//     image: "src/components/Assets/imagesAz/products/duvet-cover-set-blue-twin.jpg",
//     name: "Duvet Cover Set with Zipper Closure",
//     rating: {
//       stars: 4,
//       count: 456
//     },
//     priceCents: 2399,
//     keywords: [
//       "bedroom",
//       "bed sheets",
//       "sheets",
//       "covers",
//       "home"
//     ]
//   },
//   {
//     id: "d2785924-743d-49b3-8f03-ec258e640503",
//     image: "src/components/Assets/imagesAz/products/women-chunky-beanie-gray.webp",
//     name: "Women's Chunky Cable Beanie - Gray",
//     rating: {
//       stars: 5,
//       count: 83
//     },
//     priceCents: 1250,
//     keywords: [
//       "hats",
//       "winter hats",
//       "beanies",
//       "tuques",
//       "apparel",
//       "womens"
//     ]
//   },
//   {
//     id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
//     image: "src/components/Assets/imagesAz/products/men-chino-pants-beige.jpg",
//     name: "Men's Classic-fit Pleated Chino Pants",
//     rating: {
//       stars: 4.5,
//       count: 9017
//     },
//     priceCents: 2290,
//     keywords: [
//       "pants",
//       "apparel",
//       "mens"
//     ]
//   },
//   {
//     id: "1c079479-8586-494f-ab53-219325432536",
//     image: "src/components/Assets/imagesAz/products/men-athletic-shoes-green.jpg",
//     name: "Men's Athletic Sneaker",
//     rating: {
//       stars: 4,
//       count: 229
//     },
//     priceCents: 3890,
//     keywords: [
//       "shoes",
//       "running shoes",
//       "footwear",
//       "mens"
//     ]
//   },
//   {
//     id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
//     image: "src/components/Assets/imagesAz/products/men-navigator-sunglasses-brown.jpg",
//     name: "Men's Navigator Sunglasses Pilot",
//     rating: {
//       stars: 3.5,
//       count: 42
//     },
//     priceCents: 1690,
//     keywords: [
//       "sunglasses",
//       "glasses",
//       "accessories",
//       "shades"
//     ]
//   },
//   {
//     id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
//     image: "src/components/Assets/imagesAz/products/non-stick-cooking-set-15-pieces.webp",
//     name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
//     rating: {
//       stars: 4.5,
//       count: 511
//     },
//     priceCents: 6797,
//     keywords: [
//       "cooking set",
//       "kitchen"
//     ]
//   },
//   {
//     id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
//     image: "src/components/Assets/imagesAz/products/vanity-mirror-silver.jpg",
//     name: "Vanity Mirror with Heavy Base - Chrome",
//     rating: {
//       stars: 4.5,
//       count: 130
//     },
//     priceCents: 1649,
//     keywords: [
//       "bathroom",
//       "washroom",
//       "mirrors",
//       "home"
//     ]
//   },
//   {
//     id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
//     image: "src/components/Assets/imagesAz/products/women-french-terry-fleece-jogger-camo.jpg",
//     name: "Women's Fleece Jogger Sweatpant",
//     rating: {
//       stars: 4.5,
//       count: 248
//     },
//     priceCents: 2400,
//     keywords: [
//       "pants",
//       "sweatpants",
//       "jogging",
//       "apparel",
//       "womens"
//     ]
//   },
//   {
//     id: "d339adf3-e004-4c20-a120-40e8874c66cb",
//     image: "src/components/Assets/imagesAz/products/double-elongated-twist-french-wire-earrings.webp",
//     name: "Double Oval Twist French Wire Earrings - Gold",
//     rating: {
//       stars: 4.5,
//       count: 117
//     },
//     priceCents: 2400,
//     keywords: [
//       "accessories",
//       "womens"
//     ]
//   },
//   {
//     id: "d37a651a-d501-483b-aae6-a9659b0757a0",
//     image: "src/components/Assets/imagesAz/products/round-airtight-food-storage-containers.jpg",
//     name: "Round Airtight Food Storage Containers - 5 Piece",
//     rating: {
//       stars: 4,
//       count: 126
//     },
//     priceCents: 2899,
//     keywords: [
//       "boxes",
//       "food containers",
//       "kitchen"
//     ]
//   },
//   {
//     id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
//     image: "src/components/Assets/imagesAz/products/coffeemaker-with-glass-carafe-black.jpg",
//     name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
//     rating: {
//       stars: 4.5,
//       count: 1211
//     },
//     priceCents: 2250,
//     keywords: [
//       "coffeemakers",
//       "kitchen",
//       "appliances"
//     ]
//   },
//   {
//     id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
//     image: "src/components/Assets/imagesAz/products/blackout-curtains-black.jpg",
//     name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
//     rating: {
//       stars: 4.5,
//       count: 363
//     },
//     priceCents: 3099,
//     keywords: [
//       "bedroom",
//       "home"
//     ]
//   },
//   {
//     id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
//     image: "src/components/Assets/imagesAz/products/cotton-bath-towels-teal.webp",
//     name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
//     rating: {
//       stars: 4.5,
//       count: 93
//     },
//     priceCents: 2110,
//     keywords: [
//       "bathroom",
//       "home",
//       "towels"
//     ]
//   },
//   {
//     id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
//     image: "src/components/Assets/imagesAz/products/knit-athletic-sneakers-pink.webp",
//     name: "Waterproof Knit Athletic Sneakers - Pink",
//     rating: {
//       stars: 4,
//       count: 89
//     },
//     priceCents: 3390,
//     keywords: [
//       "shoes",
//       "running shoes",
//       "footwear",
//       "womens"
//     ]
//   },
//   {
//     id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
//     image: "src/components/Assets/imagesAz/products/countertop-blender-64-oz.jpg",
//     name: "Countertop Blender - 64oz, 1400 Watts",
//     rating: {
//       stars: 4,
//       count: 3
//     },
//     priceCents: 10747,
//     keywords: [
//       "food blenders",
//       "kitchen",
//       "appliances"
//     ]
//   },
//   {
//     id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
//     image: "src/components/Assets/imagesAz/products/floral-mixing-bowl-set.jpg",
//     name: "10-Piece Mixing Bowl Set with Lids - Floral",
//     rating: {
//       stars: 5,
//       count: 679
//     },
//     priceCents: 3899,
//     keywords: [
//       "mixing bowls",
//       "baking",
//       "cookware",
//       "kitchen"
//     ]
//   },
//   {
//     id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
//     image: "src/components/Assets/imagesAz/products/kitchen-paper-towels-30-pack.jpg",
//     name: "2-Ply Kitchen Paper Towels - 30 Pack",
//     rating: {
//       stars: 4.5,
//       count: 1045
//     },
//     priceCents: 5799,
//     keywords: [
//       "kitchen",
//       "kitchen towels",
//       "tissues"
//     ]
//   },
//   {
//     id: "bc2847e9-5323-403f-b7cf-57fde044a955",
//     image: "src/components/Assets/imagesAz/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
//     name: "Men's Full-Zip Hooded Fleece Sweatshirt",
//     rating: {
//       stars: 4.5,
//       count: 3157
//     },
//     priceCents: 2400,
//     keywords: [
//       "sweaters",
//       "hoodies",
//       "apparel",
//       "mens"
//     ]
//   }
// ];

