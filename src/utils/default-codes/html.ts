import { jsPreProcessorExtension } from "utils/code";

import { Bin } from "types/bin";

export const defaultHTML = `<head></head>
<body>
  <h3>Start Editing html, css, script files to see changes.</h3>
</body>`;

export const defaultImport = (extension?: Bin["extensionEnabled"]) =>
  `<script type="module" src="/script${
    jsPreProcessorExtension[extension?.js?.preprocessor || "none"]
  }"></script>`;

export const reactImport = () =>
  `<script type="module" src="/main.tsx"></script>`;

export const reactHelper = `import ReactDom from "react-dom/client";
import App from "./script.tsx";
const root = document.getElementById("root");
ReactDom.createRoot(root).render(<App />);
`;
