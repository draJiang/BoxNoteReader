// # App.tsx
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookList } from "./components/BookList";
import { NoteContent } from "./components/NoteContent";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/note" element={<NoteContent />} />
      </Routes>
    </Router>
  );
};

export default App;
