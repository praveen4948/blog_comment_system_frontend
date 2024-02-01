import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogComment } from "./component/BlogComment";
import { Blogs } from "./component/Blogs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:blog_id" element={<BlogComment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
