import type { ExamItems } from "#/@types/exam.type";
import ExamPagination from "#/components/ExamPagination";
import SkillList from "#/components/skills/SkillList";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, HomeIcon, RotateCw, SearchXIcon } from "lucide-react";

interface ExamFilters {
  type?: "LISTENING" | "READING" | "WRITING" | "SPEAKING";
  page?: number;
  search?: string;
}

export const Route = createFileRoute("/demo/skills")({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-8 h-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">
            Oop! Something went wrong!
          </h2>
          <p className="text-destructive-foreground">
            {error instanceof Error
              ? error.message
              : "We encountered an unexpected error while loading the exams."}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => window.location.reload()}>
            <RotateCw /> Try Again
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeftIcon /> Go back
          </Button>
        </div>
      </div>
    );
  },
  validateSearch: (search: Record<string, unknown>): ExamFilters => {
    const filters: ExamFilters = {};

    if (search.type) filters.type = search.type as ExamFilters["type"];
    if (search.search) filters.search = search.search as string;

    const page = Number(search.page) || 1;
    filters.page = page;

    return filters;
  },
  loader: async ({ search }) => {
    const { page, type, search: searchKey = "" } = search || {};
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (searchKey && searchKey !== "undefined")
      queryParams.append("search", searchKey);
    if (type) queryParams.append("type", type);

    const res = await fetch(`http://localhost:4000/api/v1/exam?${queryParams}`);

    if (!res.ok) {
      // Ép ném ra lỗi để kích hoạt errorComponent
      throw new Error(`Failed to fetch exams: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  },
  notFoundComponent: () => {
    return (
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-8 h-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">
            404! Page Not Found!
          </h2>
          <p className="text-destructive-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => window.location.reload()}>
            <RotateCw /> Go back
          </Button>
          <Link to="/">
            <Button variant="outline" onClick={() => window.history.back()}>
              <HomeIcon /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  },
});

function RouteComponent() {
  const data: ExamItems = Route.useLoaderData();
  console.log(data.exam);

  return (
    <>
      <div className="px-4 py-2 h-content">
        {(data.exam.length === 0 && (
          <div className="text-center h-content flex flex-col items-center justify-center gap-8">
            <div className="-space-y-1">
              <div className="flex justify-center items-center gap-0.5">
                <SearchXIcon className="text-muted-foreground" />
                <h1 className="font-semibold text-lg">No tests available.</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Please check back later or try a different category.
              </p>
            </div>
            <SkillList />
          </div>
        )) || (
          <ul className="basic-grid">
            {data.exam.map((test) => {
              const date = new Date(test.createdAt).toLocaleDateString("vi", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              return (
                <li key={test.id}>
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
                </li>
              );
            })}
          </ul>
        )}
        <ExamPagination page={data.page} totalPage={data.totalPage} />
      </div>
    </>
  );
}
