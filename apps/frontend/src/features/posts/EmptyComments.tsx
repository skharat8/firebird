import { Card, CardContent } from "@/components/ui/Card";

function EmptyComments() {
  return (
    <Card
      className="border-t-1 rounded-none rounded-b-xl border-b-neutral-200 p-4 pl-6
        dark:border-b-neutral-800"
    >
      <CardContent className="text-card-foreground/60 py-0 italic">
        No comments yet, maybe you can make the first!
      </CardContent>
    </Card>
  );
}

export default EmptyComments;
