"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Globe, FileText, Users, PenTool } from 'react-feather'; // Import Feather Icons

const features = [
  {
    title: 'AI-Powered Email Generation',
    topLeft: '50% Faster Emails',
    description: 'Draft emails in half the time with our AI engine.',
    icon: <Mail size={42} className="text-white" />,
  },
  {
    title: 'Sound Like A Human',
    topLeft: 'Human-Like Writing Style',
    description: 'AI writes emails that sound professional and natural.',
    icon: <User size={42} className="text-white" />,
  },
  {
    title: '5 Unique Tones',
    topLeft: 'Five Distinct Tones',
    description: 'Choose between different writing styles based on the context.',
    icon: <PenTool size={42} className="text-white" />,
  },
  {
    title: 'Multilingual Support',
    topLeft: 'Write in Multiple Languages',
    description: 'Support for various languages for global outreach.',
    icon: <Globe size={42} className="text-white" />,
  },
  {
    title: 'Custom Templates',
    topLeft: 'Tailored Email Templates',
    description: 'Create personalized email templates for any scenario.',
    icon: <FileText size={42} className="text-white" />,
  },
  {
    title: 'Collaborative Editing',
    topLeft: 'Real-Time Collaboration',
    description: 'Work together on email drafts in real-time with team members.',
    icon: <Users size={42} className="text-white" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const borderVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div id="features" className="py-[5rem] scroll-m-[200px] bg-black text-center text-white relative">
      {/* White line above title */}
      <div className="absolute top-4 left-0 w-full h-px bg-white" style={{ left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }} />

      {/* Title Section */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-12 text-white relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        What Sets Us Apart
      </motion.h2>

      {/* Features Section */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-8"
        initial="hidden"
        animate={isVisible ? "visible" : ""}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 md:p-8 bg-black rounded-lg shadow-lg relative text-left hover:shadow-2xl transition duration-300 ease-in-out flex flex-col justify-between items-center h-full transform hover:scale-105"
          >
            {/* Animated border with rounded corners */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial="hidden"
              animate="visible"
              variants={borderVariants}
            >
              <motion.rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                rx="10"  
                ry="10"  
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Content */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-800 p-3 rounded-full">
                {feature.icon}
              </div>
              <div className="text-center ml-4">
                <h3 className="text-lg sm:text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="text-sm md:text-md text-gray-300 mt-2">{feature.description}</p>
              </div>
            </div>

            {/* Purple Text */}
            <div className="text-lg sm:text-4xl gradient-text mt-4 font-bold text-center">
              {feature.topLeft}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action Button */}
      <div className="mt-12">
        <motion.button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Start Writing Emails Now
        </motion.button>
      </div>
    </div>
  );
};

export default Features;
