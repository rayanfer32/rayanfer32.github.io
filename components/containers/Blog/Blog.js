import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

function Loader() {
  return (
    <button
      type="button"
      className="flex justify-center items-center gap-4 rounded mb-2"
      disabled
    >
      <ImSpinner2 className="animate-spin" size={52} />
      Hold on! Fetching latest blog posts...
    </button>
  );
}

export default function Blog({ posts }) {
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef();
  const blankDivRef = useRef();

  // * fetch my medium articles
  useEffect(() => {
    console.log(posts);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
      setIsLoading(false);
    };
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-4 overflow-auto p-4 gap-8 mx-8 max-md:p-1 max-md:mx-2 ">
        {posts?.items?.map((post) => (
          <ArticleCard key={post.id} data={post}></ArticleCard>
        ))}
      </div>
    </div>
  );

  // * render telegram channel
  return (
    <div
      style={{
        height: "calc(87vh)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* {isLoading && <Loader />} */}

      {/* <div className="overflow-auto" ref={blankDivRef}></div> */}

      <iframe
        onLoad={() => {
          setIsLoading(false);
        }}
        ref={iframeRef}
        width="100%"
        height="100%"
        src="/api/tgram"
      ></iframe>
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
