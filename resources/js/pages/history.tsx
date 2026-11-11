import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Clock, ShieldCheck, UserCheck, Key, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

interface LogItem {
    id: number;
    event: string;
    description: string;
    ip_address: string | null;
    created_at: string;
}

interface Props {
    logs: {
        data: LogItem[];
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homepage', href: '/dashboard' },
    { title: 'HISTORY', href: '/history' },
];

export default function HistoryPage({ logs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Account History" />

            <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account History</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Timeline of all recent logins, security events, and account activity.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">
                            Activity Logs ({logs?.total || logs?.data?.length || 0})
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {(!logs?.data || logs.data.length === 0) ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No activity recorded yet.
                            </div>
                        ) : (
                            logs.data.map((log) => (
                                <div key={log.id} className="p-4 sm:px-6 flex items-start gap-3.5 hover:bg-gray-50/60 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{log.description}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span>{new Date(log.created_at).toLocaleString()}</span>
                                            {log.ip_address && (
                                                <>
                                                    <span>•</span>
                                                    <span>IP: {log.ip_address}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

