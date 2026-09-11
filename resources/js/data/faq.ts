export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: FAQItem[] = [
    {
        id: 'what-is-krystal',
        question: 'What is Krystal School Management System?',
        answer:
            'Krystal is a centralised platform designed to help schools manage academic, administrative, financial, communication, and student-related activities from one organised system. It brings together the tools schools need to run their daily operations more efficiently.',
    },
    {
        id: 'who-can-use',
        question: 'Who can use Krystal?',
        answer:
            'Krystal is designed for everyone in a school community — school owners, administrators, teachers, parents, and students. Each user type has access to the tools and information most relevant to their role.',
    },
    {
        id: 'student-records',
        question: 'Can Krystal manage student records?',
        answer:
            'Yes. Krystal includes a dedicated Student Management module that lets you store and manage student profiles, academic records, attendance history, behaviour notes, documents, and more.',
    },
    {
        id: 'teachers',
        question: 'Can teachers use Krystal?',
        answer:
            'Yes. Teachers can use Krystal to manage attendance, track student performance, record assignments, communicate with parents and students, and access the tools they need for their classroom responsibilities.',
    },
    {
        id: 'parents',
        question: "Can parents access their children's information?",
        answer:
            'Yes. Through the appropriate parent access features, parents can view their child\'s academic performance, attendance records, fee status, assignments, results, and school announcements.',
    },
    {
        id: 'fees',
        question: 'Can Krystal manage school fees?',
        answer:
            'Yes. Krystal includes a Finance & Fees module that supports fee management, payment tracking, invoice generation, balance records, and financial reporting.',
    },
    {
        id: 'school-types',
        question: 'Is Krystal suitable for primary and secondary schools?',
        answer:
            'Krystal is designed to support different school types. To confirm which school categories are currently supported and any upcoming additions, we recommend requesting a demo so our team can walk you through the available options for your school.',
    },
    {
        id: 'demo',
        question: 'Can my school request a demo?',
        answer:
            'Absolutely. Click the "Request a Demo" button anywhere on this page to submit your details. Our team will reach out to schedule a walkthrough tailored to your school.',
    },
    {
        id: 'security',
        question: 'Is my school\'s information secure?',
        answer:
            'Krystal is designed with security, privacy, and controlled access in mind. The platform includes secure authentication, role-based access controls, and permission management to ensure that only authorised users can access the right information. We recommend speaking with our team for a full overview of the security architecture.',
    },
    {
        id: 'setup',
        question: 'How long does it take to set up Krystal for my school?',
        answer:
            "The setup process is guided by our team. After your demo, we will work with you to configure your school's academic structure, user accounts, and preferred modules. The time required depends on your school's size and specific requirements.",
    },
];
