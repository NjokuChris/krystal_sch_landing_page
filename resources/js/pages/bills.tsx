import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CreditCard, CheckCircle, Receipt, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';

interface Organisation {
    id: number;
    school_name: string;
    school_type: string;
    plan: string;
    billing_cycle: string;
    status: string;
    student_count: number | null;
}

interface Props {
    organisation: Organisation | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homepage', href: '/dashboard' },
    { title: 'PAY BILLS', href: '/bills' },
];

export default function BillsPage({ organisation }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing & Payments" />

            <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Billing & Payments</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your school subscription plan, view payment receipts, and settle dues.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Current Balance */}
                    <div className="bg-[#0B1A30] text-white rounded-xl p-6 shadow-sm border border-[#132B50]">
                        <div className="flex items-center justify-between text-blue-200/80 text-xs font-semibold uppercase tracking-wider">
                            <span>Current Balance</span>
                            <Wallet className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="text-3xl font-extrabold text-cyan-400 mt-3">
                            ₦0
                        </div>
                        <p className="text-xs text-blue-200/70 mt-2">
                            All bills are currently settled. No outstanding dues.
                        </p>
                    </div>

                    {/* Active Plan */}
                    <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200">
                        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
                            <span>Active Plan</span>
                            <CreditCard className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mt-3 capitalize">
                            {organisation?.plan || 'Standard'} Plan
                        </div>
                        <p className="text-xs text-gray-500 mt-2 capitalize">
                            Billing cycle: {organisation?.billing_cycle || 'Termly'} • Status: {organisation?.status || 'Active'}
                        </p>
                    </div>

                    {/* School Profile */}
                    <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200">
                        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
                            <span>Institution</span>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-3 truncate">
                            {organisation?.school_name || 'St Louis Nursery & Primary'}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 capitalize">
                            Type: {organisation?.school_type?.replace('_', ' ') || 'Primary School'}
                        </p>
                    </div>
                </div>

                {/* Invoices card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-800">Payment Invoices & Receipts</h2>
                        <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium">
                            Account Up to Date
                        </span>
                    </div>

                    <div className="p-8 text-center text-gray-400 text-sm">
                        <Receipt className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                        No outstanding invoices for this billing cycle.
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

