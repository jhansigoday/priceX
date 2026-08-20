import { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, Trash2, Clock, Star, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import groceriesImg from "@/assets/groceries-hero.jpg";
import vegetablesImg from "@/assets/grocery-vegetables.jpg";
import fruitsImg from "@/assets/grocery-fruits.jpg";
import dairyImg from "@/assets/grocery-dairy.jpg";
import tomatoesImg from "@/assets/tomatoes.jpg";
import onionsImg from "@/assets/onions.jpg";
import carrotsImg from "@/assets/carrots.jpg";
import potatoesImg from "@/assets/potatoes.jpg";
import spinachImg from "@/assets/spinach.jpg";
import bananasImg from "@/assets/bananas.jpg";
import applesImg from "@/assets/apples.jpg";
import orangesImg from "@/assets/oranges.jpg";
import mangoesImg from "@/assets/mangoes.jpg";
import grapesImg from "@/assets/grapes.jpg";
import milkImg from "@/assets/milk.jpg";
import teaImg from "@/assets/tea.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import juiceImg from "@/assets/juice.jpg";
import yogurtImg from "@/assets/yogurt.jpg";
import paneerImg from "@/assets/paneer.jpg";
import softDrinkImg from "@/assets/soft-drink.jpg";
import cheeseImg from "@/assets/cheese.jpg";
import butterImg from "@/assets/butter.jpg";
import iceCreamImg from "@/assets/ice-cream.jpg";
import toothpasteImg from "@/assets/toothpaste.jpg";
import shampooImg from "@/assets/shampoo.jpg";
import soapImg from "@/assets/soap.jpg";
import deodorantImg from "@/assets/deodorant.jpg";
import faceCreamImg from "@/assets/face-cream.jpg";
import chipsImg from "@/assets/chips.jpg";
import cookiesImg from "@/assets/cookies.jpg";
import chocolateImg from "@/assets/chocolate.jpg";
import nutsImg from "@/assets/nuts.jpg";
import namkeenImg from "@/assets/namkeen.jpg";

// Mock data for grocery items
const groceryItems = [
  // Vegetables (5 items)
  {
    id: 1,
    name: "Tomatoes 1kg",
    category: "Vegetables",
    image: tomatoesImg,
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 50, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 48, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 2,
    name: "Onions 1kg",
    category: "Vegetables",
    image: onionsImg,
    platforms: [
      { name: "BigBasket", price: 35, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 40, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 38, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 3,
    name: "Carrots 500g",
    category: "Vegetables",
    image: carrotsImg,
    platforms: [
      { name: "BigBasket", price: 25, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 30, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 28, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 4,
    name: "Potatoes 1kg",
    category: "Vegetables",
    image: potatoesImg,
    platforms: [
      { name: "BigBasket", price: 30, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 35, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 32, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 5,
    name: "Spinach 250g",
    category: "Vegetables",
    image: spinachImg,
    platforms: [
      { name: "BigBasket", price: 20, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 25, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 22, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },

  // Fruits (5 items)
  {
    id: 6,
    name: "Bananas 1kg",
    category: "Fruits",
    image: bananasImg,
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 60, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 58, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 7,
    name: "Apples 1kg",
    category: "Fruits",
    image: applesImg,
    platforms: [
      { name: "BigBasket", price: 150, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 160, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 155, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 8,
    name: "Oranges 1kg",
    category: "Fruits",
    image: orangesImg,
    platforms: [
      { name: "BigBasket", price: 80, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 85, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 82, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 9,
    name: "Mangoes 1kg",
    category: "Fruits",
    image: mangoesImg,
    platforms: [
      { name: "BigBasket", price: 200, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 220, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Limited" },
      { name: "Zepto", price: 210, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },
  {
    id: 10,
    name: "Grapes 500g",
    category: "Fruits",
    image: grapesImg,
    platforms: [
      { name: "BigBasket", price: 120, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Fresh", stock: "Available" },
      { name: "Blinkit", price: 130, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Fresh", stock: "Available" },
      { name: "Zepto", price: 125, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Fresh", stock: "Available" },
    ]
  },

  // Beverages (5 items)
  {
    id: 11,
    name: "Milk 1L",
    category: "Beverages",
    image: milkImg,
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 58, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 56, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 12,
    name: "Tea 250g",
    category: "Beverages",
    image: teaImg,
    platforms: [
      { name: "BigBasket", price: 140, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Tata Tea", stock: "Available" },
      { name: "Blinkit", price: 145, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Tata Tea", stock: "Available" },
      { name: "Zepto", price: 142, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Tata Tea", stock: "Available" },
    ]
  },
  {
    id: 13,
    name: "Coffee 200g",
    category: "Beverages",
    image: coffeeImg,
    platforms: [
      { name: "BigBasket", price: 150, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Nescafe", stock: "Available" },
      { name: "Blinkit", price: 155, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Nescafe", stock: "Available" },
      { name: "Zepto", price: 152, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Nescafe", stock: "Available" },
    ]
  },
  {
    id: 14,
    name: "Soft Drink 2L",
    category: "Beverages",
    image: softDrinkImg,
    platforms: [
      { name: "BigBasket", price: 85, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Coca Cola", stock: "Available" },
      { name: "Blinkit", price: 90, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Coca Cola", stock: "Available" },
      { name: "Zepto", price: 88, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Coca Cola", stock: "Limited" },
    ]
  },
  {
    id: 15,
    name: "Fruit Juice 1L",
    category: "Beverages",
    image: juiceImg,
    platforms: [
      { name: "BigBasket", price: 120, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Real", stock: "Available" },
      { name: "Blinkit", price: 125, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Real", stock: "Available" },
      { name: "Zepto", price: 122, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Real", stock: "Available" },
    ]
  },

  // Dairy (5 items)
  {
    id: 16,
    name: "Yogurt 400g",
    category: "Dairy",
    image: yogurtImg,
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 48, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 46, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 17,
    name: "Cheese 200g",
    category: "Dairy",
    image: cheeseImg,
    platforms: [
      { name: "BigBasket", price: 180, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 185, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 182, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 18,
    name: "Butter 100g",
    category: "Dairy",
    image: butterImg,
    platforms: [
      { name: "BigBasket", price: 55, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 58, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 56, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 19,
    name: "Paneer 250g",
    category: "Dairy",
    image: paneerImg,
    platforms: [
      { name: "BigBasket", price: 80, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 85, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 82, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },
  {
    id: 20,
    name: "Ice Cream 500ml",
    category: "Dairy",
    image: iceCreamImg,
    platforms: [
      { name: "BigBasket", price: 120, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Amul", stock: "Available" },
      { name: "Blinkit", price: 125, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Amul", stock: "Available" },
      { name: "Zepto", price: 122, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Amul", stock: "Available" },
    ]
  },

  // Personal Care (5 items)
  {
    id: 21,
    name: "Toothpaste 100g",
    category: "Personal Care",
    image: toothpasteImg,
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Colgate", stock: "Available" },
      { name: "Blinkit", price: 48, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Colgate", stock: "Available" },
      { name: "Zepto", price: 46, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Colgate", stock: "Available" },
    ]
  },
  {
    id: 22,
    name: "Shampoo 200ml",
    category: "Personal Care",
    image: shampooImg,
    platforms: [
      { name: "BigBasket", price: 180, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Head & Shoulders", stock: "Available" },
      { name: "Blinkit", price: 185, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Head & Shoulders", stock: "Available" },
      { name: "Zepto", price: 182, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Head & Shoulders", stock: "Available" },
    ]
  },
  {
    id: 23,
    name: "Soap 100g",
    category: "Personal Care",
    image: soapImg,
    platforms: [
      { name: "BigBasket", price: 25, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Dove", stock: "Available" },
      { name: "Blinkit", price: 28, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Dove", stock: "Available" },
      { name: "Zepto", price: 26, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Dove", stock: "Available" },
    ]
  },
  {
    id: 24,
    name: "Deodorant 150ml",
    category: "Personal Care",
    image: deodorantImg,
    platforms: [
      { name: "BigBasket", price: 150, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Axe", stock: "Available" },
      { name: "Blinkit", price: 155, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Axe", stock: "Available" },
      { name: "Zepto", price: 152, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Axe", stock: "Available" },
    ]
  },
  {
    id: 25,
    name: "Face Cream 50g",
    category: "Personal Care",
    image: faceCreamImg,
    platforms: [
      { name: "BigBasket", price: 220, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Lakme", stock: "Available" },
      { name: "Blinkit", price: 225, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Lakme", stock: "Available" },
      { name: "Zepto", price: 222, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Lakme", stock: "Available" },
    ]
  },

  // Snacks (5 items)
  {
    id: 26,
    name: "Chips 100g",
    category: "Snacks",
    image: chipsImg,
    platforms: [
      { name: "BigBasket", price: 25, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Lays", stock: "Available" },
      { name: "Blinkit", price: 28, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Lays", stock: "Available" },
      { name: "Zepto", price: 26, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Lays", stock: "Available" },
    ]
  },
  {
    id: 27,
    name: "Cookies 200g",
    category: "Snacks",
    image: cookiesImg,
    platforms: [
      { name: "BigBasket", price: 45, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Parle G", stock: "Available" },
      { name: "Blinkit", price: 48, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Parle G", stock: "Available" },
      { name: "Zepto", price: 46, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Parle G", stock: "Available" },
    ]
  },
  {
    id: 28,
    name: "Chocolate 50g",
    category: "Snacks",
    image: chocolateImg,
    platforms: [
      { name: "BigBasket", price: 35, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Cadbury", stock: "Available" },
      { name: "Blinkit", price: 38, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Cadbury", stock: "Available" },
      { name: "Zepto", price: 36, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Cadbury", stock: "Available" },
    ]
  },
  {
    id: 29,
    name: "Nuts Mix 100g",
    category: "Snacks",
    image: nutsImg,
    platforms: [
      { name: "BigBasket", price: 80, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Haldiram", stock: "Available" },
      { name: "Blinkit", price: 85, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Haldiram", stock: "Available" },
      { name: "Zepto", price: 82, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Haldiram", stock: "Available" },
    ]
  },
  {
    id: 30,
    name: "Namkeen 150g",
    category: "Snacks",
    image: namkeenImg,
    platforms: [
      { name: "BigBasket", price: 50, deliveryTime: "2-4 hours", deliveryCharge: 25, brand: "Haldiram", stock: "Available" },
      { name: "Blinkit", price: 55, deliveryTime: "10-15 min", deliveryCharge: 15, brand: "Haldiram", stock: "Available" },
      { name: "Zepto", price: 52, deliveryTime: "8-12 min", deliveryCharge: 10, brand: "Haldiram", stock: "Available" },
    ]
  }
];

const categories = ["All", "Vegetables", "Fruits", "Beverages", "Dairy", "Personal Care", "Snacks"];

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  platforms: {
    name: string;
    price: number;
    deliveryTime: string;
    deliveryCharge: number;
  }[];
}

export const GroceriesNew = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: typeof groceryItems[0]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: 1,
        platforms: item.platforms
      }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${item.name} added to your cart`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculatePlatformTotal = (platformName: string) => {
    let itemsTotal = 0;
    let deliveryCharge = 0;
    
    cart.forEach(item => {
      const platform = item.platforms.find(p => p.name === platformName);
      if (platform) {
        itemsTotal += platform.price * item.quantity;
        deliveryCharge = platform.deliveryCharge; // Same delivery charge for all items
      }
    });
    
    return { itemsTotal, deliveryCharge, total: itemsTotal + deliveryCharge };
  };

  const getBestDeal = () => {
    const platforms = ["BigBasket", "Blinkit", "Zepto"];
    const totals = platforms.map(platform => ({
      platform,
      ...calculatePlatformTotal(platform)
    }));
    
    return totals.sort((a, b) => a.total - b.total)[0];
  };

  const handleOrderFromPlatform = (platform: string) => {
    const platformUrls = {
      "BigBasket": "https://www.bigbasket.com",
      "Blinkit": "https://blinkit.com",
      "Zepto": "https://www.zepto.com"
    };
    
    const url = platformUrls[platform as keyof typeof platformUrls];
    if (url) {
      window.open(url, '_blank');
    }
    
    toast({
      title: `Redirecting to ${platform}...`,
      description: `Opening your cart on ${platform}`,
    });
  };

  const getCategoryImage = (category: string) => {
    switch(category) {
      case "Vegetables": return vegetablesImg;
      case "Fruits": return fruitsImg;
      case "Dairy": return dairyImg;
      default: return groceriesImg;
    }
  };

  return (
    <div className="min-h-screen py-8 fade-in">
      {/* Hero Banner */}
      <div className="relative h-64 rounded-3xl overflow-hidden mb-12">
        <img src={groceriesImg} alt="Fresh Groceries" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-8">
            <h1 className="text-5xl font-bold text-white mb-3">Fresh Groceries Delivered</h1>
            <p className="text-xl text-white/90">Compare prices • Save money • Get the best deals</p>
          </div>
        </div>
      </div>

      {/* Header with Cart */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Shop Smart, Save More</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Package className="w-4 h-4" />
            Compare prices across BigBasket, Blinkit & Zepto
          </p>
        </div>
        <Button
          onClick={() => {
            if (cart.length === 0) {
              toast({
                title: "Cart is empty",
                description: "Add items to your cart first",
                variant: "destructive"
              });
              return;
            }
            setShowComparison(true);
            setShowCart(false);
          }}
          variant="default"
          className="relative gap-2 btn-hero"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Compare Prices</span>
          {getTotalItems() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Live Data Status Alert */}
      <div className="mb-8 p-4 bg-muted/50 border border-border rounded-2xl flex items-start gap-3">
        <span className="text-lg">ℹ️</span>
        <div className="text-sm text-muted-foreground flex-1">
          <div className="flex flex-wrap gap-2 items-center mb-1">
            <strong className="text-foreground font-semibold">Live comparison is currently offline</strong>
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500 text-xs">
              Live Scraping Unavailable
            </Badge>
          </div>
          Due to Cloudflare anti-bot blocks on BigBasket and location geo-locking on Blinkit/Zepto, real-time scraping is unavailable. Prices shown are typical regional catalog estimates. Use the checkout comparison to redirect and shop manually on their respective official platforms.
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for vegetables, fruits, dairy..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="whitespace-nowrap rounded-xl hover:scale-105 transition-transform"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {!showCart && !showComparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const cartItem = cart.find(c => c.id === item.id);
            const quantity = cartItem?.quantity || 0;
            
            return (
              <div key={item.id} className="group relative border-2 rounded-2xl p-5 hover:shadow-xl hover:border-primary/50 transition-all bg-card overflow-hidden">
                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                {/* Product Image */}
                <div className="relative h-40 -mx-5 -mt-5 mb-4 overflow-hidden bg-gradient-to-br from-muted/30 to-background">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-3 line-clamp-1">{item.name}</h3>
                
                <div className="space-y-2 mb-4 bg-muted/30 rounded-xl p-3">
                  {item.platforms.map((platform, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">{platform.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">₹{platform.price}</span>
                        <Clock className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>

                {quantity === 0 ? (
                  <Button
                    onClick={() => addToCart(item)}
                    className="w-full rounded-xl hover:scale-105 transition-transform btn-hero"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <Badge variant="default" className="text-base px-4 py-2">
                        {quantity} in cart
                      </Badge>
                    </div>
                    <Button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Price Comparison View */}
      {showComparison && cart.length > 0 && (
        <div className="space-y-6 slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Price Comparison</h2>
              <p className="text-muted-foreground">Compare total costs across all platforms • {getTotalItems()} items</p>
            </div>
            <Button
              onClick={() => setShowComparison(false)}
              variant="outline"
            >
              Back to Shopping
            </Button>
          </div>

          {/* Best Deal Highlight */}
          <div className="comparison-card border-2 border-success bg-success/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-success" />
                <h3 className="text-2xl font-bold">{getBestDeal().platform}</h3>
              </div>
              <Badge variant="default" className="bg-success text-white">
                BEST DEAL
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Items Total</p>
                <p className="text-lg font-semibold">₹{getBestDeal().itemsTotal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivery</p>
                <p className="text-lg font-semibold">₹{getBestDeal().deliveryCharge}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">₹{getBestDeal().total}</p>
              </div>
            </div>
            <Button 
              onClick={() => handleOrderFromPlatform(getBestDeal().platform)}
              className="w-full btn-hero"
            >
              Order from {getBestDeal().platform}
            </Button>
          </div>

          {/* All Platforms Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["BigBasket", "Blinkit", "Zepto"].map((platform) => {
              const { itemsTotal, deliveryCharge, total } = calculatePlatformTotal(platform);
              const isBest = platform === getBestDeal().platform;
              
              return (
                <div key={platform} className={`platform-card ${isBest ? 'border-success border-2' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-foreground text-lg">{platform}</h4>
                    {isBest && (
                      <Badge variant="default" className="bg-success text-white">
                        Best
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items Total</span>
                      <span className="font-medium">₹{itemsTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        Delivery
                      </span>
                      <div className="text-right">
                        <div className="font-medium">₹{deliveryCharge}</div>
                        <div className="text-xs text-muted-foreground">
                          {platform === "BigBasket" ? "2-4 hours" : 
                           platform === "Blinkit" ? "10-15 min" : "8-12 min"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-3">
                      <span className="font-semibold text-foreground">Total Cost</span>
                      <span className="font-bold text-primary text-lg">₹{total}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleOrderFromPlatform(platform)}
                    className={`w-full ${isBest ? 'btn-hero' : ''}`}
                    variant={isBest ? "default" : "outline"}
                  >
                    Order from {platform}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Cart Items */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Items in Cart ({getTotalItems()} items)</h3>
            <div className="space-y-3">
              {cart.map((item) => {
                const cheapestPlatform = item.platforms.reduce((min, platform) => 
                  platform.price < min.price ? platform : min
                );
                
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-xl border hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 flex-shrink-0 bg-muted/30 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{item.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            Quantity: <Badge variant="secondary">{item.quantity}</Badge>
                          </span>
                          <span className="text-primary font-semibold">
                            ₹{cheapestPlatform.price} each
                          </span>
                          <span className="font-semibold text-foreground">
                            Total: ₹{cheapestPlatform.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
