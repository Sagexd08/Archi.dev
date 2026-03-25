const fs = require('fs');
let content = fs.readFileSync('components/canvas/edges/StepEdge.tsx', 'utf8');

content = content.replace(
  'stroke: selected ? "var(--primary)" : "color-mix(in srgb, var(--muted) 82%, #00f0ff 18%)",',
  'stroke: selected ? "#8A2BE2" : "#00F0FF",'
);

content = content.replace(
  /filter: selected \? .*? : "none",/g,
  'filter: "drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))",'
);

content = content.replace(
  'stroke: selected ? "#c7e5ff" : "#9add8ff",',
  'stroke: "#FFFFFF",'
);

fs.writeFileSync('components/canvas/edges/StepEdge.tsx', content);
console.log('StepEdge updated');
