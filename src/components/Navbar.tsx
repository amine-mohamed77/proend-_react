
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-housing-blue" />
          <span className="text-xl font-bold text-housing-blue">UniHomeConnect</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-housing-blue transition-colors">
            Home
          </Link>
          <Link to="/offers" className="font-medium hover:text-housing-blue transition-colors">
            Offers
          </Link>
          <Link to="/demands" className="font-medium hover:text-housing-blue transition-colors">
            Demands
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
