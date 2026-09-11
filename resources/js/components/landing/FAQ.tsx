import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { faqItems } from '@/data/faq';

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
}

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    id: string;
}

function FAQAccordionItem({ question, answer, isOpen, onToggle, id }: FAQItemProps) {
    const contentId = `faq-content-${id}`;
    const buttonId = `faq-button-${id}`;

    return (
        <div className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-[#6B1F2B]/30 bg-red-50/30' : 'border-gray-200 bg-white'}`}>
            <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={onToggle}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
            >
                <span className={`text-sm sm:text-base font-semibold leading-relaxed ${isOpen ? 'text-[#6B1F2B]' : 'text-gray-900'}`}>
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 shrink-0 mt-0.5 transition-transform duration-250 ${isOpen ? 'rotate-180 text-[#6B1F2B]' : 'text-gray-400'}`}
                    aria-hidden="true"
                />
            </button>
            <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-all duration-250 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
}

interface FAQProps {
    onDemoClick: () => void;
}

export default function FAQ({ onDemoClick }: FAQProps) {
    const [openId, setOpenId] = useState<string | null>(faqItems[0].id);
    const { ref, visible } = useScrollReveal();

    const toggle = (id: string) => {
        setOpenId(prev => prev === id ? null : id);
    };

    return (
        <section
            id="faq"
            aria-labelledby="faq-heading"
            className="py-20 lg:py-28 bg-white"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#6B1F2B] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        Frequently Asked Questions
                    </div>
                    <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        Questions? We Have Answers.
                    </h2>
                    <p className="text-lg text-gray-600">
                        If you don't find what you're looking for, reach out to our team.
                    </p>
                </div>

                <div
                    ref={ref}
                    className={`space-y-3 reveal ${visible ? 'revealed' : ''}`}
                >
                    {faqItems.map((item) => (
                        <FAQAccordionItem
                            key={item.id}
                            id={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openId === item.id}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <button
                        onClick={onDemoClick}
                        className="btn-oxblood inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl"
                    >
                        Talk to Our Team
                    </button>
                </div>
            </div>
        </section>
    );
}
