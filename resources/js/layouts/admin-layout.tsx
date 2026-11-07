import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ChevronRight,
    FileText,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
} from 'lucide-react';

const navItems = [
    { label: 'Overview',      href: '/admin',              icon: LayoutDashboard },
    { label: 'Users',         href: '/admin/users',        icon: Users },
    { label: 'Demo Requests', href: '/admin/demo-requests',icon: FileText },
    { label: 'Activity Log',  href: '/admin/activity-log', icon: Activity },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default function AdminLayout({ children, breadcrumbs = [], title }: AdminLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#1a0a0e] text-white shrink-0">
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-[#6B1F2B] flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold tracking-tight leading-tight">KRYSTAL</p>
                        <p className="text-[10px] text-white/40 leading-tight">Admin Panel</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const active = url === href || (href !== '/admin' && url.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    active
                                        ? 'bg-[#6B1F2B] text-white'
                                        : 'text-white/60 hover:text-white hover:bg-white/8'
                                }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer links */}
                <div className="px-3 pb-4 space-y-0.5 border-t border-white/10 pt-3">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors"
                    >
                        <Settings className="w-4 h-4 shrink-0" />
                        User Dashboard
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-4 shrink-0">
                    {/* Mobile brand */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="w-7 h-7 rounded-lg bg-[#6B1F2B] flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[#6B1F2B] text-sm">KRYSTAL Admin</span>
                    </div>

                    {/* Breadcrumbs */}
                    {breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-1.5 text-sm text-gray-500">
                            <Link href="/admin" className="hover:text-[#6B1F2B] transition-colors">Admin</Link>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={crumb.href} className="flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5" />
                                    {i === breadcrumbs.length - 1 ? (
                                        <span className="text-gray-900 font-medium">{crumb.title}</span>
                                    ) : (
                                        <Link href={crumb.href} className="hover:text-[#6B1F2B] transition-colors">{crumb.title}</Link>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}

                    {title && (
                        <h1 className="text-base font-semibold text-gray-900 lg:hidden ml-auto">{title}</h1>
                    )}
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
