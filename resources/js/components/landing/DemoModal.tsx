import axios from 'axios';
import { CheckCircle2, GraduationCap, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    full_name: string;
    school_name: string;
    email: string;
    phone: string;
    school_type: string;
    student_count: string;
    message: string;
}

interface FormErrors {
    full_name?: string;
    school_name?: string;
    email?: string;
    phone?: string;
    school_type?: string;
    student_count?: string;
    message?: string;
    general?: string;
}

const initialData: FormData = {
    full_name: '',
    school_name: '',
    email: '',
    phone: '',
    school_type: '',
    student_count: '',
    message: '',
};

const schoolTypes = [
    'Primary School',
    'Secondary School',
    'Primary & Secondary School',
    'Nursery & Primary School',
    'Nursery, Primary & Secondary School',
    'University / Tertiary',
    'Vocational / Technical School',
    'Other',
];

const studentCounts = [
    'Under 100',
    '100 – 300',
    '300 – 500',
    '500 – 1,000',
    '1,000 – 2,000',
    'Over 2,000',
];

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
    return /^[+\d\s\-()]{7,20}$/.test(phone.trim());
}

function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.full_name.trim()) errors.full_name = 'Please enter your full name.';
    if (!data.school_name.trim()) errors.school_name = 'Please enter your school name.';
    if (!data.email.trim()) {
        errors.email = 'Please enter your email address.';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!data.phone.trim()) {
        errors.phone = 'Please enter your phone number.';
    } else if (!validatePhone(data.phone)) {
        errors.phone = 'Please enter a valid phone number.';
    }
    if (!data.school_type) errors.school_type = 'Please select your school type.';
    return errors;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const firstInputRef = useRef<HTMLInputElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus management
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => firstInputRef.current?.focus(), 100);
        } else {
            // Reset form when closed
            setTimeout(() => {
                setFormData(initialData);
                setErrors({});
                setStatus('idle');
            }, 300);
        }
    }, [isOpen]);

    // ESC key to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (!isOpen) return;
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const trap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', trap);
        return () => document.removeEventListener('keydown', trap);
    }, [isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'submitting') return;

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Focus first error
            const firstErrorKey = Object.keys(validationErrors)[0] as keyof FormErrors;
            const el = document.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`);
            el?.focus();
            return;
        }

        setStatus('submitting');
        setErrors({});

        try {
            await axios.post('/demo-request', formData, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });
            setStatus('success');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
                    // Laravel validation errors
                    const laravelErrors = err.response.data?.errors as Record<string, string[]>;
                    const mapped: FormErrors = {};
                    if (laravelErrors) {
                        Object.keys(laravelErrors).forEach(key => {
                            (mapped as Record<string, string>)[key] = laravelErrors[key][0];
                        });
                    }
                    setErrors(mapped);
                    setStatus('idle');
                } else if (err.response?.status === 429) {
                    setErrors({ general: 'Too many requests. Please wait a moment before trying again.' });
                    setStatus('error');
                } else {
                    setErrors({ general: err.response?.data?.message || 'Something went wrong. Please try again.' });
                    setStatus('error');
                }
            } else {
                setErrors({ general: 'A network error occurred. Please check your connection and try again.' });
                setStatus('error');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-fade-in"
            >
                {/* Header */}
                <div className="bg-[#6B1F2B] px-6 py-5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 id="modal-title" className="text-white font-bold text-base">Request a Demo</h2>
                            <p className="text-white/70 text-xs">Krystal School Management System</p>
                        </div>
                    </div>
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Close demo request form"
                        className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1">
                    {status === 'success' ? (
                        /* Success state */
                        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                                <CheckCircle2 className="w-8 h-8 text-green-600" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Request Received!</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Thank you! Your demo request has been received. Our team will be in touch shortly to schedule your walkthrough.
                            </p>
                            <button
                                onClick={onClose}
                                className="btn-oxblood px-6 py-3 text-sm font-semibold rounded-xl"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-label="Demo request form"
                            className="px-6 py-6 space-y-5"
                        >
                            {/* General error */}
                            {(status === 'error' || errors.general) && (
                                <div
                                    role="alert"
                                    className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                                >
                                    {errors.general || 'Something went wrong. Please try again.'}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        ref={firstInputRef}
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.full_name}
                                        aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                                        placeholder="e.g. Adaeze Nwosu"
                                        className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors ${
                                            errors.full_name
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30'
                                        }`}
                                    />
                                    {errors.full_name && (
                                        <p id="full_name-error" role="alert" className="mt-1 text-xs text-red-600">
                                            {errors.full_name}
                                        </p>
                                    )}
                                </div>

                                {/* School Name */}
                                <div>
                                    <label htmlFor="school_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        School Name <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="school_name"
                                        name="school_name"
                                        value={formData.school_name}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.school_name}
                                        aria-describedby={errors.school_name ? 'school_name-error' : undefined}
                                        placeholder="e.g. Greenfield Academy"
                                        className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors ${
                                            errors.school_name
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30'
                                        }`}
                                    />
                                    {errors.school_name && (
                                        <p id="school_name-error" role="alert" className="mt-1 text-xs text-red-600">
                                            {errors.school_name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        placeholder="you@school.com"
                                        className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors ${
                                            errors.email
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30'
                                        }`}
                                    />
                                    {errors.email && (
                                        <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                        placeholder="e.g. 08012345678"
                                        className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors ${
                                            errors.phone
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30'
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* School Type */}
                                <div>
                                    <label htmlFor="school_type" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        School Type <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <select
                                        id="school_type"
                                        name="school_type"
                                        value={formData.school_type}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.school_type}
                                        aria-describedby={errors.school_type ? 'school_type-error' : undefined}
                                        className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors bg-white ${
                                            errors.school_type
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30'
                                        }`}
                                    >
                                        <option value="">Select school type</option>
                                        {schoolTypes.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    {errors.school_type && (
                                        <p id="school_type-error" role="alert" className="mt-1 text-xs text-red-600">
                                            {errors.school_type}
                                        </p>
                                    )}
                                </div>

                                {/* Student Count */}
                                <div>
                                    <label htmlFor="student_count" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Number of Students
                                        <span className="ml-1 text-xs text-gray-400">(Optional)</span>
                                    </label>
                                    <select
                                        id="student_count"
                                        name="student_count"
                                        value={formData.student_count}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30 bg-white transition-colors"
                                    >
                                        <option value="">Select approximate count</option>
                                        {studentCounts.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Message
                                    <span className="ml-1 text-xs text-gray-400">(Optional)</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us a bit about your school and what you're hoping to achieve..."
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#6B1F2B] focus:ring-1 focus:ring-[#6B1F2B]/30 transition-colors resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full btn-oxblood flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                aria-busy={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                        Submitting…
                                    </>
                                ) : (
                                    'Request Demo'
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400">
                                By submitting this form, you agree to be contacted by the Krystal team regarding your demo request.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
