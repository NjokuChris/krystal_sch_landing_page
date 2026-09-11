import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    FileX,
    MessageSquareOff,
    UserX,
    WalletCards,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const problems = [
    { icon: FileX, text: 'Too much paperwork and manual record-keeping' },
    { icon: UserX, text: 'Student records scattered across different files and systems' },
    { icon: WalletCards, text: 'Difficulty tracking fee payments and outstanding balances' },
    { icon: AlertTriangle, text: 'Manual attendance that is slow and error-prone' },
    { icon: FileX, text: 'Time-consuming result preparation and report card generation' },
    { icon: MessageSquareOff, text: 'Poor communication between school, parents, and students' },
    { icon: UserX, text: 'Disorganised staff records and payroll-related information' },
    { icon: AlertTriangle, text: 'No clear visibility into overall school performance' },
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

export default function ProblemSection() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="problem"
            aria-labelledby="problem-heading"
            className="py-20 lg:py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                        The Challenge
                    </div>
                    <h2 id="problem-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        School Management Shouldn't Be This Complicated
                    </h2>
                    <p className="text-lg text-gray-600">
                        Running a school involves dozens of daily tasks spread across different people, files, and systems. Without the right tools, things fall through the cracks.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Problems grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {problems.map((problem, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm reveal ${visible ? 'revealed' : ''}`}
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <problem.icon className="w-4 h-4 text-red-500" aria-hidden="true" />
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{problem.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Solution panel */}
                    <div className={`reveal-right ${visible ? 'revealed' : ''}`}>
                        <div className="bg-[#6B1F2B] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
                            {/* Subtle decorative circle */}
                            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
                            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full mb-6">
                                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                    The Krystal Solution
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                                    Krystal Brings Everything Together
                                </h3>
                                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                                    One platform. One source of truth. Better school management.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {[
                                        'Students, staff, and records in one system',
                                        'Real-time attendance and fee tracking',
                                        'Automated result computation',
                                        'Parent and student communication built in',
                                        'Clear reports and insights',
                                    ].map((point) => (
                                        <div key={point} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                                            <span className="text-white/90 text-sm">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById('features');
                                            if (el) {
                                                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                                                window.scrollTo({ top, behavior: 'smooth' });
                                            }
                                        }}
                                        className="flex items-center gap-2 bg-white text-[#6B1F2B] font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        See How It Works
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
