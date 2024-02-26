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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/api/RestClient";
export default function UploadDialog() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axiosInstance.post("/upload/videos/", newTodo);
    },
  });
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [date, setDate] = useState();
  const [time, onChange] = useState("10:00");
  const [file, setFile] = useState();
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
            <Input
              id="video-name"
              placeholder="Enter video name"
              value={name}
              onChange={setName}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div>
            <TimePicker onChange={onChange} value={time} />
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
                setFile(file);
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
          <Button
            type="submit"
            onClick={() => {
              mutation.mutate({
                name: name,
                date: date,
                time: time,
                video_file: file,
              });
            }}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
