export function capitalize(text: string): string {
  if (!text) return "";
  const trimmed = text.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
