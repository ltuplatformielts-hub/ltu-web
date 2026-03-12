import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Button } from "./components/ui/button";
import { Link } from "lucide-react";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100dvh-56px)] gap-4">
          <h1 className="text-4xl font-bold text-primary">404</h1>
          <p className="text-muted-foreground">
            Trang bạn tìm kiếm không tồn tại.
          </p>
          <Button asChild>
            <Link to="/">Quay về trang chủ</Link>
          </Button>
        </div>
      );
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
