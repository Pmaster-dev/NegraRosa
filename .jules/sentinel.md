## 2026-03-09 - Path Traversal in Verification Document Downloader
**Vulnerability:** Document download endpoint (`/api/v1/verification/:id/document`) used `res.sendFile(verification.data.path, { root: '/' })` allowing arbitrary file read via relative or absolute paths.
**Learning:** `res.sendFile` with `{ root: '/' }` allows serving any file on the system. Simple `startsWith(dir)` prefix checks without `path.sep` are vulnerable to sibling directory prefix collision attacks (e.g. `/app/uploads_evil`).
**Prevention:** Resolve path using `path.resolve`, enforce `normalizedPath.startsWith(uploadDir + path.sep)`, and verify file existence with `fs.existsSync` before serving.
