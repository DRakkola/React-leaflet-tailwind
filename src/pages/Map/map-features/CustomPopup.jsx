import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function CustomPopup({ index, content }) {
  return (
    <Card className="border-0 shadow-none w-full h-full z-0" key={index}>
      <CardHeader>
        <img
          src={`http://127.0.0.1:8000/get-image/02223852-3d65-e76d-5287-f22c26ef9ddb`}
          alt="Kraków"
          width="100%" />
        <CardTitle> Source: {content.properties.name} </CardTitle>
        <CardDescription>

          {content.details.timestamp}
          <br />

        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        {content.properties.drone}
      </CardFooter>
    </Card>
  );
}
