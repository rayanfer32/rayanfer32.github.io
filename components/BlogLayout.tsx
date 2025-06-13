import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-zinc-800 to-slate-900 text-gray-100">
      <Navbar />
      <main  className="flex-1 my-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
