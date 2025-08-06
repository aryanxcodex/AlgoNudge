import React from "react";

const getYoutubeThumbnail = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : "";
};

export default function ResourcesSection() {
  const data = {
    "Data Structures": {
      topics: [
        {
          name: "Binary Trees",
          videos: [
            {
              title: "Binary Trees Explained",
              url: "https://www.youtube.com/watch?v=ZNH0MuQ51mE",
              duration: "8 min",
            },
          ],
          articles: [
            {
              title: "Understanding Binary Trees – GFG",
              url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
              source: "GeeksForGeeks",
              readTime: "5 min",
            },
          ],
        },
      ],
    },
    Algorithms: {
      topics: [
        {
          name: "Depth-First Search (DFS)",
          videos: [
            {
              title: "DFS Simplified",
              url: "https://www.youtube.com/watch?v=7fujbpJ0LB4",
              duration: "7 min",
            },
          ],
          articles: [
            {
              title: "DFS Explained with Examples",
              url: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
              source: "GeeksForGeeks",
              readTime: "6 min",
            },
          ],
        },
      ],
    },
  };

  return (
    <div className="space-y-8 text-sm text-gray-200">
      {Object.entries(data).map(([category, { topics }]) => (
        <div key={category}>
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-1">
            {category}
          </h2>
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="bg-gray-800/40 p-4 rounded-lg border border-gray-700 mb-6"
            >
              <h3 className="text-base font-medium text-white mb-2">
                {topic.name}
              </h3>

              {topic.videos?.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-blue-400 font-medium uppercase">
                      Videos
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topic.videos.map((video, i) => (
                      <a
                        key={i}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-3 bg-gray-900/50 hover:bg-gray-900/70 p-2 rounded-md border border-gray-700 transition-all"
                      >
                        <img
                          src={getYoutubeThumbnail(video.url)}
                          alt={video.title}
                          className="w-20 h-14 object-cover rounded group-hover:scale-105 transition-transform"
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-100 font-medium">
                            {video.title}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            YouTube • {video.duration}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {topic.articles?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-green-400 font-medium uppercase">
                      Articles
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {topic.articles.map((article, i) => (
                      <li key={i}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:underline text-gray-200"
                        >
                          {article.title}
                          <div className="text-xs text-gray-400">
                            {article.source} • {article.readTime}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
