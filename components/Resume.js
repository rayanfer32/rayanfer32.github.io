import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ContainerBlock from "./ContainerBlock";
import userData from "@constants/data";

const PDFViewer = dynamic(() => import("./containers/PDFViewer"), {
  ssr: false,
});

export default function Resume() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
  }, []);

  function responsivePDFWidth() {
    let customWidth = windowSize.width - windowSize.width / 5;
    if (windowSize.width > 1400) {
      customWidth = customWidth - customWidth / 3;
    }
    return customWidth;
  }

  return (
    // ! use lg breakpoint as mobile view layout overflows with justify-center
    <ContainerBlock>
      <div className="flex justify-center mb-8">
        <a
          className="mb-20 md:mb-0 px-8 py-4 rounded-md bg-white shadow-lg text-xl font-semibold flex flex-row space-x-4 items-center dark:text-gray-700"
          href={userData.resumeDownloadUrl}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-up-right-square"
            stroke="4"
            stroke-width="4"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
            ></path>
          </svg>
          <p>Download PDF</p>
        </a>
      </div>
      <div className="overflow-auto flex justify-center min-h-screen">
        <PDFViewer
          width={responsivePDFWidth()}
          file={userData.resumeDownloadUrl}
        />
      </div>
    </ContainerBlock>
  );
}
