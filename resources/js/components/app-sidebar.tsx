import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    CreditCard,
    GraduationCap,
    History,
    LayoutGrid,
    LogOut,
    Settings,
    ShieldCheck,
} from 'lucide-react';

interface EducareNavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const page = usePage();

    const navItems: EducareNavItem[] = [
        {
            title: 'DASHBOARD',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'CREATE',
            url: '/organisation/create',
            icon: GraduationCap,
        },
        {
            title: 'HISTORY',
            url: '/history',
            icon: History,
        },
        {
            title: 'PAY BILLS',
            url: '/bills',
            icon: CreditCard,
        },
        {
            title: 'ACCOUNT',
            url: '/settings/profile',
            icon: Building2,
        },
        {
            title: 'SETTINGS',
            url: '/settings/appearance',
            icon: Settings,
        },
    ];

    if (auth.user?.is_admin) {
        navItems.push({
            title: 'ADMIN PANEL',
            url: '/admin',
            icon: ShieldCheck,
        });
    }

    const schoolName = auth.user?.organisation?.school_name || 'St Louis Nursery and Primary School';

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="bg-[#0B1A30] text-white border-r border-[#132B50]">
            {/* Header: Logo + School name */}
            <SidebarHeader className="bg-[#0B1A30] p-0 border-b border-[#142A50]">
                <div className="flex flex-col items-center justify-center pt-6 pb-5 px-4 text-center">
                    <Link href="/dashboard" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-md">
                            <div className="w-full h-full rounded-full bg-[#0B1A30] flex items-center justify-center group-hover:bg-[#132B50] transition-colors">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            krystal<span className="text-cyan-400">.</span>
                        </span>
                    </Link>

                    <p className="text-[11px] font-medium text-blue-200/90 mt-2.5 line-clamp-2 px-2 max-w-[200px]">
                        {schoolName}
                    </p>
                </div>
            </SidebarHeader>

            {/* Navigation links */}
            <SidebarContent className="bg-[#0B1A30] px-0 py-2">
                <nav className="flex-1 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            page.url === item.url ||
                            (item.url !== '/dashboard' && page.url.startsWith(item.url));

                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                prefetch
                                className={`flex items-center gap-3.5 py-3.5 pr-4 text-xs font-bold uppercase tracking-wider transition-all border-l-4 ${
                                    isActive
                                        ? 'bg-[#142B54] text-white border-cyan-400 pl-4 font-extrabold shadow-inner'
                                        : 'text-[#00D2D3] border-transparent pl-4 hover:bg-[#122648] hover:text-white'
                                }`}
                            >
                                <item.icon
                                    className={`w-4 h-4 shrink-0 transition-colors ${
                                        isActive ? 'text-cyan-300' : 'text-[#00D2D3]'
                                    }`}
                                />
                                <span className="truncate">{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SidebarContent>

            {/* Footer: Balance widget + User profile & logout */}
            <SidebarFooter className="bg-[#0B1A30] p-3 border-t border-[#142A50] space-y-3">
                <div className="rounded-lg bg-[#071228] border border-[#142A50] p-3 text-center shadow-inner">
                    <div className="text-[11px] font-medium text-blue-200/75 uppercase tracking-wide">
                        Current Balance
                    </div>
                    <div className="text-lg font-extrabold text-cyan-400 mt-0.5">
                        ₦0
                    </div>
                </div>

                {/* Bottom User info & Logout */}
                <div className="flex items-center justify-between pt-1 px-1">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-blue-100 truncate max-w-[130px]">
                            {auth.user.name}
                        </span>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-blue-300 hover:text-white transition-colors p-1"
                        title="Log out"
                    >
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
