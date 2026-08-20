import { Search, TrendingUp, Star, Info } from "lucide-react";

export const Hero = () => {
  return (
    <section className="gradient-hero text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Compare Prices, Save Money
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90">
            Find the best deals across all platforms - Food, Rides, Groceries, Flights & Hotels
          </p>
          
          {/* Disclaimer */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 text-sm text-primary-foreground/80">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>PriceX is a comparison tool. Prices are approximate — always verify on partner websites.</span>
          </div>
          
          {/* Featured Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <TrendingUp className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-primary-foreground/90">Price Comparisons Daily</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <Star className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="text-2xl font-bold">4.8★</h3>
              <p className="text-primary-foreground/90">User Rating</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <Search className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="text-2xl font-bold">15+</h3>
              <p className="text-primary-foreground/90">Partner Platforms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
