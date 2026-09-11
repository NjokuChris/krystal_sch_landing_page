import { BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// All data below is sample/demo data only — not representative of real Krystal customers or results.

const enrollmentData = [
    { month: 'Jan', students: 1180 },
    { month: 'Feb', students: 1200 },
    { month: 'Mar', students: 1195 },
    { month: 'Apr', students: 1220 },
    { month: 'May', students: 1245 },
    { month: 'Jun', students: 1248 },
];

const attendanceData = [
    { week: 'Wk 1', rate: 94 },
    { week: 'Wk 2', rate: 96 },
    { week: 'Wk 3', rate: 93 },
    { week: 'Wk 4', rate: 97 },
    { week: 'Wk 5', rate: 95 },
    { week: 'Wk 6', rate: 98 },
];

const feeData = [
    { month: 'Aug', collected: 1200000, pending: 400000 },
    { month: 'Sep', collected: 1800000, pending: 300000 },
    { month: 'Oct', collected: 2100000, pending: 250000 },
    { month: 'Nov', collected: 1950000, pending: 320000 },
];

const performancePie = [
    { name: 'A (70–100%)', value: 38 },
    { name: 'B (60–69%)', value: 32 },
    { name: 'C (50–59%)', value: 20 },
    { name: 'Below 50%', value: 10 },
];

const PIE_COLORS = ['#16A34A', '#2563EB', '#F59E0B', '#EF4444'];

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

const formatNaira = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;

export default function AnalyticsSection() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="analytics"
            aria-labelledby="analytics-heading"
            className="py-20 lg:py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2563EB] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        <BarChart3 className="w-4 h-4" aria-hidden="true" />
                        Data & Insights
                    </div>
                    <h2 id="analytics-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Turn School Data Into Better Decisions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Clear insights. Better decisions. Stronger school management.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        * Charts below show sample/demo data only.
                    </p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                    {/* Enrollment trend */}
                    <div className={`md:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm reveal ${visible ? 'revealed' : ''}`}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Student Enrollment Trend</h3>
                        <p className="text-xs text-gray-400 mb-4">2024–2025 Academic Year</p>
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={enrollmentData}>
                                <defs>
                                    <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6B1F2B" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6B1F2B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[1100, 1300]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    formatter={(v: number) => [v, 'Students']}
                                />
                                <Area type="monotone" dataKey="students" stroke="#6B1F2B" strokeWidth={2} fill="url(#enrollGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Attendance */}
                    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm reveal delay-100 ${visible ? 'revealed' : ''}`}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Weekly Attendance</h3>
                        <p className="text-xs text-gray-400 mb-4">Avg. rate (%)</p>
                        <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[88, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    formatter={(v: number) => [`${v}%`, 'Rate']}
                                />
                                <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Academic performance pie */}
                    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm reveal delay-200 ${visible ? 'revealed' : ''}`}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Grade Distribution</h3>
                        <p className="text-xs text-gray-400 mb-2">Current term</p>
                        <ResponsiveContainer width="100%" height={130}>
                            <PieChart>
                                <Pie
                                    data={performancePie}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={55}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {performancePie.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    formatter={(v: number) => [`${v}%`, '']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-1 mt-1">
                            {performancePie.map((p, i) => (
                                <div key={p.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} aria-hidden="true" />
                                    <span className="text-[10px] text-gray-600 flex-1">{p.name}</span>
                                    <span className="text-[10px] font-semibold text-gray-700">{p.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fee collection */}
                    <div className={`md:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm reveal delay-300 ${visible ? 'revealed' : ''}`}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Fee Collection Overview</h3>
                        <p className="text-xs text-gray-400 mb-4">Collected vs. Pending</p>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={feeData} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatNaira} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    formatter={(v: number) => [formatNaira(v), '']}
                                />
                                <Bar dataKey="collected" name="Collected" fill="#6B1F2B" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="pending" name="Pending" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-[#6B1F2B]" aria-hidden="true" />
                                <span className="text-xs text-gray-500">Collected</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-gray-200" aria-hidden="true" />
                                <span className="text-xs text-gray-500">Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary cards */}
                    {[
                        { label: 'Avg. Attendance Rate', value: '96%', sub: 'Current term', color: 'bg-green-50', textColor: 'text-green-700' },
                        { label: 'Average Academic Score', value: '74%', sub: 'Across all classes', color: 'bg-blue-50', textColor: 'text-[#2563EB]' },
                    ].map((card, i) => (
                        <div
                            key={card.label}
                            className={`${card.color} rounded-2xl p-6 border border-gray-100 flex flex-col justify-center reveal delay-${(i + 4) * 100} ${visible ? 'revealed' : ''}`}
                        >
                            <p className={`text-4xl font-bold ${card.textColor} mb-2`}>{card.value}</p>
                            <p className="text-sm font-semibold text-gray-700">{card.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
