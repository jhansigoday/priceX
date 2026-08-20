import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FoodDelivery } from "@/components/sections/FoodDelivery";
import { RideSharing } from "@/components/sections/RideSharing";
import { GroceriesNew } from "@/components/sections/GroceriesNew";
import { Flights } from "@/components/sections/Flights";
import { Hotels } from "@/components/sections/Hotels";

const Index = () => {
  const [activeSection, setActiveSection] = useState("food");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "food":
        return <FoodDelivery />;
      case "rides":
        return <RideSharing />;
      case "groceries":
        return <GroceriesNew />;
      case "flights":
        return <Flights />;
      case "hotels":
        return <Hotels />;
      default:
        return <FoodDelivery />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {activeSection === "food" && <Hero />}
      <main className="container mx-auto px-4" data-section={activeSection}>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;