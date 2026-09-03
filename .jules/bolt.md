# Bolt's Journal - Critical Performance Learnings

## 2025-05-18 - N+1 Webhook Storage Queries
**Learning:** Retrieving all entity records (such as webhooks) by first fetching all users (`storage.getAllUsers()`) and then looping over each user with `storage.getWebhooksByUserId(user.id)` creates an N+1 async call overhead (1 + N queries) and filters the full collection repeatedly. Adding a direct `getAllWebhooks()` method reduces this to O(W) with a single query call.
**Action:** Always provide direct collection-level getter methods on storage abstractions for bulk operations instead of composing user-by-user iteration loops.
