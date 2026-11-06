import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold">
          <span className="bg-gradient-brand grid h-8 w-8 place-items-center rounded-lg text-white">
            N
          </span>
          Nimbus
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-medium text-muted hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="bg-gradient-brand rounded-lg px-4 py-2 text-sm font-semibold text-white"
          >
            Get started
          </a>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-line bg-ink-2 px-5 py-5 md:hidden">
          {[...links, { href: '#waitlist', label: 'Get started' }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-medium text-muted hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
