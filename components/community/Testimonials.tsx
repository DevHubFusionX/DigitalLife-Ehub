"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Being part of this community has been a game-changer. The networking opportunities are invaluable, and I've found collaborators who genuinely uplift my business.",
            author: "Alex P.",
            role: "Consultant"
        },
        {
            quote: "The mentorship program offered clarity and accountability I desperately needed. My business has seen incredible growth since joining!",
            author: "Sarah M.",
            role: "Product Seller"
        },
        {
            quote: "The weekly visibility challenges pushed me out of my zone and dramatically increased my online presence. Highly recommend!",
            author: "David K.",
            role: "Content Creator"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
            <div className="container-custom px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mb-20">
                    <div className="max-w-xl">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 block mb-6">Voices of Our Community</span>
                        <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                            Transformative <br /> Success Stories.
                        </h2>
                    </div>
                    <div className="lg:pt-16">
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium border-l-4 border-accent pl-8">
                            Hear directly from entrepreneurs who have experienced the power of community and collaboration within DigitalLife Ehub.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.author}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-white rounded-2xl border border-border-subtle relative hover:shadow-xl transition-shadow duration-500"
                        >
                            <Quote size={40} className="text-accent/20 absolute top-8 right-8" />
                            <p className="text-lg text-primary/80 leading-relaxed mb-10 italic font-medium relative z-10">
                                &quot;{t.quote}&quot;
                            </p>
                            <div>
                                <h4 className="font-black text-primary text-xl">{t.author}</h4>
                                <p className="text-xs uppercase tracking-[0.2em] text-primary/40 font-bold">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
