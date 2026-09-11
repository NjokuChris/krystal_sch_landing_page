import {
    ArrowRight,
    Bell,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    GraduationCap,
    Search,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HeroProps {
    onDemoClick: () => void;
}

function MiniDashboard() {
    return (
        <div className="relative w-full max-w-[580px] mx-auto lg:mx-0">
            {/* Floating badge cards — hidden on very small screens */}
            <div className="hidden sm:block absolute -top-6 -left-6 lg:-left-10 z-10 animate-float">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 leading-none">Attendance</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">98% Today</p>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block absolute -top-4 right-0 lg:-right-8 z-10 animate-float-alt">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 leading-none">Fees Collected</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">₦2.4M</p>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block absolute -bottom-4 -left-6 lg:-left-10 z-10 animate-float-slow">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                        <Users className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 leading-none">New Admission</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">Just enrolled</p>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block absolute -bottom-6 right-4 lg:right-0 z-10 animate-float">
                <div className="bg-[#6B1F2B] rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-white/70 leading-none">Results</p>
                        <p className="text-sm font-bold text-white mt-0.5">Published</p>
                    </div>
                </div>
            </div>

            {/* Main dashboard card */}
            <div className="relative dashboard-shadow rounded-2xl overflow-hidden bg-white border border-gray-200">
                {/* Top bar */}
                <div className="bg-[#6B1F2B] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                            <GraduationCap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-white text-sm font-semibold">Krystal Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                            <Search className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center relative">
                            <Bell className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full text-[8px] text-white flex items-center justify-center font-bold">3</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#6B1F2B]">
                            A
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-12 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-3 gap-3">
                        {[
                            { Icon: BookOpen, active: true },
                            { Icon: Users, active: false },
                            { Icon: GraduationCap, active: false },
                            { Icon: Wallet, active: false },
                            { Icon: CalendarDays, active: false },
                        ].map(({ Icon, active }, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    active ? 'bg-[#6B1F2B]' : 'bg-gray-100'
                                }`}
                                aria-hidden="true"
                            >
                                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-3 space-y-3 min-w-0">
                        {/* Stat cards row */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {[
                                { label: 'Students', value: '1,248', icon: Users, color: 'text-[#6B1F2B]', bg: 'bg-red-50' },
                                { label: 'Teachers', value: '64', icon: BookOpen, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                                { label: 'Attendance', value: '98%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                                { label: 'Fees Due', value: '₦840k', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                                    <div className={`w-6 h-6 rounded-md ${stat.bg} flex items-center justify-center mb-1`}>
                                        <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} aria-hidden="true" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-[10px] text-gray-500 leading-none mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Performance bar */}
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-gray-700">Academic Performance</span>
                                <span className="text-xs text-[#2563EB] font-medium flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                                    +6% this term
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                {[
                                    { label: 'JSS 1', pct: 82 },
                                    { label: 'JSS 2', pct: 76 },
                                    { label: 'JSS 3', pct: 88 },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-500 w-10 shrink-0">{item.label}</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-[#6B1F2B] h-1.5 rounded-full transition-all duration-500"
                                                style={{ width: `${item.pct}%` }}
                                                aria-label={`${item.label}: ${item.pct}%`}
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-600 font-medium w-8 text-right">{item.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent activities */}
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Recent Activities</p>
                            <div className="space-y-1.5">
                                {[
                                    { text: 'New student registered — Amaka O.', time: '2m ago', dot: 'bg-green-400' },
                                    { text: 'Fee payment received — JSS 2B', time: '14m ago', dot: 'bg-[#2563EB]' },
                                    { text: 'Term results published — SS1', time: '1h ago', dot: 'bg-[#6B1F2B]' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.dot}`} aria-hidden="true" />
                                        <p className="text-[10px] text-gray-600 flex-1 leading-relaxed">{item.text}</p>
                                        <span className="text-[9px] text-gray-400 shrink-0">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Hero({ onDemoClick }: HeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (el) {
            el.classList.add('revealed');
        }
    }, []);

    return (
        <section
            id="hero"
            aria-label="Hero"
            className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 hero-pattern overflow-hidden bg-white"
        >
            {/* Subtle decorative shapes */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl opacity-40 pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left — copy */}
                    <div ref={heroRef} className="flex-1 text-center lg:text-left reveal">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#6B1F2B] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#6B1F2B] animate-pulse" aria-hidden="true" />
                            School Management, Simplified
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                            Everything Your School{' '}
                            <span className="text-gradient-oxblood">Needs.</span>{' '}
                            <br className="hidden sm:block" />
                            One Powerful{' '}
                            <span className="text-[#2563EB]">Platform.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                            Krystal brings academics, administration, communication, finance, and student management together in one simple, powerful platform.
                        </p>

                        {/* Trust statement */}
                        <p className="text-sm text-gray-500 mb-8 flex items-center justify-center lg:justify-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                            Built to simplify school management and improve the learning experience.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={onDemoClick}
                                className="btn-oxblood w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-xl"
                                aria-label="Request a demo of Krystal School Management System"
                            >
                                Request a Demo
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('features');
                                    if (el) {
                                        const top = el.getBoundingClientRect().top + window.scrollY - 80;
                                        window.scrollTo({ top, behavior: 'smooth' });
                                    }
                                }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-xl border-2 border-gray-200 text-gray-700 hover:border-[#6B1F2B] hover:text-[#6B1F2B] transition-colors"
                                aria-label="Explore Krystal features"
                            >
                                Explore Features
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* Right — dashboard mockup */}
                    <div className="flex-1 w-full lg:w-auto reveal-right px-4 sm:px-8 lg:px-0 pt-8 sm:pt-12 pb-8">
                        <MiniDashboard />
                    </div>
                </div>
            </div>
        </section>
    );
}
