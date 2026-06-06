import { useEffect, useState } from "react";

function Gallery({ canvasRef }) {
  const [drawings, setDrawings] = useState([]);

 useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("savedDrawings") || "[]"
  );

  console.log("Gallery loaded:", saved);

  setDrawings(saved);
}, []);

  const loadDrawing = (drawing) => {
    canvasRef.current?.loadDrawing(drawing);
  };

  return (
    <div
      data-testid="gallery-container"
      className="
p-6
bg-white
border-t
shadow-inner
"
    >
      <h2 className="
text-2xl
font-bold
text-slate-700
mb-4
">
Saved Drawings
</h2>
       <p>Total drawings: {drawings.length}</p>
      <div className="flex flex-wrap gap-4">

  {drawings.length === 0 && (
    <p className="
      text-slate-500
      italic
    ">
      No saved drawings yet.
    </p>
  )}

  {drawings.map((drawing, index) => (
    <img
      key={index}
      src={drawing}
      alt={`Drawing ${index}`}
      data-testid={`gallery-item-${index}`}
      onClick={() => loadDrawing(drawing)}
      className="
        w-40
        h-28
        border-2
        border-slate-200
        rounded-xl
        cursor-pointer
        hover:scale-105
        hover:shadow-lg
        transition-all
        duration-300
      "
    />
  ))}
</div>
    </div>
  );
}

export default Gallery;