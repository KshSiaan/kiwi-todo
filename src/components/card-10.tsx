import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Placeholder = {
  title: <div className="bg-secondary h-8 max-w-40 w-full rounded-md" />,
  content: <div className="bg-secondary h-20 w-full rounded-md" />,
};
export const Card_10 = () => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-1 z-0 rounded-lg" />
      <Card className="z-10 isolate bg-transparent border-border border-2 ">
        <CardHeader>
          <CardTitle>{Placeholder.title}</CardTitle>
        </CardHeader>
        <CardContent>{Placeholder.content}</CardContent>
      </Card>
    </div>
  );
};
