import dynamic from "next/dynamic";
import ContainerBlock from "./ContainerBlock";

const PDFViewer = dynamic(() => import("./molecules/PDFViewer"), {
  ssr: false,
});

export default function Resume() {
  return (
    // ! use lg breakpoint as mobile view layout overflows with justify-center
    <ContainerBlock>
      <div className="overflow-auto lg:flex lg:justify-center lg:p-5">
        <PDFViewer file="https://min.gitcdn.link/cdn/rayanfer32/Resume/master/resume.pdf" />
      </div>
    </ContainerBlock>
  );
}
