# Bolt's Performance Journal

## 2025-05-18 - Route-based Code Splitting in Single-Page Application

**Learning:** Static imports of all top-level page components in `client/src/App.tsx` caused Vite to bundle all pages into a single monolithic entry chunk (`1,695 kB` uncompressed / `441 kB` gzipped). This resulted in downloading code for the entire application upfront, including heavy dashboard modules (`Dashboard` is ~950 kB). By converting route page components to dynamic imports (`React.lazy()` with `Suspense`), Vite automatically splits pages into separate lazy-loaded chunks.

**Action:** Always use `React.lazy()` for route-level components in React applications using Vite/Wouter/React-Router to keep initial bundle sizes minimal (<500 kB) and load page JS on-demand as users navigate.
