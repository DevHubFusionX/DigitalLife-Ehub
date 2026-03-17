import React from "react";

const SITE_URL = "https://digitallife-ehub.com";

const JsonLd = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "DigitalLife Ehub",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        description:
            "DigitalLife Ehub is the premier growth community for SMEs, creators, and professionals. Access mentorship, business visibility tools, and exclusive founding member benefits.",
        sameAs: [],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            availableLanguage: ["English"],
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DigitalLife Ehub",
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What is DigitalLife Ehub?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "DigitalLife Ehub is a vibrant growth community empowering SMEs, creators, and professionals with mentorship, business visibility tools, and specialized networking circles to scale their businesses.",
                },
            },
            {
                "@type": "Question",
                name: "What are the benefits of being a founding member?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Founding members receive an exclusive badge, priority subgroup access, early mentorship slots, discounted pricing that will never be offered again, and special launch day visibility across all platforms.",
                },
            },
            {
                "@type": "Question",
                name: "What are Specialized Circles?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Specialized Circles are high-priority business groups tailored to your niche — including Service Providers, Product Sellers, Tech & Digital, Creative & Media, and Business & Startup circles for targeted networking and collaboration.",
                },
            },
            {
                "@type": "Question",
                name: "How does the mentorship program work?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our mentorship pairing system connects you with vetted, high-profile mentors. You can opt for group mentorship cohorts and attend masterclasses for professional growth, business clarity, and accountability.",
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
};

export default JsonLd;
