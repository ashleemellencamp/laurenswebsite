export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blush/30 bg-ivory px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-sm text-warm-gray md:flex-row md:justify-between">
        <p>&copy; {year} Lauren&apos;s Photography. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-charcoal"
          >
            Instagram
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-charcoal"
          >
            Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
}
