// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

function mockFetch() {
  return vi.fn((url, options) => {
    if (url === '/api/health') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'ok', version: '1.0.0' }),
      });
    }
    if (url === '/api/waitlist' && options?.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "You're on the list!", count: 1 }),
      });
    }
    return Promise.reject(new Error(`Unexpected request: ${url}`));
  });
}

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('renders the hero and main sections', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship faster.');
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
    expect(screen.getByText('Simple pricing')).toBeInTheDocument();
  });

  it('shows the API status in the footer', async () => {
    render(<App />);
    expect(await screen.findByText(/API online/)).toBeInTheDocument();
  });

  it('lets a user join the waitlist', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Email address'), 'me@example.com');
    await user.click(screen.getByRole('button', { name: /join waitlist/i }));
    expect(await screen.findByText(/You're on the list!/)).toBeInTheDocument();
  });
});
