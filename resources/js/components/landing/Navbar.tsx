import { useEffect, useRef, useState } from 'react';
import { ChevronDown, GraduationCap, Menu, X } from 'lucide-react';
import { navItems } from '@/data/solutions';

interface NavbarProps {
    onDemoClick: () => void;
}

export default function Navbar({ onDemoClick }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
    const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
    const featuresRef = useRef<HTMLDivElement>(null);
    const solutionsRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Scroll detection for sticky nav shadow
    useEffect(() => {
        const handler = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
                setFeaturesOpen(false);
            }
            if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
                setSolutionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Close mobile menu on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                setFeaturesOpen(false);
                setSolutionsOpen(false);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        setFeaturesOpen(false);
        setSolutionsOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <header
                role="banner"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                        : 'bg-white/90 backdrop-blur-sm'
                }`}
            >
                <nav
                    aria-label="Main navigation"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <a
                            href="/"
                            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1F2B] rounded-lg"
                            aria-label="Krystal School Management System — Home"
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#6B1F2B] flex items-center justify-center shadow-sm">
                                <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-xl font-bold text-[#6B1F2B] tracking-tight">
                                KRYSTAL
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <ul className="hidden lg:flex items-center gap-1" role="list">
                            <li>
                                <button
                                    onClick={() => scrollTo('hero')}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    Home
                                </button>
                            </li>

                            {/* Features Dropdown */}
                            <li ref={featuresRef} className="relative">
                                <button
                                    aria-expanded={featuresOpen}
                                    aria-haspopup="true"
                                    onClick={() => { setFeaturesOpen(v => !v); setSolutionsOpen(false); }}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    Features
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                {featuresOpen && (
                                    <div
                                        role="menu"
                                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in"
                                    >
                                        {navItems.features.map((item) => (
                                            <button
                                                key={item.label}
                                                role="menuitem"
                                                onClick={() => scrollTo('features')}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-[#6B1F2B] hover:bg-red-50 transition-colors"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </li>

                            {/* Solutions Dropdown */}
                            <li ref={solutionsRef} className="relative">
                                <button
                                    aria-expanded={solutionsOpen}
                                    aria-haspopup="true"
                                    onClick={() => { setSolutionsOpen(v => !v); setFeaturesOpen(false); }}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    Solutions
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                {solutionsOpen && (
                                    <div
                                        role="menu"
                                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in"
                                    >
                                        {navItems.solutions.map((item) => (
                                            <button
                                                key={item.label}
                                                role="menuitem"
                                                onClick={() => scrollTo('solutions')}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-[#6B1F2B] hover:bg-red-50 transition-colors"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </li>

                            <li>
                                <button
                                    onClick={() => scrollTo('pricing')}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    Pricing
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo('faq')}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    Resources
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo('footer')}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors"
                                >
                                    About
                                </button>
                            </li>
                        </ul>

                        {/* Desktop CTAs */}
                        <div className="hidden lg:flex items-center gap-3">
                            <a
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#6B1F2B] rounded-lg transition-colors border border-gray-200 hover:border-[#6B1F2B]"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                className="px-4 py-2 text-sm font-medium text-white bg-[#6B1F2B] hover:bg-[#5a1924] rounded-lg transition-colors border border-[#6B1F2B]"
                            >
                                Sign Up
                            </a>
                            <button
                                onClick={onDemoClick}
                                className="btn-oxblood px-5 py-2.5 text-sm font-semibold rounded-xl"
                            >
                                Request a Demo
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMobileOpen(v => !v)}
                            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#6B1F2B] hover:bg-gray-100 transition-colors"
                        >
                            {mobileOpen ? (
                                <X className="w-6 h-6" aria-hidden="true" />
                            ) : (
                                <Menu className="w-6 h-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                ref={mobileMenuRef}
                aria-hidden={!mobileOpen}
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
                    mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />

                {/* Slide-in panel */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    } overflow-y-auto`}
                >
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#6B1F2B] flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-lg font-bold text-[#6B1F2B]">KRYSTAL</span>
                        </div>
                        <button
                            aria-label="Close menu"
                            onClick={() => setMobileOpen(false)}
                            className="p-2 rounded-lg text-gray-500 hover:text-[#6B1F2B] hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Nav items */}
                    <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
                        <button
                            onClick={() => scrollTo('hero')}
                            className="w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                        >
                            Home
                        </button>

                        {/* Mobile Features */}
                        <div>
                            <button
                                aria-expanded={mobileFeaturesOpen}
                                onClick={() => setMobileFeaturesOpen(v => !v)}
                                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                            >
                                Features
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${mobileFeaturesOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                            {mobileFeaturesOpen && (
                                <div className="mt-1 ml-4 space-y-1 border-l-2 border-red-100 pl-4">
                                    {navItems.features.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => scrollTo('features')}
                                            className="w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-[#6B1F2B] transition-colors"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Solutions */}
                        <div>
                            <button
                                aria-expanded={mobileSolutionsOpen}
                                onClick={() => setMobileSolutionsOpen(v => !v)}
                                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                            >
                                Solutions
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                            {mobileSolutionsOpen && (
                                <div className="mt-1 ml-4 space-y-1 border-l-2 border-red-100 pl-4">
                                    {navItems.solutions.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => scrollTo('solutions')}
                                            className="w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-[#6B1F2B] transition-colors"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => scrollTo('pricing')}
                            className="w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollTo('faq')}
                            className="w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                        >
                            Resources
                        </button>
                        <button
                            onClick={() => scrollTo('footer')}
                            className="w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:text-[#6B1F2B] hover:bg-red-50 rounded-xl transition-colors"
                        >
                            About
                        </button>
                    </nav>

                    {/* Mobile CTAs */}
                    <div className="px-6 pt-4 pb-8 space-y-3 border-t border-gray-100 mt-4">
                        <div className="flex gap-3">
                            <a
                                href="/login"
                                className="flex-1 text-center px-5 py-3 text-sm font-medium text-gray-700 rounded-xl border border-gray-200 hover:border-[#6B1F2B] hover:text-[#6B1F2B] transition-colors"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                className="flex-1 text-center px-5 py-3 text-sm font-medium text-white bg-[#6B1F2B] hover:bg-[#5a1924] rounded-xl transition-colors"
                            >
                                Sign Up
                            </a>
                        </div>
                        <button
                            onClick={onDemoClick}
                            className="btn-oxblood w-full px-5 py-3.5 text-sm font-semibold rounded-xl"
                        >
                            Request a Demo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
