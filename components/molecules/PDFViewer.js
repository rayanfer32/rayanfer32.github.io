import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({file}) {
  const [numPages, setNumPages] = useState(null);
  

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div>
      <div>
        <Document file={file} renderMode="canvas" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1.5}
              renderAnnotationLayer={false}
              renderTextLayer={true}
              />
          ))}
        </Document>
      </div>
    </div>
  );
}
