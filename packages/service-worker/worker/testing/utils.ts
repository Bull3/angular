/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Get a normalized representation of a URL relative to a provided base URL.
 *
 * More specifically:
 * 1. Resolve the URL relative to the provided base URL.
 * 2. If the URL is relative to the base URL, then strip the origin (and only return the path and
 *    search parts). Otherwise, return the full URL.
 *
 * @param url The raw URL.
 * @param relativeTo The base URL to resolve `url` relative to.
 *     (This is usually the ServiceWorker's origin or registration scope).
 * @return A normalized representation of the URL.
 */
export function normalizeUrl(url: string, relativeTo: string): string {
  const {origin, path, search} = parseUrl(url, relativeTo);
  const {origin: relativeToOrigin} = parseUrl(relativeTo);

  return (origin === relativeToOrigin) ? path + search : url;
}

/**
 * Parse a URL into its different parts, such as `origin`, `path` and `search`.
 */
export function parseUrl(
    url: string, relativeTo?: string): {origin: string, path: string, search: string} {
  const parsedUrl: URL = (typeof URL === 'function') ?
      (!relativeTo ? new URL(url) : new URL(url, relativeTo)) :
      require('url').parse(require('url').resolve(relativeTo || '', url));

  return {
    origin: parsedUrl.origin || `${parsedUrl.protocol}//${parsedUrl.host}`,
    path: parsedUrl.pathname,
    search: parsedUrl.search || '',
  };
}
