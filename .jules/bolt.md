# Bolt's Performance Journal

## 2026-09-08 - Component-Level Static Data Recreation & Multiple Passes
**Learning:** React components that define static dataset objects containing JSX icons directly in render functions recreate full object trees on every render, while nested category calculations over static data cause O(Categories * N) passes (30+ array iterations).
**Action:** Extract static initial dataset definitions outside component scope and compute category metrics in a single O(N) memoized pass.
