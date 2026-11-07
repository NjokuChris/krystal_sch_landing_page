export interface PricingFeature {
    text: string;
    included: boolean;
}

export interface PricingPlan {
    id: string;
    name: string;
    tagline: string;
    description: string;
    price: null | string; // [PLACEHOLDER] Real pricing to be confirmed
    cta: string;
    ctaVariant: 'oxblood' | 'blue' | 'outline';
    highlighted: boolean;
    badge?: string;
    features: PricingFeature[];
}

export const pricingPlans: PricingPlan[] = [
    {
        id: 'standard',
        name: 'Standard',
        tagline: 'For smaller schools',
        description:
            'A focused set of tools to help smaller schools take their first step into organised digital management.',
        price: '₦500',
        cta: 'Talk to Us',
        ctaVariant: 'outline',
        highlighted: false,
        features: [
            { text: 'Student management', included: true },
            { text: 'Attendance tracking', included: true },
            { text: 'Basic fee management', included: true },
            { text: 'Staff management', included: true },
            { text: 'Communication & announcements', included: true },
            { text: 'Parent & student access', included: true },
            { text: 'Standard reports', included: true },
            { text: 'Examination & results', included: false },
            { text: 'Advanced analytics', included: false },
            { text: 'E-learning module', included: false },
            { text: 'Timetable management', included: false },
            { text: 'Library management', included: false },
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        tagline: 'For growing schools',
        description:
            'A more complete set of tools for schools that need broader management capabilities as they grow.',
        price: '₦1,000',
        cta: 'Request a Demo',
        ctaVariant: 'oxblood',
        highlighted: true,
        badge: 'Most Popular',
        features: [
            { text: 'Everything in Standard', included: true },
            { text: 'Examination & results', included: true },
            { text: 'Timetable management', included: true },
            { text: 'Library management', included: true },
            { text: 'E-learning module', included: true },
            { text: 'Advanced fee management', included: true },
            { text: 'Detailed analytics & reports', included: true },
            { text: 'Admissions management', included: true },
            { text: 'Multi-class & multi-term support', included: true },
            { text: 'Priority support', included: false },
            { text: 'Custom integrations', included: false },
            { text: 'Dedicated account manager', included: false },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'For larger institutions',
        description:
            'Comprehensive features and dedicated support for larger schools and multi-branch institutions.',
        price: null,
        cta: 'Contact Sales',
        ctaVariant: 'blue',
        highlighted: false,
        features: [
            { text: 'Everything in Premium', included: true },
            { text: 'Multi-branch support', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: 'Priority support', included: true },
            { text: 'Custom integrations', included: true },
            { text: 'Advanced security controls', included: true },
            { text: 'Custom reporting', included: true },
            { text: 'Bulk data import & export', included: true },
            { text: 'API access', included: true },
            { text: 'Training & onboarding support', included: true },
            { text: 'SLA agreement', included: true },
            { text: 'Custom module configuration', included: true },
        ],
    },
];
