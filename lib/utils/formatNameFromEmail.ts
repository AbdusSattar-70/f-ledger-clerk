export function formatNameFromEmail(email: string): string {
  const local = email.split("@")[0];
  return local
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
