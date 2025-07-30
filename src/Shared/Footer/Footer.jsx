import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Footer = () => {
  return (
    <div>
      <hr className="border-t border-gray-600 my-4 w-10/12 justify-self-center" />
      <footer className="px-4 bg-black text-white">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex justify-start space-x-3">
            <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
              <FaFacebook />
            </a>
            <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
              <FaTwitter />
            </a>
            <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
              <CiInstagram />
            </a>
          </div>
          <div className="grid font-poppins grid-cols-2 text-sm gap-x-1 lg:gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-2">
            
            <div className="space-y-3">
              <h3 className="text-green-500 font-semibold text-lg">Pages</h3>
              <ul className="space-y-1">
                <li className="hover:text-green-500"><a href="/pricing">Pricing</a></li>
                <li className="hover:text-green-500"><a href="/services">Services</a></li>
                <li className="hover:text-green-500"><a href="/about">About Us</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-green-500 font-semibold text-lg">Services</h3>
              <ul className="space-y-1">
                <li className="hover:text-green-500"><a href="#">Expense & Income Tracking</a></li>
                <li className="hover:text-green-500"><a href="#">Budgeting</a></li>
                <li className="hover:text-green-500"><a href="#">Savings & Goal Planning</a></li>
                <li className="hover:text-green-500"><a href="#">Loan Management</a></li>
                <li className="hover:text-green-500"><a href="#">Investment Management</a></li>
                <li className="hover:text-green-500"><a href="#">PDF, Excel & CSV format reports</a></li>
                
              </ul>
            </div>
          </div>
        </div>

		<div className="py-6 text-sm text-center hover:text-green-500">
		© 2025 BudgetBuddy. All rights reserved.
		</div>
      </footer>
    </div>
  );
};

export default Footer;
