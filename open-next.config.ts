// @opennextjs/cloudflare config.
// Default preset is enough for a mostly-static site; no R2 cache yet.
// See https://opennext.js.org/cloudflare/caching for enabling R2 caching later.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Add incrementalCache / tagCache config here when enabling R2.
});
