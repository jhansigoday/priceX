import { useState } from "react";
import { Calendar, MapPin, Users, Star, Wifi, Car, Coffee, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import goaImg from "@/assets/destination-goa.jpg";
import rajasthanImg from "@/assets/destination-rajasthan.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import himachalImg from "@/assets/destination-himachal.jpg";
import mumbaiImg from "@/assets/destination-mumbai.jpg";
import delhiImg from "@/assets/destination-chennai.jpg";

// City-specific hotel images
import hotelMumbaiTajImg from "@/assets/hotel-mumbai-taj.jpg";
import hotelMumbaiJuhuImg from "@/assets/hotel-mumbai-juhu.jpg";
import hotelMumbaiNarimanImg from "@/assets/hotel-mumbai-nariman.jpg";
import hotelMumbaiBudgetImg from "@/assets/hotel-mumbai-budget.jpg";

import hotelDelhiImperialImg from "@/assets/hotel-delhi-imperial.jpg";
import hotelDelhiMauryaImg from "@/assets/hotel-delhi-maurya.jpg";
import hotelDelhiLodhiImg from "@/assets/hotel-delhi-lodhi.jpg";
import hotelDelhiAirportImg from "@/assets/hotel-delhi-airport.jpg";

import hotelRajasthanJodhpurImg from "@/assets/hotel-rajasthan-jodhpur.jpg";
import hotelRajasthanUdaipurImg from "@/assets/hotel-rajasthan-udaipur.jpg";
import hotelRajasthanJaipurImg from "@/assets/hotel-rajasthan-jaipur.jpg";
import hotelRajasthanBudgetImg from "@/assets/hotel-rajasthan-budget.jpg";

import hotelKeralaKumarakomImg from "@/assets/hotel-kerala-kumarakom.jpg";
import hotelKeralaKochiImg from "@/assets/hotel-kerala-kochi.jpg";
import hotelKeralaMunnarImg from "@/assets/hotel-kerala-munnar.jpg";
import hotelKeralaBudgetImg from "@/assets/hotel-kerala-budget.jpg";

import hotelHimachalShimlaImg from "@/assets/hotel-himachal-shimla.jpg";
import hotelHimachalCecilImg from "@/assets/hotel-himachal-cecil.jpg";
import hotelHimachalManaliImg from "@/assets/hotel-himachal-manali.jpg";
import hotelHimachalDharamshalaImg from "@/assets/hotel-himachal-dharamshala.jpg";

import hotelGoaTajImg from "@/assets/hotel-goa-taj.jpg";
import hotelGoaNovotelImg from "@/assets/hotel-goa-novotel.jpg";
import hotelGoaMarriottImg from "@/assets/hotel-goa-marriott.jpg";
import hotelGoaAnjunaImg from "@/assets/hotel-goa-anjuna.jpg";

// Hotel booking coupons
const hotelCoupons = {
  MakeMyTrip: [
    { code: "MMTSTAY", discount: 2000, minOrder: 5000, description: "₹2000 off on hotel bookings" },
    { code: "MMTLUXE", discount: 3000, minOrder: 10000, description: "₹3000 off on luxury stays" },
  ],
  "Booking.com": [
    { code: "BOOKDEAL", discount: 1800, minOrder: 4500, description: "₹1800 off on your stay" },
    { code: "BOOKGENIUS", discount: 2500, minOrder: 8000, description: "₹2500 off with Genius" },
  ],
  Agoda: [
    { code: "AGODAVIP", discount: 2200, minOrder: 6000, description: "₹2200 VIP discount" },
    { code: "AGODAPLUS", discount: 1500, minOrder: 5000, description: "₹1500 instant savings" },
  ]
};

const trendingDestinations = [
  { city: "Goa", hotels: "250+ hotels", image: goaImg, rating: 4.5 },
  { city: "Rajasthan", hotels: "180+ hotels", image: rajasthanImg, rating: 4.6 },
  { city: "Kerala", hotels: "200+ hotels", image: keralaImg, rating: 4.4 },
  { city: "Himachal Pradesh", hotels: "150+ hotels", image: himachalImg, rating: 4.3 },
  { city: "Mumbai", hotels: "300+ hotels", image: mumbaiImg, rating: 4.2 },
  { city: "Delhi", hotels: "280+ hotels", image: delhiImg, rating: 4.1 },
];

// Hotels organized by city with unique location-specific data
const hotelsByCity: Record<string, Array<{
  name: string;
  rating: number;
  reviews: number;
  area: string;
  image: string;
  amenities: string[];
  platforms: Array<{ name: string; price: number; cancellation: string; breakfast: string; taxes: string }>;
}>> = {
  "Goa": [
    {
      name: "Taj Exotica Resort & Spa",
      rating: 4.8,
      reviews: 2450,
      area: "Benaulim Beach, South Goa",
      image: hotelGoaTajImg,
      amenities: ["Private Beach", "Spa", "Infinity Pool", "Golf", "Fine Dining"],
      platforms: [
        { name: "MakeMyTrip", price: 18500, cancellation: "Free", breakfast: "Included", taxes: "₹3330" },
        { name: "Booking.com", price: 17200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 17800, cancellation: "₹1500 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Novotel Goa Dona Sylvia",
      rating: 4.4,
      reviews: 1890,
      area: "Cavelossim Beach, South Goa",
      image: hotelGoaNovotelImg,
      amenities: ["Beach Access", "Pool", "WiFi", "Kids Club", "Multi-Cuisine Restaurant"],
      platforms: [
        { name: "MakeMyTrip", price: 8500, cancellation: "₹500 fee", breakfast: "₹800 extra", taxes: "₹1530" },
        { name: "Booking.com", price: 7800, cancellation: "Free", breakfast: "₹800 extra", taxes: "Included" },
        { name: "Agoda", price: 8200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Goa Marriott Resort",
      rating: 4.3,
      reviews: 1650,
      area: "Miramar Beach, Panaji",
      image: hotelGoaMarriottImg,
      amenities: ["Waterfront Pool", "Spa", "WiFi", "Casino Nearby", "3 Restaurants"],
      platforms: [
        { name: "MakeMyTrip", price: 7200, cancellation: "Free", breakfast: "Included", taxes: "₹1296" },
        { name: "Booking.com", price: 6800, cancellation: "₹400 fee", breakfast: "₹600 extra", taxes: "Included" },
        { name: "Agoda", price: 7000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Casa Anjuna Boutique Hotel",
      rating: 4.1,
      reviews: 980,
      area: "Anjuna, North Goa",
      image: hotelGoaAnjunaImg,
      amenities: ["Boutique Stay", "Pool", "Garden Cafe", "Yoga Classes", "WiFi"],
      platforms: [
        { name: "MakeMyTrip", price: 4500, cancellation: "₹300 fee", breakfast: "₹500 extra", taxes: "₹810" },
        { name: "Booking.com", price: 4200, cancellation: "Free", breakfast: "₹500 extra", taxes: "Included" },
        { name: "Agoda", price: 4350, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ],
  "Mumbai": [
    {
      name: "The Taj Mahal Palace",
      rating: 4.9,
      reviews: 5240,
      area: "Apollo Bunder, Colaba",
      image: hotelMumbaiTajImg,
      amenities: ["Heritage Property", "Sea View", "Spa", "9 Restaurants", "Butler Service"],
      platforms: [
        { name: "MakeMyTrip", price: 32500, cancellation: "Free", breakfast: "Included", taxes: "₹5850" },
        { name: "Booking.com", price: 30800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 31500, cancellation: "₹2500 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "JW Marriott Mumbai Juhu",
      rating: 4.6,
      reviews: 3120,
      area: "Juhu Beach, Mumbai",
      image: hotelMumbaiJuhuImg,
      amenities: ["Beach View", "Infinity Pool", "Quan Spa", "4 Restaurants", "Business Center"],
      platforms: [
        { name: "MakeMyTrip", price: 18500, cancellation: "Free", breakfast: "Included", taxes: "₹3330" },
        { name: "Booking.com", price: 17200, cancellation: "₹1200 fee", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 17800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Trident Nariman Point",
      rating: 4.5,
      reviews: 2340,
      area: "Nariman Point, South Mumbai",
      image: hotelMumbaiNarimanImg,
      amenities: ["Marine Drive View", "Pool", "WiFi", "Fine Dining", "Fitness Center"],
      platforms: [
        { name: "MakeMyTrip", price: 14500, cancellation: "₹1000 fee", breakfast: "₹1500 extra", taxes: "₹2610" },
        { name: "Booking.com", price: 13800, cancellation: "Free", breakfast: "₹1500 extra", taxes: "Included" },
        { name: "Agoda", price: 14200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Fern Residency Andheri",
      rating: 4.0,
      reviews: 1560,
      area: "Andheri East, Near Airport",
      image: hotelMumbaiBudgetImg,
      amenities: ["Airport Shuttle", "WiFi", "Restaurant", "Business Center", "Gym"],
      platforms: [
        { name: "MakeMyTrip", price: 5500, cancellation: "₹400 fee", breakfast: "₹600 extra", taxes: "₹990" },
        { name: "Booking.com", price: 5200, cancellation: "Free", breakfast: "₹600 extra", taxes: "Included" },
        { name: "Agoda", price: 5350, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ],
  "Delhi": [
    {
      name: "The Imperial New Delhi",
      rating: 4.8,
      reviews: 4560,
      area: "Janpath, Connaught Place",
      image: hotelDelhiImperialImg,
      amenities: ["Heritage Property", "Art Deco", "Pool", "Spa", "Fine Dining"],
      platforms: [
        { name: "MakeMyTrip", price: 26500, cancellation: "Free", breakfast: "Included", taxes: "₹4770" },
        { name: "Booking.com", price: 24800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 25500, cancellation: "₹2000 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "ITC Maurya New Delhi",
      rating: 4.7,
      reviews: 3890,
      area: "Diplomatic Enclave, Chanakyapuri",
      image: hotelDelhiMauryaImg,
      amenities: ["Bukhara Restaurant", "Pool", "Kaya Spa", "Business Center", "Concierge"],
      platforms: [
        { name: "MakeMyTrip", price: 21500, cancellation: "Free", breakfast: "Included", taxes: "₹3870" },
        { name: "Booking.com", price: 20200, cancellation: "₹1500 fee", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 20800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "The Lodhi New Delhi",
      rating: 4.6,
      reviews: 2180,
      area: "Lodhi Road, Central Delhi",
      image: hotelDelhiLodhiImg,
      amenities: ["All-Suite Hotel", "Private Pools", "Spa", "Golf Course", "Art Gallery"],
      platforms: [
        { name: "MakeMyTrip", price: 28500, cancellation: "Free", breakfast: "Included", taxes: "₹5130" },
        { name: "Booking.com", price: 26800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 27500, cancellation: "₹2200 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Radisson Blu Plaza Delhi",
      rating: 4.2,
      reviews: 1890,
      area: "Mahipalpur, Near IGI Airport",
      image: hotelDelhiAirportImg,
      amenities: ["Airport Shuttle", "Pool", "Spa", "4 Restaurants", "WiFi"],
      platforms: [
        { name: "MakeMyTrip", price: 8500, cancellation: "₹600 fee", breakfast: "₹900 extra", taxes: "₹1530" },
        { name: "Booking.com", price: 7800, cancellation: "Free", breakfast: "₹900 extra", taxes: "Included" },
        { name: "Agoda", price: 8200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ],
  "Rajasthan": [
    {
      name: "Umaid Bhawan Palace",
      rating: 4.9,
      reviews: 3240,
      area: "Jodhpur, Rajasthan",
      image: hotelRajasthanJodhpurImg,
      amenities: ["Palace Hotel", "Museum", "Pool", "Spa", "Royal Experience"],
      platforms: [
        { name: "MakeMyTrip", price: 52000, cancellation: "Free", breakfast: "Included", taxes: "₹9360" },
        { name: "Booking.com", price: 48500, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 50000, cancellation: "₹4000 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Taj Lake Palace",
      rating: 4.8,
      reviews: 4120,
      area: "Lake Pichola, Udaipur",
      image: hotelRajasthanUdaipurImg,
      amenities: ["Lake Island", "Boat Transfers", "Pool", "Spa", "Sunset Dining"],
      platforms: [
        { name: "MakeMyTrip", price: 42000, cancellation: "Free", breakfast: "Included", taxes: "₹7560" },
        { name: "Booking.com", price: 39500, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 40800, cancellation: "₹3500 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Rambagh Palace Jaipur",
      rating: 4.7,
      reviews: 2890,
      area: "Bhawani Singh Road, Jaipur",
      image: hotelRajasthanJaipurImg,
      amenities: ["Heritage Palace", "Polo Grounds", "Pool", "Spa", "Peacock Gardens"],
      platforms: [
        { name: "MakeMyTrip", price: 38500, cancellation: "Free", breakfast: "Included", taxes: "₹6930" },
        { name: "Booking.com", price: 36000, cancellation: "₹2500 fee", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 37200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Haveli Dharampura Jaipur",
      rating: 4.2,
      reviews: 1120,
      area: "Old City, Jaipur",
      image: hotelRajasthanBudgetImg,
      amenities: ["Heritage Haveli", "Rooftop Restaurant", "WiFi", "Cultural Evenings", "City Tour"],
      platforms: [
        { name: "MakeMyTrip", price: 6500, cancellation: "₹500 fee", breakfast: "Included", taxes: "₹1170" },
        { name: "Booking.com", price: 6000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 6200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ],
  "Kerala": [
    {
      name: "Kumarakom Lake Resort",
      rating: 4.7,
      reviews: 2890,
      area: "Kumarakom, Kottayam",
      image: hotelKeralaKumarakomImg,
      amenities: ["Backwater Villas", "Houseboat", "Ayurveda Spa", "Infinity Pool", "Toddy Bar"],
      platforms: [
        { name: "MakeMyTrip", price: 22500, cancellation: "Free", breakfast: "Included", taxes: "₹4050" },
        { name: "Booking.com", price: 21000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 21800, cancellation: "₹1800 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Taj Malabar Resort & Spa",
      rating: 4.6,
      reviews: 2340,
      area: "Willingdon Island, Kochi",
      image: hotelKeralaKochiImg,
      amenities: ["Harbor View", "Heritage Wing", "Pool", "Jiva Spa", "Fine Dining"],
      platforms: [
        { name: "MakeMyTrip", price: 16500, cancellation: "₹1200 fee", breakfast: "Included", taxes: "₹2970" },
        { name: "Booking.com", price: 15500, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 16000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Windermere Estate Munnar",
      rating: 4.5,
      reviews: 1780,
      area: "Tea Plantation, Munnar",
      image: hotelKeralaMunnarImg,
      amenities: ["Plantation View", "Organic Farm", "Ayurveda", "Trekking", "Tea Tasting"],
      platforms: [
        { name: "MakeMyTrip", price: 12500, cancellation: "Free", breakfast: "Included", taxes: "₹2250" },
        { name: "Booking.com", price: 11800, cancellation: "₹800 fee", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 12200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Marari Beach Resort",
      rating: 4.3,
      reviews: 1450,
      area: "Mararikulam, Alleppey",
      image: hotelKeralaBudgetImg,
      amenities: ["Beach Access", "Ayurveda", "Pool", "Yoga", "Traditional Cottages"],
      platforms: [
        { name: "MakeMyTrip", price: 8500, cancellation: "₹600 fee", breakfast: "Included", taxes: "₹1530" },
        { name: "Booking.com", price: 7800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 8200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ],
  "Himachal Pradesh": [
    {
      name: "Wildflower Hall Shimla",
      rating: 4.8,
      reviews: 2120,
      area: "Mashobra, Near Shimla",
      image: hotelHimachalShimlaImg,
      amenities: ["Mountain View", "Heated Pool", "Oberoi Spa", "Trekking", "Fine Dining"],
      platforms: [
        { name: "MakeMyTrip", price: 32500, cancellation: "Free", breakfast: "Included", taxes: "₹5850" },
        { name: "Booking.com", price: 30500, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 31500, cancellation: "₹2500 fee", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "The Oberoi Cecil Shimla",
      rating: 4.6,
      reviews: 1890,
      area: "Mall Road, Shimla",
      image: hotelHimachalCecilImg,
      amenities: ["Colonial Heritage", "Valley View", "Indoor Pool", "Spa", "Library"],
      platforms: [
        { name: "MakeMyTrip", price: 21500, cancellation: "₹1500 fee", breakfast: "Included", taxes: "₹3870" },
        { name: "Booking.com", price: 20000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 20800, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Span Resort & Spa Manali",
      rating: 4.4,
      reviews: 1560,
      area: "Left Bank, Manali",
      image: hotelHimachalManaliImg,
      amenities: ["River View", "Spa", "Bonfire", "Adventure Sports", "Multi-Cuisine"],
      platforms: [
        { name: "MakeMyTrip", price: 12500, cancellation: "Free", breakfast: "Included", taxes: "₹2250" },
        { name: "Booking.com", price: 11500, cancellation: "₹800 fee", breakfast: "Included", taxes: "Included" },
        { name: "Agoda", price: 12000, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    },
    {
      name: "Fortune Park Moksha Dharamshala",
      rating: 4.1,
      reviews: 980,
      area: "McLeod Ganj, Dharamshala",
      image: hotelHimachalDharamshalaImg,
      amenities: ["Mountain View", "Restaurant", "WiFi", "Room Heater", "Travel Desk"],
      platforms: [
        { name: "MakeMyTrip", price: 5500, cancellation: "₹400 fee", breakfast: "₹600 extra", taxes: "₹990" },
        { name: "Booking.com", price: 5000, cancellation: "Free", breakfast: "₹600 extra", taxes: "Included" },
        { name: "Agoda", price: 5200, cancellation: "Free", breakfast: "Included", taxes: "Included" },
      ]
    }
  ]
};

const getHotelsForCity = (selectedCity: string) => {
  // Direct city match
  if (hotelsByCity[selectedCity]) {
    return hotelsByCity[selectedCity];
  }
  
  // City variations mapping
  const cityMapping: Record<string, string> = {
    "Himachal": "Himachal Pradesh",
    "Jaipur": "Rajasthan",
    "Udaipur": "Rajasthan",
    "Jodhpur": "Rajasthan",
    "Kochi": "Kerala",
    "Munnar": "Kerala",
    "Alleppey": "Kerala",
    "Shimla": "Himachal Pradesh",
    "Manali": "Himachal Pradesh",
    "Dharamshala": "Himachal Pradesh",
    "Panaji": "Goa",
    "Colaba": "Mumbai",
    "Juhu": "Mumbai",
  };
  
  const mappedCity = cityMapping[selectedCity];
  if (mappedCity && hotelsByCity[mappedCity]) {
    return hotelsByCity[mappedCity];
  }
  
  return null;
};

const cityOptions = [
  "Goa", "Mumbai", "Delhi", "Rajasthan", "Kerala", "Himachal Pradesh"
];

export const Hotels = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlatformForCoupon, setSelectedPlatformForCoupon] = useState<string>("MakeMyTrip");

  const handleSearch = () => {
    if (city.trim() && checkIn && checkOut) {
      if (checkIn >= checkOut) {
        toast({
          title: "Invalid Dates",
          description: "Check-out date must be after check-in date",
          variant: "destructive"
        });
        return;
      }
      
      const hotels = getHotelsForCity(city);
      if (!hotels) {
        toast({
          title: "No Hotels Found",
          description: `Sorry, we don't have hotels listed for "${city}". Try: Goa, Mumbai, Delhi, Rajasthan, Kerala, or Himachal Pradesh.`,
          variant: "destructive"
        });
        return;
      }
      
      setShowResults(true);
    } else {
      toast({
        title: "Missing Information",
        description: "Please select destination, check-in and check-out dates",
        variant: "destructive"
      });
    }
  };

  const handleBookHotel = (hotelName: string, platform: string, price: number) => {
    // Format dates for URL (YYYY-MM-DD or DD-MM-YYYY based on platform)
    const formatDateForUrl = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return { ddmmyyyy: `${day}-${month}-${year}`, yyyymmdd: `${year}-${month}-${day}` };
    };

    const checkInFormatted = checkIn ? formatDateForUrl(checkIn) : { ddmmyyyy: '', yyyymmdd: '' };
    const checkOutFormatted = checkOut ? formatDateForUrl(checkOut) : { ddmmyyyy: '', yyyymmdd: '' };
    const encodedCity = encodeURIComponent(city);
    const encodedHotel = encodeURIComponent(hotelName);

    // Build platform-specific URLs with search parameters
    const getPlatformUrl = () => {
      switch (platform) {
        case "MakeMyTrip":
          // MakeMyTrip hotel search URL
          return `https://www.makemytrip.com/hotels/hotel-listing/?checkin=${checkInFormatted.ddmmyyyy}&checkout=${checkOutFormatted.ddmmyyyy}&city=${encodedCity}&roomStayQualifier=${rooms}e0e${guests}&searchText=${encodedHotel}`;
        case "Booking.com":
          // Booking.com hotel search URL
          return `https://www.booking.com/searchresults.html?ss=${encodedCity}+${encodedHotel}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests}&no_rooms=${rooms}`;
        case "Agoda":
          // Agoda hotel search URL
          return `https://www.agoda.com/search?city=${encodedCity}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${rooms}&adults=${guests}&textToSearch=${encodedHotel}`;
        default:
          return "https://www.makemytrip.com/hotels";
      }
    };

    const url = getPlatformUrl();
    window.open(url, '_blank');

    toast({
      title: `Redirecting to ${platform}...`,
      description: `Searching "${hotelName}" in ${city} for ₹${price.toLocaleString()}`,
    });
  };

  const handleApplyCoupon = (code: string, discount: number, minOrder: number) => {
    toast({
      title: "Coupon Applied!",
      description: `${code} applied - Get ₹${discount} off on bookings above ₹${minOrder}`,
    });
  };

  const handleDestinationClick = (destinationCity: string) => {
    setCity(destinationCity);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(dayAfter.toISOString().split('T')[0]);
    setShowResults(true);
  };

  const hotels = getHotelsForCity(city);
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    }
    return 1;
  };

  const nights = calculateNights();

  // Price disclaimer component
  const PriceDisclaimer = () => (
    <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg flex items-start gap-3">
      <span className="text-lg">ℹ️</span>
      <div className="text-sm text-muted-foreground flex-1">
        <div className="flex flex-wrap gap-2 items-center mb-1">
          <strong className="text-foreground font-semibold">Prices shown are approximate estimates</strong>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500 text-xs">
            Live Hotel Scraping Unavailable
          </Badge>
        </div>
        Due to session tokens, user cookie validations, and dynamic layout structures on MakeMyTrip, Booking.com, and Agoda, real-time live scraping is currently unavailable. Rates are estimated based on typical market pricing. Verify fares manually on partner platforms using the booking links.
      </div>
    </div>
  );

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      {/* Price Disclaimer */}
      <div className="max-w-7xl mx-auto mb-6">
        <PriceDisclaimer />
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Stay
          </h2>
          <p className="text-muted-foreground text-lg">
            Best prices guaranteed across 500+ cities in India
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-12 shadow-xl border-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-foreground mb-2 block">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Destination</option>
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Guests & Rooms</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <select
                  value={`${guests}-${rooms}`}
                  onChange={(e) => {
                    const [g, r] = e.target.value.split('-').map(Number);
                    setGuests(g);
                    setRooms(r);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="1-1">1 Guest, 1 Room</option>
                  <option value="2-1">2 Guests, 1 Room</option>
                  <option value="3-2">3 Guests, 2 Rooms</option>
                  <option value="4-2">4 Guests, 2 Rooms</option>
                  <option value="6-3">6 Guests, 3 Rooms</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full py-6 text-lg font-semibold"
                size="lg"
              >
                Search Hotels
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        {showResults && hotels && (
          <div className="space-y-8 mb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">
                Hotels in {city} <span className="text-muted-foreground font-normal">({hotels.length} properties)</span>
              </h3>
              <Badge variant="secondary" className="text-sm">
                {nights} Night{nights > 1 ? 's' : ''} • {guests} Guest{guests > 1 ? 's' : ''} • {rooms} Room{rooms > 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Coupons Section */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Available Coupons</span>
                <select 
                  value={selectedPlatformForCoupon}
                  onChange={(e) => setSelectedPlatformForCoupon(e.target.value)}
                  className="ml-auto px-3 py-1 border rounded-md text-sm bg-background"
                >
                  {Object.keys(hotelCoupons).map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {hotelCoupons[selectedPlatformForCoupon as keyof typeof hotelCoupons]?.map((coupon) => (
                  <Button
                    key={coupon.code}
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplyCoupon(coupon.code, coupon.discount, coupon.minOrder)}
                    className="text-xs"
                  >
                    {coupon.code}: {coupon.description}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Hotel Cards */}
            <div className="space-y-6">
              {hotels.map((hotel, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Hotel Image */}
                    <div className="relative h-64 md:h-auto">
                      <img 
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {hotel.rating}
                      </Badge>
                    </div>

                    {/* Hotel Details */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-foreground mb-2">{hotel.name}</h4>
                      <div className="flex items-center text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.area}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {hotel.reviews.toLocaleString()} reviews
                      </p>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{hotel.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Pricing by Platform */}
                    <div className="p-6 bg-muted/30 border-l">
                      <h5 className="text-sm font-medium text-muted-foreground mb-4">Compare prices for {nights} night{nights > 1 ? 's' : ''}</h5>
                      <div className="space-y-3">
                        {hotel.platforms.map((platform, pIndex) => {
                          const totalPrice = platform.price * nights * rooms;
                          return (
                            <div key={pIndex} className="flex items-center justify-between p-3 bg-background rounded-lg border hover:border-primary transition-colors">
                              <div>
                                <p className="font-medium text-sm text-foreground">{platform.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {platform.breakfast} • {platform.cancellation} cancellation
                                </p>
                                <p className="text-xs text-muted-foreground">Taxes: {platform.taxes}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">₹{totalPrice.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">₹{platform.price.toLocaleString()}/night</p>
                                <Button 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => handleBookHotel(hotel.name, platform.name, totalPrice)}
                                >
                                  Book
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trending Destinations */}
        {!showResults && (
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Trending Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingDestinations.map((destination, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                  onClick={() => handleDestinationClick(destination.city)}
                >
                  <div className="relative h-32">
                    <img 
                      src={destination.image}
                      alt={destination.city}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="font-bold text-white">{destination.city}</h4>
                      <p className="text-xs text-white/80">{destination.hotels}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
