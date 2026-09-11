import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { type Feature, features } from '@/data/features';

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
}

function FeatureCard({ feature, index, visible }: { feature: Feature; index: number; visible: boolean }) {
    const Icon = feature.icon;
    return (
        <div
            className={`group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover reveal ${visible ? 'revealed' : ''}`}
            style={{ transitionDelay: `${(index % 6) * 60}ms` }}
        >
            <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${feature.iconColor}`} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{feature.description}</p>
            <button
                onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B1F2B] hover:text-[#541828] group-hover:gap-2.5 transition-all"
                aria-label={`Learn more about ${feature.title}`}
            >
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
        </div>
    );
}

export default function FeaturesSection() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="features"
            aria-labelledby="features-heading"
            className="py-20 lg:py-28 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2563EB] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        Platform Features
                    </div>
                    <h2 id="features-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Everything You Need to Run a Modern School
                    </h2>
                    <p className="text-lg text-gray-600">
                        Powerful tools designed to simplify everyday school operations.
                    </p>
                </div>

                {/* Grid */}
                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    role="list"
                    aria-label="Krystal features"
                >
                    {features.map((feature, index) => (
                        <div key={feature.id} role="listitem">
                            <FeatureCard feature={feature} index={index} visible={visible} />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-14">
                    <button
                        onClick={() => {
                            const el = document.getElementById('demo-cta');
                            if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
                        }}
                        className="inline-flex items-center gap-2 btn-oxblood px-7 py-3.5 text-base font-semibold rounded-xl"
                    >
                        Request a Demo
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}
