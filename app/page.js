"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Rocket, Sparkles, BookOpen, Target, Zap } from "lucide-react";
import { concepts } from "@/lib/concepts";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);
  const completedConcepts = useAppStore((state) => state.completedConcepts);
  const getCompletionPercentage = useAppStore(
    (state) => state.getCompletionPercentage
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const completionPercentage = hydrated
    ? getCompletionPercentage(concepts.length)
    : 0;
  const completedCount = hydrated ? completedConcepts.length : 0;

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Interactive Demos",
      description: "Learn by doing with hands-on, visual examples",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real-World Metaphors",
      description: "Pizza chefs, car washes, and more memorable examples",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your learning journey and completed concepts",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Core Concepts",
      description: "Master fundamental JavaScript patterns and techniques",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Code2 className="w-16 h-16 text-blue-500" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn JavaScript
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              The Fun Way
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Master core JavaScript concepts through interactive demos, memorable
            metaphors, and hands-on practice
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/concepts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg flex items-center gap-2 shadow-lg shadow-blue-500/50"
              >
                <Rocket className="w-5 h-5" />
                Start Learning
              </motion.button>
            </Link>

            <Link href="/concepts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-lg"
              >
                Browse Concepts
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {completedCount > 0 && (
          <motion.div
            className="max-w-md mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 font-medium">Your Progress</span>
                <span className="text-blue-400 font-bold">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {completedCount} of {concepts.length} concepts completed
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Featured Concepts
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {concepts.slice(0, 3).map((concept) => (
              <Link key={concept.id} href={`/concepts/${concept.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="text-4xl mb-3">{concept.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {concept.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {concept.difficulty}
                    </span>
                    <span className="text-gray-500">
                      {concept.estimatedTime}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/concepts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                View All Concepts →
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
