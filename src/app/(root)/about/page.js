"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col items-center px-6 md:px-16">
      {/* Header with Gradient Text */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mt-20 text-center bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
      >
        About Code Craft
      </motion.h1>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-gray-300 text-center max-w-3xl"
      >
        Code Craft is a powerful online code editor that enables seamless real-time collaboration between developers. Work individually or team up in a shared workspace with instant syncing and an intuitive interface. Our platform is built for efficiency, ensuring developers can focus on writing great code without worrying about version conflicts or lost progress.
      </motion.p>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-9 max-w-5xl">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-6 bg-gray-700/50 rounded-2xl shadow-lg backdrop-blur-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Information */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center max-w-4xl"
      >
        <h2 className="text-3xl font-semibold">Why Choose Code Craft?</h2>
        <p className="mt-4 text-lg text-gray-300">
          Code Craft is more than just a code editor—it's a fully integrated development experience designed to streamline teamwork. Whether you’re working on a small project or leading a large development team, our tools empower you to code faster, smarter, and more efficiently.
        </p>
      </motion.div>
    </div>
  );
};

const features = [
  { title: "Real-time Collaboration", description: "Code together with teammates in a synchronized environment." },
  { title: "Multiple Languages", description: "Supports JavaScript, Python, and more for a versatile experience." },
  { title: "Admin Controls", description: "Manage team access, approvals, and project settings with ease." },
  { title: "Version Control", description: "Track changes, revert to previous versions, and collaborate with confidence." },
  { title: "Cloud-Based", description: "Access your code from anywhere without the need for local setup." },
  { title: "Customizable Themes", description: "Personalize your coding environment to suit your style." },
];

export default About;
