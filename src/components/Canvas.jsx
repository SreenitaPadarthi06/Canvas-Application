import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Canvas = forwardRef(
  ({ tool, color, brushSize,history,setHistory }, ref) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    // Initialize canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctxRef.current = ctx;
      setHistory([canvas.toDataURL()]);
      window.getCanvasDataURL = () =>
        canvas.toDataURL("image/png");
    }, []);

    // Update tool settings
    useEffect(() => {
      if (!ctxRef.current) return;

      ctxRef.current.lineWidth = brushSize;
      
      if (tool === "eraser") {
        ctxRef.current.globalCompositeOperation =
          "destination-out";
      } else {
        ctxRef.current.globalCompositeOperation =
          "source-over";
        ctxRef.current.strokeStyle = color;
      }
    }, [tool, color, brushSize]);

    const getMousePos = (e) => {
      const rect =
        canvasRef.current.getBoundingClientRect();

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const getTouchPos = (e) => {
  const rect =
    canvasRef.current.getBoundingClientRect();

        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
        };
        };
   const startDrawing = (e) => {
  const { x, y } = getMousePos(e);

  if (tool === "pen" || tool === "eraser") {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  }

  setStartPoint({ x, y });
  setIsDrawing(true);
};
  const startTouchDrawing = (e) => {
  e.preventDefault();

  const pos = getTouchPos(e);

  if (tool === "pen" || tool === "eraser") {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(pos.x, pos.y);
  }

  setStartPoint(pos);
  setIsDrawing(true);
};

const drawTouch = (e) => {
  e.preventDefault();

  if (!isDrawing) return;

  const pos = getTouchPos(e);

  if (tool === "pen" || tool === "eraser") {
    ctxRef.current.lineTo(pos.x, pos.y);
    ctxRef.current.stroke();
  }
};

const stopTouchDrawing = () => {
  setIsDrawing(false);

  const snapshot =
    canvasRef.current.toDataURL();

  setHistory((prev) => [...prev, snapshot]);
};
    const draw = (e) => {
  if (!isDrawing) return;

  if (tool === "pen" || tool === "eraser") {
    const { x, y } = getMousePos(e);

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  }
};

 const stopDrawing = (e) => {
  if (!isDrawing) return;

  const { x, y } = getMousePos(e);
  
  if (tool === "line") {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(startPoint.x, startPoint.y);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  }
        if (tool === "circle") {
        const radius = Math.sqrt(
            Math.pow(x - startPoint.x, 2) +
            Math.pow(y - startPoint.y, 2)
        );

        ctxRef.current.beginPath();

        ctxRef.current.arc(
            startPoint.x,
            startPoint.y,
            radius,
            0,
            Math.PI * 2
        );

        ctxRef.current.stroke();
        }
  if (tool === "rectangle") {
    ctxRef.current.beginPath();

    ctxRef.current.rect(
      startPoint.x,
      startPoint.y,
      x - startPoint.x,
      y - startPoint.y
    );

    ctxRef.current.stroke();
  }

  setIsDrawing(false);

  const snapshot =
    canvasRef.current.toDataURL();

  setHistory((prev) => [...prev, snapshot]);
};

    // Methods exposed to parent
    useImperativeHandle(ref, () => ({
        loadDrawing(dataURL) {
  const img = new Image();

  img.onload = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(img, 0, 0);
  };

  img.src = dataURL;
},
     clearCanvas() {
  const canvas = canvasRef.current;
  const ctx = ctxRef.current;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  setHistory([canvas.toDataURL()]);
},

      getCanvasDataURL() {
        return canvasRef.current.toDataURL(
          "image/png"
        );
      },
      undo() {
  if (history.length <= 1) return;

  const updatedHistory = history.slice(0, -1);
  const previousState =
    updatedHistory[updatedHistory.length - 1];

  setHistory(updatedHistory);

  const img = new Image();

  img.onload = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(img, 0, 0);
  };

  img.src = previousState;
},
    }));

    return (
    <div className="
flex
flex-col
items-center
p-8
">
        <h2 className="mb-4 text-lg font-semibold">
        <div className="
mb-4
px-4
py-2
bg-indigo-100
text-indigo-700
rounded-full
font-medium
">
Current Tool: {tool}
</div>
        </h2>

        <canvas
          ref={canvasRef}
          data-testid="drawing-canvas"
          width={900}
          height={500}
          className="
bg-white
border
border-slate-300
rounded-2xl
shadow-2xl
hover:shadow-indigo-200
transition-all
duration-300
"
          onMouseDown={startDrawing}
          onMouseMove={draw}
         onMouseUp={(e) => stopDrawing(e)}
        onMouseLeave={(e) => stopDrawing(e)}
        onTouchStart={startTouchDrawing}
onTouchMove={drawTouch}
onTouchEnd={stopTouchDrawing}
       />
      </div>
    );
  }
);

export default Canvas;