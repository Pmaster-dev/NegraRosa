# Bolt's Journal - Critical Learnings

## 2026-09-03 - Throttling Scroll State Updates and DOM Reflows in React
**Learning:** Scroll event listeners in React components that directly update floating point state and query multiple DOM scroll properties on every unthrottled pixel scroll cause severe main-thread layout thrashing and dozens of unnecessary re-renders per second.
**Action:** Use `requestAnimationFrame` with a boolean `ticking` guard, pass `{ passive: true }` to `addEventListener`, query `document.documentElement` directly once, and use functional state updates (`prev => prev !== newval ? newval : prev`) with rounded integer values to prevent re-rendering when values don't visually change.
