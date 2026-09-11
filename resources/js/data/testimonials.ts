export interface Testimonial {
    id: string;
    quote: string;
    name: string; // [PLACEHOLDER] Replace with real name when available
    role: string; // [PLACEHOLDER] Replace with real role when available
    school: string; // [PLACEHOLDER] Replace with real school when available
    initials: string;
    avatarColor: string;
}

// [PLACEHOLDER CONTENT]
// These testimonials are demo placeholders for development and design purposes.
// Replace with verified, consented testimonials from real Krystal customers before going live.
export const testimonials: Testimonial[] = [
    {
        id: 't1',
        quote:
            "Krystal has helped us bring different areas of our school's operations into one organised system. Managing student records, attendance, and fees is much more straightforward now.",
        name: 'A. Okonkwo', // [PLACEHOLDER]
        role: 'School Administrator', // [PLACEHOLDER]
        school: 'Premier Academy', // [PLACEHOLDER]
        initials: 'AO',
        avatarColor: 'bg-[#6B1F2B]',
    },
    {
        id: 't2',
        quote:
            "Having everything available in one place — results, attendance, fees, communication — makes it easier to stay on top of what's happening across the school. It saves us real time.",
        name: 'B. Adeyemi', // [PLACEHOLDER]
        role: 'School Proprietor', // [PLACEHOLDER]
        school: 'Sunlight Schools', // [PLACEHOLDER]
        initials: 'BA',
        avatarColor: 'bg-[#2563EB]',
    },
    {
        id: 't3',
        quote:
            "As a teacher, I appreciate being able to manage attendance and record results without the paperwork. Parents also get updates more easily, which improves how we communicate with families.",
        name: 'C. Ibrahim', // [PLACEHOLDER]
        role: 'Senior Teacher', // [PLACEHOLDER]
        school: 'Greenfield College', // [PLACEHOLDER]
        initials: 'CI',
        avatarColor: 'bg-teal-600',
    },
];
