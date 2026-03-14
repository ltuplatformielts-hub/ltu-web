import type { ExamItemOne } from "#/@types/exam.type";
import AudioTestRoom from "#/components/test-room/AudioTestRoom";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/test-room")({
  ssr: "data-only",
  component: RouteComponent,
  staticData: {
    hideLayout: true,
  },
  loader: async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/exam/f84ad180-5a8b-40d8-9e86-5364f796ab88`,
      {
        method: "GET",
      },
    );

    if (!res.ok) return;

    return await res.json();
  },
});

function RouteComponent() {
  const data: ExamItemOne = Route.useLoaderData();
  const { exam } = data;
  const { audio } = exam;

  console.log(audio)

  return (
    <>
      <header className="relative flex justify-between items-center p-4 bg-primary dar:bg-background text-primary-foreground dark:text-foreground">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => window.history.back()}
          >
            <ChevronLeft />
          </Button>
          <h1 className="font-semibold">Test room name</h1>
        </div>
        <AudioTestRoom audioUrl={audio} />
        <div className="flex items-center gap-4">
          <p>abc</p>
          <p>00:00</p>
        </div>
      </header>
      <div>Hello "/test-room"!</div>
    </>
  );
}
