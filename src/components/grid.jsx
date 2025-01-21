import { useState, useEffect } from "react";

const GridWave = () => {
  const rows = 15; // Number of rows
  const cols = 20; // Number of columns
  const waveLength = 6; // Number of columns in the wave
  const [wavePosition, setWavePosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [currentGradient, setCurrentGradient] = useState(0);

  // Define gradient color schemes
  const gradients = [
    ["bg-green-100", "bg-green-200", "bg-green-300", "bg-green-400", "bg-green-500", "bg-green-600"],
    ["bg-green-600", "bg-green-500", "bg-green-400", "bg-green-300", "bg-green-200", "bg-green-100"],
    ["bg-blue-100", "bg-blue-200", "bg-blue-300", "bg-blue-400", "bg-blue-500", "bg-blue-600"],
    ["bg-blue-600", "bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200", "bg-blue-100"],
    ["bg-red-100", "bg-red-200", "bg-red-300", "bg-red-400", "bg-red-500", "bg-red-600"],
    ["bg-red-600", "bg-red-500", "bg-red-400", "bg-red-300", "bg-red-200", "bg-red-100"],
    ["bg-purple-100", "bg-purple-200", "bg-purple-300", "bg-purple-400", "bg-purple-500", "bg-purple-600"],
    ["bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200", "bg-purple-100"]
  ];

  useEffect(() => {
    // Create the wave animation effect
    const waveInterval = setInterval(() => {
      setWavePosition((prev) => {
        if (prev + waveLength >= cols && direction === 1) {
          setDirection(-1);
          return prev;
        } else if (prev <= 0 && direction === -1) {
          setDirection(1);
          return prev;
        }
        return prev + direction;
      });
    }, 100); // Adjust timing for smooth animation

    // Change the gradient periodically
    const gradientInterval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 1500); // Change gradient every 1.5 seconds

    return () => {
      clearInterval(waveInterval);
      clearInterval(gradientInterval);
    };
  }, [direction, gradients.length]);

  const getSquareStyle = (col) => {
    // Check if the column is within the wave's range
    if (col >= wavePosition && col < wavePosition + waveLength) {
      const gradientIndex = col - wavePosition; // Determine the color based on position in wave
      return gradients[currentGradient][gradientIndex];
    }
    return "bg-gray-200"; // Default background color
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh p-9 bg-advanced-dark-gradient  bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-4">Dynamic Grid Wave</h1>
      <div className="grid gap-0.5">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className="flex gap-0.5" key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-3 w-3 md:h-6 md:w-6 ${getSquareStyle(colIndex)} transition-colors duration-200`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridWave;
