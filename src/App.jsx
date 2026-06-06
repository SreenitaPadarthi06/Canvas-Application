import { useRef, useState } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import Gallery from "./components/Gallery";

function App() {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState([]);

  const canvasRef = useRef(null);

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        canvasRef={canvasRef}
        history={history}
      />

      <Canvas
        ref={canvasRef}
        tool={tool}
        color={color}
        brushSize={brushSize}
        history={history}
        setHistory={setHistory}
      />

      <Gallery canvasRef={canvasRef} />
    </div>
  );
}

export default App;