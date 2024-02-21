import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Layers, Image, Navigation, Filter } from "react-feather";
import { useState } from "react";

import useLayers from "../../../hooks/use-layers";

const Layer_controls = () => {
  /* const [PicturesChecked, setPicturesChecked] = useState(false);
  const [LocationsChecked, setLocationsChecked] = useState(false); */
  const {
    isLocationsShown,
    isPicturesShown,
    setIsLocationsShown,
    setIsPicturesShown,
  } = useLayers((state) => state);

  /*return(
    
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
            onClick={() => {
              setIsPicturesShown();
            }}
          >
            <div className=" flex justify-start">
              <Checkbox id="terms1" checked={isPicturesShown} />
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
            onClick={() => setIsLocationsShown()}
          >
            <div className=" flex justify-start ">
              <Checkbox id="terms2" checked={isLocationsShown} />
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
import { Filters as Filter_store } from "@/src/hooks/filter-store";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDash } from "@/src/hooks/use-dash";

const Filter_controls = () => {
  const { data: missionsData, isSuccess: MissionIsSuccess } = useDash();
  const {
    Mission,
    setcurrentMission,
    Drone,
    setcurrentDrone,
    From,
    setFrom,
    To,
    setTo,
  } = Filter_store((state) => state);
  
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
  const [input, setInput] = useState({
    mission_value: "",
    drone_value: "",
  });
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState({
    from: new Date(new Date(getCurrentDate("-"))),
    to: new Date(new Date(getCurrentDate("-"))),
  });
  console.log(Mission, Drone, From, To);
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

  const UpdateStore = () => {
    setcurrentDrone(input["drone_value"]);
    setcurrentMission(input["mission_value"]);
    setFrom(range["from"]);
    setTo(range["to"]);
  };

  const resetFilters = () => {
    if (Object.values(Filters).every((value) => !value)) {
      setInput({
        mission_value: null,
        drone_value: null,
      });
      setcurrentDrone(null);
      setcurrentMission(null);
      setFrom(null);
      setTo(null);
    }
  };
  var uniqueDrones =[]
  if(missionsData){ uniqueDrones = Array.from(new Set(missionsData.newest_missions.map(mission => mission.drone)));}
  return (
    <Popover onOpenChange={resetFilters}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="m-2"
          size="icon"
          onClick={resetFilters}
        >
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
              <Select value={Mission} onValueChange={setcurrentMission}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mission Name" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value={null} >
                      None
                    </SelectItem>
                  {missionsData.newest_missions.map((mission) => (
                    <SelectItem value={mission.name} key={mission.id}>
                      {mission.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {Filters["drone"] && (
            <div className="mb-3">
              <Label className="mb-1" htmlFor="Drone">
                Drone
              </Label>
              <Select value={Drone} onValueChange={setcurrentDrone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Drone Name" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value={null} >
                      None
                    </SelectItem>
                  {uniqueDrones.map((drone,index) => (
                    <SelectItem value={drone} key={index}>
                      {drone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {Filters["start"] && Filters["end"] === false && (
            <div className="flex flex-row justify-between items-center">
              <Label className="mb-1" htmlFor="Start Date">
                {" "}
                Start Date{" "}
              </Label>
              {datePicker("Start", From, setFrom, "Start Date")}
              
            </div>
          )}
          {Filters["end"] && Filters["start"] === false && (
            <div className="flex flex-row justify-between items-center">
              <Label className="mb-1" htmlFor="End Date">
                {" "}
                End Date{" "}
              </Label>
              {datePicker("End", To, setTo, "End Date")}
              
            </div>
          )}
          {Filters["end"] && Filters["start"] && (
            <div className="flex flex-col">
              <Label htmlFor="Range" className="mb-2">
                Date Range
              </Label>
              <DateRangePicker
                id="Range"
                onUpdate={(values) => {
                  setRange(values.range);
                  setFrom(values.range.from);
                  setTo(values.range.to);
                }}
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
