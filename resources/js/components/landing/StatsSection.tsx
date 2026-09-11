import { useEffect, useRef, useState } from 'react';

interface StatItem {
    value: string;
    label: string;
    sublabel: string;
}

const stats: StatItem[] = [
    { value: '10+', label: 'School Management Tools', sublabel: 'Covering every aspect of school operations' },
    { value: '24/7', label: 'Access', sublabel: 'Manage your school anytime, from anywhere' },
    { value: '100%', label: 'Centralised Management', sublabel: 'One platform for your entire school' },
    { value: '1', label: 'Unified Platform', sublabel: 'For students, teachers, parents, and administrators' },
];

// [PLACEHOLDER NOTE]: These stats represent product design features, not verified user metrics.
// Replace with real data when available.

function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

export default function StatsSection() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            aria-label="Platform statistics"
            className="py-16 bg-white border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Trust header */}
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                        Trusted by Schools That Want to Work Smarter
                    </p>

                    {/* Placeholder school logos */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                        {[
                            'Premier Academy',     // [PLACEHOLDER LOGO]
                            'Greenfield College',  // [PLACEHOLDER LOGO]
                            'Heritage Schools',    // [PLACEHOLDER LOGO]
                            'Sunrise International', // [PLACEHOLDER LOGO]
                            'Unity Secondary',     // [PLACEHOLDER LOGO]
                        ].map((name) => (
                            <div
                                key={name}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100"
                                aria-label={`${name} (placeholder)`}
                            >
                                <div className="w-5 h-5 rounded bg-[#6B1F2B]/10 flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-[#6B1F2B]">{name[0]}</span>
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-500">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats grid */}
                <div
                    ref={ref}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`text-center px-4 py-6 rounded-2xl bg-gray-50 border border-gray-100 reveal ${visible ? 'revealed' : ''}`}
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <p className="text-4xl sm:text-5xl font-bold text-[#6B1F2B] mb-2 leading-none">
                                {stat.value}
                            </p>
                            <p className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{stat.sublabel}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
