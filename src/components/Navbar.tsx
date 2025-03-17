"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedIn } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-lg ring-1 ring-gray-700 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                    CodeCraft
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <Link href="/Home" className="px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50">About</Link>
                    </li>
                    <SignedIn>
                        <li>
                            <Link href="/profile" className="px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50">Dashboard</Link>
                        </li>
                    </SignedIn>
                    <li>
                        <Link href="/" className="px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50">Workspace</Link>
                    </li>
                    <div className="pl-3 border-l border-gray-600">
                        <HeaderProfileBtn />
                    </div>
                </ul>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className="md:hidden text-3xl focus:outline-none hover:scale-110 transition-transform duration-300" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </div>

            {/* Modern Mobile Menu (Slide-in from Right) */}
            <div className={`fixed inset-y-0 right-0 w-3/4 pt-5 gap-3 max-w-sm bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden flex flex-col items-start space-y-4 p-6`}>
                <button 
                    className="absolute top-4 right-4  text-white text-2xl focus:outline-none" 
                    onClick={() => setIsOpen(false)}
                >
                    <X className="size-6" />
                </button>
                <Link href="/home" className="w-full mt-7 px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50" onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/about" className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50" onClick={() => setIsOpen(false)}>About</Link>
                <SignedIn>
                    <Link href="/profile" className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50" onClick={() => setIsOpen(false)}>Dashboard</Link>
                </SignedIn>
                <Link href="/workspace" className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 text-white transition-all duration-300 
                          hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/50" onClick={() => setIsOpen(false)}>Workspace</Link>
                <div className="w-full pt-4 border-t border-gray-700">
                    <HeaderProfileBtn />
                </div>
            </div>
        </nav>
    );
}