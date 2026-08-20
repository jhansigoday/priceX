import { useState } from "react";
import { MapPin, Clock, Car, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const popularRoutes = [
  { from: "Vizag Railway Station", to: "RK Beach", distance: "8 km" },
  { from: "Vizag Airport", to: "MVP Colony", distance: "12 km" },
  { from: "Dwaraka Nagar", to: "CMR Mall", distance: "6 km" },
  { from: "Madhurawada", to: "Rushikonda Beach", distance: "15 km" },
  { from: "Gajuwaka", to: "Steel Plant", distance: "10 km" },
  { from: "Pendurthi", to: "Vizag Port", distance: "20 km" },
];

const rideOptions = [
  {
    platform: "Uber",
    price: 180,
    eta: "8 min",
    vehicle: "Sedan",
    rating: 4.5
  },
  {
    platform: "Ola",
    price: 165,
    eta: "6 min", 
    vehicle: "Sedan",
    rating: 4.3
  },
  {
    platform: "Rapido",
    price: 85,
    eta: "4 min",
    vehicle: "Bike",
    rating: 4.1
  }
];

const vehicleTypes = [
  { type: "Cab", icon: "🚗", capacity: "4 seater" },
  { type: "Sedan", icon: "🚙", capacity: "4 seater" },
  { type: "Bike", icon: "🏍️", capacity: "1 rider" },
  { type: "Auto", icon: "🛺", capacity: "3 seater" },
];

const visakhapatnamLocations = [
  "Visakhapatnam Airport", "Railway Station", "Beach Road", "RTC Complex", 
  "VUDA Park", "Jagadamba Center", "Steel Plant", "Dwaraka Nagar", 
  "Gajuwaka", "MVP Colony", "Kailasagiri", "Rushikonda Beach",
  "Simhachalam", "Madhurawada", "Pendurthi"
];

export const RideSharing = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showPopularRoutes, setShowPopularRoutes] = useState(false);

  const handleSearch = () => {
    if (pickup.trim() && dropoff.trim() && selectedVehicle.trim()) {
      if (pickup === dropoff) {
        toast({
          title: "Invalid Route",
          description: "Pickup and drop locations cannot be the same",
          variant: "destructive"
        });
        return;
      }
      setShowResults(true);
    } else {
      toast({
        title: "Missing Information",
        description: "Please select pickup location, drop location, and vehicle type",
        variant: "destructive"
      });
    }
  };

  const handleBookRide = (platform: string, from?: string, to?: string, vehicleType?: string) => {
    // Create specific URLs with ride details
    let platformUrl = "";
    const pickupLocation = from || pickup;
    const dropLocation = to || dropoff;
    const vehicle = vehicleType || selectedVehicle;
    
    switch (platform) {
      case "Uber":
        // Uber deep link with pickup and drop locations
        platformUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&pickup[formatted_address]=${encodeURIComponent(pickupLocation)}&dropoff[formatted_address]=${encodeURIComponent(dropLocation)}&product_id=${vehicle === 'Bike' ? 'motorcycle' : 'sedan'}`;
        break;
      case "Ola":
        // Ola deep link
        platformUrl = `https://book.olacabs.com/?serviceType=${vehicle === 'Bike' ? 'bike' : 'cab'}&pickup=${encodeURIComponent(pickupLocation)}&drop=${encodeURIComponent(dropLocation)}`;
        break;
      case "Rapido":
        // Rapido web booking - opens main page as they don't have direct deep links
        platformUrl = `https://www.rapido.bike/`;
        break;
      default:
        platformUrl = "https://www.uber.com";
    }
    
    window.open(platformUrl, '_blank');
    
    toast({
      title: `Redirecting to ${platform}...`,
      description: `Booking ${vehicle} ride from ${pickupLocation} to ${dropLocation}`,
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
              Live Fare Scraping Unavailable
            </Badge>
          </div>
          Due to session authentication requirements and private API limits on Uber, Ola, and Rapido, real-time live fare scraping is unavailable. Displayed rates are estimated using typical regional base fares. Click booking buttons to view live rates and verify on official apps.
        </div>
      </div>
          {!showResults && !showPopularRoutes ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Compare Ride Prices in Visakhapatnam
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Pickup Location</label>
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="search-input"
                    >
                      <option value="">Choose pickup location</option>
                      {visakhapatnamLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Drop Location</label>
                    <select
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="search-input"
                    >
                      <option value="">Choose drop location</option>
                      {visakhapatnamLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Vehicle Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {vehicleTypes.map((vehicle) => (
                      <button
                        key={vehicle.type}
                        onClick={() => setSelectedVehicle(vehicle.type)}
                        className={`platform-card p-4 text-center transition-all ${
                          selectedVehicle === vehicle.type 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : ''
                        }`}
                      >
                        <div className="text-2xl mb-2">{vehicle.icon}</div>
                        <div className="text-sm font-medium">{vehicle.type}</div>
                        <div className="text-xs text-muted-foreground">{vehicle.capacity}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleSearch}
                    className="btn-hero px-8 py-3"
                    disabled={!pickup || !dropoff || !selectedVehicle}
                  >
                    Find Rides
                  </Button>
                  <Button 
                    onClick={() => setShowPopularRoutes(true)}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    View Popular Routes
                  </Button>
                </div>
              </div>
            </>
          ) : showPopularRoutes ? (
            <div className="slide-up">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Popular Routes in Visakhapatnam
                  </h2>
                  <p className="text-muted-foreground">
                    Most traveled routes with price comparisons
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPopularRoutes(false)}
                >
                  Back to Search
                </Button>
              </div>

              <div className="space-y-6">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="comparison-card">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">🚗</div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{route.from} → {route.to}</h3>
                          <p className="text-muted-foreground">Distance: {route.distance}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {rideOptions.map((ride, rideIndex) => (
                        <div key={rideIndex} className="platform-card">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-foreground text-lg">{ride.platform}</h4>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">₹{ride.price}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                ETA
                              </span>
                              <span className="font-medium">{ride.eta}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center text-muted-foreground">
                                <Car className="w-4 h-4 mr-1" />
                                Vehicle
                              </span>
                              <span className="font-medium">{ride.vehicle}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center text-muted-foreground">
                                <Star className="w-4 h-4 mr-1" />
                                Rating
                              </span>
                              <span className="font-medium">{ride.rating}★</span>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleBookRide(ride.platform, route.from, route.to, ride.vehicle)}
                            className="w-full btn-hero"
                          >
                            Book with {ride.platform}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="slide-up">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {pickup} → {dropoff}
                  </h2>
                  <p className="text-muted-foreground">Ride comparison results for {selectedVehicle}</p>
                </div>
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  New Search
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rideOptions.map((ride, index) => (
                  <div key={index} className="comparison-card">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-foreground text-lg">{ride.platform}</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{ride.price}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          ETA
                        </span>
                        <span className="font-medium">{ride.eta}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <Car className="w-4 h-4 mr-1" />
                          Vehicle
                        </span>
                        <span className="font-medium">{selectedVehicle}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <Star className="w-4 h-4 mr-1" />
                          Rating
                        </span>
                        <span className="font-medium">{ride.rating}★</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleBookRide(ride.platform, pickup, dropoff, selectedVehicle)}
                      className="w-full btn-hero"
                    >
                      Book with {ride.platform}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };