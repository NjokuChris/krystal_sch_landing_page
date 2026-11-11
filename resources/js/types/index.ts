import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash?: {
        status?: string | null;
        payment_success?: boolean | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    organisation?: {
        id: number;
        school_name: string;
        subdomain?: string | null;
        payment_method?: string | null;
        school_type: string;
        plan: string;
        billing_cycle: string;
        status: string;
        student_count?: number | null;
    } | null;
    [key: string]: unknown;
}
