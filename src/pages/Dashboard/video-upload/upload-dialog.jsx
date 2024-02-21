import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function UploadDialog() {
  const [thumbnail, setThumbnail] = useState();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <UploadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>
            Please enter the video name and select the video file to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-name">Video Name</Label>
            <Input id="video-name" placeholder="Enter video name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-upload">Upload Video</Label>
            <Input
              accept="video/*"
              id="video-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setThumbnail(URL.createObjectURL(file));
              }}
            />
          </div>
          {thumbnail && (
            <div className="flex justify-center">
              <img
                alt="Video thumbnail"
                className="aspect-[16/9] object-cover rounded-lg"
                height={135}
                src={thumbnail}
                width={240}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
