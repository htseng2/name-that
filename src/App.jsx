import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="three-by-six-grid">
        <div className="title">NAME THAT!</div>
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="grid-item">
            Item {idx + 1 + 6}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
