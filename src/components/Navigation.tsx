import { Search, Utensils, Car, ShoppingCart, Plane, Building } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "food", label: "Food", icon: Utensils },
  { id: "rides", label: "Rides", icon: Car },
  { id: "groceries", label: "Groceries", icon: ShoppingCart },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Building },
];

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">PriceX</span>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`nav-tab ${activeSection === section.id ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="search-input text-sm"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};