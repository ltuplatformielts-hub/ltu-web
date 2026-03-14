import type { ExamItem } from "#/@types/exam.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "../ui/button";

function ExamCardItem({ test }: { test: ExamItem }) {
  const date = new Date(test.createdAt).toLocaleDateString("vi", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
        <Card>
          <CardContent>
            <img
              src={test.img}
              alt={test.name}
              loading="lazy"
              className="w-full h-44 object-cover rounded-t-md"
            />
          </CardContent>
          <CardHeader className="py-0">
            <CardTitle className="py-0">{test.name}</CardTitle>
          </CardHeader>
          <CardFooter className="justify-between py-0">
            <CardDescription>{date}</CardDescription>
            <Button>Enroll now</Button>
          </CardFooter>
        </Card>
    </>
  );
}

export default ExamCardItem;
