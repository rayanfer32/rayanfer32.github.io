import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
import { ImSpinner2 } from "react-icons/im";
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css';
import 'react-pdf/dist/cjs/Page/TextLayer.css';

// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ file, width, height, className }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className={`${className} bg-white dark:bg-gray-900 min-h-[500px] flex flex-col items-center justify-center`} style={{ width: width }}>
      <Document
        file={file}
        renderMode="canvas"
        loading={<LoadingAnim />}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            loading={<LoadingAnim />}
            scale={1}
            width={width}
            height={height}
            renderAnnotationLayer={false}
            renderTextLayer={true}
          />
        ))}
      </Document>
    </div>
  );
}

function LoadingAnim() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-8 text-gray-500 dark:text-gray-400">
      <ImSpinner2 className="animate-spin text-blue-500" size={52} />
      <p className="text-xl font-medium animate-pulse">Just a sec...</p>
    </div>
  );
}
