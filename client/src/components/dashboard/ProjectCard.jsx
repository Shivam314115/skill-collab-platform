// client/src/components/dashboard/ProjectCard.jsx
import React from "react";
import { AtlasCard, AtlasTag } from "../common/AgileUI";

export default function ProjectCard({ project }) {
  const title = project?.name ?? project?.title ?? "Untitled Project";
  const desc = project?.description ?? project?.desc ?? "";

  return (
    <AtlasCard className="p-4">
      <h3 className="text-lg font-black text-white">{title}</h3>
      {desc && <p className="mt-2 text-sm font-semibold text-[#a6a6a6]">{desc}</p>}
      {project?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((t) => (
            <AtlasTag key={t}>{t}</AtlasTag>
          ))}
        </div>
      )}
    </AtlasCard>
  );
}
