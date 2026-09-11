import {
    ArrowRight,
    Bell,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ClipboardCheck,
    GraduationCap,
    MessageSquare,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function useScrollReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ─── Admin Dashboard mockup ─── */
function AdminMockup() {
    return (
        <div className="bg-white rounded-2xl dashboard-shadow border border-gray-200 overflow-hidden">
            <div className="bg-[#6B1F2B] px-4 py-3 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Admin Dashboard</span>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Bell className="w-4 h-4 text-white/80" aria-hidden="true" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" aria-hidden="true" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-[10px] font-bold text-[#6B1F2B] flex items-center justify-center">A</div>
                </div>
            </div>
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Students', value: '1,248', icon: Users, bg: 'bg-red-50', color: 'text-[#6B1F2B]' },
                        { label: 'Staff', value: '64', icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
                        { label: 'Attendance', value: '97%', icon: CheckCircle2, bg: 'bg-green-50', color: 'text-green-600' },
                        { label: 'Fees Collected', value: '₦4.2M', icon: Wallet, bg: 'bg-amber-50', color: 'text-amber-600' },
                    ].map(({ label, value, icon: Icon, bg, color }) => (
                        <div key={label} className={`${bg} rounded-xl p-3 border border-gray-100`}>
                            <Icon className={`w-5 h-5 ${color} mb-2`} aria-hidden="true" />
                            <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
                            <p className="text-xs text-gray-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>
                {/* Performance chart placeholder */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-700">Term Performance Overview</span>
                        <span className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" aria-hidden="true" /> +8% vs last term
                        </span>
                    </div>
                    <div className="flex items-end gap-2 h-16">
                        {[65, 72, 68, 80, 76, 88, 84].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t-sm transition-all duration-500"
                                style={{
                                    height: `${h}%`,
                                    backgroundColor: i === 6 ? '#6B1F2B' : i % 2 === 0 ? '#2563EB20' : '#6B1F2B20',
                                }}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-1">
                        {['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7'].map(w => (
                            <span key={w} className="text-[9px] text-gray-400 flex-1 text-center">{w}</span>
                        ))}
                    </div>
                </div>
                {/* Upcoming events */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Upcoming Events</p>
                    <div className="space-y-2">
                        {[
                            { event: 'End of Term Examinations', date: 'Nov 12', color: 'bg-[#6B1F2B]' },
                            { event: 'Parent-Teacher Meeting', date: 'Nov 18', color: 'bg-[#2563EB]' },
                            { event: 'Prize Giving Day', date: 'Dec 2', color: 'bg-green-500' },
                        ].map((e, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${e.color} shrink-0`} aria-hidden="true" />
                                <p className="text-xs text-gray-700 flex-1">{e.event}</p>
                                <span className="text-[10px] text-gray-400">{e.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Teacher mockup ─── */
function TeacherMockup() {
    return (
        <div className="bg-white rounded-2xl dashboard-shadow border border-gray-200 overflow-hidden">
            <div className="bg-[#2563EB] px-4 py-3 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Teacher Portal</span>
                <div className="w-6 h-6 rounded-full bg-white/20 text-[10px] font-bold text-white flex items-center justify-center">T</div>
            </div>
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'My Students', value: '42', icon: Users, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                        { label: 'Classes', value: '3', icon: BookOpen, color: 'text-[#6B1F2B]', bg: 'bg-red-50' },
                        { label: 'Assignments', value: '7', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className={`${bg} rounded-xl p-3`}>
                            <Icon className={`w-4 h-4 ${color} mb-1`} aria-hidden="true" />
                            <p className="text-base font-bold text-gray-900">{value}</p>
                            <p className="text-[10px] text-gray-500">{label}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Today's Attendance — JSS 2A</p>
                    <div className="flex gap-1 flex-wrap">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-6 h-6 rounded text-[8px] flex items-center justify-center font-medium ${
                                    i < 28 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'
                                }`}
                                aria-label={i < 28 ? 'Present' : 'Absent'}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">28 present · 2 absent</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Recent Results Entered</p>
                    <div className="space-y-1.5">
                        {[
                            { subject: 'Mathematics', avg: '72%' },
                            { subject: 'English Language', avg: '68%' },
                            { subject: 'Basic Science', avg: '81%' },
                        ].map((r) => (
                            <div key={r.subject} className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">{r.subject}</span>
                                <span className="text-xs font-semibold text-[#2563EB]">{r.avg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Parent mockup ─── */
function ParentMockup() {
    return (
        <div className="bg-white rounded-2xl dashboard-shadow border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#6B1F2B] to-[#2563EB] px-4 py-3 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Parent Portal</span>
                <div className="flex items-center gap-1">
                    <Bell className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="w-4 h-4 bg-amber-400 rounded-full text-[8px] text-white flex items-center justify-center font-bold">2</span>
                </div>
            </div>
            <div className="p-4 space-y-3">
                <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#6B1F2B] flex items-center justify-center text-white font-bold text-sm">C</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Chisom Okafor</p>
                            <p className="text-xs text-gray-500">JSS 2 · Student ID: KSM-0847</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Attendance', value: '96%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Fees Status', value: 'Paid', icon: Wallet, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                        { label: 'Average Score', value: '74%', icon: GraduationCap, color: 'text-[#6B1F2B]', bg: 'bg-red-50' },
                        { label: 'Assignments', value: '3 Due', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className={`${bg} rounded-xl p-3`}>
                            <Icon className={`w-4 h-4 ${color} mb-1`} aria-hidden="true" />
                            <p className="text-sm font-bold text-gray-900">{value}</p>
                            <p className="text-[10px] text-gray-500">{label}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">School Announcements</p>
                    <div className="space-y-2">
                        {[
                            { text: 'Second term examinations begin Nov 12', time: 'Today' },
                            { text: 'PTA meeting — Saturday 9am', time: 'Yesterday' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6B1F2B] mt-1.5 shrink-0" aria-hidden="true" />
                                <p className="text-xs text-gray-600 flex-1">{a.text}</p>
                                <span className="text-[9px] text-gray-400">{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Student mockup ─── */
function StudentMockup() {
    return (
        <div className="bg-white rounded-2xl dashboard-shadow border border-gray-200 overflow-hidden">
            <div className="bg-[#111827] px-4 py-3 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Student Portal</span>
                <div className="w-6 h-6 rounded-full bg-[#2563EB] text-[10px] font-bold text-white flex items-center justify-center">K</div>
            </div>
            <div className="p-4 space-y-3">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-[#2563EB] mb-1">Good morning, Kemi!</p>
                    <p className="text-xs text-gray-600">You have 2 assignments due this week.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Subjects', value: '8', icon: BookOpen, color: 'text-[#6B1F2B]', bg: 'bg-red-50' },
                        { label: 'Timetable', value: 'Updated', icon: CalendarDays, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                        { label: 'Latest Score', value: '82%', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Messages', value: '3 New', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className={`${bg} rounded-xl p-3`}>
                            <Icon className={`w-4 h-4 ${color} mb-1`} aria-hidden="true" />
                            <p className="text-sm font-bold text-gray-900">{value}</p>
                            <p className="text-[10px] text-gray-500">{label}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Upcoming Assignments</p>
                    <div className="space-y-2">
                        {[
                            { subject: 'Mathematics', task: 'Quadratic Equations Exercise', due: 'Due Wed' },
                            { subject: 'English', task: 'Comprehension Passage B', due: 'Due Fri' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-[10px] font-medium text-[#6B1F2B]">{a.subject}</p>
                                    <p className="text-xs text-gray-600">{a.task}</p>
                                </div>
                                <span className="text-[9px] text-amber-600 font-medium whitespace-nowrap">{a.due}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Showcase section component ─── */
interface ShowcaseProps {
    id: string;
    badge: string;
    badgeColor: string;
    heading: string;
    description: string;
    bullets: string[];
    cta: string;
    onCtaClick: () => void;
    mockup: React.ReactNode;
    reversed?: boolean;
    bg?: string;
}

function ShowcaseSection({
    id, badge, badgeColor, heading, description, bullets,
    cta, onCtaClick, mockup, reversed = false, bg = 'bg-white',
}: ShowcaseProps) {
    const { ref, visible } = useScrollReveal();

    return (
        <section id={id} aria-labelledby={`${id}-heading`} className={`py-20 lg:py-28 ${bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={ref}
                    className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
                >
                    {/* Text */}
                    <div className={`flex-1 ${reversed ? 'reveal-right' : 'reveal-left'} ${visible ? 'revealed' : ''}`}>
                        <div className={`inline-flex items-center gap-2 ${badgeColor} text-sm font-medium px-4 py-1.5 rounded-full mb-6`}>
                            {badge}
                        </div>
                        <h2 id={`${id}-heading`} className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
                            {heading}
                        </h2>
                        <p className="text-lg text-gray-600 mb-7 leading-relaxed">{description}</p>
                        <ul className="space-y-3 mb-8" role="list">
                            {bullets.map((b) => (
                                <li key={b} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                                    <span className="text-gray-700">{b}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={onCtaClick}
                            className="btn-oxblood inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl"
                        >
                            {cta}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Mockup */}
                    <div className={`flex-1 w-full ${reversed ? 'reveal-left' : 'reveal-right'} ${visible ? 'revealed' : ''}`}>
                        {mockup}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface DashboardShowcaseProps {
    onDemoClick: () => void;
}

export default function DashboardShowcase({ onDemoClick }: DashboardShowcaseProps) {
    return (
        <>
            <ShowcaseSection
                id="admin-showcase"
                badge="For Administrators"
                badgeColor="bg-red-50 border border-red-100 text-[#6B1F2B]"
                heading="Manage Your Entire School From One Dashboard"
                description="Give administrators a single, clear view of everything that matters — students, staff, attendance, fees, results, and school activities — without switching between different systems."
                bullets={[
                    'Real-time overview of student and staff numbers',
                    'Attendance and fee collection at a glance',
                    'Academic performance summaries',
                    'Upcoming events and important notifications',
                    'Recent school activities in one timeline',
                ]}
                cta="Request a Demo"
                onCtaClick={onDemoClick}
                mockup={<AdminMockup />}
                bg="bg-[#F8FAFC]"
            />
            <ShowcaseSection
                id="teacher-showcase"
                badge="For Teachers"
                badgeColor="bg-blue-50 border border-blue-100 text-[#2563EB]"
                heading="Give Teachers the Tools They Need"
                description="Krystal helps teachers spend more time teaching and less time on administrative tasks. From quick attendance marking to result entry and parent communication — it's all in one place."
                bullets={[
                    'Quick and easy daily attendance recording',
                    'Student performance and result tracking',
                    'Assignment creation and management',
                    'Communication with parents and students',
                    'Access to class timetables and schedules',
                ]}
                cta="See How It Works"
                onCtaClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
                }}
                mockup={<TeacherMockup />}
                reversed
                bg="bg-white"
            />
            <ShowcaseSection
                id="parent-showcase"
                badge="For Parents"
                badgeColor="bg-purple-50 border border-purple-100 text-purple-700"
                heading="Keep Parents Connected and Informed"
                description="Parents can stay up to date with their child's academic progress, attendance, fee status, assignments, and school announcements — without needing to call the school office."
                bullets={[
                    "Child's results and academic performance",
                    'Attendance records and summaries',
                    'Fee payments and outstanding balances',
                    'School announcements and notices',
                    'Assignment updates and school calendar',
                ]}
                cta="Request a Demo"
                onCtaClick={onDemoClick}
                mockup={<ParentMockup />}
                bg="bg-[#F8FAFC]"
            />
            <ShowcaseSection
                id="student-showcase"
                badge="For Students"
                badgeColor="bg-amber-50 border border-amber-100 text-amber-700"
                heading="Give Students a Better Digital Experience"
                description="Students get a clean, organised portal to access everything they need — timetables, assignments, results, learning resources, and school updates."
                bullets={[
                    'View subjects, timetables, and schedules',
                    'Access assignments and submission deadlines',
                    'View term results and report cards',
                    'Access learning resources and study materials',
                    'Receive important school announcements',
                ]}
                cta="Request a Demo"
                onCtaClick={onDemoClick}
                mockup={<StudentMockup />}
                reversed
                bg="bg-white"
            />
        </>
    );
}
