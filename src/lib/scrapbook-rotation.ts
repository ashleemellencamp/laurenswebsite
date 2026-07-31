/** Parse a Tailwind arbitrary rotate class like `rotate-[8.1deg]` or `-rotate-[5.5deg]`. */
export function parseTailwindRotate(rotateClass: string): number {
  const isNegative = rotateClass.trimStart().startsWith("-");
  const match = rotateClass.match(/([\d.]+)deg/);
  const value = match ? parseFloat(match[1]) : 0;
  return isNegative ? -value : value;
}

/** Reduce rotation amplitude for narrow viewports. */
export function dampenRotation(degrees: number, factor = 0.45): string {
  return `${degrees * factor}deg`;
}
