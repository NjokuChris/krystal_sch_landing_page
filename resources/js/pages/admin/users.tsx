import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CheckCircle, Search, Shield, ShieldOff, User, XCircle } from 'lucide-react';

interface UserRow {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string;
    activity_logs_count: number;
}

interface PaginatedUsers {
    data: UserRow[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    users: PaginatedUsers;
    search: string;
}

export default function AdminUsers({ users, search }: Props) {
    const { data, setData, get } = useForm({ search });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/admin/users', { preserveState: true, replace: true });
    };

    const toggleAdmin = (user: UserRow) => {
        if (!confirm(`${user.is_admin ? 'Revoke admin from' : 'Grant admin to'} ${user.name}?`)) return;
        router.post(`/admin/users/${user.id}/toggle-admin`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Users" breadcrumbs={[{ title: 'Users', href: '/admin/users' }]}>
            <Head title="Admin – Users" />

            <div className="max-w-7xl mx-auto space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                        <p className="text-sm text-gray-500 mt-0.5">{users.total} registered users</p>
                    </div>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            placeholder="Search by name or email…"
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/30 focus:border-[#6B1F2B]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#6B1F2B] text-white text-sm font-medium rounded-xl hover:bg-[#541828] transition-colors"
                    >
                        Search
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">User</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Role</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Verified</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Activity</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Joined</th>
                                    <th className="px-5 py-3.5" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-gray-400">No users found</td>
                                    </tr>
                                )}
                                {users.data.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#6B1F2B]/10 flex items-center justify-center shrink-0">
                                                    <User className="w-4 h-4 text-[#6B1F2B]" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            {user.is_admin ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#6B1F2B]/10 text-[#6B1F2B] text-xs font-medium rounded-full">
                                                    <Shield className="w-3 h-3" /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                                                    <User className="w-3 h-3" /> User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {user.email_verified_at ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-gray-300" />
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-gray-600">{user.activity_logs_count} events</span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs">
                                            {new Date(user.created_at).toLocaleDateString('en-GB', {
                                                day: '2-digit', month: 'short', year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                onClick={() => toggleAdmin(user)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                    user.is_admin
                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                        : 'bg-[#6B1F2B]/8 text-[#6B1F2B] hover:bg-[#6B1F2B]/15'
                                                }`}
                                            >
                                                {user.is_admin ? (
                                                    <><ShieldOff className="w-3 h-3" /> Revoke Admin</>
                                                ) : (
                                                    <><Shield className="w-3 h-3" /> Make Admin</>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Showing {users.from}–{users.to} of {users.total}
                            </p>
                            <div className="flex gap-1">
                                {users.links.map((link, i) => (
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
