import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative">
              {/* Logo hover effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
              {/* Logo */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all">
                <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="relative">
                <span className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  CodeCraft
                </span>
                <span className="hidden sm:block text-xs text-blue-400/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>
            {/* Snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/20 
              border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 sm:w-5 h-4 sm:h-5 relative z-10 group-hover:rotate-6 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-amber-500/30 hover:border-amber-500/50 bg-gradient-to-r from-amber-500/20 
                to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 shadow-md"
              >
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            </SignedOut>
            {/* Profile Button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
