import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import mainLogo from  '../../assets/mapheat.png'


const sampleData = [
  { mission: "Alpha Recon", date: "2024-01-01", status: "Completed" },
  { mission: "Operation Beta", date: "2024-01-03", status: "In Progress" },
  { mission: "Task Charlie", date: "2024-01-05", status: "Pending" },
  { mission: "Operation Delta", date: "2024-01-08", status: "Completed" },
  { mission: "Stealth Echo", date: "2024-01-10", status: "In Progress" },
  { mission: "Mission Foxtrot", date: "2024-01-12", status: "Pending" },
  { mission: "Operation Golf", date: "2024-01-15", status: "Completed" },
  { mission: "Task Hotel", date: "2024-01-17", status: "In Progress" },
  { mission: "Operation India", date: "2024-01-20", status: "Pending" },
  { mission: "Reconnaissance", date: "2024-01-22", status: "Completed" },
];

export default function TableDemo() {
  return (
    <div className="bg-white rounded-sm shadow-md w-full h-full p-4 m-6 overflow-auto ">
  <Table>
    <TableCaption >A list of your recent Missions.</TableCaption>
    <TableHeader className="sticky " >
      <TableRow >
        <TableHead className="w-[100px]">Mission</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sampleData.map((invoice, index) => (
        <TableRow key={index} onClick={() => alert("clicked!")}>
          <TableCell className="font-medium">{invoice.mission}</TableCell>
          <TableCell>{invoice.date}</TableCell>
          <TableCell className="text-right">{invoice.status}</TableCell>
          <TableCell className="text-right">
            <HoverCard>
              <HoverCardTrigger>Hover</HoverCardTrigger>
              <HoverCardContent>
                <img src={mainLogo} />
              </HoverCardContent>
            </HoverCard>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
  );
}
