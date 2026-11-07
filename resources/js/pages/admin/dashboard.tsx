import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    FileText,
    Key,
    LogIn,
    LogOut,
    Presentation,
    TrendingUp,
    Trash2,
    UserCheck,
    UserPen,
    UserPlus,
    Users,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Stats {
    total_users: number;
    users_today: number;
    users_this_week: number;
    admin_users: number;
    total_demo_requests: number;
    new_demo_requests: number;
    converted_demo_requests: number;
    total_activity_logs: number;
    activity_today: number;
    logins_today: number;
}

interface ActivityItem {
    id: number;
    event: string;
    description: string;
    icon: string;
    color: string;
    ip_address: string | null;
    created_at: string;
    user: { id: number; name: string; email: string } | null;
}

interface DemoBreakdown {
    new?: number;
    contacted?: number;
    converted?: number;
    closed?: number;
}

interface RegistrationPoint {
    date: string;
    count: number;
}

interface Props {
    stats: Stats;
    recentActivity: ActivityItem[];
    demoRequestsBreakdown: DemoBreakdown;
    registrationTrend: RegistrationPoint[];
}

// ── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
    'log-in':       LogIn,
    'log-out':      LogOut,
    'user-plus':    UserPlus,
    'presentation': Presentation,
    'key':          Key,
    'user-pen':     UserPen,
    'trash-2':      Trash2,
    'activity':     Activity,
};

const colorMap: Record<string, string> = {
    blue:    'bg-blue-100 text-blue-600',
    gray:    'bg-gray-100 text-gray-500',
    green:   'bg-green-100 text-green-600',
    oxblood: 'bg-red-100 text-[#6B1F2B]',
    yellow:  'bg-yellow-100 text-yellow-600',
    purple:  'bg-purple-100 text-purple-600',
    red:     'bg-red-100 text-red-600',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, accent = false }: {
    label: string; value: number | string; sub?: string;
    icon: React.ElementType; accent?: boolean;
}) {
    return (
        <div className={`rounded-2xl p-5 flex items-start gap-4 ${accent ? 'bg-[#6B1F2B] text-white' : 'bg-white border border-gray-100'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent ? 'bg-white/15' : 'bg-[#6B1F2B]/8'}`}>
                <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-[#6B1F2B]'}`} />
            </div>
            <div className="min-w-0">
                <p className={`text-2xl font-bold leading-tight ${accent ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                <p className={`text-sm font-medium mt-0.5 ${accent ? 'text-white/80' : 'text-gray-600'}`}>{label}</p>
                {sub && <p className={`text-xs mt-0.5 ${accent ? 'text-white/60' : 'text-gray-400'}`}>{sub}</p>}
            </div>
        </div>
    );
}

function ActivityRow({ item }: { item: ActivityItem }) {
    const Icon = iconMap[item.icon] ?? Activity;
    const colorCls = colorMap[item.color] ?? colorMap.gray;
    const time = new Date(item.created_at).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });

    return (
        <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colorCls}`}>
                <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{item.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{time}</span>
                    {item.ip_address && (
                        <span className="text-xs text-gray-300">·</span>
                    )}
                    {item.ip_address && (
                        <span className="text-xs text-gray-400 font-mono">{item.ip_address}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboard({ stats, recentActivity, demoRequestsBreakdown, registrationTrend }: Props) {
    const totalDemo = stats.total_demo_requests || 1; // avoid div-by-zero

    const demoStatuses = [
        { label: 'New',       key: 'new',       color: 'bg-blue-500',  count: demoRequestsBreakdown.new ?? 0 },
        { label: 'Contacted', key: 'contacted', color: 'bg-yellow-500',count: demoRequestsBreakdown.contacted ?? 0 },
        { label: 'Converted', key: 'converted', color: 'bg-green-500', count: demoRequestsBreakdown.converted ?? 0 },
        { label: 'Closed',    key: 'closed',    color: 'bg-gray-400',  count: demoRequestsBreakdown.closed ?? 0 },
    ];

    const maxTrend = Math.max(...registrationTrend.map(r => r.count), 1);

    return (
        <AdminLayout title="Overview" breadcrumbs={[{ title: 'Overview', href: '/admin' }]}>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-0.5">System overview and real-time activity</p>
                    </div>
                    <Link
                        href="/admin/activity-log"
                        className="flex items-center gap-1.5 text-sm font-medium text-[#6B1F2B] hover:underline"
                    >
                        Full Activity Log <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Total Users"      value={stats.total_users}         icon={Users}     sub={`+${stats.users_today} today`} />
                    <StatCard label="New Demo Requests" value={stats.new_demo_requests}  icon={FileText}  accent sub={`${stats.total_demo_requests} total`} />
                    <StatCard label="Logins Today"     value={stats.logins_today}        icon={LogIn}     sub={`${stats.activity_today} events today`} />
                    <StatCard label="Total Events"     value={stats.total_activity_logs} icon={Activity}  sub={`${stats.users_this_week} new users this week`} />
                </div>

                {/* Middle row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Demo request breakdown */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-gray-900">Demo Requests</h2>
                            <Link href="/admin/demo-requests" className="text-xs text-[#6B1F2B] hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {demoStatuses.map(s => (
                                <div key={s.key}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">{s.label}</span>
                                        <span className="font-semibold text-gray-900">{s.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${s.color} transition-all duration-500`}
                                            style={{ width: `${Math.round((s.count / totalDemo) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User registration trend */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-gray-900">New Registrations</h2>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> Last 14 days
                            </span>
                        </div>
                        {registrationTrend.length === 0 ? (
                            <div className="flex items-center justify-center h-28 text-sm text-gray-400">No registration data yet</div>
                        ) : (
                            <div className="flex items-end gap-1 h-28">
                                {registrationTrend.map(point => (
                                    <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                                        <div
                                            className="w-full bg-[#6B1F2B]/15 hover:bg-[#6B1F2B]/40 rounded-t transition-colors cursor-default"
                                            style={{ height: `${Math.max(4, Math.round((point.count / maxTrend) * 96))}px` }}
                                        />
                                        {/* Tooltip */}
                                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                            {point.date}: {point.count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {registrationTrend.length > 0 && (
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-400">{registrationTrend[0]?.date}</span>
                                <span className="text-xs text-gray-400">{registrationTrend[registrationTrend.length - 1]?.date}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Quick links */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            {[
                                { label: 'Manage Users',         href: '/admin/users',         icon: Users },
                                { label: 'Demo Requests',        href: '/admin/demo-requests', icon: FileText },
                                { label: 'Full Activity Log',    href: '/admin/activity-log',  icon: Activity },
                            ].map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#6B1F2B]/8 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-[#6B1F2B]" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#6B1F2B] transition-colors">{label}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-[#6B1F2B] transition-colors" />
                                </Link>
                            ))}
                        </div>

                        {/* Mini user stat */}
                        <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-bold text-gray-900">{stats.admin_users}</p>
                                <p className="text-xs text-gray-500">Admin Users</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-bold text-gray-900">{stats.users_this_week}</p>
                                <p className="text-xs text-gray-500">New This Week</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent activity feed */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
                            <Link href="/admin/activity-log" className="text-xs text-[#6B1F2B] hover:underline flex items-center gap-1">
                                See all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        {recentActivity.length === 0 ? (
                            <div className="flex items-center justify-center h-40 text-sm text-gray-400">No activity recorded yet</div>
                        ) : (
                            <div className="overflow-y-auto max-h-80">
                                {recentActivity.map(item => (
                                    <ActivityRow key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
