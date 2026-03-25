const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace(
  /\.ermiz-node \{[\s\S]*?\.ermiz-node\.selected \{[\s\S]*?\}/,
  .ermiz-node {
  background: var(--glass-panel);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  color: #FFFFFF;
}

.ermiz-node:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.1);
}

.ermiz-node.selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary), 0 0 30px rgba(0, 240, 255, 0.2);
}
);

css = css.replace(
  /\.ermiz-node-header \{[\s\S]*?\.ermiz-node-type \{[\s\S]*?\}/,
  .ermiz-node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.3);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.ermiz-node-type {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: var(--font-geist-mono);
  color: var(--primary);
}
);

fs.writeFileSync('app/globals.css', css);
console.log('globals.css updated');
