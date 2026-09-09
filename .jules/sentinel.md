## 2026-09-03 - [SSRF Mitigation in Website Verification]
**Vulnerability:** Unsanitized user-supplied URLs in `WebsiteVerificationService` allowed Server-Side Request Forgery (SSRF), permitting attackers to probe internal microservices, loopback interfaces, or cloud metadata endpoints (`169.254.169.254`).
**Learning:** URL normalization logic must not auto-prefix `https://` to non-HTTP URI schemes (`file://`, `gopher://`), as doing so transforms non-HTTP protocols into valid-looking hostnames that bypass protocol filters.
**Prevention:** Always validate URL scheme (`http:`, `https:`) and resolve/block private/loopback/link-local IPv4 & IPv6 address ranges (RFC 1918, RFC 3927, RFC 4193, RFC 4291) prior to making outbound HTTP requests.
