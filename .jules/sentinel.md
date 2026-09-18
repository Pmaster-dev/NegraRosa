# Sentinel Security Directives & Critical Learnings

## 2026-03-31 - Prevent SSRF in Website Verification Services
**Vulnerability:** User-submitted URLs in `WebsiteVerificationService` were directly fetched via HTTP GET requests without IP or hostname filtering, enabling Server-Side Request Forgery (SSRF) against localhost and cloud metadata endpoints (e.g. 169.254.169.254).
**Learning:** External URL fetching services must validate destination URLs prior to issuing HTTP requests.
**Prevention:** Validate scheme (http/https only) and restrict requests targeting loopback addresses, private IP blocks (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16), and local/internal domain names.
