import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadiobuttonIcon } from "@radix-ui/react-icons";

export default function ScreenShare() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSharing, setisSharing] = useState(false);
  const videoRef = useRef(null);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`fixed bottom-0 right-0 m-4 w-64 h-36 border-4 border-blue-500 z-50 ${
          !isSharing && "hidden"
        }`}
      />
      {isSharing ? (
        <Button variant="outline" onClick={setisSharing(!isSharing)}>
          Stop Sharing
        </Button>
      ) : (
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <RadiobuttonIcon color="red" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share Your Screen</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={setisSharing(!isSharing)}>
                <RadiobuttonIcon color="white" className="mr-2 h-4 w-4" /> Start
                Sharing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
