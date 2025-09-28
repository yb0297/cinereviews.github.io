import React, { useState, useEffect } from "react";
import { movieService } from "../services/movieService";

interface MovieTabsProps {
  movieId: number;
}

export const MovieTabs: React.FC<MovieTabsProps> = ({ movieId }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "view">("overview");
  const [comments, setComments] = useState<
    { user: string; message: string; date: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "view") {
      setLoading(true);
      movieService.getComments(movieId).then((data) => {
        setComments(data);
        setLoading(false);
      });
    }
  }, [activeTab, movieId]);

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2 ${
            activeTab === "overview"
              ? "border-b-2 border-red-500 text-red-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`pb-2 ${
            activeTab === "view"
              ? "border-b-2 border-red-500 text-red-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          View Comments
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "overview" && (
          <p className="text-gray-700">
            {/* Here you can render movie overview or other info */}
            Movie overview goes here...
          </p>
        )}

        {activeTab === "view" && (
          <div>
            {loading ? (
              <p className="text-gray-500">Loading comments...</p>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">
                        {c.user}
                      </span>
                      <span className="text-sm text-gray-500">{c.date}</span>
                    </div>
                    <p className="text-gray-700">{c.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
