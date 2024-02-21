import React, { useRef, useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "react-feather";
import usePictures from "@/src/hooks/use-pictures";
import { Filters } from "@/src/hooks/filter-store";
import GalerieID from "@/src/hooks/GalerieID-store";
import { cn } from "@/lib/utils";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
function Galerie({ photo }) {
  const { data: picturesData, isSuccess: picturesIsSuccess } = usePictures(
    Filters((state) => state)
  );
  const { setcurrentGalerie, currentGalerie } = GalerieID((state) => state);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create an array of refs, one for each item
  const items = useMemo(
    () => Array.from(picturesData?.data || []),
    [picturesData]
  );
  const itemRefs = useRef(
    items.reduce((acc, item, index) => {
      acc[index] = React.createRef();
      return acc;
    }, {})
  );

  useEffect(() => {
    itemRefs.current = items.reduce((acc, item, index) => {
      acc[index] = acc[index] || React.createRef();
      return acc;
    }, itemRefs.current);
    if (photo) {
      updateFocus(0);
    } else {
      updateFocus(
        items.indexOf(items.find((item) => item.id === currentGalerie))
      );
    }
  }, [items]);

  const updateFocus = (newIndex) => {
    // Update the current index
    setCurrentIndex(newIndex);

    // Scroll the focused item into view
    if (itemRefs.current[newIndex] && itemRefs.current[newIndex].current) {
      itemRefs.current[newIndex].current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }

    setcurrentGalerie(items[newIndex]?.id);
  };

  const handleItemClick = (index, id) => {
    updateFocus(index, id);
  };

  const focusPrevItem = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    updateFocus(prevIndex);
  };

  const focusNextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    updateFocus(nextIndex);
  };

  if (!picturesIsSuccess) {
    // You can render a loading state here
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row overflow-x-auto overscroll-contain scroll-smooth h-full z-0 py-1 px-14">
      <Button
        className="absolute z-50 left-1 self-center "
        variant="outline"
        size="icon"
        onClick={focusPrevItem}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="absolute z-50 right-1 self-center"
        variant="outline"
        size="icon"
        onClick={focusNextItem}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      {items.map((item, index) => (
        <div
          id={`panel-${item.id}`} // Unique ID for each panel
          ref={itemRefs.current[index]} // Attach the ref to the div
          className={cn(
            "p-1 h-1/9 snap-center group-active:bg-red",
            currentIndex != index && "scale-75"
          )}
          key={item.id}
          onClick={() => handleItemClick(index)}
        >
          <Card className="group h-full aspect-square relative">
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <img
                  src={`http://127.0.0.1:8000/get-image/02223852-3d65-e76d-5287-f22c26ef9ddb`}
                  alt="test"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center z-20 invisible group-hover:visible group-hover:bg-slate-600 opacity-70 rounded-md">
                <span className="text-sm text-amber-50 font-semibold">
                  <p>Northern = {item.northern}°</p>
                  <p> Eastern = {item.eastern}°</p>
                  <p>Date = {item.timestamp} </p>
                  <p>mission = {item.mission.name}</p>
                </span>
                <Link to={`/Photo`}>
                  {" "}
                  <OpenInNewWindowIcon />{" "}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Galerie;
