const fs = require('fs');
let content = fs.readFileSync('components/studio/StudioLayout.tsx', 'utf8');

if (!content.includes('CommandPalette')) {
  // Add import
  content = content.replace(
    'import React from "react";',
    'import React from "react";\nimport { CommandPalette } from "./CommandPalette";'
  );

  // Add component
  content = content.replace(
    '{children}',
    '{children}\n      <CommandPalette />'
  );

  fs.writeFileSync('components/studio/StudioLayout.tsx', content);
  console.log('StudioLayout updated');
}
