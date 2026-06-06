function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  brushSize,
  setBrushSize,
  canvasRef,
  history,
}) {
  return (
    
    <div className="
sticky top-0
z-20
bg-white/90
backdrop-blur-md
border-b
shadow-lg
p-4
">
      <div className="flex flex-wrap gap-3 items-center">
<h1 className="
text-2xl
font-bold
text-indigo-600
mb-4
">
🎨 Canvas Studio
</h1>
        <button
          data-testid="tool-pen"
          onClick={() => setTool("pen")}
                className={`
            px-5
            py-2
            rounded-xl
            font-medium
            transition-all
            duration-200
            hover:scale-105
            shadow-sm
            ${
            tool === "pen"
            ? "bg-indigo-600 text-white"
            : "bg-slate-200 hover:bg-slate-300"
            }
            `}>
          Pen
        </button>
          <button
        onClick={() => setTool("circle")}
        className={`px-4 py-2 rounded ${
            tool === "circle"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
        >
        Circle
        </button>
        <button
          data-testid="tool-eraser"
          onClick={() => setTool("eraser")}
          className={`px-4 py-2 rounded ${
            tool === "eraser"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Eraser
        </button>

        <button
          data-testid="tool-line"
          onClick={() => setTool("line")}
          className={`px-4 py-2 rounded ${
            tool === "line"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Line
        </button>

        <button
          data-testid="tool-rectangle"
          onClick={() => setTool("rectangle")}
          className={`px-4 py-2 rounded ${
            tool === "rectangle"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Rectangle
        </button>

       <div className="flex items-center gap-2">
  <label className="font-medium">
    Color
  </label>

  <input
    type="color"
    data-testid="color-picker"
    value={color}
    onChange={(e) =>
      setColor(e.target.value)
    }
    className="
      w-12
      h-12
      border-none
      cursor-pointer
      rounded-lg
    "
  />
   </div>

       <div className="flex items-center gap-3">
  <label className="font-medium">
    Size: {brushSize}
  </label>

  <input
    type="range"
    min="1"
    max="20"
    value={brushSize}
    data-testid="brush-size-slider"
    onChange={(e) =>
      setBrushSize(Number(e.target.value))
    }
    className="w-40"
  />
</div>
        <button
  data-testid="clear-canvas-button"
  onClick={() =>
    canvasRef.current?.clearCanvas()
  }
  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
>
  Clear
</button>
<button
  data-testid="undo-button"
  onClick={() => canvasRef.current?.undo()}
 disabled={!history || history.length <= 1}
  className="
    px-4 py-2 rounded
    bg-yellow-500 text-white
    hover:bg-yellow-600
    disabled:bg-gray-300
  "
>
  Undo
</button>
<button
  data-testid="export-png-button"
  onClick={() => {
    const dataURL =
      canvasRef.current?.getCanvasDataURL();

    const link =
      document.createElement("a");

    link.href = dataURL;
    link.download = "drawing.png";

    link.click();
  }}
  className="
    px-4 py-2 rounded
    bg-green-600 text-white
    hover:bg-green-700
  "
>
  Export PNG
</button>
<button
  data-testid="save-storage-button"
 onClick={() => {
  console.log(canvasRef.current);

  const drawing =
    canvasRef.current?.getCanvasDataURL();

  console.log(drawing);

  if (!drawing) return;

  const saved = JSON.parse(
    localStorage.getItem("savedDrawings") || "[]"
  );

  saved.push(drawing);

  localStorage.setItem(
    "savedDrawings",
    JSON.stringify(saved)
  );

  console.log("Saved successfully");
}}
  className="bg-blue-500 text-white p-4 rounded-xl"
>
  Save
</button>
      </div>
    </div>
  );
}

export default Toolbar;