import { Page } from "./Page";
import "./App.css";

function App() {
  const start = 3;
  const end = 19;
  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, index) => index + start
  );
  console.log(pageNumbers);
  return (
    <div className="App">
      {pageNumbers.map((pageNumber) => (
        <Page key={pageNumber} pageNumber={pageNumber} />
      ))}
    </div>
  );
}

export default App;
