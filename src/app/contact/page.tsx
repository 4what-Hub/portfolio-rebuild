'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { Button, Input, Textarea, Select } from '@/components/ui';
import { submitContactForm } from '@/lib/firebase';
import type { InquiryType } from '@/types';

const inquiryOptions = [
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'commission', label: 'Commission' },
  { value: 'inquiry', label: 'General Inquiry' },
  { value: 'feedback', label: 'Feedback' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'inquiry' as InquiryType,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        inquiryType: formData.inquiryType,
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'inquiry',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-[var(--bg-secondary)] pb-8">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-heading mb-4">Contact Me</h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="section pt-0 bg-[var(--bg-secondary)]">
        <Container size="sm">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl mb-6">Contact Info</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:iwan.crafford@gmail.com"
                    className="text-[var(--accent-link)] hover:text-[var(--accent-link-hover)] transition-colors"
                  >
                    iwan.crafford@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+27738240610"
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    +27 73 824 0610
                  </a>
                </div>

                <div>
                  <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                    Location
                  </h3>
                  <p className="text-[var(--text-primary)]">
                    Blouberg, Western Cape<br />
                    South Africa
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                    Social
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/thegreatbig_scrapbook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/iwancrafford/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)] rounded-[var(--radius-lg)] p-8 text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-[var(--accent-secondary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="font-heading text-2xl mb-2">Message Sent!</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <Button variant="secondary" onClick={() => setStatus('idle')}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone (Optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 00 000 0000"
                    />
                    <Select
                      label="Inquiry Type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      options={inquiryOptions}
                    />
                  </div>

                  <Textarea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project or inquiry..."
                    rows={6}
                  />

                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-[var(--radius-md)] text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
