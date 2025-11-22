import { FaFacebookF, FaInstagram, FaLinkedinIn} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo Description */}
        <div>
          <h1 className="text-3xl font-bold text-orange-700 tracking-wide">
            Gallad <span className="text-white">Digital</span>
          </h1>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Your trusted source for premium electronics in East Africa.  
            Quality • Trust • Fast Delivery.
          </p>
        </div>

        {/* SHopping Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-orange-700 cursor-pointer">Smartphones</li>
            <li className="hover:text-orange-700 cursor-pointer">Laptops</li>
            <li className="hover:text-orange-700 cursor-pointer">Accessories</li>
            <li className="hover:text-orange-700 cursor-pointer">Gaming</li>
          </ul>
        </div>

        {/* Support Links*/}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-orange-700 cursor-pointer">Customer Service</li>
            <li className="hover:text-orange-700 cursor-pointer">Warranty Policy</li>
            <li className="hover:text-orange-700 cursor-pointer">Shipping & Delivery</li>
            <li className="hover:text-orange-700 cursor-pointer">Return Policy</li>
          </ul>
        </div>

        {/* Social Links*/}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex items-center gap-4">
            <FaFacebookF className="text-xl cursor-pointer hover:text-orange-700" />
            <FaInstagram className="text-xl cursor-pointer hover:text-orange-700" />
            <FaXTwitter   className="text-xl cursor-pointer hover:text-orange-700" />
            <FaLinkedinIn className="text-xl cursor-pointer hover:text-orange-700" />
          </div>

          <p className="text-sm mt-5 text-gray-400">
            Join our community and stay updated.
          </p>
        </div>
      </div>

      {/* CopyRight */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gallad Digital. All Rights Reserved.
      </div>
    </footer>
  );
}
