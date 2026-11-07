import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';

interface DemoRequest {
    id: number;
    full_name: string;
    school_name: string;
    email: string;
    phone: string;
    school_type: string;
    student_count: string | null;
    message: string | null;
    status: 'new' | 'contacted' | 'converted' | 'closed';
    created_at: string;
}

interface PaginatedDemoRequests {
    data: DemoRequest[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    demoRequests: PaginatedDemoRequests;
    search: string;
    status: string;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
    new:       { label: 'New',       cls: 'bg-blue-100 text-blue-700' },
    contacted: { label: 'Contacted', cls: 'bg-yellow-100 text-yellow-700' },
    converted: { label: 'Converted', cls: 'bg-green-100 text-green-700' },
    closed:    { label: 'Closed',    cls: 'bg-gray-100 text-gray-500' },
};

const statuses = ['', 'new', 'contacted', 'converted', 'closed'];

export default function AdminDemoRequests({ demoRequests, search, status }: Props) {
    const { data, setData, get } = useForm({ search, status });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/admin/demo-requests', { preserveState: true, replace: true });
    };

    const updateStatus = (req: DemoRequest, newStatus: string) => {
        router.patch(`/admin/demo-requests/${req.id}/status`, { status: newStatus }, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Demo Requests" breadcrumbs={[{ title: 'Demo Requests', href: '/admin/demo-requests' }]}>
            <Head title="Admin – Demo Requests" />

            <div className="max-w-7xl mx-auto space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Demo Requests</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{demoRequests.total} total submissions</p>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            placeholder="Search by name, school, or email…"
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 focus:border-[#6B1F2B]"
                        />
                    </div>
                    <select
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                        className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 focus:border-[#6B1F2B] bg-white"
                    >
                        <option value="">All Statuses</option>
                        {statuses.slice(1).map(s => (
                            <option key={s} value={s}>{statusConfig[s].label}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#6B1F2B] text-white text-sm font-medium rounded-xl hover:bg-[#541828] transition-colors"
                    >
                        Filter
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Contact</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">School</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Size</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Date</th>
                                    <th className="px-5 py-3.5" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {demoRequests.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-gray-400">No demo requests found</td>
                                    </tr>
                                )}
                                {demoRequests.data.map(req => {
                                    const sc = statusConfig[req.status];
                                    return (
                                        <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-gray-900">{req.full_name}</p>
                                                <p className="text-xs text-gray-400">{req.email}</p>
                                                <p className="text-xs text-gray-400">{req.phone}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-gray-800">{req.school_name}</p>
                                                <p className="text-xs text-gray-400">{req.school_type}</p>
                                            </td>
                                            <td className="px-5 py-4 text-gray-600">{req.student_count ?? '—'}</td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${sc.cls}`}>
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-xs text-gray-400">
                                                {new Date(req.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit', month: 'short', year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={req.status}
                                                    onChange={e => updateStatus(req, e.target.value)}
                                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 bg-white"
                                                >
                                                    {statuses.slice(1).map(s => (
                                                        <option key={s} value={s}>{statusConfig[s].label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {demoRequests.last_page > 1 && (
                        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Showing {demoRequests.from}–{demoRequests.to} of {demoRequests.total}
                            </p>
                            <div className="flex gap-1">
                                {demoRequests.links.map((link, i) => (
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
