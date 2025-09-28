import { useState, useEffect } from "react";
import { movieService } from "../services/movieService";

type MovieTabsProps = {
  movieId: number;
  overview: string;
};

export default function MovieTabs({ movieId, overview }: MovieTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "comments">("overview");
  const [comments, setComments] = useState<{ id: number; author: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === "comments") {
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
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2 ${activeTab === "overview" ? "border-b-2 border-blue-500" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-2 ${activeTab === "comments" ? "border-b-2 border-blue-500" : ""}`}
        >
          View Comments
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-3">
        {activeTab === "overview" && <p>{overview}</p>}
        {activeTab === "comments" && (
          <div>
            {loading ? (
              <p>Loading comments...</p>
            ) : comments.length > 0 ? (
              <ul className="space-y-2">
                {comments.map((c) => (
                  <li key={c.id} className="border p-2 rounded">
                    <p className="font-bold">{c.author}</p>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
