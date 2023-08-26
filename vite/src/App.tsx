import { Page } from "./Page";
import { useState } from "react";
import "./App.css";

function App() {
  const pageStart = 3;
  const pageEnd = 19;
  const pageNumbers = Array.from(
    { length: pageEnd - pageStart + 1 },
    (_, index) => index + pageStart
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pageNumbers.length) % pageNumbers.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pageNumbers.length);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={handlePrevious}>
          <span className="arrow">&lt;</span>
          <span className="page-number">
            {((currentIndex - 1 + pageNumbers.length) % pageNumbers.length) + 3}
          </span>
        </button>
        <button onClick={handleNext}>
          <span className="page-number">
            {((currentIndex + 1) % pageNumbers.length) + 3}
          </span>
          <span className="arrow">&gt;</span>
        </button>
      </nav>
      <Page key={currentIndex} pageNumber={currentIndex + 3} />
    </div>
  );
}

export default App;
