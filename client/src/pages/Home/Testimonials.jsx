const testimonials = [
    {
        id: 1,
        name: "Aarav Sharma",
        role: "Content Writer",
        company: "Freelancer",
        avatar:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400",
        quote:
            "Publishing my articles here has been an amazing experience. The editor is smooth, and the blogs get great visibility. I’ve grown my audience much faster than I expected!",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Verma",
        role: "Travel Blogger",
        company: "Wanderlust Diaries",
        avatar:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
        quote:
            "I love how beautifully my stories are presented. The clean design makes my posts enjoyable to read, and the community engagement is just awesome!",
        rating: 5,
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Tech Enthusiast",
        company: "GadgetSphere",
        avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400",
        quote:
            "This blog platform made it so easy to share my reviews and tutorials. The SEO features helped me rank higher on Google, which boosted my readers significantly.",
        rating: 4,
    },
    {
        id: 4,
        name: "Ananya Patel",
        role: "Food Blogger",
        company: "Flavors of India",
        avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
        quote:
            "I’ve tried other blogging platforms before, but this one stands out. The layout is elegant, images look stunning, and my readers keep complimenting the design!",
        rating: 5,
    },
    {
        id: 5,
        name: "Karan Malhotra",
        role: "Student Blogger",
        company: "Campus Life Diaries",
        avatar:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400",
        quote:
            "As a beginner, I was nervous about blogging, but this site made it effortless. The interface is beginner-friendly, and I’ve connected with so many like-minded readers.",
        rating: 4,
    },
    {
        id: 6,
        name: "Riya Sen",
        role: "Lifestyle Blogger",
        company: "Everyday Inspirations",
        avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400",
        quote:
            "I absolutely love this blogging site! It’s simple, fast, and my blogs look professional without me having to worry about design. Highly recommended for anyone who loves writing!",
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
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-[#6438C0] hover:scale-[1.01] transition-all duration-300 ease-in-out">
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
        <section id="testimonials" className="bg-gray-100 pb-20">
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
