import { jsPreProcessorExtension } from "utils/code";

import { Bin } from "types/bin";

export const defaultHTML = `<h3>Start Editing html, css, script files to see changes.</h3>`;

export const defaultImport = (extension?: Bin["extensionEnabled"]) =>
  `<script type="module" src="/script${
    jsPreProcessorExtension[extension?.js?.preprocessor || "none"]
  }"></script>`;

export const reactHelper = `<div id="root"></div>
<script type="module">
import ReactDom from "react-dom";
import App from "./script";
  const root = document.getElementById("root");
  ReactDom.createRoot(root).render(<App />);
</script>
`;
