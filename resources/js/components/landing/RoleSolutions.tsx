import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { solutions } from '@/data/solutions';

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

interface RoleSolutionsProps {
    onDemoClick: () => void;
}

export default function RoleSolutions({ onDemoClick }: RoleSolutionsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const { ref, visible } = useScrollReveal();
    const active = solutions[activeTab];
    const Icon = active.icon;

    return (
        <section
            id="solutions"
            aria-labelledby="solutions-heading"
            className="py-20 lg:py-28 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2563EB] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        Role-Based Access
                    </div>
                    <h2 id="solutions-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Built for Everyone in Your School Community
                    </h2>
                    <p className="text-lg text-gray-600">
                        Every person in your school gets the tools and information most relevant to their role.
                    </p>
                </div>

                {/* Tab buttons */}
                <div
                    role="tablist"
                    aria-label="School roles"
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {solutions.map((sol, i) => {
                        const TabIcon = sol.icon;
                        return (
                            <button
                                key={sol.id}
                                role="tab"
                                aria-selected={activeTab === i}
                                aria-controls={`tab-panel-${sol.id}`}
                                id={`tab-${sol.id}`}
                                onClick={() => setActiveTab(i)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === i
                                        ? 'bg-[#6B1F2B] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <TabIcon className="w-4 h-4" aria-hidden="true" />
                                {sol.role}
                            </button>
                        );
                    })}
                </div>

                {/* Tab panel */}
                <div
                    ref={ref}
                    id={`tab-panel-${active.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${active.id}`}
                    className={`reveal ${visible ? 'revealed' : ''}`}
                >
                    <div className={`rounded-3xl border p-8 lg:p-12 ${active.color}`}>
                        <div className="flex flex-col lg:flex-row gap-10 items-start">
                            {/* Left */}
                            <div className="flex-1">
                                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6`}>
                                    <Icon className={`w-7 h-7 ${active.accentColor}`} aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {active.headline}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                    {active.description}
                                </p>
                                <button
                                    onClick={onDemoClick}
                                    className="btn-oxblood inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl"
                                    aria-label={`Request a demo for ${active.role}`}
                                >
                                    Request a Demo
                                </button>
                            </div>

                            {/* Right — benefits */}
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                    Key Capabilities
                                </h4>
                                <ul className="space-y-3" role="list">
                                    {active.benefits.map((benefit) => (
                                        <li key={benefit.text} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                                            <span className="text-gray-700">{benefit.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
