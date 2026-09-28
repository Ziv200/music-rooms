/**
 * Testimonial slot (SCP B.3 / B.6). Hidden by design: renders NOTHING until Ilan supplies an
 * approved quote, name, title and institution. Do not render empty quotes, dummy text or "coming soon".
 */
export type TestimonialData = { quote: string; name: string; title: string; org: string };

/** TODO(Ilan): set to an approved testimonial object to show it. Keep null otherwise. */
export const APPROVED_TESTIMONIAL: TestimonialData | null = null;

export function Testimonial({ data = APPROVED_TESTIMONIAL }: { data?: TestimonialData | null }) {
  if (!data || !data.quote || !data.name || !data.title || !data.org) return null;
  return (
    <figure className="max-w-3xl border-s-2 border-neutral-900 ps-5 my-10">
      <blockquote className="text-xl text-neutral-900 leading-relaxed">“{data.quote}”</blockquote>
      <figcaption className="mt-3 text-[15px] text-neutral-700">
        {data.name}, {data.title}, {data.org}
      </figcaption>
    </figure>
  );
}
