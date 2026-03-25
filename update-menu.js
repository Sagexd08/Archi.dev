const fs = require('fs');
let content = fs.readFileSync('components/canvas/ContextMenu.tsx', 'utf8');

content = content.replace(
  /background: "var\(--panel\)",\s*border: "1px solid var\(--border\)",/g,
  'background: "rgba(10, 10, 10, 0.75)",\n        backdropFilter: "blur(24px)",\n        border: "1px solid rgba(255, 255, 255, 0.1)",'
);

fs.writeFileSync('components/canvas/ContextMenu.tsx', content);
console.log('ContextMenu updated');
