import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Activity,
    Key,
    LogIn,
    LogOut,
    Presentation,
    Trash2,
    UserPen,
    UserPlus,
} from 'lucide-react';

interface ActivityItem {
    id: number;
    event: string;
    description: string;
    icon: string;
    color: string;
    ip_address: string | null;
    properties: Record<string, unknown> | null;
    created_at: string;
    user: { id: number; name: string; email: string } | null;
}

interface PaginatedLogs {
    data: ActivityItem[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface UserOption {
    id: number;
    name: string;
    email: string;
}

interface Props {
    logs: PaginatedLogs;
    eventTypes: string[];
    users: UserOption[];
    event: string;
    userId: string;
}

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

function formatEvent(event: string): string {
    return event.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function ActivityLogPage({ logs, eventTypes, users, event, userId }: Props) {
    const { data, setData, get } = useForm({ event, user_id: userId });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        get('/admin/activity-log', { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Activity Log" breadcrumbs={[{ title: 'Activity Log', href: '/admin/activity-log' }]}>
            <Head title="Admin – Activity Log" />

            <div className="max-w-7xl mx-auto space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{logs.total} total events recorded</p>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap gap-3">
                    <select
                        value={data.event}
                        onChange={e => setData('event', e.target.value)}
                        className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 bg-white"
                    >
                        <option value="">All Events</option>
                        {eventTypes.map(ev => (
                            <option key={ev} value={ev}>{formatEvent(ev)}</option>
                        ))}
                    </select>
                    <select
                        value={data.user_id}
                        onChange={e => setData('user_id', e.target.value)}
                        className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 bg-white"
                    >
                        <option value="">All Users</option>
                        {users.map(u => (
                            <option key={u.id} value={String(u.id)}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#6B1F2B] text-white text-sm font-medium rounded-xl hover:bg-[#541828] transition-colors"
                    >
                        Filter
                    </button>
                    {(data.event || data.user_id) && (
                        <button
                            type="button"
                            onClick={() => { setData({ event: '', user_id: '' }); get('/admin/activity-log', { preserveState: true, replace: true }); }}
                            className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </form>

                {/* Log list */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {logs.data.length === 0 ? (
                        <div className="flex items-center justify-center py-16 text-gray-400 text-sm">No events found</div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {logs.data.map(item => {
                                const Icon = iconMap[item.icon] ?? Activity;
                                const colorCls = colorMap[item.color] ?? colorMap.gray;
                                const time = new Date(item.created_at).toLocaleString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit', second: '2-digit',
                                });

                                return (
                                    <div key={item.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colorCls}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-800 leading-snug">{item.description}</p>
                                                    {item.user && (
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            by <span className="font-medium text-gray-600">{item.user.name}</span>
                                                            {' · '}{item.user.email}
                                                        </p>
                                                    )}
                                                    {!item.user && (
                                                        <p className="text-xs text-gray-400 mt-0.5">Guest / Public request</p>
                                                    )}
                                                </div>
                                                <div className="shrink-0 text-right">
                                                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full mb-1">
                                                        {formatEvent(item.event)}
                                                    </span>
                                                    <p className="text-xs text-gray-400">{time}</p>
                                                    {item.ip_address && (
                                                        <p className="text-xs font-mono text-gray-300">{item.ip_address}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {logs.last_page > 1 && (
                        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Showing {logs.from}–{logs.to} of {logs.total}
                            </p>
                            <div className="flex gap-1 flex-wrap">
                                {logs.links.map((link, i) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveState
                                            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                                link.active
                                                    ? 'bg-[#6B1F2B] text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 text-xs text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
