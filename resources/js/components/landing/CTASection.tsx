import { ArrowRight, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CTASectionProps {
    onDemoClick: () => void;
}

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
}

export default function CTASection({ onDemoClick }: CTASectionProps) {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="demo-cta"
            aria-labelledby="cta-heading"
            className="py-20 lg:py-28 bg-[#6B1F2B] relative overflow-hidden"
        >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 -translate-y-1/3 translate-x-1/3 blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" aria-hidden="true" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div
                    ref={ref}
                    className={`reveal ${visible ? 'revealed' : ''}`}
                >
                    <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
                        Ready to Get Started?
                    </div>

                    <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                        Ready to Make School Management Simpler?
                    </h2>

                    <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Bring your school's people, processes, and information together with Krystal School Management System.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onDemoClick}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#6B1F2B] font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-base shadow-lg"
                            aria-label="Request a demo of Krystal School Management System"
                        >
                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            Request a Demo
                        </button>
                        <a
                            href="mailto:hello@krystal.example.com" // [PLACEHOLDER EMAIL]
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-base"
                            aria-label="Contact Krystal team"
                        >
                            <MessageCircle className="w-5 h-5" aria-hidden="true" />
                            Talk to Us
                        </a>
                    </div>

                    {/* Feature highlights */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                        {[
                            'Student Management',
                            'Fee Tracking',
                            'Attendance',
                            'Results & Reports',
                            'Parent Access',
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
