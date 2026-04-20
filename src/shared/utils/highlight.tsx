// shared/utils/highlight.tsx
export function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-brand-600 font-semibold">{part}</span>
    ) : part
  );
}