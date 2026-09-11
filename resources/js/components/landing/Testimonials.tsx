import { Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/testimonials';

// [PLACEHOLDER CONTENT] — replace with real Krystal customer testimonials before going live.

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
}

export default function Testimonials() {
    const { ref, visible } = useScrollReveal();

    return (
        <section
            id="testimonials"
            aria-labelledby="testimonials-heading"
            className="py-20 lg:py-28 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#6B1F2B] text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                        <Quote className="w-4 h-4" aria-hidden="true" />
                        Testimonials
                    </div>
                    <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Loved by School Leaders
                    </h2>
                    <p className="text-sm text-gray-400 mt-3">
                        * These are placeholder testimonials for development purposes.
                    </p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {testimonials.map((t, i) => (
                        <figure
                            key={t.id}
                            className={`bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover reveal ${visible ? 'revealed' : ''}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="text-[#6B1F2B]/20 mb-4">
                                <Quote className="w-8 h-8 fill-current" aria-hidden="true" />
                            </div>
                            <blockquote>
                                <p className="text-gray-700 leading-relaxed text-sm mb-6">
                                    "{t.quote}"
                                </p>
                            </blockquote>
                            <figcaption className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                    <p className="text-xs text-gray-400">{t.school}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
