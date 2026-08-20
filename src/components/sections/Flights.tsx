import { useState } from "react";
import { Plane, Calendar, Users, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import flightHeroImg from "@/assets/flight-hero.jpg";
import mumbaiImg from "@/assets/destination-mumbai.jpg";
import bangaloreImg from "@/assets/destination-bangalore.jpg";
import goaImg from "@/assets/destination-goa.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import chennaiImg from "@/assets/destination-chennai.jpg";
import kolkataImg from "@/assets/destination-kolkata.jpg";

// Flight coupons by platform
const flightCoupons = {
  MakeMyTrip: [
    { code: "MMTFLIGHT", discount: 1000, minOrder: 5000, description: "₹1000 off on flights above ₹5000" },
    { code: "MMTSUPER", discount: 1500, minOrder: 8000, description: "₹1500 off with MMT Black" },
  ],
  Goibibo: [
    { code: "GOFIRST", discount: 1200, minOrder: 4500, description: "₹1200 off on first flight booking" },
    { code: "GOCASH", discount: 800, minOrder: 4000, description: "₹800 GoCash on flights" },
  ],
  Cleartrip: [
    { code: "CTFLY", discount: 1100, minOrder: 5000, description: "₹1100 off on Cleartrip flights" },
    { code: "CTEXPRESS", discount: 1300, minOrder: 7000, description: "₹1300 instant discount" },
  ]
};

// Distance-based pricing from Delhi (approx km and realistic prices)
// Delhi-Mumbai: ~1400km, Delhi-Bangalore: ~2150km, Delhi-Chennai: ~2180km
// Delhi-Kolkata: ~1530km, Delhi-Goa: ~1850km, Delhi-Kerala: ~2700km
const popularDestinations = [
  { city: "Mumbai", price: "₹3,450", image: mumbaiImg },      // ~1400km - short haul
  { city: "Bangalore", price: "₹4,850", image: bangaloreImg }, // ~2150km - medium haul
  { city: "Chennai", price: "₹4,950", image: chennaiImg },     // ~2180km - medium haul
  { city: "Kolkata", price: "₹3,750", image: kolkataImg },     // ~1530km - short haul
  { city: "Goa", price: "₹4,250", image: goaImg },             // ~1850km - medium haul
  { city: "Kerala", price: "₹5,650", image: keralaImg },       // ~2700km - long haul
];

// Route-specific pricing based on distance and demand
const routePricing: Record<string, { basePrice: number; duration: string }> = {
  "Delhi-Mumbai": { basePrice: 3450, duration: "2h 10m" },
  "Delhi-Bangalore": { basePrice: 4850, duration: "2h 45m" },
  "Delhi-Chennai": { basePrice: 4950, duration: "2h 50m" },
  "Delhi-Kolkata": { basePrice: 3750, duration: "2h 15m" },
  "Delhi-Goa": { basePrice: 4250, duration: "2h 25m" },
  "Delhi-Kerala": { basePrice: 5650, duration: "3h 20m" },
  "Delhi-Hyderabad": { basePrice: 4150, duration: "2h 05m" },
  "Delhi-Pune": { basePrice: 3650, duration: "2h 00m" },
  "Delhi-Ahmedabad": { basePrice: 2850, duration: "1h 30m" },
  "Delhi-Jaipur": { basePrice: 2250, duration: "0h 55m" },
  "Delhi-Visakhapatnam": { basePrice: 5250, duration: "2h 40m" },
  "Mumbai-Delhi": { basePrice: 3450, duration: "2h 10m" },
  "Mumbai-Bangalore": { basePrice: 2950, duration: "1h 45m" },
  "Mumbai-Chennai": { basePrice: 3850, duration: "2h 00m" },
  "Mumbai-Kolkata": { basePrice: 4550, duration: "2h 35m" },
  "Mumbai-Goa": { basePrice: 2450, duration: "1h 10m" },
  "Bangalore-Delhi": { basePrice: 4850, duration: "2h 45m" },
  "Bangalore-Mumbai": { basePrice: 2950, duration: "1h 45m" },
  "Chennai-Delhi": { basePrice: 4950, duration: "2h 50m" },
  "Kolkata-Delhi": { basePrice: 3750, duration: "2h 15m" },
};

const getFlightResults = (from: string, to: string) => {
  const routeKey = `${from}-${to}`;
  const pricing = routePricing[routeKey] || { basePrice: 4500, duration: "2h 30m" };
  const base = pricing.basePrice;
  
  return [
    {
      flight: "Air India AI 131",
      departure: "6:30 AM",
      arrival: "8:45 AM",
      duration: pricing.duration,
      aircraft: "Boeing 737",
      platforms: [
        { name: "MakeMyTrip", price: Math.round(base * 1.15), baggage: "15kg", meals: "Included", cancellation: "Free" },
        { name: "Goibibo", price: Math.round(base * 1.10), baggage: "15kg", meals: "₹300 extra", cancellation: "Free" },
        { name: "Cleartrip", price: Math.round(base * 1.12), baggage: "15kg", meals: "Included", cancellation: "₹500 fee" },
      ]
    },
    {
      flight: "IndiGo 6E 142",
      departure: "9:15 AM",
      arrival: "11:35 AM",
      duration: pricing.duration,
      aircraft: "Airbus A320",
      platforms: [
        { name: "MakeMyTrip", price: Math.round(base * 0.95), baggage: "7kg", meals: "₹250 extra", cancellation: "₹750 fee" },
        { name: "Goibibo", price: Math.round(base * 0.88), baggage: "7kg", meals: "₹250 extra", cancellation: "₹750 fee" },
        { name: "Cleartrip", price: Math.round(base * 0.92), baggage: "7kg", meals: "₹250 extra", cancellation: "₹750 fee" },
      ]
    },
    {
      flight: "Akasa Air QP 1142",
      departure: "2:30 PM",
      arrival: "4:50 PM",
      duration: pricing.duration,
      aircraft: "Boeing 737 MAX",
      platforms: [
        { name: "MakeMyTrip", price: Math.round(base * 0.85), baggage: "7kg", meals: "₹200 extra", cancellation: "₹500 fee" },
        { name: "Goibibo", price: Math.round(base * 0.80), baggage: "7kg", meals: "₹200 extra", cancellation: "₹500 fee" },
        { name: "Cleartrip", price: Math.round(base * 0.82), baggage: "7kg", meals: "₹200 extra", cancellation: "₹500 fee" },
      ]
    },
    {
      flight: "Vistara UK 832",
      departure: "4:15 PM",
      arrival: "6:40 PM",
      duration: pricing.duration,
      aircraft: "Airbus A320neo",
      platforms: [
        { name: "MakeMyTrip", price: Math.round(base * 1.25), baggage: "15kg", meals: "Included", cancellation: "Free" },
        { name: "Goibibo", price: Math.round(base * 1.18), baggage: "15kg", meals: "Included", cancellation: "₹500 fee" },
        { name: "Cleartrip", price: Math.round(base * 1.22), baggage: "15kg", meals: "Included", cancellation: "Free" },
      ]
    },
    {
      flight: "SpiceJet SG 183",
      departure: "7:00 PM",
      arrival: "9:15 PM",
      duration: pricing.duration,
      aircraft: "Boeing 737",
      platforms: [
        { name: "MakeMyTrip", price: Math.round(base * 0.78), baggage: "7kg", meals: "₹250 extra", cancellation: "₹800 fee" },
        { name: "Goibibo", price: Math.round(base * 0.72), baggage: "7kg", meals: "₹250 extra", cancellation: "₹800 fee" },
        { name: "Cleartrip", price: Math.round(base * 0.75), baggage: "7kg", meals: "₹250 extra", cancellation: "₹800 fee" },
      ]
    }
  ];
};

const cityOptions = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", 
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Visakhapatnam"
];

export const Flights = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlatformForCoupon, setSelectedPlatformForCoupon] = useState<string>("MakeMyTrip");

  const handleSearch = () => {
    if (fromCity.trim() && toCity.trim() && departureDate) {
      if (fromCity === toCity) {
        toast({
          title: "Invalid Selection",
          description: "From and To cities cannot be the same",
          variant: "destructive"
        });
        return;
      }
      setShowResults(true);
    } else {
      toast({
        title: "Missing Information",
        description: "Please select from city, to city, and departure date",
        variant: "destructive"
      });
    }
  };

  const handleBookFlight = (platform: string, flight: string, price: number) => {
    // Format date for URL (DD/MM/YYYY format for Indian platforms)
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formattedDate = departureDate ? formatDate(departureDate) : '';
    
    // Build platform-specific URLs with search parameters
    const getPlatformUrl = () => {
      switch (platform) {
        case "MakeMyTrip":
          // MakeMyTrip flight search URL format
          return `https://www.makemytrip.com/flight/search?itinerary=${fromCity}-${toCity}-${formattedDate}&tripType=O&paxType=A-${passengers}_C-0_I-0&intl=false&cabinClass=E`;
        case "Goibibo":
          // Goibibo flight search URL format
          return `https://www.goibibo.com/flights/air-${fromCity.toLowerCase()}-${toCity.toLowerCase()}-${formattedDate}--${passengers}-0-0-E-D`;
        case "Cleartrip":
          // Cleartrip flight search URL format
          return `https://www.cleartrip.com/flights/results?from=${fromCity}&to=${toCity}&depart_date=${departureDate}&adults=${passengers}&childs=0&infants=0&class=Economy&airline=&carrier=&intl=n`;
        default:
          return "https://www.makemytrip.com";
      }
    };

    const url = getPlatformUrl();
    window.open(url, '_blank');
    
    toast({
      title: `Redirecting to ${platform}...`,
      description: `Booking ${flight} (₹${price.toLocaleString()}) • ${fromCity} → ${toCity}`,
    });
  };

  return (
    <div className="py-8 fade-in">
      {/* Price Disclaimer */}
      <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg flex items-start gap-3">
        <span className="text-lg">ℹ️</span>
        <div className="text-sm text-muted-foreground flex-1">
          <div className="flex flex-wrap gap-2 items-center mb-1">
            <strong className="text-foreground font-semibold">Prices shown are approximate estimates</strong>
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500 text-xs">
              Live Flight Scraping Unavailable
            </Badge>
          </div>
          Due to strict anti-bot firewall systems (Akamai) on MakeMyTrip, Goibibo, and Cleartrip, real-time live flight scraping is unavailable. Displayed rates are estimated using typical seasonal market fares. Please use the booking redirects to check real-time availability and fares manually on official websites.
        </div>
      </div>

      {!showResults ? (
        <>
          {/* Hero Banner */}
          <div className="relative h-80 rounded-3xl overflow-hidden mb-12">
            <img src={flightHeroImg} alt="Flights" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center">
              <div className="container mx-auto px-8">
                <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Flight</h1>
                <p className="text-xl text-white/90">Compare prices across MakeMyTrip, Goibibo & Cleartrip</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Search & Compare
            </h2>
            
            {/* Search Form */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="search-input pl-12"
                  >
                    <option value="">From City</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-destructive" />
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="search-input pl-12"
                  >
                    <option value="">To City</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="search-input pl-12"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="search-input pl-12"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button onClick={handleSearch} className="w-full md:w-auto btn-hero px-12 py-4 text-lg">
                <Plane className="w-5 h-5 mr-2" />
                Search Flights
              </Button>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Popular Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setToCity(destination.city);
                    setFromCity("Delhi");
                    setDepartureDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                    setShowResults(true);
                  }}
                  className="platform-card text-center p-4 group overflow-hidden relative"
                >
                  {typeof destination.image === 'string' && destination.image.startsWith('/') ? (
                    <div className="relative h-24 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-lg">
                      <img 
                        src={destination.image} 
                        alt={destination.city}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ) : (
                    <div className="text-4xl mb-3">{destination.image}</div>
                  )}
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                    {destination.city}
                  </h4>
                  <p className="text-sm text-muted-foreground">from {destination.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Flight Coupons */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-primary" />
              Flight Booking Coupons
            </h3>
            
            {/* Platform Tabs */}
            <div className="flex gap-2 mb-4">
              {Object.keys(flightCoupons).map((platform) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flightCoupons[selectedPlatformForCoupon as keyof typeof flightCoupons].map((coupon) => (
                <Card key={coupon.code} className="p-4 border-2 border-dashed border-primary/30 hover:border-primary transition-all cursor-pointer hover:scale-105">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="font-mono">{coupon.code}</Badge>
                    <Plane className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold mb-1">{coupon.description}</p>
                  <p className="text-xs text-muted-foreground">Min booking: ₹{coupon.minOrder}</p>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="slide-up">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {fromCity} → {toCity}
              </h2>
              <p className="text-muted-foreground">
                {departureDate} • {passengers} passenger{passengers > 1 ? 's' : ''}
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowResults(false)}>
              New Search
            </Button>
          </div>

          <div className="space-y-8">
            {getFlightResults(fromCity, toCity).map((flight, index) => (
              <div key={index} className="comparison-card">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">✈️</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{flight.flight}</h3>
                      <p className="text-muted-foreground">{flight.aircraft}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-4 text-lg font-semibold">
                      <span>{flight.departure}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <div className="w-16 border-t border-dashed border-border"></div>
                        <Plane className="w-5 h-5 text-primary" />
                        <div className="w-16 border-t border-dashed border-border"></div>
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      </div>
                      <span>{flight.arrival}</span>
                    </div>
                    <p className="text-muted-foreground mt-1">{flight.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {flight.platforms.map((platform, platformIndex) => (
                    <div key={platformIndex} className="platform-card">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-foreground text-lg">{platform.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">₹{platform.price.toLocaleString()}</div>
                          <p className="text-xs text-muted-foreground">per person</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Baggage</span>
                          <span className="font-medium">{platform.baggage}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Meals</span>
                          <span className={`font-medium ${platform.meals === "Included" ? "text-success" : "text-warning"}`}>
                            {platform.meals}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Cancellation</span>
                          <span className={`font-medium ${platform.cancellation === "Free" ? "text-success" : "text-warning"}`}>
                            {platform.cancellation}
                          </span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleBookFlight(platform.name, flight.flight, platform.price)}
                        className="w-full btn-hero"
                      >
                        Book on {platform.name}
                      </Button>
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