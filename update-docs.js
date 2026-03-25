const fs = require('fs');

let content = fs.readFileSync('app/docs/page.tsx', 'utf8');

// Replace standard backgrounds with pure black / grid
content = content.replace('bg-black', 'bg-[#050505]');
if (!content.includes('bg-architect-grid')) {
  content = content.replace(
    '<div className="bg-noise absolute inset-0 mix-blend-overlay opacity-30" />',
    '<div className="bg-architect-grid absolute inset-0 pointer-events-none opacity-20" />\n      <div className="bg-noise absolute inset-0 mix-blend-overlay opacity-30" />'
  );
}

// Convert cards
content = content.replace(/border-white\\/\\[0.05\\] bg-white\\/\\[0.02\\]/g, 'glass-panel');
content = content.replace(/bg-black\\/50/g, 'cyber-glass');

fs.writeFileSync('app/docs/page.tsx', content);
console.log('Docs styling updated');
