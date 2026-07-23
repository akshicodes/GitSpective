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
