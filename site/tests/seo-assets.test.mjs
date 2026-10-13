import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

const output = new URL("../dist/client/", import.meta.url);
const readOutput = (name) => readFile(new URL(name, output), "utf8");

test("sitemap lists exactly the canonical, indexable HTML pages in the build", async () => {
  const files = await readdir(output, { recursive: true });
  const canonicals = [];
  for (const file of files.filter((name) => name.endsWith(".html"))) {
    const html = await readOutput(file);
    if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.ok(canonical, `${file} needs a canonical before it can be indexed`);
    const url = new URL(canonical[1]);
    assert.equal(url.origin, "https://avsl.4roz.com");
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
    const route = file === "index.html" ? "/" : `/${file.replace(/index\.html$/, "")}`;
    assert.equal(url.pathname, route, `${file} must have a self canonical`);
    canonicals.push(url.href);
  }

  const sitemap = await readOutput("sitemap.xml");
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<\/urlset>\s*$/);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "no duplicate URLs");
  assert.deepEqual(urls.sort(), canonicals.sort(), "update sitemap when canonical pages change");
  assert.doesNotMatch(sitemap, /<!doctype|<html|<lastmod>/i);
});

test("robots allows crawling and points to the deployed sitemap", async () => {
  const robots = await readOutput("robots.txt");
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/m);
  assert.match(robots, /^Sitemap: https:\/\/avsl\.4roz\.com\/sitemap\.xml$/m);
  assert.doesNotMatch(robots, /<!doctype|<html|^Disallow:/im);
});

test("Sites serves built SEO assets directly even when the client accepts HTML", async () => {
  for (const [path, type] of [["sitemap.xml", "application/xml"], ["robots.txt", "text/plain"]]) {
    const body = await readOutput(path);
    for (const method of ["GET", "HEAD"]) {
      const calls = [];
      const response = await worker.fetch(new Request(`https://avsl.4roz.com/${path}`, {
        method, headers: { accept: "text/html" },
      }), {
        ASSETS: { fetch: async (request) => {
          calls.push(new URL(request.url).pathname);
          return new Response(request.method === "HEAD" ? null : body, {
            headers: { "content-type": `${type}; charset=utf-8` },
          });
        } },
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-type"), `${type}; charset=utf-8`);
      assert.equal(await response.text(), method === "HEAD" ? "" : body);
      assert.deepEqual(calls, [`/${path}`]);
    }
  }
});
