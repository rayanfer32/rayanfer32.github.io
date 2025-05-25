import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Blog() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  // * fetch my medium articles
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchPosts() {
      setIsLoading(true);
      axios
        .get("/api/medium-feed", { signal: abortController.signal })
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-2 overflow-auto p-4 gap-8 mx-8 max-md:p-1 max-md:mx-2 ">
        {isLoading &&
          Array.from({ length: 12 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        {posts?.items?.map((post) => (
          <ArticleCard key={post.id} data={post}></ArticleCard>
        ))}
      </div>
    </div>
  );
}
function ArticleCard({ data }) {
  return (
    <>
      <div className="p-4 shadow-xl rounded-2xl bg-slate-100 overflow-hidden max-h-96 flex flex-col gap-4 dark:bg-gray-900 ">
        <>
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer noopener"
            className="text-2xl max-md:text-lg"
          >
            {data.title}
          </a>
          <div id="tags" className="flex gap-2">
            {data.category.map((c) => (
              <div
                key={c}
                className="bg-gray-800 px-4 p-2 text-sm rounded-full text-white w-fit h-fit whitespace-nowrap"
              >
                {c}
              </div>
            ))}
          </div>
          <p
            className="text-md "
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </>
      </div>
    </>
  );
}

function ArticleCardSkeleton() {
  return (
    <div class="p-4 shadow-xl rounded-2xl bg-slate-100 overflow-hidden max-h-96 flex flex-col gap-4 dark:bg-gray-900 animate-pulse">
      <div class="h-6 bg-gray-200 rounded-sm w-3/4 mb-4"></div>
      <div id="tags" class="flex gap-2">
        <div class="bg-gray-200 px-4 p-2 rounded-full w-16 h-6"></div>
        <div class="bg-gray-200 px-4 p-2 rounded-full w-16 h-6"></div>
      </div>
      <div class="h-4 bg-gray-200 rounded-sm w-full mt-2"></div>
      <div class="h-4 bg-gray-200 rounded-sm w-2/3 mt-2"></div>
      <div class="h-4 bg-gray-200 rounded-sm w-1/2 mt-2"></div>
    </div>
  );
}
