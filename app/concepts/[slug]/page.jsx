"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  CheckCircle,
  Bookmark,
  ExternalLink,
  Monitor,
  BookOpen,
} from "lucide-react";
import { concepts, getConceptBySlug } from "@/lib/concepts";
import { useAppStore } from "@/lib/store";

export default function ConceptDetailPage({ params }) {
  const unwrappedParams = use(params);
  const concept = getConceptBySlug(unwrappedParams.slug);
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const [readmeContent, setReadmeContent] = useState("");
  const [loadingReadme, setLoadingReadme] = useState(false);

  const completedConcepts = useAppStore((state) => state.completedConcepts);
  const bookmarkedConcepts = useAppStore((state) => state.bookmarkedConcepts);
  const completeConcept = useAppStore((state) => state.completeConcept);
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeTab === "theory" && concept?.readmePath && !readmeContent) {
      const loadReadme = async () => {
        setLoadingReadme(true);

        try {
          const res = await fetch(concept.readmePath);
          const text = await res.text();
          setReadmeContent(text);
        } catch (err) {
          console.error("Failed to load README:", err);
          setReadmeContent(
            "# Theory content not available\n\nThe theory documentation for this concept is being prepared."
          );
        } finally {
          setLoadingReadme(false);
        }
      };

      loadReadme();
    }
  }, [activeTab, concept?.readmePath, readmeContent]);

  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Concept Not Found
          </h1>
          <Link href="/concepts" className="text-blue-400 hover:text-blue-300">
            Back to Concepts
          </Link>
        </div>
      </div>
    );
  }

  const completed = hydrated && completedConcepts.includes(concept.slug);
  const bookmarked = hydrated && bookmarkedConcepts.includes(concept.slug);

  const currentIndex = concepts.findIndex((c) => c.slug === concept.slug);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < concepts.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/concepts"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Concepts
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mt-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{concept.icon}</span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {concept.title}
                  </h1>
                  <p className="text-xl text-blue-400 mt-2">
                    {concept.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-4">
                {concept.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {concept.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    concept.difficulty === "beginner"
                      ? "bg-green-500/20 text-green-400"
                      : concept.difficulty === "intermediate"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {concept.difficulty}
                </span>
                <span className="text-gray-400">
                  ⏱️ {concept.estimatedTime}
                </span>
                <span className="text-gray-400">📚 {concept.category}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => toggleBookmark(concept.slug)}
                className={`p-3 rounded-lg transition-colors ${
                  bookmarked
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
                title={bookmarked ? "Remove bookmark" : "Bookmark this"}
              >
                <Bookmark
                  className={`w-6 h-6 ${bookmarked ? "fill-current" : ""}`}
                />
              </button>

              <button
                onClick={() => completeConcept(concept.slug)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                  completed
                    ? "bg-green-500/20 text-green-400 border border-green-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {completed ? "Completed" : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {concept.readmePath && (
          <div className="mb-4">
            <div className="flex gap-2 border-b border-gray-700">
              <button
                onClick={() => setActiveTab("demo")}
                className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === "demo"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Monitor className="w-5 h-5" />
                Live Demo
              </button>
              <button
                onClick={() => setActiveTab("theory")}
                className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === "theory"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Theory & Explanation
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
        >
          {activeTab === "demo" ? (
            <>
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <span className="text-gray-300 font-medium">
                  Interactive Demo
                </span>
                <a
                  href={concept.demoPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
              </div>

              <div className="relative" style={{ height: "80vh" }}>
                <iframe
                  src={concept.demoPath}
                  className="w-full h-full border-0"
                  title={`${concept.title} Demo`}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </>
          ) : (
            <div className="p-8 overflow-y-auto" style={{ maxHeight: "80vh" }}>
              {loadingReadme ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-gray-400">Loading theory content...</div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-4xl font-bold text-white mb-6 mt-8"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-3xl font-bold text-white mb-4 mt-6"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-2xl font-bold text-white mb-3 mt-4"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-300 mb-4 leading-relaxed"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }) =>
                        inline ? (
                          <code
                            className="bg-gray-700 px-2 py-1 rounded text-blue-300 text-sm"
                            {...props}
                          />
                        ) : (
                          <code
                            className="block bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono"
                            {...props}
                          />
                        ),
                      pre: ({ node, ...props }) => (
                        <pre
                          className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside text-gray-300 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-inside text-gray-300 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-gray-300 ml-4" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-blue-400 hover:text-blue-300 underline"
                          {...props}
                        />
                      ),
                      table: ({ node, ...props }) => (
                        <table
                          className="w-full border-collapse border border-gray-700 mb-4 mt-4"
                          {...props}
                        />
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-gray-900" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="border border-gray-700 px-4 py-2 text-white font-semibold text-left"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="border border-gray-700 px-4 py-2 text-gray-300"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-white" {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic text-gray-300" {...props} />
                      ),
                    }}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <div className="mt-8 flex justify-between items-center">
          <div>
            {hasPrevious && (
              <Link
                href={`/concepts/${concepts[currentIndex - 1].slug}`}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Concept
              </Link>
            )}
          </div>

          <div>
            {hasNext && (
              <Link
                href={`/concepts/${concepts[currentIndex + 1].slug}`}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                Next Concept
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
