const testimonials = [
    {
        id: 1,
        name: "Aarav Sharma",
        role: "Product Manager",
        company: "TechNova",
        avatar:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400",
        quote:
            "This platform drastically improved our workflow. The UI is clean and the DX is top-notch!",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Verma",
        role: "Frontend Developer",
        company: "CodeWorks",
        avatar:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
        quote:
            "Exactly what we needed — fast, reliable, and developer-friendly. Highly recommended!",
        rating: 5,
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "CTO",
        company: "StackForge",
        avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400",
        quote:
            "Great documentation and superb support. Shipping features is so much faster now.",
        rating: 4,
    },
    {
        id: 4,
        name: "Ananya Patel",
        role: "Software Engineer",
        company: "DevStudio",
        avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
        quote:
            "The platform is seamless and makes collaboration across teams incredibly easy. A must-have tool!",
        rating: 5,
    },
    {
        id: 5,
        name: "Karan Malhotra",
        role: "Backend Developer",
        company: "CloudMatrix",
        avatar:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400",
        quote:
            "The performance improvements and developer experience are unmatched. Fantastic support team too!",
        rating: 4,
    },
    {
        id: 6,
        name: "Riya Sen",
        role: "Product Designer",
        company: "PixelCraft",
        avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400",
        quote:
            "I love how intuitive and user-friendly this platform is. It helped us create beautiful experiences!",
        rating: 5,
    },
];

const Stars = ({ rating = 0 }) => {
    return (
        <div className="flex gap-0.5 text-yellow-400" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-none stroke-current"
                        }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.95 13.9a1 1 0 00-1.175 0l-2.335 1.682c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.804 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                    />
                </svg>
            ))}
        </div>
    );
};

const TestimonialCard = ({ t }) => {
    return (
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
            <div className="flex items-center gap-4">
                <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full ring-2 ring-gray-100 object-cover"
                />
                <div>
                    <h4 className="text-base font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">
                        {t.role}
                        {t.company ? ` • ${t.company}` : ""}
                    </p>
                    {/* Stars moved here */}
                    <div className="mt-1">
                        <Stars rating={t.rating} />
                    </div>
                </div>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">“{t.quote}”</p>
        </article>
    );
};

const Testimonials = () => {
    return (
        <section id="testimonials" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Testimonials
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <TestimonialCard key={t.id} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
