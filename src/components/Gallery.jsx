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
  const deleteDrawing = (indexToDelete) => {
  const updatedDrawings = drawings.filter(
    (_, index) => index !== indexToDelete
  );

  setDrawings(updatedDrawings);

  localStorage.setItem(
    "savedDrawings",
    JSON.stringify(updatedDrawings)
  );
};
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
  <div
    key={index}
    className="relative"
  >
    <img
      src={drawing}
      alt={`Drawing ${index}`}
      data-testid={`gallery-item-${index}`}
      onClick={() => loadDrawing(drawing)}
      className="
        w-44
        h-32
        object-cover
        rounded-xl
        border-2
        border-slate-200
        cursor-pointer
        hover:scale-105
        transition-all
      "
    />

    <button
      onClick={() =>
        deleteDrawing(index)
      }
      className="
        absolute
        top-1
        right-1
        bg-red-500
        text-white
        w-7
        h-7
        rounded-full
        font-bold
        hover:bg-red-700
      "
    >
      ×
    </button>
  </div>
))}
</div>
    </div>
  );
}

export default Gallery;