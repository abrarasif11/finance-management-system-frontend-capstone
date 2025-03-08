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
          <div className="grid font-poppins grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg">Use cases</h3>
              <ul className="space-y-1">
                <li className="hover:text-green-500"><a href="#">UI design</a></li>
                <li className="hover:text-green-500"><a href="#">Wire framing</a></li>
                <li className="hover:text-green-500"><a href="#">Diagramming</a></li>
                <li className="hover:text-green-500"><a href="#">Brainstorming</a></li>
                <li className="hover:text-green-500"><a href="#">Online whiteboard</a></li>
                <li className="hover:text-green-500"><a href="#">Team collaboration</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg">Explore</h3>
              <ul className="space-y-1">
                <li className="hover:text-green-500"><a href="#">Design</a></li>
                <li className="hover:text-green-500"><a href="#">Prototyping</a></li>
                <li className="hover:text-green-500"><a href="#">Development features</a></li>
                <li className="hover:text-green-500"><a href="#">Design systems</a></li>
                <li className="hover:text-green-500"><a href="#">Collaboration features</a></li>
                <li className="hover:text-green-500"><a href="#">Design process</a></li>
                <li className="hover:text-green-500"><a href="#">Fig Jam</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg">Resources</h3>
              <ul className="space-y-1">
                <li className="hover:text-green-500"><a href="#">Blog</a></li>
                <li className="hover:text-green-500"><a href="#">Best practices</a></li>
                <li className="hover:text-green-500"><a href="#">Colors</a></li>
                <li className="hover:text-green-500"><a href="#">Color wheel</a></li>
                <li className="hover:text-green-500"><a href="#">Support</a></li>
                <li className="hover:text-green-500"><a href="#">Developers</a></li>
                <li className="hover:text-green-500"><a href="#">Resource library</a></li>
              </ul>
            </div>
          </div>
        </div>

		<div className="py-6 text-sm text-center hover:text-green-500">
		© 2025 Finance Management System. All rights reserved.
		</div>
      </footer>
    </div>
  );
};

export default Footer;
