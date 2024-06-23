import useBin from "hooks/useBin";
import { Layout } from "hooks/useLayout";

export default function useCachedCode(
  language: Extract<Layout, "html" | "css" | "js">
) {
  const bin = useBin();
  return bin ? bin[language] : "";
}
