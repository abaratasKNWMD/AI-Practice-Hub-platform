# Backend rules

Apply when editing API routes, loaders, server actions or integrations.

- Validate untrusted input at the boundary.
- Keep secrets in environment variables.
- Do not initialize service SDKs at module scope if build-time env vars may be missing.
- Log enough to debug, but never log credentials or full payloads with personal data.
- Prefer idempotent jobs for automation.

