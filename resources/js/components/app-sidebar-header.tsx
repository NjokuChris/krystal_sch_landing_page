import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Home } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const currentPage = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].title : 'DASHBOARD';

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 md:px-6 shadow-xs">
            {/* Left: Sidebar toggle + Home breadcrumb */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                <div className="flex items-center gap-2 text-sm">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <Home className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-xs sm:text-sm">Homepage</span>
                    </Link>
                    <span className="text-gray-400 dark:text-gray-500 font-bold text-xs sm:text-sm">»</span>
                    <span className="font-bold uppercase tracking-wide text-gray-900 dark:text-white text-xs sm:text-sm">
                        {currentPage}
                    </span>
                </div>
            </div>

            {/* Right: Add an Organisation button + Dept: ₦0 + Avatar */}
            <div className="flex items-center gap-3 sm:gap-5">
                <Link
                    href="/organisation/create"
                    className="inline-flex items-center justify-center px-4 py-2 bg-[#0B1A30] hover:bg-[#142B54] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
                >
                    Add an Organisation
                </Link>

                <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Dept: <span className="font-bold text-gray-900 dark:text-white">₦0</span>
                </div>

                {auth.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all flex items-center justify-center overflow-hidden cursor-pointer"
                            >
                                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xs">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
