import type { SkillItem } from "#/@types/skills.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SkillCardItem({ item }: { item: SkillItem }) {
  return (
    <>
      <li key={item.name} className="group">
        <Link
          to={item.url}
          search={{
            type: item.name.toLocaleUpperCase() as any,
            page: 1,
          }}
        >
          <Card className="hover:shadow-lg dark:shadow-accent smooth">
            <CardContent>
              <LazyLoadImage
                src={item.img}
                alt={item.alt}
                className="w-full h-44 object-contain transition-opacity duration-500"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                style={{ opacity: 0 }}
              />
            </CardContent>
            <CardHeader>
              <CardTitle className="group-hover:text-primary smooth">
                {item.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </li>
    </>
  );
}

export default SkillCardItem;
