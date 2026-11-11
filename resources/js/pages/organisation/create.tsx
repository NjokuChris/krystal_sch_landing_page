import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BookOpen,
    Building2,
    Check,
    CheckCircle2,
    Clock,
    CreditCard,
    Globe,
    HelpCircle,
    Layers,
    Sparkles,
} from 'lucide-react';
import { type SharedData } from '@/types';
import { pricingPlans } from '@/data/pricing';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
    school_name: string;
    subdomain: string;
    school_type: string;
    plan: string;
    billing_cycle: string;
    payment_method: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    website: string;
    student_count: string;
    [key: string]: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: 'School Info',     icon: Building2 },
    { id: 2, label: 'Domain Name',     icon: Globe },
    { id: 3, label: 'Select Plan',     icon: Layers },
    { id: 4, label: 'Payment Method',  icon: CreditCard },
    { id: 5, label: 'Review Order',    icon: BookOpen },
];

const SCHOOL_TYPES = [
    { value: 'nursery',         label: 'Nursery School' },
    { value: 'primary',         label: 'Primary School' },
    { value: 'secondary',       label: 'Secondary School' },
    { value: 'nursery_primary', label: 'Nursery & Primary School' },
    { value: 'university',      label: 'University / Polytechnic' },
    { value: 'other',           label: 'Other' },
];

const BILLING_CYCLES = [
    { value: 'termly', label: 'Termly',  desc: 'Billed every school term (3× per year)' },
    { value: 'yearly', label: 'Yearly',  desc: 'Billed once a year — save 10%' },
];

const PAYMENT_METHODS = [
    {
        id: 'card',
        title: 'Debit / Credit Card',
        badge: 'Instant Activation',
        badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        desc: 'Instant automated activation via Paystack & Flutterwave. Accepts Mastercard, Visa, Verve & Apple Pay.',
        icon: CreditCard,
    },
    {
        id: 'bank_transfer',
        title: 'Direct Bank Transfer',
        badge: 'Official Account',
        badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        desc: 'Transfer directly to Krystal Education Technologies Ltd bank account. Verification within 1 hour.',
        icon: Building2,
    },
    {
        id: 'pay_later',
        title: 'Pay Later / Term Invoice',
        badge: '14-Day Term Grace',
        badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        desc: 'Set up your school portal now and settle the invoice within 14 days of term commencement.',
        icon: Clock,
    },
];

// ── Shared styles for high contrast in both Light & Dark modes ───────────────

const inputClasses =
    'w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/30 focus:border-[#0B1A30] dark:focus:border-cyan-400 transition-colors';

const selectClasses =
    'w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/30 focus:border-[#0B1A30] dark:focus:border-cyan-400 transition-colors';

const labelClasses =
    'block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5';

// ── Step Indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center justify-center mb-8 overflow-x-auto px-2 py-1">
            <div className="flex items-center gap-0 min-w-max">
                {STEPS.map((step, i) => {
                    const done   = current > step.id;
                    const active = current === step.id;
                    return (
                        <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                                    done   ? 'bg-[#0B1A30] border-[#0B1A30] text-white shadow-xs' :
                                    active ? 'bg-[#0B1A30] border-[#0B1A30] text-white shadow-md shadow-[#0B1A30]/30 ring-2 ring-cyan-400/40' :
                                             'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300'
                                }`}>
                                    {done ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                                    active ? 'text-[#0B1A30] dark:text-cyan-400 font-extrabold' :
                                    done   ? 'text-gray-800 dark:text-gray-200 font-semibold' :
                                             'text-gray-400 dark:text-gray-500'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-10 sm:w-14 h-0.5 mb-5 mx-1.5 transition-colors ${
                                    done ? 'bg-[#0B1A30] dark:bg-cyan-500' : 'bg-gray-200 dark:bg-gray-700'
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Step 1: School Information (First Page) ───────────────────────────────────

function StepSchoolInfo({
    data,
    setData,
    errors,
    onSchoolNameChange,
}: {
    data: FormData;
    setData: (k: string, v: string) => void;
    errors: Record<string, string>;
    onSchoolNameChange: (name: string) => void;
}) {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 rounded-lg bg-[#0B1A30]/5 dark:bg-cyan-500/10 text-[#0B1A30] dark:text-cyan-400">
                        <Building2 className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">School Information</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-9">
                    Tell us about your school to begin your personalised Krystal setup.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* School Name */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>
                        School Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.school_name}
                        onChange={e => onSchoolNameChange(e.target.value)}
                        placeholder="e.g. St Louis Nursery and Primary School"
                        className={inputClasses}
                        autoFocus
                    />
                    {errors.school_name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.school_name}</p>}
                </div>

                {/* School Type */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>
                        School Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.school_type}
                        onChange={e => setData('school_type', e.target.value)}
                        className={selectClasses}
                    >
                        <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select school type…</option>
                        {SCHOOL_TYPES.map(t => (
                            <option key={t.value} value={t.value} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{t.label}</option>
                        ))}
                    </select>
                    {errors.school_type && <p className="text-xs text-red-500 mt-1 font-medium">{errors.school_type}</p>}
                </div>

                {/* Approximate Student Count */}
                <div>
                    <label className={labelClasses}>Approximate Student Count</label>
                    <input
                        type="number"
                        min="1"
                        value={data.student_count}
                        onChange={e => setData('student_count', e.target.value)}
                        placeholder="e.g. 200"
                        className={inputClasses}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Helps estimate your termly subscription.</p>
                </div>

                {/* Phone Number */}
                <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        placeholder="e.g. 07033735669"
                        className={inputClasses}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Official contact for administrative notices.</p>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>School Address</label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                        placeholder="e.g. No 20 Tony Umeh street Okwe"
                        className={inputClasses}
                    />
                </div>

                {/* City */}
                <div>
                    <label className={labelClasses}>City / Town</label>
                    <input
                        type="text"
                        value={data.city}
                        onChange={e => setData('city', e.target.value)}
                        placeholder="e.g. Asaba"
                        className={inputClasses}
                    />
                </div>

                {/* State */}
                <div>
                    <label className={labelClasses}>State</label>
                    <input
                        type="text"
                        value={data.state}
                        onChange={e => setData('state', e.target.value)}
                        placeholder="e.g. Delta"
                        className={inputClasses}
                    />
                </div>

                {/* Website */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>Existing Website <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                        type="url"
                        value={data.website}
                        onChange={e => setData('website', e.target.value)}
                        placeholder="https://yourschool.edu.ng"
                        className={inputClasses}
                    />
                </div>
            </div>
        </div>
    );
}

// ── Step 2: Domain Name (Second Page) ─────────────────────────────────────────

function StepDomainName({
    data,
    setData,
    errors,
}: {
    data: FormData;
    setData: (k: string, v: string) => void;
    errors: Record<string, string>;
}) {
    const handleSubdomainChange = (val: string) => {
        const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setData('subdomain', cleaned);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Your School Domain</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Set up your dedicated school web address where parents, students, and teachers will access your portal.
                </p>
            </div>

            {/* Prominent Domain Name Card (matches Educare layout) */}
            <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-white dark:from-gray-800/80 dark:to-gray-900 rounded-2xl border border-blue-200 dark:border-gray-700 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1A30] dark:text-cyan-400 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#0B1A30] dark:text-cyan-400" />
                        Domain Name Url
                    </h3>
                    <div className="group relative">
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 text-center">
                            This unique address is where your school community accesses attendance, grades, and online fee payments.
                        </div>
                    </div>
                </div>

                <div className="space-y-3 max-w-xl">
                    <label className={labelClasses}>
                        Site Url eg highschool <span className="text-red-500">*</span>
                    </label>

                    <div className="flex rounded-xl shadow-xs overflow-hidden border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-[#0B1A30]/30 focus-within:border-[#0B1A30] dark:focus-within:border-cyan-400">
                        <span className="inline-flex items-center px-4 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs sm:text-sm font-medium border-r border-gray-300 dark:border-gray-600">
                            https://
                        </span>
                        <input
                            type="text"
                            value={data.subdomain}
                            onChange={e => handleSubdomainChange(e.target.value)}
                            placeholder="e.g. highschool"
                            className="w-full px-4 py-3 text-sm sm:text-base font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none"
                            autoFocus
                        />
                        <span className="inline-flex items-center px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-bold border-l border-gray-300 dark:border-gray-600">
                            .krystal.school
                        </span>
                    </div>

                    {errors.subdomain && <p className="text-xs text-red-500 font-medium">{errors.subdomain}</p>}

                    {/* Live Preview Link */}
                    <div className="pt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>Your school address will be:</span>
                        <span className="font-bold text-[#0B1A30] dark:text-cyan-400 underline decoration-cyan-400 underline-offset-4">
                            https://{data.subdomain || 'highschool'}.krystal.school
                        </span>
                    </div>
                </div>
            </div>

            {data.school_name && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0B1A30] dark:text-cyan-400 shrink-0" />
                    <span>Configuring domain for <strong>{data.school_name}</strong>. You can change this site address anytime later from Settings.</span>
                </div>
            )}
        </div>
    );
}

// ── Step 3: Select Plan & Billing (Third Page) ────────────────────────────────

function StepPlan({
    data,
    setData,
    errors,
}: {
    data: FormData;
    setData: (k: string, v: string) => void;
    errors: Record<string, string>;
}) {
    return (
        <div className="space-y-7">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select a Plan & Billing Cycle</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose the package and billing cycle that best fits your school's needs.</p>
            </div>

            {/* Plan selection */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Package Plan
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pricingPlans.map(plan => {
                        const isSelected = data.plan === plan.id;
                        return (
                            <button
                                key={plan.id}
                                type="button"
                                onClick={() => setData('plan', plan.id)}
                                className={`relative text-left rounded-2xl border-2 p-5 transition-all ${
                                    isSelected
                                        ? 'border-[#0B1A30] dark:border-cyan-400 bg-[#0B1A30]/5 dark:bg-[#0B1A30]/30 shadow-md ring-1 ring-[#0B1A30]/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#0B1A30]/40'
                                }`}
                            >
                                {plan.badge && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0B1A30] dark:bg-cyan-500 text-white dark:text-[#0B1A30] text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                                        {plan.badge}
                                    </span>
                                )}
                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0B1A30] dark:bg-cyan-400 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white dark:text-[#0B1A30] stroke-[3]" />
                                    </div>
                                )}
                                <p className="font-bold text-gray-900 dark:text-white text-base">{plan.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">{plan.tagline}</p>
                                {plan.price ? (
                                    <p className="text-lg font-bold text-[#0B1A30] dark:text-cyan-400">
                                        {plan.price} <span className="text-xs text-gray-400 dark:text-gray-400 font-normal">/ student / term</span>
                                    </p>
                                ) : (
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact us</p>
                                )}
                                <ul className="mt-3 space-y-1.5">
                                    {plan.features.filter(f => f.included).slice(0, 3).map(f => (
                                        <li key={f.text} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                            <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                            <span>{f.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        );
                    })}
                </div>
                {errors.plan && <p className="text-sm text-red-500 font-medium mt-1.5">{errors.plan}</p>}
            </div>

            {/* Billing Cycle */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Billing Cycle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                    {BILLING_CYCLES.map(cycle => {
                        const isSelected = data.billing_cycle === cycle.value;
                        return (
                            <button
                                key={cycle.value}
                                type="button"
                                onClick={() => setData('billing_cycle', cycle.value)}
                                className={`text-left flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all ${
                                    isSelected
                                        ? 'border-[#0B1A30] dark:border-cyan-400 bg-[#0B1A30]/5 dark:bg-[#0B1A30]/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#0B1A30]/30'
                                }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    isSelected ? 'border-[#0B1A30] dark:border-cyan-400' : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-[#0B1A30] dark:bg-cyan-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{cycle.label}</p>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{cycle.desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                {errors.billing_cycle && <p className="text-sm text-red-500 font-medium mt-1.5">{errors.billing_cycle}</p>}
            </div>
        </div>
    );
}

// ── Step 4: Payment Method (Fourth Page) ──────────────────────────────────────

function StepPaymentMethod({
    data,
    setData,
    errors,
}: {
    data: FormData;
    setData: (k: string, v: string) => void;
    errors: Record<string, string>;
}) {
    const plan = pricingPlans.find(p => p.id === data.plan);
    const studentCount = parseInt(data.student_count || '0', 10);
    const rate = plan?.price ? parseInt(plan.price.replace(/[^\d]/g, ''), 10) : 0;
    const estimatedTotal = rate * (studentCount || 100);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select how your school subscription will be activated and billed.</p>
            </div>

            {/* Payment Method Options */}
            <div className="space-y-3.5">
                {PAYMENT_METHODS.map(method => {
                    const isSelected = data.payment_method === method.id;
                    const Icon = method.icon;

                    return (
                        <div
                            key={method.id}
                            onClick={() => setData('payment_method', method.id)}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                                isSelected
                                    ? 'border-[#0B1A30] dark:border-cyan-400 bg-[#0B1A30]/5 dark:bg-[#0B1A30]/20 shadow-sm'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#0B1A30]/30'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                    isSelected ? 'border-[#0B1A30] dark:border-cyan-400' : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0B1A30] dark:bg-cyan-400" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <p className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-[#0B1A30] dark:text-cyan-400" />
                                            {method.title}
                                        </p>
                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${method.badgeColor}`}>
                                            {method.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        {method.desc}
                                    </p>

                                    {/* Bank Details sub-box when Bank Transfer is selected */}
                                    {isSelected && method.id === 'bank_transfer' && (
                                        <div className="mt-3.5 p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-blue-200 dark:border-gray-700 text-xs space-y-1.5">
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">Bank Transfer Details:</p>
                                            <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                                                <div>Bank: <span className="font-bold text-gray-900 dark:text-white">Zenith Bank Plc</span></div>
                                                <div>Account: <span className="font-bold text-gray-900 dark:text-white">1018920192</span></div>
                                                <div className="col-span-2">Account Name: <span className="font-bold text-gray-900 dark:text-white">Krystal Education Technologies Ltd</span></div>
                                                <div className="col-span-2 text-gray-500">Narration: Use school name ({data.school_name || 'your-school'})</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Live Payment Method Selected Alert */}
            {data.payment_method && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm shadow-xs animate-in fade-in duration-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                        <span className="font-bold">Payment Method Verified: </span>
                        <span>
                            <strong>{PAYMENT_METHODS.find(m => m.id === data.payment_method)?.title}</strong> is active and ready for {data.school_name || 'your school'}.
                        </span>
                    </div>
                </div>
            )}

            {errors.payment_method && <p className="text-sm text-red-500 font-medium">{errors.payment_method}</p>}

            {/* Estimated Plan Total */}
            {plan?.price && (
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Estimated Subscription</p>
                    <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                            <span>Selected Plan</span>
                            <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Students</span>
                            <span className="font-medium text-gray-900 dark:text-white">{studentCount || '100 (Sample)'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Rate</span>
                            <span className="font-medium text-gray-900 dark:text-white">{plan.price} / student / term</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">
                            <span>Total per term</span>
                            <span className="text-[#0B1A30] dark:text-cyan-400 text-base">
                                ₦{estimatedTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Step 5: Review Order (Fifth Page) ─────────────────────────────────────────

function StepReview({ data }: { data: FormData }) {
    const plan = pricingPlans.find(p => p.id === data.plan);
    const schoolType = SCHOOL_TYPES.find(t => t.value === data.school_type);
    const billing = BILLING_CYCLES.find(b => b.value === data.billing_cycle);
    const payment = PAYMENT_METHODS.find(m => m.id === data.payment_method);

    const rows: [string, string][] = [
        ['School Name',    data.school_name],
        ['Domain URL',     `https://${data.subdomain || 'school'}.krystal.school`],
        ['School Type',    schoolType?.label ?? data.school_type],
        ['Selected Plan',  plan?.name ?? data.plan],
        ['Billing Cycle',  billing?.label ?? data.billing_cycle],
        ['Payment Method', payment?.title ?? data.payment_method],
        ['Student Count',  data.student_count || '—'],
        ['Phone',          data.phone || '—'],
        ['Address',        [data.address, data.city, data.state].filter(Boolean).join(', ') || '—'],
    ];

    const studentCount = parseInt(data.student_count || '0', 10);
    const rate = plan?.price ? parseInt(plan.price.replace(/[^\d]/g, ''), 10) : 0;
    const estimatedTotal = rate * (studentCount || 100);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Your Order</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please check your school information, domain, and chosen plan before confirming.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
                {rows.map(([label, value], i) => (
                    <div key={label} className={`flex items-start justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-gray-50/60 dark:bg-gray-800/40' : 'bg-white dark:bg-gray-800'}`}>
                        <span className="text-gray-500 dark:text-gray-400 font-medium w-36 shrink-0">{label}</span>
                        <span className="text-gray-900 dark:text-white font-semibold text-right">{value}</span>
                    </div>
                ))}
            </div>

            {plan?.price && (
                <div className="bg-[#0B1A30]/5 dark:bg-[#0B1A30]/20 border border-[#0B1A30]/20 dark:border-cyan-500/30 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-[#0B1A30] dark:text-cyan-400 mb-1">Estimated subscription per term</p>
                    <p className="text-2xl font-bold text-[#0B1A30] dark:text-cyan-400">
                        ₦{estimatedTotal.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on {studentCount || 100} students × {plan.price}</p>
                </div>
            )}
        </div>
    );
}

// ── Step 6: Confirmation ──────────────────────────────────────────────────────

function StepConfirmation({
    name,
    subdomain,
    paymentMethod,
    planName,
    schoolName,
}: {
    name: string;
    subdomain: string;
    paymentMethod: string;
    planName: string;
    schoolName: string;
}) {
    const portalUrl = `https://${subdomain || 'school'}.krystal.school`;
    const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod)?.title || 'Direct Bank Transfer';

    return (
        <div className="py-6 space-y-6 max-w-lg mx-auto text-center">
            {/* Payment Method Success Badge */}
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                <BadgeCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            </div>

            <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Payment Method Successful & Verified
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    You're All Set, {name.split(' ')[0]}!
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Your school has been registered and your subscription payment method has been verified.
                </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 bg-emerald-50/60 dark:bg-gray-800 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-emerald-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Payment Status:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Confirmed & Active
                    </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedMethod}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">School Name:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{schoolName || 'Your School'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Selected Plan:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{planName}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500 dark:text-gray-400">School Portal URL:</span>
                    <span className="font-bold text-[#0B1A30] dark:text-cyan-400">{portalUrl}</span>
                </div>
            </div>

            <div className="pt-2">
                <a
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1A30] hover:bg-[#142B54] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#0B1A30]/20 hover:scale-[1.02]"
                >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CreateOrganisation() {
    const { auth } = usePage<SharedData>().props;
    const [step, setStep] = useState(1);
    const [subdomainManuallyEdited, setSubdomainManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm<FormData>({
        school_name:    '',
        subdomain:      '',
        school_type:    '',
        plan:           'standard',
        billing_cycle:  'termly',
        payment_method: 'card',
        address:        '',
        city:           '',
        state:          '',
        phone:          '',
        website:        '',
        student_count:  '',
    });

    const setField = (key: string, value: string) => setData(key as keyof FormData, value);

    const handleSchoolNameChange = (name: string) => {
        setData('school_name', name);
        if (!subdomainManuallyEdited) {
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setData('subdomain', slug);
        }
    };

    const canNext = (): boolean => {
        if (step === 1) return !!data.school_name && !!data.school_type;
        if (step === 2) return !!data.subdomain;
        if (step === 3) return !!data.plan && !!data.billing_cycle;
        if (step === 4) return !!data.payment_method;
        return true;
    };

    const handleNext = () => {
        if (step < 5) {
            setStep(s => s + 1);
            return;
        }
        // Step 5 (Review Order) → submit
        post(route('organisation.store'), {
            onSuccess: () => setStep(6),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Homepage', href: '/dashboard' }, { title: 'CREATE ORGANISATION', href: '/organisation/create' }]}>
            <Head title="Create New Organisation" />

            <div className="min-h-full py-8 px-4 sm:px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                    {/* Heading */}
                    {step <= 5 && (
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Create New Organisation
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
                                Set up your school on Krystal in just a few steps.
                            </p>
                        </div>
                    )}

                    {/* Step indicator */}
                    {step <= 5 && <StepIndicator current={step} />}

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
                        {step === 1 && (
                            <StepSchoolInfo
                                data={data}
                                setData={setField}
                                errors={errors}
                                onSchoolNameChange={handleSchoolNameChange}
                            />
                        )}
                        {step === 2 && (
                            <StepDomainName
                                data={data}
                                setData={setField}
                                errors={errors}
                            />
                        )}
                        {step === 3 && (
                            <StepPlan
                                data={data}
                                setData={setField}
                                errors={errors}
                            />
                        )}
                        {step === 4 && (
                            <StepPaymentMethod
                                data={data}
                                setData={setField}
                                errors={errors}
                            />
                        )}
                        {step === 5 && <StepReview data={data} />}
                        {step === 6 && (
                            <StepConfirmation
                                name={auth.user.name}
                                subdomain={data.subdomain}
                                paymentMethod={data.payment_method}
                                planName={pricingPlans.find(p => p.id === data.plan)?.name || data.plan}
                                schoolName={data.school_name}
                            />
                        )}

                        {/* Navigation */}
                        {step <= 5 && (
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setStep(s => s - 1)}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>

                                <div className="flex items-center gap-2">
                                    {STEPS.map(s => (
                                        <div
                                            key={s.id}
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                step === s.id ? 'bg-[#0B1A30] dark:bg-cyan-400 ring-2 ring-[#0B1A30]/30' :
                                                step > s.id ? 'bg-[#0B1A30]/50 dark:bg-cyan-400/50' :
                                                'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!canNext() || processing}
                                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#0B1A30] hover:bg-[#142B54] rounded-xl transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-sm"
                                >
                                    {processing ? 'Saving…' : step === 5 ? 'Confirm & Create' : 'Proceed'}
                                    {!processing && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
