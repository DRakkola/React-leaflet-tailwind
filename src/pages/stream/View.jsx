import React, { useEffect, useRef, useState } from "react";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
const View = () => {
  const canvasRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [firstImageReceived, setFirstImageReceived] = useState(false);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:80/ws/test");
    newWs.binaryType = "arraybuffer"; // Ensure we receive binary data as an ArrayBuffer
    setWs(newWs);

    newWs.onmessage = (event) => {
      const arrayBuffer = event.data;
      console.log("Received data size:", arrayBuffer.byteLength);

      if (arrayBuffer.byteLength === 0) {
        console.error("Received an empty array buffer");
        return;
      }

      const blob = new Blob([arrayBuffer], { type: "image/png" }); // Adjust MIME type if necessary
      const url = URL.createObjectURL(blob);

      const image = new Image();
      image.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        if (!firstImageReceived) {
          setFirstImageReceived(true);
          downloadImage(blob);
        }
      };
      image.onerror = () => {
        console.error("Error loading image from blob with size:", blob.size);
        URL.revokeObjectURL(url);
      };
      image.src = url;
    };

    return () => {
      newWs.close();
    };
  }, []);

  const downloadImage = (blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "first-image.webp"; // Set the file name for the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const goFullScreen = () => {
    const canvas = canvasRef.current;
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      /* Firefox */
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      /* IE/Edge */
      canvas.msRequestFullscreen();
    }
  };

  return (
    <div className="flex items-center h-full w-full justify-center">
      <div className="relative w-3/4 h-3/4">
        <canvas
          ref={canvasRef}
          id="videoCanvas"
          width="1920"
          height="1080"
          className="w-full h-full"
        ></canvas>
        <Button
          onClick={goFullScreen}
          variant="outline"
          size="icon"
          className="z-50 absolute right-4 top-4"
        >
          <EnterFullScreenIcon />
        </Button>
      </div>
    </div>
  );
};

export default View;
