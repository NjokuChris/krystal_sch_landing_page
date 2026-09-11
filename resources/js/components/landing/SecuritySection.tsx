import {
    Activity,
    Database,
    Eye,
    Lock,
    Settings,
    ShieldCheck,
    UserCog,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const securityFeatures = [
    {
        icon: Lock,
        title: 'Secure Authentication',
        description: 'Access to the platform requires verified credentials, helping to ensure that only authorised users can log in.',
    },
    {
        icon: UserCog,
        title: 'Role-Based Access',
        description: 'Each user type — administrators, teachers, parents, and students — sees only the information and tools relevant to their role.',
    },
    {
        icon: Settings,
        title: 'Permission Management',
        description: 'Administrators can configure what different users can view, create, update, or manage within the system.',
    },
    {
        icon: ShieldCheck,
        title: 'Data Protection',
        description: 'The platform is built with data privacy in mind, helping to keep school and student information appropriately protected.',
    },
    {
        icon: Eye,
        title: 'Secure Communication',
        description: 'Internal messaging and announcements are delivered within the platform rather than through unsecured external channels.',
    },
    {
        icon: Database,
        title: 'Regular Backups',
        description: 'Data backup processes are in place to help protect school information from unexpected loss.',
    },
    {
        icon: Activity,
        title: 'Activity Monitoring',
        description: 'System activity can be reviewed to support accountability and help identify any unusual access or changes.',
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

export default function SecuritySection() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="security"
            aria-labelledby="security-heading"
            className="py-20 lg:py-28 bg-[#111827] relative overflow-hidden"
        >
            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6B1F2B]/10 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#2563EB]/10 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        <ShieldCheck className="w-4 h-4 text-green-400" aria-hidden="true" />
                        Security & Privacy
                    </div>
                    <h2 id="security-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                        Your School Data Deserves Protection
                    </h2>
                    <p className="text-lg text-white/70">
                        Designed with security, privacy, and controlled access in mind.
                    </p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                    {securityFeatures.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className={`bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors reveal ${visible ? 'revealed' : ''}`}
                                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#6B1F2B]/30 flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-[#F0ACB8]" aria-hidden="true" />
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-xs text-white/60 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}

                    {/* Last card — CTA */}
                    <div
                        className={`bg-[#6B1F2B] border border-[#6B1F2B] rounded-2xl p-5 flex flex-col justify-between reveal delay-400 ${visible ? 'revealed' : ''}`}
                    >
                        <div>
                            <ShieldCheck className="w-8 h-8 text-white mb-4" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-white mb-2">Want to know more?</h3>
                            <p className="text-xs text-white/70 leading-relaxed mb-4">
                                Speak with our team for a full overview of how Krystal protects your school's information.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                const el = document.getElementById('demo-cta');
                                if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
                            }}
                            className="bg-white text-[#6B1F2B] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Talk to Our Team
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
