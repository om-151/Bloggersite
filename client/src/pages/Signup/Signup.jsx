import { useState } from "react";

export default function SignupPage() {
    const [form, setForm] = useState({ fullname: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.fullname) e.fullname = "Full Name is required";
        if (!form.email) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6) e.password = "Minimum 6 characters";
        return e;
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;

        setSubmitting(true);
        try {
            await new Promise((r) => setTimeout(r, 1200));
            alert("Signup successful! " + JSON.stringify(form, null, 2));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 animate-[fadeIn_0.4s_ease-out]">
                    <h1 className="text-3xl font-semibold text-white text-center mb-2">Create Account</h1>
                    <p className="text-slate-300 text-center mb-8">Sign up to get started</p>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-slate-200 mb-1">
                                Full Name
                            </label>
                            <input
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={form.fullname}
                                onChange={onChange}
                                className={`w-full rounded-lg bg-white/5 text-white placeholder:text-slate-400 border transition
                                    ${errors.fullname ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-indigo-500"}
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5`}
                                placeholder="John Doe"
                            />
                            {errors.fullname && <p className="mt-1 text-sm text-red-400">{errors.fullname}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                className={`w-full rounded-lg bg-white/5 text-white placeholder:text-slate-400 border transition
                                    ${errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-indigo-500"}
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={onChange}
                                    className={`w-full rounded-lg bg-white/5 text-white placeholder:text-slate-400 border transition
                                        ${errors.password ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-indigo-500"}
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5 pr-12`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((s) => !s)}
                                    className="absolute inset-y-0 right-0 px-3 text-slate-300 hover:text-white"
                                >
                                    {showPwd ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 transition"
                        >
                            {submitting ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="flex items-center my-6">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="px-3 text-xs uppercase tracking-wider text-slate-400">or</span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <SocialButton label="Google" onClick={() => alert("Google")} />
                        <SocialButton label="GitHub" onClick={() => alert("GitHub")} />
                        <SocialButton label="Twitter" onClick={() => alert("Twitter")} />
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <button className="text-indigo-400 hover:underline" onClick={() => alert("Go to login")}>
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}

function SocialButton({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-sm transition"
        >
            {label}
        </button>
    );
}
