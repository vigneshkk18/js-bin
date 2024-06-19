import Button from "ui/button";

import useLayout, { type Layout } from "hooks/useLayout";

import { entries } from "utils/common";

const ButtonsConfig: Record<Layout, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  console: "Console",
  output: "Output",
};

export default function LayoutButtonGroup() {
  const { layout, toggleLayout } = useLayout();

  return (
    <div className="flex sm:py-1">
      {entries(ButtonsConfig).map(([key, label]) => (
        <Button
          onClick={toggleLayout(key)}
          className={`md:first:rounded-s-[3px] last:rounded-e-[3px] even:border-x-0 border-y-0 sm:border-y px-2 ${
            layout[key] ? "bg-buttonActive" : "hover:bg-buttonHover"
          }`}
          key={key}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
