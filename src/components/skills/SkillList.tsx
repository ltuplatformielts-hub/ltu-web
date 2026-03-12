import { skillItems } from "#/data/skill.data";
import SkillCardItem from "./SkillCardItem";

function SkillList() {
  return (
    <>
      <ul className="basic-grid">
        {skillItems.map((skill) => (
          <SkillCardItem key={skill.alt} item={skill} />
        ))}
      </ul>
    </>
  );
}

export default SkillList;
