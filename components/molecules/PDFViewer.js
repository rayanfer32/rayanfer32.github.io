import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
import { ImSpinner2 } from "react-icons/im";

// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ file, width, height }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div>
      <div>
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
    </div>
  );
}

function LoadingAnim() {
  return (
    <button type="button" class="flex justify-center items-center gap-4 rounded" disabled>
        <ImSpinner2 className="animate-spin" size={52}/>
        Just a sec...
    </button>
  );
}
