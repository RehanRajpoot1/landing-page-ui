import { Check } from 'lucide-react';
import Section from './Section.jsx';

const plans = [
  { name: 'Starter', price: 0, perks: ['1 project', 'Community support', 'Free SSL'] },
  {
    name: 'Pro',
    price: 19,
    perks: ['10 projects', 'Email support', 'Custom domains', 'Preview deploys'],
    featured: true,
  },
  {
    name: 'Team',
    price: 49,
    perks: ['Unlimited projects', 'Priority support', 'Team access', 'Audit logs'],
  },
];

export default function Pricing() {
  return (
    <Section id="pricing" title="Simple pricing" subtitle="No hidden fees. Cancel anytime.">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border bg-card p-7 ${
              plan.featured ? 'border-brand shadow-xl shadow-brand/20' : 'border-line'
            }`}
          >
            {plan.featured && (
              <span className="bg-gradient-brand absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-semibold text-white">
                Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-3 text-4xl font-extrabold">
              ${plan.price}
              <span className="text-base font-medium text-muted">/mo</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-muted">
                  <Check size={16} className="text-brand-2" /> {perk}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className={`mt-8 rounded-lg py-3 text-center font-semibold ${
                plan.featured
                  ? 'bg-gradient-brand text-white'
                  : 'border border-line hover:border-brand'
              }`}
            >
              Choose {plan.name}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
