"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <header className="container mx-auto mt-5 px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        className="text-charcoal-black flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link href="/" className="flex items-center">
          <Image src="/images/Logo.svg" alt="Logo" width={80} height={26} />
        </Link>
      </motion.div>
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.5
            }
          }}
        >
          <Link href="/transcript" className="text-sm text-dark bg-white px-4 py-2 rounded hover:bg-white/90 transition-colors">
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Navbar;