import { ArrowRight, Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { pricingPlans } from '@/data/pricing';

// [PLACEHOLDER] Pricing is not yet defined. Contact sales for accurate pricing.

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

interface PricingProps {
    onDemoClick: () => void;
}

export default function Pricing({ onDemoClick }: PricingProps) {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="pricing"
            aria-labelledby="pricing-heading"
            className="py-20 lg:py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2563EB] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        Pricing
                    </div>
                    <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Simple Plans for Every School
                    </h2>
                    <p className="text-lg text-gray-600">
                        Choose the plan that fits your school's size and needs. Pricing is tailored — talk to our team for details.
                    </p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
                >
                    {pricingPlans.map((plan, i) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl border p-8 flex flex-col reveal card-hover ${visible ? 'revealed' : ''} ${
                                plan.highlighted
                                    ? 'bg-[#6B1F2B] border-[#6B1F2B] text-white shadow-xl shadow-[#6B1F2B]/20'
                                    : 'bg-white border-gray-200'
                            }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm font-medium mb-3 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                                    {plan.tagline}
                                </p>

                                {/* Price */}
                                <div className={`mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.price ? (
                                        <>
                                            <span className="text-3xl font-bold">{plan.price}</span>
                                            <span className={`text-sm font-medium ml-1 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                                                / student / term
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold">Contact us</span>
                                    )}
                                </div>
                                <p className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-gray-400'}`}>
                                    {plan.price ? 'Billed per student each term' : 'Pricing tailored to your school size and requirements'}
                                </p>
                            </div>

                            <p className={`text-sm leading-relaxed mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                                {plan.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1" role="list">
                                {plan.features.map((f) => (
                                    <li key={f.text} className="flex items-start gap-3">
                                        {f.included ? (
                                            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-green-300' : 'text-green-500'}`} aria-hidden="true" />
                                        ) : (
                                            <X className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-white/30' : 'text-gray-300'}`} aria-hidden="true" />
                                        )}
                                        <span
                                            className={`text-sm ${
                                                f.included
                                                    ? plan.highlighted ? 'text-white/90' : 'text-gray-700'
                                                    : plan.highlighted ? 'text-white/40' : 'text-gray-400'
                                            }`}
                                        >
                                            {f.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={onDemoClick}
                                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                                    plan.highlighted
                                        ? 'bg-white text-[#6B1F2B] hover:bg-gray-50'
                                        : plan.ctaVariant === 'blue'
                                        ? 'btn-blue text-white'
                                        : 'border-2 border-[#6B1F2B] text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-white'
                                }`}
                                aria-label={`${plan.cta} for ${plan.name} plan`}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Custom solution row */}
                <div className="text-center mt-10">
                    <p className="text-gray-600 mb-3">
                        Need a custom solution?{' '}
                        <span className="font-medium">Talk to our team.</span>
                    </p>
                    <button
                        onClick={onDemoClick}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#6B1F2B] border border-[#6B1F2B] rounded-xl hover:bg-[#6B1F2B] hover:text-white transition-colors"
                    >
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
}
