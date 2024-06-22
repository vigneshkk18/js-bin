import useLayout from "hooks/useLayout";

export default function DefaultView() {
  const { layout } = useLayout();

  const layoutSelected = Object.values(layout).some((selected) => selected);

  if (layoutSelected) return null;

  return (
    <img
      className="aspect-video"
      src="https://static.jsbin.com/images/dave.min.svg"
      alt="JSBin"
    />
  );
}
