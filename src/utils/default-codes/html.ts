export const defaultHTML = `<head>
</head>
<body>
  <h3>JSBin</h3>
</body>
`;

export const defaultHTMLReactHelper = `<body>
  <div id="root"></div>
</body>`;

export const defaultReactHelper = `import React from "react";
import { createRoot } from "react-dom/client";
const App = () => {
  return <h3>JSBin</h3>
};

const container = createRoot(document.getElementById("root"));
container.render(<App />);
`;

export const constructHTML = (
  head: string,
  body: string,
  importsMap: string,
  script: string,
  styles: string
) => `
<html>
  <head>
    ${head}
    <title>JSBin</title>
    ${importsMap}
    <style>${styles ?? ""}</style>
  </head>
  <body>
    ${body}
    <script type="module">${script}</script>
    <script>
      (function() {
        const originalLog = console.log;
        console.log = function(...args) {
            // Send the log messages to your app
            window.parent.postMessage({ type: 'console-log', args }, '*');
            // Call the original console.log function
            originalLog.apply(console, args);
        };
      })();
    </script>
  </body>
</html>
`;
