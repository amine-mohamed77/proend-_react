
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">UniHomeConnect</h3>
            <p className="text-sm text-gray-600">
              Connecting students with their perfect housing solutions near universities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offers" className="text-gray-600 hover:text-housing-blue">Find Housing</Link></li>
              <li><Link to="/demands" className="text-gray-600 hover:text-housing-blue">Post Requirements</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-housing-blue">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Property Owners</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-housing-blue">List Your Property</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-housing-blue">Leasing Tips</Link></li>
              <li><Link to="/demands" className="text-gray-600 hover:text-housing-blue">View Student Demands</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@unihomeconnect.com" className="text-gray-600 hover:text-housing-blue">support@unihomeconnect.com</a></li>
              <li><a href="tel:+1234567890" className="text-gray-600 hover:text-housing-blue">+1 (234) 567-890</a></li>
              <li className="text-gray-600">123 University Ave, College Town</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} UniHomeConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
