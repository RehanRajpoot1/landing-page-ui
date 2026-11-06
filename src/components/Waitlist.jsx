import { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { joinWaitlist } from '../lib/api.js';
import Section from './Section.jsx';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });
    try {
      const data = await joinWaitlist(email);
      setStatus({ type: 'success', message: `${data.message} You're #${data.count} in line.` });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  return (
    <Section id="waitlist" alt>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to get started?</h2>
        <p className="mt-3 text-muted">
          Join the waitlist and we'll let you know when your spot is ready.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative flex-1">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-card py-3 pl-11 pr-4 outline-none focus:border-brand"
            />
          </div>
          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="bg-gradient-brand inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white disabled:opacity-70"
          >
            {status.type === 'loading' && <Loader2 size={18} className="animate-spin" />}
            Join waitlist
          </button>
        </form>

        <p
          role="status"
          className={`mt-4 min-h-6 ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
        >
          {status.message}
        </p>
      </div>
    </Section>
  );
}
