/**
 * Consistent section header used across the dashboard.
 *
 * @param {string} title - Section heading text.
 * @param {string} [subtitle] - Optional supporting line under the heading.
 * @param {React.ReactNode} [action] - Optional trailing element (link, button).
 */
export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight text-primary sm:text-xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
