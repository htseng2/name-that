import "./App.css";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";

function App() {
  return (
    <div className="App">
      <div className="main-layout-grid">
        <div className="title">NAME THAT!</div>
        <div className="picker picker-grid">
          <div className="picker-button picker-button-up">
            <TbTriangleFilled />
          </div>
          <div className="picker-button picker-button-down">
            <TbTriangleInvertedFilled />
          </div>
        </div>
        <div className="image-display">
          <img src="https://placehold.co/370x370" alt="placeholder" />
        </div>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="grid-item">
            Item {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
