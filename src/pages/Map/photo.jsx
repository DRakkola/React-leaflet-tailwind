import GalerieID from "@/src/hooks/GalerieID-store";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Gallerie from "./galerie";
import { useParams } from "react-router-dom";
const Photo = () => {
  const { currentGalerie } = GalerieID((state) => state);
  return (
    <ResizablePanelGroup direction="vertical" className="w-full h-full">
      <ResizablePanel>
        {currentGalerie && (
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={`http://127.0.0.1:8000/get-image/${currentGalerie}`}
              alt="test"
              className="h-1/2 w-1/2"
            />
            <p>{currentGalerie}</p>
          </div>
        )}
      </ResizablePanel>
      <>
        <ResizableHandle withHandle />
        <ResizablePanel maxSize="30" defaultSize={30} id="picture-panel">
          <Gallerie photo={false} />
        </ResizablePanel>
      </>
    </ResizablePanelGroup>
  );
};

export default Photo;
