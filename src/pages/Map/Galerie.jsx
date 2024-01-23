/* import { Card, CardContent } from "@/components/ui/card"


export default function Galerie() {
  return (
    <div
    className="flex flex-row overflow-x-auto overscroll-contain scroll-smooth h-full snap-x"
    >
        
        {Array.from({ length: 50 }).map((_, index) => (
          
            <div className="p-1 h-full snap-center" key={index}>
              <Card className="h-full aspect-square">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
        
        ))}

    </div>
  )
} */

import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "react-feather";
function Galerie() {
  // Create an array of refs, one for each item
  const items = Array.from({ length: 50 });
  const itemRefs = useRef(items.map(() => React.createRef()));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Apply initial focus when the component mounts
    updateFocus(currentIndex);
  }, []);

  const updateFocus = (newIndex) => {
    // Update the current index
    setCurrentIndex(newIndex);

    // Adjust the classes for all items
    itemRefs.current.forEach((ref, refIndex) => {
      if (refIndex === newIndex) {
        ref.current.classList.remove("scale-75");
      } else {
        ref.current.classList.add("scale-75");
      }
    });

    // Scroll the focused item into view
    itemRefs.current[newIndex].current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  const handleItemClick = (index) => {
    updateFocus(index);
  };

  const focusPrevItem = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    updateFocus(prevIndex);
  };

  const focusNextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    updateFocus(nextIndex);
  };

  return (
    <>
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
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            id={`panel-${index}`} // Unique ID for each panel
            ref={itemRefs.current[index]} // Attach the ref to the div
            className="p-1 h-1/9 snap-center group-active:bg-red scale-75"
            key={index}
            onClick={() => handleItemClick(index)}
          >
            <Card className="group h-full aspect-square relative">
  <CardContent className="flex aspect-square items-center justify-center p-6">
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <span className="text-3xl font-semibold">{index + 1}</span>
    </div>
    <div className="absolute inset-0 flex justify-center items-center z-20 invisible group-hover:visible group-hover:bg-slate-600 opacity-70 rounded-md">
      <span className="text-3xl text-amber-50 font-semibold">this is a test</span>
    </div>
  </CardContent>
</Card>

          </div>
        ))}
      </div>
    </>
  );
}

export default Galerie;
