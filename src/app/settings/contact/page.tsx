'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AppShell hideNav>
        <PageHeader title="Settings" showBack showSettings={false} />
        <div className="px-4 flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D8F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Message sent</h2>
          <p className="text-sm text-charcoal-light text-center mb-8">
            We&apos;ll get back to you as soon as we can.
          </p>
          <Button variant="secondary" onClick={() => router.push('/settings')}>
            Back to settings
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell hideNav>
      <PageHeader title="Contact us" showBack showSettings={false} />
      <div className="px-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-marigold"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-marigold"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-marigold resize-none"
              placeholder="How can we help?"
              required
            />
          </div>
          <Button variant="primary" size="lg" fullWidth type="submit">
            Send message
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-charcoal-light mb-2">Or call us directly</p>
          <a
            href="tel:+918843298499"
            className="inline-flex items-center gap-2 text-indigo font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +91 88432 98499
          </a>
        </div>
      </div>
    </AppShell>
  );
}
