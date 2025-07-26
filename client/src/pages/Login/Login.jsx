import { useState } from "react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.email) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6) e.password = "Minimum 6 characters";
        return e;
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;

        setSubmitting(true);
        try {
            // pretend API
            await new Promise((r) => setTimeout(r, 1200));
            alert(JSON.stringify(form, null, 2));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-neutral-900 dark:to-black flex items-center justify-center p-4">
            {/* subtle background blobs */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 animate-[fadeIn_0.4s_ease-out]">
                    <h1 className="text-3xl font-semibold text-white text-center mb-2">Welcome back</h1>
                    <p className="text-slate-300 text-center mb-8">Sign in to your account</p>

                    <form onSubmit={onSubmit} className="space-y-6">
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
                                aria-invalid={!!errors.email}
                                className={`w-full rounded-lg bg-white/5 text-white placeholder:text-slate-400 border transition
                  ${errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-indigo-500"}
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5`}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                            )}
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
                                    aria-invalid={!!errors.password}
                                    className={`w-full rounded-lg bg-white/5 text-white placeholder:text-slate-400 border transition
                    ${errors.password ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-indigo-500"}
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5 pr-12`}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((s) => !s)}
                                    className="absolute inset-y-0 right-0 px-3 text-slate-300 hover:text-white focus:outline-none"
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                >
                                    {showPwd ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-slate-300 text-sm">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={form.remember}
                                    onChange={onChange}
                                    className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                                />
                                Remember me
                            </label>

                            <button
                                type="button"
                                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline focus:outline-none"
                                onClick={() => alert("Hook your forgot password flow here")}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-medium py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        >
                            {submitting ? (
                                <span className="inline-flex items-center gap-2">
                                    <Spinner /> Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="px-3 text-xs uppercase tracking-wider text-slate-400">or</span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Socials (optional) */}
                    <div className="grid grid-cols-3 gap-3">
                        <SocialButton label="Google" onClick={() => alert("Google")} />
                        <SocialButton label="GitHub" onClick={() => alert("GitHub")} />
                        <SocialButton label="Twitter" onClick={() => alert("Twitter")} />
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={() => alert("Go to signup")}
                            className="text-indigo-400 hover:text-indigo-300 hover:underline"
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}

function Spinner() {
    return (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
            />
            <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}

function SocialButton({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
            {label}
        </button>
    );
}
