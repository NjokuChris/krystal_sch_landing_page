import { ArrowRight, CalendarCheck, GraduationCap, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
    {
        number: '01',
        icon: CalendarCheck,
        title: 'Book a Demo',
        description:
            'Speak with the Krystal team and discover how the platform fits your school. We will walk you through every relevant feature and answer your questions.',
        color: 'bg-[#6B1F2B]',
    },
    {
        number: '02',
        icon: Settings,
        title: 'Set Up Your School',
        description:
            'Our team helps you configure your school structure, user accounts, academic periods, and the modules that matter most to you.',
        color: 'bg-[#2563EB]',
    },
    {
        number: '03',
        icon: GraduationCap,
        title: 'Manage Your School Smarter',
        description:
            'Start managing your school\'s daily operations — students, teachers, attendance, fees, results, and communication — from one centralised platform.',
        color: 'bg-[#6B1F2B]',
    },
];

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

interface HowItWorksProps {
    onDemoClick: () => void;
}

export default function HowItWorks({ onDemoClick }: HowItWorksProps) {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="how-it-works"
            aria-labelledby="how-heading"
            className="py-20 lg:py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#6B1F2B] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        Getting Started
                    </div>
                    <h2 id="how-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Get Started With Krystal in Three Simple Steps
                    </h2>
                    <p className="text-lg text-gray-600">
                        From first conversation to full deployment — we guide you through the process.
                    </p>
                </div>

                <div ref={ref} className="relative">
                    {/* Connecting line — desktop only */}
                    <div
                        className="hidden lg:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-[#6B1F2B] via-[#2563EB] to-[#6B1F2B] opacity-20"
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className={`flex flex-col items-center text-center reveal ${visible ? 'revealed' : ''}`}
                                    style={{ transitionDelay: `${i * 150}ms` }}
                                >
                                    {/* Step icon */}
                                    <div className={`relative w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg mb-6`}>
                                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-900">{i + 1}</span>
                                        </div>
                                    </div>

                                    {/* Step number */}
                                    <span className="text-xs font-bold text-gray-300 tracking-[0.2em] uppercase mb-3">
                                        Step {step.number}
                                    </span>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm max-w-sm">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-14">
                    <button
                        onClick={onDemoClick}
                        className="btn-oxblood inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl"
                    >
                        Book a Demo Now
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}
