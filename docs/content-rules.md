# Content rules (keep these for all future work)

Source of truth for copy: the site content package ("SCP", `site-content-package.md`, Sept 2026). Use its copy verbatim; do not write new marketing copy.

1. **Do not invent anything.** No prices, price ranges, project cost, quotes, testimonials, statistics, client names, certifications, warranty periods or response times. If copy is missing, leave a clearly marked TODO in `src/lib/site-config.ts` and ask Ilan.
2. **Placeholders must not go live.** Text such as `[להשלים על ידי אילן]`, `[Ilan to confirm]`, `{...}` or `[business number]` must never render on a public page. Either Ilan supplies the value (set it in `src/lib/site-config.ts`) or the row/sentence is omitted where the SCP allows it.
3. **Testimonial slot stays hidden.** The component exists (`src/components/Testimonial.tsx`) but renders nothing until Ilan supplies an approved quote, name and title. No empty quotes, dummy text or "coming soon".
4. **No therapeutic-outcome claims** anywhere. Never state that the ADI Negev studio serves IDF veterans or war casualties. The `/beit-halochem/` page must not name a specific Beit HaLochem or organization as a client.
5. **Atmos** uses only the softened wording from SCP B.12 (option A). Atmos is an optional module, never the hero message and never in headlines.
6. **ADI Negev naming** is allowed (approved by Ilan, Sept 2026): ADI Negev–Nahalat Eran, The Valerie and Michael Miller Music Therapy Studio, and the donors' names as publicly announced. Never publish the project cost.
7. **Domain:** stay on `ziv200.github.io/music-rooms` (no CNAME, keep `basePath`).
8. **Deploy:** `npm run deploy` publishes to the live site. Only Ilan runs it, after approving a preview.
