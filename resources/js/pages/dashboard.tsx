import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Activity,
    CheckCircle2,
    FileText,
    Key,
    LogIn,
    LogOut,
    Presentation,
    Trash2,
    TrendingUp,
    UserPen,
    UserPlus,
    Users,
    X,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
    total_users: number;
    new_users_today: number;
    new_users_week: number;
    logins_today: number;
    registrations_today: number;
    total_demo_requests: number;
    new_demo_requests: number;
    total_events_today: number;
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

interface LoginItem {
    id: number;
    ip_address: string | null;
    created_at: string;
    user: { id: number; name: string; email: string } | null;
}

interface RegisterItem {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface TrendPoint {
    date: string;
    count: number;
}

interface Props {
    stats: Stats;
    recentActivity: ActivityItem[];
    recentLogins: LoginItem[];
    recentRegistrations: RegisterItem[];
    activityTrend: TrendPoint[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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
    green:   'bg-emerald-100 text-emerald-600',
    oxblood: 'bg-red-100 text-[#6B1F2B]',
    yellow:  'bg-amber-100 text-amber-600',
    purple:  'bg-purple-100 text-purple-600',
    red:     'bg-red-100 text-red-600',
};

function timeAgo(iso: string): string {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60)   return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function formatEvent(event: string): string {
    return event.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatPaymentMethod(method?: string | null): string {
    if (!method) return 'Debit / Credit Card';
    if (method === 'bank_transfer') return 'Direct Bank Transfer';
    if (method === 'pay_later') return 'Pay Later / Term Invoice';
    if (method === 'card') return 'Debit / Credit Card (Paystack/Flutterwave)';
    return method.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
    label, value, sub, icon: Icon, accent = false,
}: {
    label: string; value: number | string; sub?: string;
    icon: React.ElementType; accent?: boolean;
}) {
    return (
        <div className={`rounded-xl p-5 flex items-start gap-4 ${accent ? 'bg-[#6B1F2B] text-white' : 'bg-card border border-border'}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent ? 'bg-white/15' : 'bg-[#6B1F2B]/10'}`}>
                <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-[#6B1F2B]'}`} />
            </div>
            <div className="min-w-0">
                <p className={`text-2xl font-bold leading-tight ${accent ? 'text-white' : 'text-foreground'}`}>{value}</p>
                <p className={`text-sm font-medium mt-0.5 ${accent ? 'text-white/80' : 'text-muted-foreground'}`}>{label}</p>
                {sub && <p className={`text-xs mt-0.5 ${accent ? 'text-white/60' : 'text-muted-foreground/70'}`}>{sub}</p>}
            </div>
        </div>
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground text-sm">{title}</h2>
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({ stats, recentActivity, recentLogins, recentRegistrations, activityTrend }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const org = auth.user?.organisation;
    const maxTrend = Math.max(...(activityTrend ?? []).map(r => r.count), 1);

    const [showPaymentAlert, setShowPaymentAlert] = useState(() => {
        if (typeof window === 'undefined') return false;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('payment_success') === 'true' || flash?.payment_success) {
            return true;
        }
        if (org && !localStorage.getItem(`dismissed_payment_alert_${org.id}`)) {
            return true;
        }
        return false;
    });

    const dismissPaymentAlert = () => {
        setShowPaymentAlert(false);
        if (org && typeof window !== 'undefined') {
            localStorage.setItem(`dismissed_payment_alert_${org.id}`, 'true');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-6">

                {/* Payment Method Success Alert Banner */}
                {showPaymentAlert && org && (
                    <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/60 dark:via-gray-900 dark:to-gray-900 p-5 sm:p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 text-white shadow-md shadow-emerald-500/20">
                                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h2 className="text-base sm:text-lg font-extrabold text-emerald-950 dark:text-emerald-200">
                                            Payment Method Successfully Confirmed!
                                        </h2>
                                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active & Verified
                                        </span>
                                    </div>

                                    <p className="text-sm text-emerald-900/80 dark:text-emerald-300/90 max-w-2xl">
                                        Your subscription payment method (<strong>{formatPaymentMethod(org.payment_method)}</strong>) was processed successfully for <strong>{org.school_name}</strong>.
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-emerald-900 dark:text-emerald-300/80 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-700 dark:text-emerald-400">School Portal:</span>
                                            <a
                                                href={`https://${org.subdomain || 'school'}.krystal.school`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-bold underline decoration-emerald-500 underline-offset-2 hover:text-emerald-600"
                                            >
                                                https://{org.subdomain || 'school'}.krystal.school
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-700 dark:text-emerald-400">Plan:</span>
                                            <span className="font-bold uppercase">{org.plan}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-700 dark:text-emerald-400">Billing Cycle:</span>
                                            <span className="font-bold uppercase">{org.billing_cycle}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-700 dark:text-emerald-400">Ref:</span>
                                            <span className="font-mono font-bold">KRY-ORG-{org.id.toString().padStart(4, '0')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={dismissPaymentAlert}
                                title="Dismiss alert"
                                className="text-emerald-700 hover:text-emerald-950 dark:text-emerald-400 dark:hover:text-emerald-100 p-1.5 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Welcome */}
                <div>
                    <h1 className="text-xl font-bold text-foreground">
                        Welcome back, {auth.user.name.split(' ')[0]} 👋
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Here's what's happening on the platform today.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Users"      value={stats.total_users}         icon={Users}    sub={`+${stats.new_users_today} today`} />
                    <StatCard label="Logins Today"     value={stats.logins_today}        icon={LogIn}    accent />
                    <StatCard label="Registrations"    value={stats.registrations_today} icon={UserPlus} sub="today" />
                    <StatCard label="Demo Requests"    value={stats.new_demo_requests}   icon={FileText} sub={`${stats.total_demo_requests} total`} />
                </div>

                {/* Middle row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 7-day trend */}
                    <SectionCard title="Activity — Last 7 Days">
                        {activityTrend.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-6">No data yet</p>
                        ) : (
                            <>
                                <div className="flex items-end gap-1.5 h-24">
                                    {activityTrend.map(point => (
                                        <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                                            <div
                                                className="w-full bg-[#6B1F2B]/20 hover:bg-[#6B1F2B]/50 rounded-t transition-colors cursor-default"
                                                style={{ height: `${Math.max(4, Math.round((point.count / maxTrend) * 88))}px` }}
                                            />
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                {point.date}: {point.count}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-1.5">
                                    <span className="text-[10px] text-muted-foreground">{activityTrend[0]?.date}</span>
                                    <span className="text-[10px] text-muted-foreground">{activityTrend[activityTrend.length - 1]?.date}</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Events today</span>
                                    <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                                        <TrendingUp className="w-3.5 h-3.5 text-[#6B1F2B]" />
                                        {stats.total_events_today}
                                    </span>
                                </div>
                            </>
                        )}
                    </SectionCard>

                    {/* Recent logins */}
                    <SectionCard title="Recent Logins">
                        {recentLogins.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-6">No logins recorded yet</p>
                        ) : (
                            <ul className="space-y-3">
                                {recentLogins.map(item => (
                                    <li key={item.id} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <LogIn className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {item.user?.name ?? 'Unknown'}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {item.user?.email ?? '—'}
                                            </p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">{timeAgo(item.created_at)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SectionCard>

                    {/* Recent registrations */}
                    <SectionCard title="New Registrations">
                        {recentRegistrations.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-6">No registrations yet</p>
                        ) : (
                            <ul className="space-y-3">
                                {recentRegistrations.map(user => (
                                    <li key={user.id} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">{timeAgo(user.created_at)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SectionCard>

                </div>

                {/* Full activity feed */}
                <SectionCard title="Live Activity Feed">
                    {recentActivity.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-10">No activity recorded yet</p>
                    ) : (
                        <div className="divide-y divide-border -mx-5 -mb-5">
                            {recentActivity.map(item => {
                                const Icon = iconMap[item.icon] ?? Activity;
                                const colorCls = colorMap[item.color] ?? colorMap.gray;
                                return (
                                    <div key={item.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colorCls}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-foreground leading-snug">{item.description}</p>
                                            {item.user && (
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    {item.user.name}
                                                    <span className="mx-1">·</span>
                                                    {item.user.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-full">
                                                {formatEvent(item.event)}
                                            </span>
                                            <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(item.created_at)}</p>
                                            {item.ip_address && (
                                                <p className="text-[10px] font-mono text-muted-foreground/60">{item.ip_address}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </SectionCard>

            </div>
        </AppLayout>
    );
}
