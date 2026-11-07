import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

import AnalyticsSection from '@/components/landing/AnalyticsSection';
import CTASection from '@/components/landing/CTASection';
import ChatWidget from '@/components/landing/ChatWidget';
import DashboardShowcase from '@/components/landing/DashboardShowcase';
import DemoModal from '@/components/landing/DemoModal';
import FAQ from '@/components/landing/FAQ';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Navbar from '@/components/landing/Navbar';
import Pricing from '@/components/landing/Pricing';
import ProblemSection from '@/components/landing/ProblemSection';
import RoleSolutions from '@/components/landing/RoleSolutions';
import SecuritySection from '@/components/landing/SecuritySection';
import StatsSection from '@/components/landing/StatsSection';
import Testimonials from '@/components/landing/Testimonials';

// Scroll-reveal hook — runs IntersectionObserver for .reveal elements
function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        const observe = () => {
            const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            elements.forEach((el) => observer.observe(el));
        };

        // Observe existing + re-observe after small delay to catch late-mounted elements
        observe();
        const timer = setTimeout(observe, 300);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);
}

export default function Welcome() {
    const [demoOpen, setDemoOpen] = useState(false);

    const openDemo = useCallback(() => setDemoOpen(true), []);
    const closeDemo = useCallback(() => setDemoOpen(false), []);

    // Global scroll-reveal
    useScrollReveal();

    return (
        <>
            <Head title="Krystal School Management System | Smart School Management Software">
                <meta key="description" name="description" content="Manage students, academics, attendance, fees, staff, communication, and school operations with Krystal School Management System." />
                <meta key="keywords" name="keywords" content="school management system, school software, Nigeria school management, student management, fee management, attendance, academics" />
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:title" property="og:title" content="Krystal School Management System | Smart School Management Software" />
                <meta key="og:description" property="og:description" content="Manage students, academics, attendance, fees, staff, communication, and school operations from one centralised platform." />
                <meta key="og:url" property="og:url" content="https://krystal.example.com" />
                <meta key="og:image" property="og:image" content="https://krystal.example.com/og-image.png" />
                <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta key="twitter:title" name="twitter:title" content="Krystal School Management System" />
                <meta key="twitter:description" name="twitter:description" content="One platform for students, teachers, parents, and administrators." />
                <link key="preconnect-bunny" rel="preconnect" href="https://fonts.bunny.net" />
                <link key="fonts-bunny" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" rel="stylesheet" />
            </Head>

            <div
                className="min-h-screen font-sans text-gray-900 bg-white"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Instrument Sans', sans-serif" }}
            >
                {/* 1. Navigation */}
                <Navbar onDemoClick={openDemo} />

                {/* Page content */}
                <main id="main-content" tabIndex={-1}>
                    {/* 2. Hero */}
                    <Hero onDemoClick={openDemo} />

                    {/* 3. Stats / Trust */}
                    <StatsSection />

                    {/* 4. Problem section */}
                    <ProblemSection />

                    {/* 5. Core features */}
                    <FeaturesSection />

                    {/* 6–9. Dashboard showcase (Admin, Teacher, Parent, Student) */}
                    <DashboardShowcase onDemoClick={openDemo} />

                    {/* 10. How it works */}
                    <HowItWorks onDemoClick={openDemo} />

                    {/* 11. Role-based solutions */}
                    <RoleSolutions onDemoClick={openDemo} />

                    {/* 12. Analytics */}
                    <AnalyticsSection />

                    {/* 13. Security */}
                    <SecuritySection />

                    {/* 14. Testimonials */}
                    <Testimonials />

                    {/* 15. Pricing */}
                    <Pricing onDemoClick={openDemo} />

                    {/* 16. FAQ */}
                    <FAQ onDemoClick={openDemo} />

                    {/* 17. Final CTA */}
                    <CTASection onDemoClick={openDemo} />
                </main>

                {/* 18. Footer */}
                <Footer />

                {/* Demo modal — global */}
                <DemoModal isOpen={demoOpen} onClose={closeDemo} />

                {/* Chat widget — global */}
                <ChatWidget />
            </div>
        </>
    );
}
