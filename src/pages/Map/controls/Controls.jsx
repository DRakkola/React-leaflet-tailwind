import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Layers, Image, Navigation, Filter } from "react-feather";
import { useState} from "react";

/* import useLayers from "../../../hooks/use-layers"; */

const Layer_controls = () => {
  const [PicturesChecked, setPicturesChecked] = useState(false);
  const [LocationsChecked, setLocationsChecked] = useState(false);
  /* const {isLocationsShown, isPicturesShown, setIsLocationsShown, setIsPicturesShown} = useLayers((state) => state)

  
  return(
    
    <Dropdown.Details horizontal="left" dataTheme="light" className="mb-3 bg-transparent">
      <Dropdown.Details.Toggle ><Layers/></Dropdown.Details.Toggle>
      <Dropdown.Menu className="w-52">
        <Dropdown.Item><Checkbox  checked={isLocationsShown} onChange={setIsLocationsShown}/>Locations</Dropdown.Item>
        <Dropdown.Item><Checkbox checked={isPicturesShown} onChange={setIsPicturesShown}/>Pictures</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Details>
 
  ) */
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="m-2" size="icon">
          <Layers className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={"right"} className="mt-2">
        <div className="flex flex-col justify-evenly h-1/6 w-full ">
          <div
            className="flex flex-row justify-between items-center  px-2 py-3 w-full  hover:bg-gray-50 rounded-lg"
            onClick={() => setPicturesChecked(!PicturesChecked)}
          >
            <div className=" flex justify-start">
              <Checkbox id="terms1" checked={PicturesChecked} />
              <label
                htmlFor="terms1"
                className="mx-2 text-m font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pictures
              </label>
            </div>
            <Image />
          </div>
          <div
            className="flex flex-row justify-between h-auto px-2 py-1 w-full items-center  hover:bg-gray-50 rounded-lg"
            onClick={() => setLocationsChecked(!LocationsChecked)}
          >
            <div className=" flex justify-start ">
              <Checkbox id="terms2" checked={LocationsChecked} />
              <label
                htmlFor="terms2"
                className="mx-2 text-m font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Locations
              </label>
            </div>
            <Navigation />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { getCurrentDate } from "@/src/utils/GetCurrentDate";

const datePicker = (id, date, setDate, label) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>{label}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          id={id}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};


const Filter_controls = () => {
  
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [Filters, setFilters] = useState({
    mission: false,
    drone: false,
    start: false,
    end: false,
    mission_value: "",
    drone_value: "",
  });
  const [input,setInput] = useState({
    mission_value: "",
    drone_value: "",
  });
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState({
    from: new Date((new Date(getCurrentDate('-')))),
    to:  new Date((new Date(getCurrentDate('-'))))
  })
  const statuses = [
    {
      value: "mission",
      label: "Mission",
    },
    {
      value: "drone",
      label: "Drone",
    },
    {
      value: "start",
      label: "start",
    },
    {
      value: "end",
      label: "end",
    },
  ];

  const resetFilters=()=>{
    if (Object.values(Filters).every(value => !value)) {
      setInput({
        mission_value: "",
        drone_value: "",
      });
    }
  }
  
  return (
    <Popover className>
      <PopoverTrigger asChild>
        <Button variant="outline" className="m-2" size="icon" onClick={resetFilters}>
          
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={"right"} className="w-96">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Status</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start">
                {selectedStatus ? (
                  <>{selectedStatus.label}</>
                ) : (
                  <>+ Set status</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Change status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => (
                      <CommandItem
                        className={Filters[status.value] ? "bg-teal-50" : ""}
                        key={status.value}
                        value={status.value}
                        onSelect={(value) => {
                          setFilters({
                            ...Filters,
                            [value]: !Filters[value],
                          });

                          setOpen(false);
                        }}
                      >
                        {Filters[status.value] && (
                          <CheckIcon className="h-4 w-4 opacity-50 mx-2" />
                        )}
                        {status.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {Object.values(Filters).some((value) => value) && (
          <Separator className="my-3" />
        )}
        <div className="flex flex-col space-b-2">
          {Filters["mission"] && (
            <div className="my-3">
              <Label className="mb-1" htmlFor="Mission">
                Mission Name
              </Label>
              <Input
                id="Mission"
                placeholder="Mission Name"
                value={input["mission_value"]}
                onChange={(event) =>
                  setInput({ ...input, mission_value: event.target.value })
                }
              />
            </div>
          )}
          {Filters["drone"] && (
            <div className="mb-3">
              <Label className="mb-1" htmlFor="Drone">
                Drone
              </Label>
              <Input
                id="Drone"
                placeholder="Drone Name"
                value={input["drone_value"]}
                onChange={(event) =>
                  setInput({ ...input, drone_value: event.target.value })
                }
              />
            </div>
          )}
          {Filters["start"] && Filters["end"] === false && (
            <div className="flex flex-row justify-between items-center">
              <Label className="mb-1" htmlFor="Start Date">
                {" "}
                Start Date{" "}
              </Label>
              {datePicker("Start", date, setDate, "Start Date")}
            </div>
          )}
          {Filters["end"] && Filters["start"] === false && (
            <div className="flex flex-row justify-between items-center">
              <Label className="mb-1" htmlFor="End Date">
                {" "}
                End Date{" "}
              </Label>
              {datePicker("End", date, setDate, "End Date")}
            </div>
          )}
          {Filters["end"] && Filters["start"] && (
            <div className="flex flex-col">
              <Label htmlFor="Range" className="mb-2">
                Date Range
              </Label>
              <DateRangePicker
                id="Range"
                onUpdate={(values) => setRange(values.range)}
                initialDateFrom={range.from}
                initialDateTo={range.to}
                align="start"
                locale="en-GB"
                showCompare={false}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};


export { Layer_controls, Filter_controls };
