import { BookOpen, GraduationCap, LayoutDashboard, Users, UsersRound, type LucideIcon } from 'lucide-react';

export interface SolutionBenefit {
    text: string;
}

export interface Solution {
    id: string;
    role: string;
    icon: LucideIcon;
    headline: string;
    description: string;
    benefits: SolutionBenefit[];
    color: string;
    accentColor: string;
}

export const solutions: Solution[] = [
    {
        id: 'owners',
        role: 'School Owners',
        icon: LayoutDashboard,
        headline: 'Complete visibility across your school',
        description:
            'Get a clear view of school performance, finances, academic outcomes, and daily operations without having to chase different departments for updates.',
        benefits: [
            { text: 'Overall school performance overview' },
            { text: 'Financial summaries and fee collection status' },
            { text: 'Academic performance tracking' },
            { text: 'Attendance at a glance' },
            { text: 'Staff and student statistics' },
            { text: 'Alerts and important notifications' },
        ],
        color: 'bg-red-50 border-red-100',
        accentColor: 'text-[#6B1F2B]',
    },
    {
        id: 'admins',
        role: 'Administrators',
        icon: UsersRound,
        headline: 'Manage daily operations with confidence',
        description:
            'Organise student and staff records, track school activities, manage communication, and generate reports — all from one central system.',
        benefits: [
            { text: 'Student and staff record management' },
            { text: 'Admissions and onboarding workflow' },
            { text: 'Attendance monitoring and reporting' },
            { text: 'Fee management and payment tracking' },
            { text: 'Timetable and scheduling tools' },
            { text: 'School-wide announcements and notices' },
        ],
        color: 'bg-blue-50 border-blue-100',
        accentColor: 'text-[#2563EB]',
    },
    {
        id: 'teachers',
        role: 'Teachers',
        icon: Users,
        headline: 'Focus on teaching, not paperwork',
        description:
            'Spend more time with students and less time on administrative tasks. Krystal gives teachers the tools they need to manage their classes effectively.',
        benefits: [
            { text: 'Quick attendance recording' },
            { text: 'Student performance tracking' },
            { text: 'Assignment creation and management' },
            { text: 'Result entry and grade management' },
            { text: 'Direct communication with parents' },
            { text: 'Access to class timetables and schedules' },
        ],
        color: 'bg-green-50 border-green-100',
        accentColor: 'text-green-700',
    },
    {
        id: 'parents',
        role: 'Parents',
        icon: BookOpen,
        headline: 'Stay informed about your child\'s progress',
        description:
            'Access your child\'s academic performance, attendance, fee status, and school announcements from one convenient place.',
        benefits: [
            { text: "Child's academic results and report cards" },
            { text: 'Attendance records and summaries' },
            { text: 'Fee status and payment history' },
            { text: 'Assignment updates and deadlines' },
            { text: 'School announcements and notices' },
            { text: 'School calendar and upcoming events' },
        ],
        color: 'bg-purple-50 border-purple-100',
        accentColor: 'text-purple-700',
    },
    {
        id: 'students',
        role: 'Students',
        icon: GraduationCap,
        headline: 'Everything you need for your studies',
        description:
            'Access your timetable, results, assignments, learning resources, and school information from one organised student portal.',
        benefits: [
            { text: 'View subjects and class timetable' },
            { text: 'Access assignments and deadlines' },
            { text: 'View results and report cards' },
            { text: 'Access learning resources and materials' },
            { text: 'Receive school announcements' },
            { text: 'Track academic progress over time' },
        ],
        color: 'bg-amber-50 border-amber-100',
        accentColor: 'text-amber-700',
    },
];

export const navItems = {
    features: [
        { label: 'Student Management', href: '#features' },
        { label: 'Admissions', href: '#features' },
        { label: 'Attendance', href: '#features' },
        { label: 'Academics', href: '#features' },
        { label: 'Examination & Results', href: '#features' },
        { label: 'Finance', href: '#features' },
        { label: 'Staff Management', href: '#features' },
        { label: 'Communication', href: '#features' },
        { label: 'Library', href: '#features' },
        { label: 'Timetable', href: '#features' },
        { label: 'E-Learning', href: '#features' },
        { label: 'Reports', href: '#features' },
    ],
    solutions: [
        { label: 'For School Owners', href: '#solutions' },
        { label: 'For Administrators', href: '#solutions' },
        { label: 'For Teachers', href: '#solutions' },
        { label: 'For Parents', href: '#solutions' },
        { label: 'For Students', href: '#solutions' },
    ],
};
