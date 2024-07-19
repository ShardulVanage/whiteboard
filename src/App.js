
import React, { useState, useRef, useEffect } from 'react';


function App() {
 const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [textPositions, setTextPositions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    drawCanvas();
  }, [textPositions]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    textPositions.forEach(({ text, x, y, fontSize, color }) => {
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    });
  };

  const handleAddText = () => {
    if (text) {
      const newPositions = [...textPositions, { text, x: 50, y: 50, fontSize, color }];
      setTextPositions(newPositions);
      setHistory([...history, newPositions]);
      setText('');
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setTextPositions(newHistory[newHistory.length - 1] || []);
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const draggedIndex = textPositions.findIndex(
      (item) => Math.abs(item.x - x) < 20 && Math.abs(item.y - y) < 20
    );

    if (draggedIndex !== -1) {
      setIsDragging(true);
      setDragIndex(draggedIndex);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && dragIndex !== null) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newPositions = [...textPositions];
      newPositions[dragIndex] = { ...newPositions[dragIndex], x, y };
      setTextPositions(newPositions);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragIndex(null);
      setHistory([...history, textPositions]);
    }
  };
  return (

    <div className="">
<div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')]  before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
  <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
   
    <div class="flex justify-center">
      <a class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 " href="#">
        Explore the Capital Product
        <span class="flex items-center gap-x-1">
          <span class="border-s border-gray-200 text-blue-600 ps-2 ">Explore</span>
          <svg class="flex-shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>
    </div>
    
    <div class="mt-5 max-w-xl text-center mx-auto">
      <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl ">
        Visualize Your Thoughts
      </h1>
    </div>
   

    <div class="mt-5 max-w-3xl text-center mx-auto">
      <p class="text-lg text-gray-600 ">Easily add and move text to bring your ideas to life.</p>
    </div>

    
    <div class="mt-8 gap-3 flex justify-center">
      <a class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 " href="#">
        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        Source Code
      </a>
    </div>
  
  </div>
</div>

       <div className='flex flex-col justify-center items-center py-12'>
      
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
     className=' rounded-md border-0 ring-gray-300 shadow-lg ring-1 my-4' 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />


       <div className='flex flex-row '>

      <div className='flex flex-col'>
      <div className="relative mt-2 flex items-center mx-4">
        <input
          type="text"
          name="search"
          id="search"
           value={text}
            onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
          className="block w-full drop-shadow-xl  rounded-md border-0 py-2 px-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600/50 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    <div className='flex flex-row justify-center items-center py-8' >
      <label className='font-mono mr-2'>font size:</label>
       <input
        type="number"
        className=' rounded-md border-0 ring-gray-300 shadow-lg ring-1 text-center' 
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
        min="8"
        max="72"
      />
       <label className='font-mono mr-2 ml-6'>color:</label> 
      <input
        type="color"
        className=' rounded-md border-0 ring-gray-300 shadow-lg ring-1 ' 
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

    </div>

      </div>
      

<div>

      <button className='  text-center drop-shadow-md bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-xs font-medium rounded-2xl px-8 py-3 mx-1 mt-2' 
      onClick={handleAddText}>Enter ⏎</button>

       <button className='  text-center drop-shadow-md bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-xs font-medium rounded-2xl px-8 py-3  mx-1 mt-2 ' 
       onClick={handleUndo}>Undo ⌫</button>
</div>
    </div>



    </div>


    </div>
  );
}

export default App;
