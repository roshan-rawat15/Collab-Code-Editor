import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-t border-gray-800 mt-auto text-gray-400">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side - Logo & Tagline */}
        <div className="flex items-center gap-3">
          <Blocks className="size-6 text-teal-400" />
          <span className="text-gray-300 text-sm md:text-base font-medium">
            Built for developers, by developers
          </span>
        </div>

        {/* Right Side - Links */}
        <div className="flex items-center gap-6">
          <Link href="/support" className="hover:text-teal-400 transition duration-300">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-teal-400 transition duration-300">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-teal-400 transition duration-300">
            Terms
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
