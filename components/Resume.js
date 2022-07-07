import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ContainerBlock from "./ContainerBlock";

const PDFViewer = dynamic(() => import("./molecules/PDFViewer"), {
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

  return (
    // ! use lg breakpoint as mobile view layout overflows with justify-center
    <ContainerBlock>
      <div className="overflow-auto flex justify-center min-h-screen">
        <PDFViewer
          width={
            windowSize.width > 500 ? windowSize.width - windowSize.width/5 : windowSize.width
          }
          file="https://min.gitcdn.link/cdn/rayanfer32/Resume/master/resume.pdf"
        />
      </div>
    </ContainerBlock>
  );
}
