import { Layer_controls, Filter_controls } from "./controls/controls";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Gallerie from "./galerie";
import { Map as Map_layer } from "./Map12";

const Map = () => {
  const [panels, setPanels] = useState(false);
  return (
    <div className="static w-full h-full -z-10">
      <div
        key="Controls"
        className="absolute top-1 right-1 flex-1 flex-col z-30"
      >
        <div>
          <Layer_controls />
        </div>
        <div>
          <Filter_controls />
        </div>
        <div>
          <Button
            variant="outline"
            className="m-2"
            size="icon"
            onClick={() => setPanels(!panels)}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="vertical" className="w-full h-full">
        <ResizablePanel>
          <Map_layer ispanelOpen={panels} />
        </ResizablePanel>
        {panels && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel maxSize="30" defaultSize={30} id="picture-panel">
              <Gallerie photo={true} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
export default Map;
