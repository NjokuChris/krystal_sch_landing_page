import { Facebook, GraduationCap, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

// [PLACEHOLDER] Replace all URLs, email, phone, address, and social links with real Krystal information.

const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Updates', href: '#' }, // [PLACEHOLDER]
    ],
    company: [
        { label: 'About', href: '#' },       // [PLACEHOLDER]
        { label: 'Contact', href: '#' },     // [PLACEHOLDER]
        { label: 'Careers', href: '#' },     // [PLACEHOLDER]
    ],
    resources: [
        { label: 'Blog', href: '#' },          // [PLACEHOLDER]
        { label: 'Help Center', href: '#' },   // [PLACEHOLDER]
        { label: 'Documentation', href: '#' }, // [PLACEHOLDER]
        { label: 'FAQs', href: '#faq' },
    ],
    support: [
        { label: 'Contact Support', href: '#' }, // [PLACEHOLDER]
        { label: 'Request a Demo', href: '#demo-cta' },
        { label: 'Login', href: '/login' },
    ],
};

const socials = [
    { icon: Facebook, label: 'Facebook', href: '#' },   // [PLACEHOLDER]
    { icon: Instagram, label: 'Instagram', href: '#' }, // [PLACEHOLDER]
    { icon: Linkedin, label: 'LinkedIn', href: '#' },   // [PLACEHOLDER]
    { icon: Twitter, label: 'X (Twitter)', href: '#' }, // [PLACEHOLDER]
    { icon: Youtube, label: 'YouTube', href: '#' },     // [PLACEHOLDER]
];

function scrollTo(id: string) {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

export default function Footer() {
    return (
        <footer id="footer" aria-label="Site footer" className="bg-[#111827] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#6B1F2B] flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">KRYSTAL</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-[220px]">
                            Smart school management. Better school experiences.
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-3">
                            {socials.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={`Krystal on ${label} (placeholder)`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#6B1F2B] transition-colors"
                                >
                                    <Icon className="w-4 h-4" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Product</h3>
                        <ul className="space-y-2.5" role="list">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault();
                                                scrollTo(link.href);
                                            }
                                        }}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Company</h3>
                        <ul className="space-y-2.5" role="list">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                        aria-label={`${link.label} (placeholder link)`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Resources</h3>
                        <ul className="space-y-2.5" role="list">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault();
                                                scrollTo(link.href);
                                            }
                                        }}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Support</h3>
                        <ul className="space-y-2.5" role="list">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault();
                                                scrollTo(link.href);
                                            }
                                        }}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © 2026 Krystal School Management System. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                                Privacy Policy {/* [PLACEHOLDER] */}
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                                Terms of Service {/* [PLACEHOLDER] */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
