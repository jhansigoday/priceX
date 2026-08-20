import { useState } from "react";
import { Search, ShoppingCart, Clock, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const categories = [
  { name: "Vegetables", icon: "🥬", color: "bg-green-100 text-green-800" },
  { name: "Fruits", icon: "🍎", color: "bg-red-100 text-red-800" },
  { name: "Dairy", icon: "🥛", color: "bg-blue-100 text-blue-800" },
  { name: "Snacks", icon: "🍿", color: "bg-yellow-100 text-yellow-800" },
  { name: "Beverages", icon: "🥤", color: "bg-purple-100 text-purple-800" },
  { name: "Personal Care", icon: "🧴", color: "bg-pink-100 text-pink-800" },
];

const groceryProducts = [
  // Vegetables (5 items)
  {
    id: 1,
    name: "Tomatoes 1kg",
    category: "Vegetables",
    image: "🍅",
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Farm Fresh", stock: "Available" },
      { name: "Blinkit", price: 50, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Limited" },
      { name: "Zepto", price: 48, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 2,
    name: "Onions 1kg",
    category: "Vegetables",
    image: "🧅",
    platforms: [
      { name: "BigBasket", price: 35, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Farm Fresh", stock: "Available" },
      { name: "Blinkit", price: 40, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 38, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 3,
    name: "Potatoes 1kg",
    category: "Vegetables",
    image: "🥔",
    platforms: [
      { name: "BigBasket", price: 30, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Farm Fresh", stock: "Available" },
      { name: "Blinkit", price: 35, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 32, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Limited" },
    ]
  },
  {
    id: 4,
    name: "Carrots 1kg",
    category: "Vegetables",
    image: "🥕",
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Organic", stock: "Available" },
      { name: "Blinkit", price: 60, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 58, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 5,
    name: "Green Beans 500g",
    category: "Vegetables",
    image: "🫛",
    platforms: [
      { name: "BigBasket", price: 40, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Farm Fresh", stock: "Available" },
      { name: "Blinkit", price: 45, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Limited" },
      { name: "Zepto", price: 42, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  
  // Fruits (5 items)
  {
    id: 6,
    name: "Red Apples 1kg",
    category: "Fruits",
    image: "🍎",
    platforms: [
      { name: "BigBasket", price: 220, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 250, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 240, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Limited" },
    ]
  },
  {
    id: 7,
    name: "Bananas 1 dozen",
    category: "Fruits",
    image: "🍌",
    platforms: [
      { name: "BigBasket", price: 60, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 65, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 68, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Limited" },
    ]
  },
  {
    id: 8,
    name: "Oranges 1kg",
    category: "Fruits",
    image: "🍊",
    platforms: [
      { name: "BigBasket", price: 120, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 130, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 125, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 9,
    name: "Grapes 500g",
    category: "Fruits",
    image: "🍇",
    platforms: [
      { name: "BigBasket", price: 180, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Premium", stock: "Available" },
      { name: "Blinkit", price: 200, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Limited" },
      { name: "Zepto", price: 190, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 10,
    name: "Mangoes 1kg",
    category: "Fruits",
    image: "🥭",
    platforms: [
      { name: "BigBasket", price: 280, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Alphonso", stock: "Available" },
      { name: "Blinkit", price: 320, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 300, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Limited" },
    ]
  },

  // Dairy (5 items)
  {
    id: 11,
    name: "Amul Milk 1L",
    category: "Dairy",
    image: "🥛",
    platforms: [
      { name: "BigBasket", price: 65, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 68, deliveryTime: "15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 70, deliveryTime: "10 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 12,
    name: "Paneer 200g",
    category: "Dairy",
    image: "🧀",
    platforms: [
      { name: "BigBasket", price: 90, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 95, deliveryTime: "15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 92, deliveryTime: "10 min", deliveryCharge: 10, brand: "Amul", stock: "Limited" },
    ]
  },
  {
    id: 13,
    name: "Yogurt 400g",
    category: "Dairy",
    image: "🥄",
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 50, deliveryTime: "15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 48, deliveryTime: "10 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 14,
    name: "Butter 100g",
    category: "Dairy",
    image: "🧈",
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 60, deliveryTime: "15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 58, deliveryTime: "10 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 15,
    name: "Eggs 1 dozen",
    category: "Dairy",
    image: "🥚",
    platforms: [
      { name: "BigBasket", price: 75, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Farm Fresh", stock: "Available" },
      { name: "Blinkit", price: 80, deliveryTime: "15 min", deliveryCharge: 15, brand: "Premium", stock: "Available" },
      { name: "Zepto", price: 78, deliveryTime: "10 min", deliveryCharge: 10, brand: "Fresh", stock: "Limited" },
    ]
  },

  // Beverages (5 items)
  {
    id: 16,
    name: "Tea Powder 250g",
    category: "Beverages",
    image: "🍵",
    platforms: [
      { name: "BigBasket", price: 85, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Tata Tea", stock: "Available" },
      { name: "Blinkit", price: 90, deliveryTime: "15 min", deliveryCharge: 15, brand: "Tata Tea", stock: "Available" },
      { name: "Zepto", price: 88, deliveryTime: "10 min", deliveryCharge: 10, brand: "Tata Tea", stock: "Available" },
    ]
  },
  {
    id: 17,
    name: "Coffee Powder 200g",
    category: "Beverages",
    image: "☕",
    platforms: [
      { name: "BigBasket", price: 150, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Nescafe", stock: "Available" },
      { name: "Blinkit", price: 155, deliveryTime: "15 min", deliveryCharge: 15, brand: "Nescafe", stock: "Available" },
      { name: "Zepto", price: 152, deliveryTime: "10 min", deliveryCharge: 10, brand: "Nescafe", stock: "Available" },
    ]
  },
  {
    id: 18,
    name: "Soft Drink 2L",
    category: "Beverages",
    image: "🥤",
    platforms: [
      { name: "BigBasket", price: 85, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Coca Cola", stock: "Available" },
      { name: "Blinkit", price: 90, deliveryTime: "15 min", deliveryCharge: 15, brand: "Coca Cola", stock: "Available" },
      { name: "Zepto", price: 88, deliveryTime: "10 min", deliveryCharge: 10, brand: "Coca Cola", stock: "Limited" },
    ]
  },
  {
    id: 19,
    name: "Fruit Juice 1L",
    category: "Beverages",
    image: "🧃",
    platforms: [
      { name: "BigBasket", price: 120, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Real", stock: "Available" },
      { name: "Blinkit", price: 125, deliveryTime: "15 min", deliveryCharge: 15, brand: "Real", stock: "Available" },
      { name: "Zepto", price: 122, deliveryTime: "10 min", deliveryCharge: 10, brand: "Real", stock: "Available" },
    ]
  },
  {
    id: 20,
    name: "Energy Drink 250ml",
    category: "Beverages",
    image: "⚡",
    platforms: [
      { name: "BigBasket", price: 65, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Red Bull", stock: "Available" },
      { name: "Blinkit", price: 70, deliveryTime: "15 min", deliveryCharge: 15, brand: "Red Bull", stock: "Available" },
      { name: "Zepto", price: 68, deliveryTime: "10 min", deliveryCharge: 10, brand: "Red Bull", stock: "Available" },
    ]
  },

  // Personal Care (5 items)
  {
    id: 21,
    name: "Toothpaste 100g",
    category: "Personal Care",
    image: "🦷",
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Colgate", stock: "Available" },
      { name: "Blinkit", price: 48, deliveryTime: "15 min", deliveryCharge: 15, brand: "Colgate", stock: "Available" },
      { name: "Zepto", price: 46, deliveryTime: "10 min", deliveryCharge: 10, brand: "Colgate", stock: "Available" },
    ]
  },
  {
    id: 22,
    name: "Shampoo 200ml",
    category: "Personal Care",
    image: "🧴",
    platforms: [
      { name: "BigBasket", price: 180, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Head & Shoulders", stock: "Available" },
      { name: "Blinkit", price: 185, deliveryTime: "15 min", deliveryCharge: 15, brand: "Head & Shoulders", stock: "Available" },
      { name: "Zepto", price: 182, deliveryTime: "10 min", deliveryCharge: 10, brand: "Head & Shoulders", stock: "Limited" },
    ]
  },
  {
    id: 23,
    name: "Body Soap 125g",
    category: "Personal Care",
    image: "🧼",
    platforms: [
      { name: "BigBasket", price: 35, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Dove", stock: "Available" },
      { name: "Blinkit", price: 38, deliveryTime: "15 min", deliveryCharge: 15, brand: "Dove", stock: "Available" },
      { name: "Zepto", price: 36, deliveryTime: "10 min", deliveryCharge: 10, brand: "Dove", stock: "Available" },
    ]
  },
  {
    id: 24,
    name: "Face Cream 50g",
    category: "Personal Care",
    image: "🧴",
    platforms: [
      { name: "BigBasket", price: 250, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Olay", stock: "Available" },
      { name: "Blinkit", price: 260, deliveryTime: "15 min", deliveryCharge: 15, brand: "Olay", stock: "Available" },
      { name: "Zepto", price: 255, deliveryTime: "10 min", deliveryCharge: 10, brand: "Olay", stock: "Available" },
    ]
  },
  {
    id: 25,
    name: "Deodorant 150ml",
    category: "Personal Care",
    image: "💨",
    platforms: [
      { name: "BigBasket", price: 180, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Axe", stock: "Available" },
      { name: "Blinkit", price: 185, deliveryTime: "15 min", deliveryCharge: 15, brand: "Axe", stock: "Available" },
      { name: "Zepto", price: 182, deliveryTime: "10 min", deliveryCharge: 10, brand: "Axe", stock: "Limited" },
    ]
  },

  // Snacks (5 items)
  {
    id: 26,
    name: "Biscuits Pack",
    category: "Snacks",
    image: "🍪",
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Parle-G", stock: "Available" },
      { name: "Blinkit", price: 48, deliveryTime: "15 min", deliveryCharge: 15, brand: "Parle-G", stock: "Available" },
      { name: "Zepto", price: 50, deliveryTime: "10 min", deliveryCharge: 10, brand: "Parle-G", stock: "Limited" },
    ]
  },
  {
    id: 27,
    name: "Potato Chips 100g",
    category: "Snacks",
    image: "🍟",
    platforms: [
      { name: "BigBasket", price: 30, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Lays", stock: "Available" },
      { name: "Blinkit", price: 32, deliveryTime: "15 min", deliveryCharge: 15, brand: "Lays", stock: "Available" },
      { name: "Zepto", price: 31, deliveryTime: "10 min", deliveryCharge: 10, brand: "Lays", stock: "Available" },
    ]
  },
  {
    id: 28,
    name: "Namkeen Mix 200g",
    category: "Snacks",
    image: "🥜",
    platforms: [
      { name: "BigBasket", price: 65, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Haldiram", stock: "Available" },
      { name: "Blinkit", price: 70, deliveryTime: "15 min", deliveryCharge: 15, brand: "Haldiram", stock: "Available" },
      { name: "Zepto", price: 68, deliveryTime: "10 min", deliveryCharge: 10, brand: "Haldiram", stock: "Available" },
    ]
  },
  {
    id: 29,
    name: "Chocolate Bar 50g",
    category: "Snacks",
    image: "🍫",
    platforms: [
      { name: "BigBasket", price: 40, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Cadbury", stock: "Available" },
      { name: "Blinkit", price: 42, deliveryTime: "15 min", deliveryCharge: 15, brand: "Cadbury", stock: "Available" },
      { name: "Zepto", price: 41, deliveryTime: "10 min", deliveryCharge: 10, brand: "Cadbury", stock: "Limited" },
    ]
  },
  {
    id: 30,
    name: "Popcorn 100g",
    category: "Snacks",
    image: "🍿",
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2 hours", deliveryCharge: 25, brand: "Act II", stock: "Available" },
      { name: "Blinkit", price: 60, deliveryTime: "15 min", deliveryCharge: 15, brand: "Act II", stock: "Available" },
      { name: "Zepto", price: 58, deliveryTime: "10 min", deliveryCharge: 10, brand: "Act II", stock: "Available" },
    ]
  }
];

const vegetables = groceryProducts.filter(p => p.category === "Vegetables");
const fruits = groceryProducts.filter(p => p.category === "Fruits");
const dairy = groceryProducts.filter(p => p.category === "Dairy");
const snacks = groceryProducts.filter(p => p.category === "Snacks");
const beverages = groceryProducts.filter(p => p.category === "Beverages");
const personalCare = groceryProducts.filter(p => p.category === "Personal Care");

const dailyEssentials = [
  { name: "Milk", icon: "🥛", category: "Dairy" },
  { name: "Bread", icon: "🍞", category: "Bakery" },
  { name: "Eggs", icon: "🥚", category: "Dairy" },
  { name: "Rice", icon: "🌾", category: "Grains" },
  { name: "Oil", icon: "🛢️", category: "Oil" },
  { name: "Sugar", icon: "🍚", category: "Sweeteners" },
];

// Price disclaimer component
const PriceDisclaimer = () => (
  <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg flex items-start gap-3">
    <span className="text-lg">ℹ️</span>
    <div className="text-sm text-muted-foreground">
      <strong className="text-foreground">Prices shown are approximate estimates</strong> based on typical market prices. 
      Final prices, delivery charges, and stock availability may vary on partner websites. 
      Always verify on BigBasket, Blinkit, or Zepto before purchasing.
    </div>
  </div>
);

export const Groceries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showCart, setShowCart] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() || selectedCategory) {
      setShowResults(true);
      setShowCart(false);
    } else {
      toast({
        title: "Please enter a search term or select a category",
        description: "Type a product name or choose a category to search",
        variant: "destructive"
      });
    }
  };

  const handleAddToCart = (productName: string, platform: string, price: number) => {
    const cartKey = `${productName}-${platform}`;
    setCart(prev => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1
    }));
    
    toast({
      title: "Added to Cart",
      description: `${productName} added to ${platform} cart`,
    });
  };

  const handleDirectBuy = (platform: string, product: string, brand?: string) => {
    // Build platform-specific search URLs with product details
    const searchTerm = brand ? `${brand} ${product}` : product;
    const encodedSearch = encodeURIComponent(searchTerm);
    
    const getPlatformUrl = () => {
      switch (platform) {
        case "BigBasket":
          return `https://www.bigbasket.com/ps/?q=${encodedSearch}`;
        case "Blinkit":
          return `https://blinkit.com/s/?q=${encodedSearch}`;
        case "Zepto":
          return `https://www.zeptonow.com/search?query=${encodedSearch}`;
        default:
          return `https://www.google.com/search?tbm=shop&q=${encodedSearch}`;
      }
    };

    const url = getPlatformUrl();
    window.open(url, '_blank');
    
    toast({
      title: `Redirecting to ${platform}...`,
      description: `Searching "${searchTerm}" on ${platform}`,
    });
  };

  const getCartTotal = (platform: string) => {
    let total = 0;
    let deliveryCharge = 0;
    let deliveryTime = "";
    
    Object.keys(cart).forEach(cartKey => {
      if (cartKey.endsWith(`-${platform}`) && cart[cartKey] > 0) {
        const productName = cartKey.replace(`-${platform}`, '');
        const product = [...vegetables, ...fruits, ...beverages, ...dairy, ...personalCare, ...snacks]
          .find(p => p.name === productName);
        if (product) {
          const platformData = product.platforms.find(p => p.name === platform);
          if (platformData) {
            total += platformData.price * cart[cartKey];
          }
        }
      }
    });

    // Set delivery charges and times based on platform
    switch (platform) {
      case "BigBasket":
        deliveryCharge = total > 200 ? 0 : 40;
        deliveryTime = "Next day";
        break;
      case "Blinkit":
        deliveryCharge = 25;
        deliveryTime = "10-15 min";
        break;
      case "Zepto":
        deliveryCharge = 30;
        deliveryTime = "10-12 min";
        break;
    }

    return { total, deliveryCharge, deliveryTime, grandTotal: total + deliveryCharge };
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const filteredProducts = selectedCategory 
    ? groceryProducts.filter(product => product.category === selectedCategory)
    : searchQuery.trim() 
      ? groceryProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : groceryProducts;

  return (
    <div className="py-8 fade-in">
      <PriceDisclaimer />
      
      {!showResults ? (
        <>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Compare Grocery Prices
            </h2>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products (e.g., rice, milk, vegetables)"
                className="search-input pl-12 pr-32 py-4 text-lg"
              />
              <Button 
                onClick={handleSearch}
                className="absolute right-2 top-2 btn-hero"
              >
                Search Products
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleSearch}
                className="btn-hero px-8 py-3"
                disabled={!searchQuery.trim() && !selectedCategory}
              >
                Search Products
              </Button>
              {getCartItemCount() > 0 && (
                <Button 
                  onClick={() => setShowCart(true)}
                  variant="outline"
                  className="px-8 py-3 relative"
                >
                  View Cart ({getCartItemCount()})
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setShowResults(true);
                  }}
                  className="platform-card text-center p-6 group"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Essentials */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Daily Essentials</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dailyEssentials.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(item.name.toLowerCase());
                    setShowResults(true);
                  }}
                  className="platform-card text-center p-6 group"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : showCart ? (
        <div className="slide-up">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Shopping Cart Comparison
              </h2>
              <p className="text-muted-foreground">
                Compare total costs across all platforms
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowCart(false)}>
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {["BigBasket", "Blinkit", "Zepto"].map(platform => {
              const cartSummary = getCartTotal(platform);
              const hasItems = cartSummary.total > 0;
              
              return (
                <div key={platform} className={`comparison-card ${!hasItems ? 'opacity-50' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-foreground text-lg">{platform}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{cartSummary.grandTotal}</div>
                      <p className="text-xs text-muted-foreground">Total with delivery</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Items Total</span>
                      <span className="font-medium">₹{cartSummary.total}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Delivery Charge</span>
                      <span className="font-medium">₹{cartSummary.deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Delivery Time</span>
                      <span className="font-medium">{cartSummary.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t pt-2 mt-2">
                      <span className="font-semibold text-foreground">Grand Total</span>
                      <span className="font-bold text-primary">₹{cartSummary.grandTotal}</span>
                    </div>
                  </div>

                  {hasItems && (
                    <Button 
                      onClick={() => handleDirectBuy(platform, "cart items")}
                      className="w-full btn-hero"
                    >
                      Checkout on {platform}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cart Items Detail */}
          <div className="comparison-card">
            <h3 className="text-xl font-bold text-foreground mb-4">Cart Items</h3>
            <div className="space-y-3">
              {Object.keys(cart).filter(key => cart[key] > 0).map(cartKey => {
                const [productName, platform] = cartKey.split('-');
                const product = [...vegetables, ...fruits, ...beverages, ...dairy, ...personalCare, ...snacks]
                  .find(p => p.name === productName);
                const platformData = product?.platforms.find(p => p.name === platform);
                
                return (
                  <div key={cartKey} className="flex justify-between items-center py-2 border-b border-border">
                    <div>
                      <span className="font-medium">{productName}</span>
                      <span className="text-muted-foreground text-sm ml-2">on {platform}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">Qty: {cart[cartKey]}</span>
                      {platformData && (
                        <span className="font-medium">₹{platformData.price * cart[cartKey]}</span>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCart(prev => ({ ...prev, [cartKey]: 0 }))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="slide-up">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCategory ? `${selectedCategory} Products` : `Results for "${searchQuery}"`}
              </h2>
              <p className="text-muted-foreground">
                Compare prices across platforms
              </p>
            </div>
            <div className="flex gap-2">
              {getCartItemCount() > 0 && (
                <Button variant="outline" onClick={() => setShowCart(true)}>
                  View Cart ({getCartItemCount()})
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowResults(false)}>
                New Search
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="comparison-card">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{product.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                      <p className="text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                </div>

                {/* Platform Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.platforms.map((platform, index) => (
                    <div key={index} className="platform-card">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-foreground text-lg">{platform.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">₹{platform.price}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            Delivery
                          </span>
                          <span className="font-medium">{platform.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-muted-foreground">
                            <Package className="w-4 h-4 mr-1" />
                            Brand
                          </span>
                          <span className="font-medium">{platform.brand}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Stock</span>
                          <span className={`font-medium ${platform.stock === "Available" ? "text-success" : "text-warning"}`}>
                            {platform.stock}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Delivery Charge</span>
                          <span className="font-medium">₹{platform.deliveryCharge}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm border-t pt-2 mt-2">
                          <span className="font-semibold text-foreground">Total Cost</span>
                          <span className="font-bold text-primary">₹{platform.price + platform.deliveryCharge}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleAddToCart(product.name, platform.name, platform.price)}
                          className="flex-1 btn-hero text-sm"
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          onClick={() => handleDirectBuy(platform.name, product.name, platform.brand)}
                          variant="outline"
                          className="flex-1 text-sm"
                          size="sm"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
