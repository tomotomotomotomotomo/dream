// src/App.jsx
import DreamAnalyzer from "./components/DreamAnalyzer";
import "./App.css"; // デザイン用

function App() {
  return (
    <div className="App">
      <header>
        <h1>✨ 52のサブパーソナリティ夢診断</h1>
      </header>
      <main>
        <DreamAnalyzer />
      </main>
    </div>
  );
}

export default App;
