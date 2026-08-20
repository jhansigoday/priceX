import { useState, useEffect } from "react";
import { Search, Clock, Star, TrendingUp, MapPin, Tag, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import biryaniImg from "@/assets/biryani.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import burgerImg from "@/assets/burger.jpg";
import dosaImg from "@/assets/dosa.jpg";
import noodlesImg from "@/assets/noodles.jpg";
import cakeImg from "@/assets/dessert-cake.jpg";
import gulabJamunImg from "@/assets/dessert-gulabjamun.jpg";
import iceCreamImg from "@/assets/dessert-icecream.jpg";
import southIndianImg from "@/assets/south-indian-meal.jpg";
import fastFoodImg from "@/assets/fast-food-meal.jpg";
import chineseFoodImg from "@/assets/chinese-food.jpg";
import hyderabadiBiryaniImg from "@/assets/hyderabadi-biryani.jpg";
import chickenBiryaniImg from "@/assets/chicken-biryani.jpg";
import masalaDosaImg from "@/assets/masala-dosa.jpg";
import idliVadaImg from "@/assets/idli-vada.jpg";
import zingerComboImg from "@/assets/zinger-combo.jpg";
import chickenBucketImg from "@/assets/chicken-bucket.jpg";
import hakkaNoodlesImg from "@/assets/hakka-noodles.jpg";
import manchurianImg from "@/assets/manchurian.jpg";
import farmhousePizzaImg from "@/assets/farmhouse-pizza.jpg";
import peppyPaneerImg from "@/assets/peppy-paneer.jpg";

// Vizag-specific cuisines and dishes
const cuisines = [
  { name: "Biryani", emoji: "🍛", gradient: "from-orange-500 to-red-500" },
  { name: "South Indian", emoji: "🥘", gradient: "from-green-500 to-emerald-500" },
  { name: "Fast Food", emoji: "🍔", gradient: "from-yellow-500 to-orange-500" },
  { name: "Chinese", emoji: "🥢", gradient: "from-red-500 to-pink-500" },
  { name: "Pizza", emoji: "🍕", gradient: "from-purple-500 to-pink-500" },
  { name: "Desserts", emoji: "🍰", gradient: "from-pink-500 to-rose-500" },
];

// Platform-specific coupons
const coupons = {
  Swiggy: [
    { code: "SWIGGY50", discount: 50, minOrder: 200, description: "50% off on Swiggy orders above ₹200" },
    { code: "SWIGGYSUPER", discount: 30, minOrder: 150, description: "₹30 off with Swiggy Super" },
    { code: "SWIGGYFREE", discount: 0, minOrder: 100, description: "Free delivery above ₹100", freeDelivery: true },
  ],
  Zomato: [
    { code: "ZOMATO60", discount: 60, minOrder: 250, description: "60% off on first Zomato order" },
    { code: "ZOMATOGOLD", discount: 40, minOrder: 200, description: "₹40 off with Zomato Gold" },
    { code: "ZOMATOFREE", discount: 0, minOrder: 99, description: "Free delivery above ₹99", freeDelivery: true },
  ],
  "Uber Eats": [
    { code: "UBER50", discount: 50, minOrder: 180, description: "50% off on Uber Eats" },
    { code: "UBEREATS40", discount: 40, minOrder: 150, description: "₹40 off on orders above ₹150" },
    { code: "UBERFREE", discount: 0, minOrder: 120, description: "Free delivery above ₹120", freeDelivery: true },
  ]
};

// All coupons combined for display
const allCoupons = [...coupons.Swiggy, ...coupons.Zomato, ...coupons["Uber Eats"]];

// Vizag dishes with restaurants and platform pricing
const vizagDishes = [
  // Biryani
  {
    id: 1,
    dishName: "Hyderabadi Dum Biryani",
    cuisine: "Biryani",
    image: hyderabadiBiryaniImg,
    description: "Aromatic basmati rice with tender meat",
    isVeg: false,
    restaurants: [
      {
        name: "The Spicy Venue",
        location: "Siripuram",
        rating: 4.5,
        platforms: [
          { name: "Swiggy", price: 280, deliveryTime: "28-33 min", deliveryCharge: 40, rating: 4.5, discount: 20, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 290, deliveryTime: "30-35 min", deliveryCharge: 35, rating: 4.4, discount: 15, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 285, deliveryTime: "25-30 min", deliveryCharge: 45, rating: 4.3, discount: 25, url: "https://www.ubereats.com/in" },
        ],
      },
      {
        name: "Paradise Biryani",
        location: "NAD Junction",
        rating: 4.6,
        platforms: [
          { name: "Swiggy", price: 320, deliveryTime: "30-35 min", deliveryCharge: 40, rating: 4.6, discount: 30, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 330, deliveryTime: "32-37 min", deliveryCharge: 30, rating: 4.5, discount: 20, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 315, deliveryTime: "28-33 min", deliveryCharge: 35, rating: 4.5, discount: 25, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 2,
    dishName: "Chicken Biryani",
    cuisine: "Biryani",
    image: chickenBiryaniImg,
    description: "Classic chicken biryani with raita",
    isVeg: false,
    restaurants: [
      {
        name: "The Spicy Venue",
        location: "Siripuram",
        rating: 4.4,
        platforms: [
          { name: "Swiggy", price: 250, deliveryTime: "28-33 min", deliveryCharge: 40, rating: 4.5, discount: 20, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 260, deliveryTime: "30-35 min", deliveryCharge: 35, rating: 4.4, discount: 15, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 255, deliveryTime: "25-30 min", deliveryCharge: 45, rating: 4.3, discount: 25, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  // South Indian
  {
    id: 3,
    dishName: "Masala Dosa",
    cuisine: "South Indian",
    image: masalaDosaImg,
    description: "Crispy dosa with potato masala filling",
    isVeg: true,
    restaurants: [
      {
        name: "Dakshin",
        location: "Dwaraka Nagar",
        rating: 4.4,
        platforms: [
          { name: "Swiggy", price: 120, deliveryTime: "20-25 min", deliveryCharge: 30, rating: 4.4, discount: 10, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 130, deliveryTime: "22-27 min", deliveryCharge: 25, rating: 4.3, discount: 15, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 125, deliveryTime: "18-23 min", deliveryCharge: 28, rating: 4.3, discount: 12, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 4,
    dishName: "Idli Vada Combo",
    cuisine: "South Indian",
    image: idliVadaImg,
    description: "Soft idlis with crispy vada and sambar",
    isVeg: true,
    restaurants: [
      {
        name: "Dakshin",
        location: "Dwaraka Nagar",
        rating: 4.3,
        platforms: [
          { name: "Swiggy", price: 80, deliveryTime: "20-25 min", deliveryCharge: 30, rating: 4.4, discount: 10, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 85, deliveryTime: "22-27 min", deliveryCharge: 25, rating: 4.3, discount: 8, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 82, deliveryTime: "18-23 min", deliveryCharge: 28, rating: 4.3, discount: 10, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  // Fast Food
  {
    id: 5,
    dishName: "Zinger Burger Combo",
    cuisine: "Fast Food",
    image: zingerComboImg,
    description: "Crispy chicken burger with fries and drink",
    isVeg: false,
    restaurants: [
      {
        name: "KFC",
        location: "Multiple Locations",
        rating: 4.3,
        platforms: [
          { name: "Swiggy", price: 350, deliveryTime: "22-27 min", deliveryCharge: 45, rating: 4.3, discount: 40, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 360, deliveryTime: "25-30 min", deliveryCharge: 35, rating: 4.2, discount: 35, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 345, deliveryTime: "20-25 min", deliveryCharge: 40, rating: 4.2, discount: 45, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 6,
    dishName: "Chicken Bucket",
    cuisine: "Fast Food",
    image: chickenBucketImg,
    description: "8 pieces of crispy fried chicken",
    isVeg: false,
    restaurants: [
      {
        name: "KFC",
        location: "Multiple Locations",
        rating: 4.2,
        platforms: [
          { name: "Swiggy", price: 550, deliveryTime: "22-27 min", deliveryCharge: 45, rating: 4.3, discount: 50, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 560, deliveryTime: "25-30 min", deliveryCharge: 35, rating: 4.2, discount: 45, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 545, deliveryTime: "20-25 min", deliveryCharge: 40, rating: 4.2, discount: 55, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  // Chinese
  {
    id: 7,
    dishName: "Hakka Noodles",
    cuisine: "Chinese",
    image: hakkaNoodlesImg,
    description: "Stir-fried noodles with vegetables",
    isVeg: true,
    restaurants: [
      {
        name: "Mainland China",
        location: "Waltair Main Road",
        rating: 4.5,
        platforms: [
          { name: "Swiggy", price: 280, deliveryTime: "35-40 min", deliveryCharge: 50, rating: 4.5, discount: 30, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 290, deliveryTime: "38-43 min", deliveryCharge: 45, rating: 4.4, discount: 25, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 285, deliveryTime: "32-37 min", deliveryCharge: 48, rating: 4.3, discount: 35, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 8,
    dishName: "Manchurian Dry",
    cuisine: "Chinese",
    image: manchurianImg,
    description: "Crispy vegetable balls in spicy sauce",
    isVeg: true,
    restaurants: [
      {
        name: "Mainland China",
        location: "Waltair Main Road",
        rating: 4.4,
        platforms: [
          { name: "Swiggy", price: 250, deliveryTime: "35-40 min", deliveryCharge: 50, rating: 4.5, discount: 25, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 260, deliveryTime: "38-43 min", deliveryCharge: 45, rating: 4.4, discount: 20, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 255, deliveryTime: "32-37 min", deliveryCharge: 48, rating: 4.3, discount: 30, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  // Pizza
  {
    id: 9,
    dishName: "Farmhouse Pizza (Medium)",
    cuisine: "Pizza",
    image: farmhousePizzaImg,
    description: "Loaded with vegetables and cheese",
    isVeg: true,
    restaurants: [
      {
        name: "Domino's Pizza",
        location: "Multiple Locations",
        rating: 4.2,
        platforms: [
          { name: "Swiggy", price: 399, deliveryTime: "25-30 min", deliveryCharge: 40, rating: 4.2, discount: 50, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 410, deliveryTime: "28-33 min", deliveryCharge: 35, rating: 4.1, discount: 40, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 395, deliveryTime: "23-28 min", deliveryCharge: 38, rating: 4.0, discount: 55, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 10,
    dishName: "Peppy Paneer Pizza (Medium)",
    cuisine: "Pizza",
    image: peppyPaneerImg,
    description: "Paneer, capsicum and spicy red paprika",
    isVeg: true,
    restaurants: [
      {
        name: "Domino's Pizza",
        location: "Multiple Locations",
        rating: 4.1,
        platforms: [
          { name: "Swiggy", price: 449, deliveryTime: "25-30 min", deliveryCharge: 40, rating: 4.2, discount: 60, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 460, deliveryTime: "28-33 min", deliveryCharge: 35, rating: 4.1, discount: 50, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 445, deliveryTime: "23-28 min", deliveryCharge: 38, rating: 4.0, discount: 65, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  // Desserts
  {
    id: 11,
    dishName: "Chocolate Truffle Cake",
    cuisine: "Desserts",
    image: cakeImg,
    description: "Rich chocolate cake with truffle frosting",
    isVeg: true,
    restaurants: [
      {
        name: "The Spicy Venue",
        location: "Siripuram",
        rating: 4.3,
        platforms: [
          { name: "Swiggy", price: 140, deliveryTime: "30-35 min", deliveryCharge: 40, rating: 4.3, discount: 20, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 150, deliveryTime: "32-37 min", deliveryCharge: 35, rating: 4.2, discount: 15, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 145, deliveryTime: "28-33 min", deliveryCharge: 38, rating: 4.2, discount: 18, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 12,
    dishName: "Gulab Jamun (6 pcs)",
    cuisine: "Desserts",
    image: gulabJamunImg,
    description: "Traditional Indian sweet in sugar syrup",
    isVeg: true,
    restaurants: [
      {
        name: "Dakshin",
        location: "Dwaraka Nagar",
        rating: 4.5,
        platforms: [
          { name: "Swiggy", price: 120, deliveryTime: "20-25 min", deliveryCharge: 30, rating: 4.5, discount: 15, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 130, deliveryTime: "22-27 min", deliveryCharge: 25, rating: 4.4, discount: 10, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 125, deliveryTime: "18-23 min", deliveryCharge: 28, rating: 4.4, discount: 12, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
  {
    id: 13,
    dishName: "Ice Cream Sundae",
    cuisine: "Desserts",
    image: iceCreamImg,
    description: "Premium ice cream with toppings",
    isVeg: true,
    restaurants: [
      {
        name: "Paradise Biryani",
        location: "NAD Junction",
        rating: 4.2,
        platforms: [
          { name: "Swiggy", price: 150, deliveryTime: "25-30 min", deliveryCharge: 40, rating: 4.2, discount: 20, url: "https://www.swiggy.com/city/vishakhapatnam" },
          { name: "Zomato", price: 160, deliveryTime: "27-32 min", deliveryCharge: 35, rating: 4.1, discount: 15, url: "https://www.zomato.com/visakhapatnam" },
          { name: "Uber Eats", price: 155, deliveryTime: "23-28 min", deliveryCharge: 38, rating: 4.1, discount: 18, url: "https://www.ubereats.com/in" },
        ],
      },
    ],
  },
];

export const FoodDelivery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [userLocation, setUserLocation] = useState("Detecting location...");
  const [selectedCoupons, setSelectedCoupons] = useState<Record<string, string>>({});
  const [selectedPlatformForCoupon, setSelectedPlatformForCoupon] = useState<string>("Swiggy");
  const [liveData, setLiveData] = useState<any[] | null>(null);
  const [isLiveLoading, setIsLiveLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setUserLocation("Visakhapatnam, Andhra Pradesh"),
        () => setUserLocation("Visakhapatnam (default)")
      );
    }
  }, []);

  const fetchLiveData = async (query: string) => {
    setIsLiveLoading(true);
    try {
      const res = await fetch(`/api/scrape/zomato?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Scraper offline");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      if (Array.isArray(data) && data.length > 0) {
        setLiveData(data);
        toast({
          title: "Live Data Loaded",
          description: `Loaded ${data.length} real-time restaurants from Zomato.`,
        });
      } else {
        throw new Error("No real-time options found");
      }
    } catch (error: any) {
      console.warn("Live scraping offline, falling back to static database:", error);
      setLiveData(null);
      toast({
        title: "Live Search Offline",
        description: "Scraper is unavailable. Running in static offline mode.",
        variant: "destructive"
      });
    } finally {
      setIsLiveLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
      fetchLiveData(searchQuery.trim());
    } else if (selectedCuisine) {
      setShowResults(true);
      fetchLiveData(selectedCuisine);
    } else {
      toast({
        title: "Please select a cuisine or search",
        description: "Choose a cuisine category or type a restaurant name",
      });
    }
  };

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    setShowResults(true);
    fetchLiveData(cuisine);
  };

  const handleCouponSelect = (platform: string, code: string) => {
    setSelectedCoupons(prev => ({
      ...prev,
      [platform]: prev[platform] === code ? "" : code
    }));
    toast({
      title: selectedCoupons[platform] === code ? "Coupon Removed" : "Coupon Applied",
      description: selectedCoupons[platform] === code 
        ? `Removed coupon from ${platform}` 
        : `${code} applied to ${platform}`,
    });
  };

  const calculateFinalPrice = (platform: any) => {
    if (platform.status === "unavailable") {
      return {
        itemPrice: 0,
        deliveryCharge: 0,
        discount: 0,
        finalPrice: Infinity
      };
    }

    let itemPrice = platform.price;
    let deliveryCharge = platform.deliveryCharge;
    let discount = platform.discount;

    // Apply platform-specific coupon if selected
    const selectedCouponCode = selectedCoupons[platform.name];
    if (selectedCouponCode) {
      const platformCoupons = coupons[platform.name as keyof typeof coupons];
      const coupon = platformCoupons?.find(c => c.code === selectedCouponCode);
      if (coupon && itemPrice >= coupon.minOrder) {
        if (coupon.freeDelivery) {
          deliveryCharge = 0;
        } else {
          discount += coupon.discount;
        }
      }
    }

    const finalPrice = Math.max(0, itemPrice + deliveryCharge - discount);

    return {
      itemPrice,
      deliveryCharge,
      discount,
      finalPrice
    };
  };

  const handleOrder = (platformUrl: string, platform: string, restaurant: string) => {
    window.open(platformUrl, '_blank');
    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to ${restaurant} on ${platform}`,
    });
  };

  const filteredResults = vizagDishes.filter(dish => 
    (selectedCuisine === "" || dish.cuisine === selectedCuisine) &&
    (searchQuery === "" || 
     dish.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dish.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dish.restaurants.some(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const displayResults = liveData ? [
    {
      id: 9999,
      dishName: searchQuery || selectedCuisine || "Live Search",
      cuisine: selectedCuisine || "Multi-Cuisine",
      image: "/placeholder.svg",
      description: `Real-time food delivery options for "${searchQuery || selectedCuisine}"`,
      isVeg: false,
      restaurants: liveData.map((r: any) => ({
        name: r.name,
        location: r.locality,
        rating: r.rating,
        platforms: [
          {
            name: "Zomato",
            price: Math.round(parseFloat(r.costForTwo.replace(/[^\d]/g, "")) / 2) || 200,
            deliveryTime: "30-40 min",
            deliveryCharge: 35,
            rating: r.rating,
            discount: 10,
            url: r.url || "https://www.zomato.com/visakhapatnam"
          },
          {
            name: "Swiggy",
            status: "unavailable",
            reason: "AWS WAF / Bot protection challenge blocked automated access.",
            url: `https://www.swiggy.com/search?query=${encodeURIComponent(searchQuery || selectedCuisine)}`
          },
          {
            name: "Uber Eats",
            status: "unavailable",
            reason: "Uber requires dynamic user login session keys for ride/delivery quotes.",
            url: "https://www.ubereats.com"
          }
        ]
      }))
    }
  ] : filteredResults;

  return (
    <div className="py-8 fade-in">
      {/* Price Disclaimer */}
      <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg flex items-start gap-3">
        <span className="text-lg">ℹ️</span>
        <div className="text-sm text-muted-foreground">
          <strong className="text-foreground">Prices shown are approximate estimates</strong> based on typical menu prices. 
          Final prices, delivery charges, and offers may vary on partner apps due to real-time promotions and surge pricing. 
          Always verify on Swiggy, Zomato, or Uber Eats before ordering.
        </div>
      </div>
      {!showResults ? (
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{userLocation}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Discover Amazing Food
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Compare prices across Swiggy, Zomato & Uber Eats • Find the best deals
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search restaurants in Vizag..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Cuisine Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Popular Cuisines in Vizag
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine.name}
                  onClick={() => handleCuisineSelect(cuisine.name)}
                  className="group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-border hover:border-primary transition-all hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative">
                    <div className="text-4xl mb-2">{cuisine.emoji}</div>
                    <p className="font-semibold text-sm">{cuisine.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Platform-Specific Coupons */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-primary" />
              Available Coupons by Platform
            </h2>
            
            {/* Platform Tabs */}
            <div className="flex gap-2 mb-4">
              {Object.keys(coupons).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatformForCoupon(platform)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPlatformForCoupon === platform
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons[selectedPlatformForCoupon as keyof typeof coupons].map((coupon) => (
                <Card key={coupon.code} className="p-4 border-2 border-dashed border-primary/30 hover:border-primary transition-all cursor-pointer hover:scale-105">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="font-mono">{coupon.code}</Badge>
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold mb-1">{coupon.description}</p>
                  <p className="text-xs text-muted-foreground">Min order: ₹{coupon.minOrder}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto slide-up">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCuisine || "All"} Dishes in Vizag
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {liveData ? `${liveData.length} restaurants` : `${filteredResults.length} dishes`} found near you
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isLiveLoading ? (
                <Badge variant="outline" className="animate-pulse bg-yellow-500/10 text-yellow-500 border-yellow-500 py-1">
                  ⚡ Fetching Live Data...
                </Badge>
              ) : liveData ? (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500 py-1">
                  🟢 Live Mode (Zomato)
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-zinc-500/10 text-zinc-500 border-zinc-500 py-1">
                  ⚪ Static Mode (Offline Fallback)
                </Badge>
              )}
              <Button variant="outline" onClick={() => {
                setShowResults(false);
                setSelectedCuisine("");
                setSearchQuery("");
                setLiveData(null);
              }}>
                New Search
              </Button>
            </div>
          </div>

          {/* Coupon Selector */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Apply Platform-Specific Coupon</h3>
            </div>
            
            {/* Platform Selection */}
            <div className="flex gap-2 mb-3">
              {Object.keys(coupons).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatformForCoupon(platform)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    selectedPlatformForCoupon === platform
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {coupons[selectedPlatformForCoupon as keyof typeof coupons].map((coupon) => (
                <Badge
                  key={coupon.code}
                  variant={selectedCoupons[selectedPlatformForCoupon] === coupon.code ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleCouponSelect(selectedPlatformForCoupon, coupon.code)}
                >
                  {coupon.code}
                </Badge>
              ))}
              {selectedCoupons[selectedPlatformForCoupon] && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleCouponSelect(selectedPlatformForCoupon, "")}>
                  Clear
                </Badge>
              )}
            </div>
          </Card>

          {/* Dish Results */}
          <div className="space-y-6">
            {displayResults.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {/* Dish Header */}
                <div className="p-6 bg-gradient-to-r from-card to-card/50">
                  <div className="flex gap-4">
                    <img 
                      src={dish.image} 
                      alt={dish.dishName}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold">{dish.dishName}</h3>
                        {dish.isVeg ? (
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            🟢 Veg
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            🔴 Non-Veg
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{dish.description}</p>
                      <Badge variant="secondary">{dish.cuisine}</Badge>
                    </div>
                  </div>
                </div>

                {/* Restaurants offering this dish */}
                {dish.restaurants.map((restaurant, restaurantIndex) => (
                  <div key={restaurantIndex} className="border-t">
                    <div className="p-4 bg-muted/20">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-bold text-lg">{restaurant.name}</h4>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          {restaurant.rating}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {restaurant.location}
                        </span>
                      </div>

                      {/* Platform Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {restaurant.platforms.map((platform) => {
                          if (platform.status === "unavailable") {
                            return (
                              <Card key={platform.name} className="p-4 border-2 border-dashed opacity-75 bg-muted/40 relative flex flex-col justify-between h-[280px]">
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-bold text-muted-foreground">{platform.name}</h5>
                                    <Badge variant="outline" className="text-red-500 border-red-500 bg-red-500/10 text-[10px]">
                                      Unavailable
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-4">
                                    {platform.reason || "Live scraping blocked by security WAF check (Cloudflare)."}
                                  </p>
                                </div>
                                <Button 
                                  onClick={() => handleOrder(platform.url, platform.name, dish.dishName)}
                                  variant="outline"
                                  className="w-full text-xs"
                                >
                                  Search Manually
                                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                              </Card>
                            );
                          }

                          const priceBreakdown = calculateFinalPrice(platform);
                          const isBestPrice = restaurant.platforms.every(p => 
                            calculateFinalPrice(p).finalPrice >= priceBreakdown.finalPrice
                          );

                          return (
                            <Card key={platform.name} className={`p-4 relative ${isBestPrice ? 'border-2 border-primary shadow-lg' : ''}`}>
                              {isBestPrice && (
                                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-purple-500">
                                  Best Deal
                                </Badge>
                              )}
                              
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="font-bold">{platform.name}</h5>
                                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                  <Star className="w-3 h-3 fill-current" />
                                  {platform.rating}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Item Price</span>
                                  <span className="font-medium">₹{priceBreakdown.itemPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Delivery</span>
                                  <span className="font-medium">
                                    {priceBreakdown.deliveryCharge === 0 ? (
                                      <span className="text-green-600">FREE</span>
                                    ) : (
                                      `₹${priceBreakdown.deliveryCharge}`
                                    )}
                                  </span>
                                </div>
                                {priceBreakdown.discount > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Discount</span>
                                    <span className="text-green-600 font-medium">-₹{priceBreakdown.discount}</span>
                                  </div>
                                )}
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Delivery
                                  </span>
                                  <span className="font-medium">{platform.deliveryTime}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between items-center">
                                  <span className="font-bold">Total</span>
                                  <span className="text-xl font-bold text-primary">
                                    ₹{priceBreakdown.finalPrice}
                                  </span>
                                </div>
                              </div>

                              <Button 
                                onClick={() => handleOrder(platform.url, platform.name, dish.dishName)}
                                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
                              >
                                Order Now
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};