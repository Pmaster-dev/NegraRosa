## 2025-05-18 - MemStorage Map Indexing for High-Frequency Lookups
**Learning:** In-memory storage lookup methods (`getUserByUsername`, `getUserByExternalId`, `getReputation`) were using `Array.from(this.map.values()).find()`, leading to $O(N)$ time complexity and heap array allocation overhead on every request/lookup.
**Action:** Maintain secondary Map indexes (e.g. `usersByUsername`, `usersByExternalId`, `reputationsByUserId`) and update/delete keys on entity changes to provide $O(1)$ constant time lookups without heap allocation overhead.
