"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center relative z-10 text-default">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-[42px] sm:text-[64px] md:text-[74px] lg:text-[96px] font-extrabold leading-[1.1] mb-4 text-primary text-center tracking-tighter"
      >
        AI-Powered Insights for
        <br />
        your{" "}
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-deep-orange opacity-50 transform h-[40%] translate-y-[150%]"></span>
          <span className="relative">professors</span>
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-primary text-[13px] sm:text-lg md:text-xl mt-4 sm:mt-6 text-center tracking-tight px-4 sm:px-0"
      >
        Revolutionize your course selection with AI-powered professor ratings.
        Comprehensive,{" "}
        <span className="sm:hidden">
          <br />
        </span>
        data-driven, and presented in a sleek, intuitive interface.
      </motion.p>

      {/* Button to Professor Page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <Link href="/professor">
          <Button className="py-3 px-6 rounded text-sm">
            Search Professors
          </Button>
        </Link>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 sm:mt-20 p-2 bg-white bg-opacity-60 rounded-3xl shadow-6xl relative overflow-hidden backdrop-filter backdrop-blur-3xl"
        style={{
          boxShadow: "0 0 50px 2px rgba(17, 38, 107, 0.6)",
        }}
      >
        <div className="absolute inset-0 bg-primary opacity-30 filter blur-3xl"></div>
        <video
          src="https://videos.pexels.com/video-files/25744128/11904108_2560_1440_24fps.mp4"
          width={1200}
          height={600}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-2xl relative z-10 w-full h-auto object-cover"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-charcoal-black text-base sm:text-lg mt-6"
      >
        Harnessing advanced AI to generate comprehensive professor evaluations
        from student feedback, optimizing your course selection process.
      </motion.p>
    </main>
  );
};

export default Hero;