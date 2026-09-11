import {
    BarChart3,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    GraduationCap,
    MessageSquare,
    MonitorPlay,
    Users,
    UserPlus,
    UsersRound,
    Wallet,
    type LucideIcon,
} from 'lucide-react';

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string; // Tailwind bg class for icon background
    iconColor: string; // Tailwind text class for icon
}

export const features: Feature[] = [
    {
        id: 'students',
        title: 'Student Management',
        description:
            'Manage student profiles, academic records, attendance, behaviour, documents, and more — all from one organised place.',
        icon: Users,
        color: 'bg-red-50',
        iconColor: 'text-[#6B1F2B]',
    },
    {
        id: 'admissions',
        title: 'Admissions',
        description:
            'Handle enquiries, applications, onboarding, and applicant information efficiently from initial contact to full enrolment.',
        icon: UserPlus,
        color: 'bg-blue-50',
        iconColor: 'text-[#2563EB]',
    },
    {
        id: 'attendance',
        title: 'Attendance Management',
        description:
            'Track student and staff attendance with accurate daily records, insightful summaries, and clear reporting.',
        icon: ClipboardCheck,
        color: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        id: 'exams',
        title: 'Examination & Results',
        description:
            'Create assessments, manage examinations, compute results, generate report cards, and track academic performance over time.',
        icon: GraduationCap,
        color: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        id: 'finance',
        title: 'Finance & Fees',
        description:
            'Manage school fees, payments, invoices, expenses, outstanding balances, and financial records in one place.',
        icon: Wallet,
        color: 'bg-amber-50',
        iconColor: 'text-amber-600',
    },
    {
        id: 'staff',
        title: 'Staff Management',
        description:
            'Maintain teacher and staff profiles, roles, attendance, payroll-related information, and administrative records.',
        icon: UsersRound,
        color: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
    },
    {
        id: 'timetable',
        title: 'Timetable Management',
        description:
            'Create and manage class schedules, subjects, teachers, rooms, and academic periods without the usual complexity.',
        icon: CalendarDays,
        color: 'bg-teal-50',
        iconColor: 'text-teal-600',
    },
    {
        id: 'communication',
        title: 'Communication',
        description:
            'Keep administrators, teachers, parents, and students connected through announcements, notices, and messaging.',
        icon: MessageSquare,
        color: 'bg-sky-50',
        iconColor: 'text-sky-600',
    },
    {
        id: 'library',
        title: 'Library Management',
        description:
            'Manage books, borrowing, returns, student records, and library resources with an organised, easy-to-use system.',
        icon: BookOpen,
        color: 'bg-orange-50',
        iconColor: 'text-orange-600',
    },
    {
        id: 'elearning',
        title: 'E-Learning',
        description:
            'Support digital learning with assignments, learning materials, and online engagement for students and teachers.',
        icon: MonitorPlay,
        color: 'bg-pink-50',
        iconColor: 'text-pink-600',
    },
    {
        id: 'reports',
        title: 'Reports & Analytics',
        description:
            "Turn your school's data into meaningful reports and actionable insights to support better decision-making.",
        icon: BarChart3,
        color: 'bg-red-50',
        iconColor: 'text-[#6B1F2B]',
    },
    {
        id: 'portal',
        title: 'Parent & Student Portal',
        description:
            'Give parents and students easy, organised access to important academic information, results, fees, and school updates.',
        icon: Users,
        color: 'bg-blue-50',
        iconColor: 'text-[#2563EB]',
    },
];
