"use client";

import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import Header from "./Header";

export default function ClientWrapper() {
  const { isLoaded, userId } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return null;
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center space-y-6 p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/10">
          <h1 className="text-3xl font-bold text-white">
            Welcome to CodeCraft
          </h1>
          <p className="text-gray-400 text-lg">
            Please sign in to start coding
          </p>
          <div className="mt-8">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-gray-800/50 border border-white/10",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
