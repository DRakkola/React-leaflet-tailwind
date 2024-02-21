import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

/* const sampleData = [
  { mission: "Alpha Recon", date: "2024-01-01", status: "false" },
  { mission: "Operation Beta", date: "2024-01-03", status: "false" },
  { mission: "Task Charlie", date: "2024-01-05", status: "true" },
  { mission: "Operation Delta", date: "2024-01-08", status: "false" },
  { mission: "Stealth Echo", date: "2024-01-10", status: "false" },
  { mission: "Mission Foxtrot", date: "2024-01-12", status: "true" },
  { mission: "Operation Golf", date: "2024-01-15", status: "false" },
  { mission: "Task Hotel", date: "2024-01-17", status: "false" },
  { mission: "Operation India", date: "2024-01-20", status: "true" },
  { mission: "Reconnaissance", date: "2024-01-22", status: "false" },
]; */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDash } from "@/src/hooks/use-dash";

import MapLeaflet from "@/src/Global/HeatMap";
function RecentSales() {
  const { data: missionsData, isSuccess: MissionIsSuccess } = useDash();

  return (
    <div className="space-y-8 overflow-auto max-h-80">
      {MissionIsSuccess &&
        missionsData.newest_missions.map((invoice, index) => (
          <div
            className="flex items-center"
            key={index}
            onClick={() => alert("clicked!")}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{invoice.name}</p>
              <p className="text-sm text-muted-foreground">{invoice.started}</p>
            </div>

            <div className="ml-auto font-medium">
              <HoverCard>
                <HoverCardTrigger>
                  {invoice.live === true ? (
                    <Badge variant="secondary">finished</Badge>
                  ) : (
                    <Badge className="bg-green-300 w-16 text-center">
                      active
                    </Badge>
                  )}
                </HoverCardTrigger>
                <HoverCardContent>
                  <MapLeaflet id={invoice.id} />
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        ))}
    </div>
  );
}

export { RecentSales };
