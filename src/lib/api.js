export async function getHealth() {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error('API is not reachable');
  return res.json();
}

export async function joinWaitlist(email) {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}
