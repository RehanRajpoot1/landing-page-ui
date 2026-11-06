import { useEffect, useState } from 'react';
import { getHealth } from '../lib/api.js';

export default function Footer() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch(() => setHealth({ status: 'down' }));
  }, []);

  const up = health?.status === 'ok';

  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted">
        <p>© {new Date().getFullYear()} Nimbus. All rights reserved.</p>

        <p className="flex items-center gap-2" data-testid="api-status">
          <span
            className={`h-2 w-2 rounded-full ${
              health === null ? 'bg-slate-500' : up ? 'bg-emerald-400' : 'bg-red-400'
            }`}
          />
          {health === null
            ? 'Checking API…'
            : up
              ? `API online · v${health.version}`
              : 'API offline'}
        </p>

        <div className="flex gap-5">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="#waitlist" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
