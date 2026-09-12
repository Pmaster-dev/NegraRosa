# Sentinel Journal - NegraRosa Security Framework

## 2026-09-03 - SSRF Protection for Website Verification Service
**Vulnerability:** External URL input to `WebsiteVerificationService.verifyWebsite()` allowed outbound requests to arbitrary IP addresses including local loopback (`127.0.0.1`, `localhost`), private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and Cloud Instance Metadata Services (`169.254.169.254`).
**Learning:** External URL fetching services must strictly filter hostnames and IP ranges before executing HTTP requests with `axios`.
**Prevention:** Always validate schemes (`http:`/`https:`) and block private IP ranges, loopback addresses, metadata IPs, and non-routable domains in outbound request services.
