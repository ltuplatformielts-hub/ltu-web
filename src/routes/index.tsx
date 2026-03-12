import SkillList from "#/components/skills/SkillList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Skills</h2>
        <SkillList />
      </section>
    </main>
  );
}
