// app/concepts/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, CheckCircle, Bookmark, Clock } from "lucide-react";
import { concepts } from "@/lib/concepts";
import { useAppStore } from "@/lib/store";

export default function ConceptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [hydrated, setHydrated] = useState(false);

  const completedConcepts = useAppStore((state) => state.completedConcepts);
  const bookmarkedConcepts = useAppStore((state) => state.bookmarkedConcepts);
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch =
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDifficulty =
      selectedDifficulty === "all" || concept.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  const totalConcepts = concepts.length;
  const completedCount = hydrated ? completedConcepts.length : 0;
  const bookmarkedCount = hydrated ? bookmarkedConcepts.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            JavaScript Concepts
          </h1>
          <p className="text-xl text-gray-400">
            Explore interactive demos and master core JavaScript patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {hydrated ? `${completedCount}/${totalConcepts}` : "0/6"}
                </p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {hydrated ? bookmarkedCount : 0}
                </p>
                <p className="text-sm text-gray-400">Bookmarked</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalConcepts}</p>
                <p className="text-sm text-gray-400">Total Concepts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept) => {
            const isCompleted =
              hydrated && completedConcepts.includes(concept.slug);
            const isBookmarked =
              hydrated && bookmarkedConcepts.includes(concept.slug);

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{concept.icon}</div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(concept.slug);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium mb-3">
                    {concept.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {concept.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {concept.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          concept.difficulty === "beginner"
                            ? "bg-green-500/20 text-green-400"
                            : concept.difficulty === "intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {concept.difficulty}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {concept.estimatedTime}
                      </span>
                    </div>

                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                <Link href={`/concepts/${concept.slug}`}>
                  <div className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 font-semibold transition-colors cursor-pointer">
                    View Demo →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No concepts found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
