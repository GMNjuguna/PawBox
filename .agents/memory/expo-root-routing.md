---
name: Expo root routing
description: A routing constraint discovered while building mobile artifacts in this workspace.
---

Expo Router mobile artifacts should include an explicit root `app/index.tsx` route, even when the primary UI lives under a tab group.

**Why:** Without the root route, the web preview can render a blank screen despite Metro bundling successfully and the tab screens being present.

**How to apply:** Add a small root route that redirects to the intended tab or stack group before presenting a new Expo artifact.