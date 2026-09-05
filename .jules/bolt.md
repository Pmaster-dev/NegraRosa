## 2026-09-05 - O(1) Indexing for In-Memory Storage Lookups
**Learning:** `MemStorage` in-memory repositories stored records in `Map<number, Entity>` keyed by primary key ID, but query methods like `getReputation(userId)` performed linear array conversions and scans (`Array.from(map.values()).find(...)`), turning high-frequency hot path lookups into O(N) operations.
**Action:** Always maintain secondary lookup indexes (`Map<foreignKey, Entity>`) alongside primary key maps in in-memory storage implementations for direct O(1) retrieval on hot paths.
