// Which built pages search engines should index. astro.config.mjs filters the sitemap with isIndexable, the layout
// defaults its robots tag from it, and tests/site.test.mjs checks that the two agree on the built site.
//
// - /404/: the error page.
// - /teachers/answers/<lesson>/: teacher answer keys, linked only from /teachers/.
// - /learn/<lesson>/activity/: the printable one-page student activities. Measured in November 2026, the twelve are
//   blank worksheets (a results table and write-in lines) of 264–456 words (median 334); about a tenth of each is
//   wording shared with the other eleven, and none repeats its formula guide. That is the same kind of page as the
//   Biology Lab's activities, so they follow the same rule: kept for teachers and linked from their tool, formula
//   guide and the teacher hub, but out of the index, so the tool and the guide are the pages that rank.
export const noindexPatterns = [/^\/404\/$/, /^\/teachers\/answers\//, /\/activity\/$/];
/** path: a site path such as "/tools/circle-sectors/" (or a full URL). */
export const isIndexable = path => {
  const p = /^https?:/.test(path) ? new URL(path).pathname : path;
  return !noindexPatterns.some(re => re.test(p));
};
