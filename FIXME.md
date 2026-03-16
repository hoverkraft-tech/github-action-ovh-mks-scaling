# FIXME

Issues identified during the migration to super-linter v8 that require non-trivial fixes.

## TRIVY - CVE-2026-22036: undici DoS vulnerability (MEDIUM)

**File:** `package-lock.json`
**Tool:** Trivy
**Severity:** MEDIUM

The `undici` package (v5.29.0) is vulnerable to CVE-2026-22036 (Denial of Service via excessive
decompression steps). The fix requires upgrading to v6.23.0 or v7.18.2.

`undici` is a transitive dependency. Updating it requires either:

- Upgrading the parent package that depends on it to a version that pins a fixed `undici`
- Overriding the version via `npm overrides` in `package.json`

```json
"overrides": {
  "undici": ">=6.23.0"
}
```

Check the dependency tree before applying:

```sh
npm ls undici
```
