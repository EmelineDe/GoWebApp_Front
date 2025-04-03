/**
 * Capitalise le premier caractère d'une chaîne de caractères.
 * @param {string} text - La chaîne de caractères à capitaliser.
 * @returns {string} La chaîne de caractères avec le premier caractère en majuscule.
 */

export function capitalize(text: string): string {
  if (!text) return "";
  const trimmed = text.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
