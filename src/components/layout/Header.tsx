'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/helpers';
import { Button } from '@/components/ui';
import { Container } from './Container';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: 'My Projects',
    href: '/projects',
    children: [
      { label: 'Frieda en Rus', href: '/projects/frieda-en-rus' },
      { label: 'Nou Gaan Ons Braai', href: '/projects/braai' },
      { label: 'The Professor', href: '/projects/professor' },
      { label: 'Unexpected Visitors', href: '/projects/unexpected-visitors' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--bg-secondary)]/95 backdrop-blur-md border-b border-[var(--border-primary)]'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            iwan.crafford
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  // Dropdown trigger
                  <button
                    className={cn(
                      'px-4 py-2 text-base font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-[var(--accent-primary)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]'
                    )}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.label}
                    <svg
                      className="inline-block ml-1 w-4 h-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  // Regular link
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-base font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-[var(--accent-primary)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown menu */}
                {item.children && (
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200',
                      openDropdown === item.label && 'opacity-100 visible'
                    )}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[var(--radius-lg)] p-2 min-w-[200px] shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 rounded-[var(--radius-md)] text-sm transition-colors',
                            isActive(child.href)
                              ? 'bg-[var(--accent-primary)] text-white'
                              : 'text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--text-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-[var(--bg-secondary)] z-40 md:hidden transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <Container className="py-8">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-lg font-medium rounded-[var(--radius-md)] transition-colors',
                        isActive(item.href)
                          ? 'text-[var(--accent-primary)]'
                          : 'text-[var(--text-primary)]'
                      )}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <svg
                        className={cn(
                          'w-5 h-5 transition-transform',
                          openDropdown === item.label && 'rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        openDropdown === item.label ? 'max-h-96' : 'max-h-0'
                      )}
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2 text-base rounded-[var(--radius-md)] transition-colors',
                              isActive(child.href)
                                ? 'bg-[var(--accent-primary)] text-white'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 text-lg font-medium rounded-[var(--radius-md)] transition-colors',
                      isActive(item.href)
                        ? 'text-[var(--accent-primary)]'
                        : 'text-[var(--text-primary)]'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-[var(--border-primary)]">
              <Button variant="primary" fullWidth asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
