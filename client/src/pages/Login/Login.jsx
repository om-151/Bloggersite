import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import Loginbg from "../../assets/LoginBG.jpg"

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
            await new Promise((r) => setTimeout(r, 1200));
            alert(JSON.stringify(form, null, 2));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main
            className="flex items-center justify-center bg-cover bg-center bg-no-repeat pt-36 pb-20 px-4"
            style={{
                backgroundImage: `url(${Loginbg})`,
            }}
        >
            <div className="w-full max-w-md backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-black text-center mb-2 drop-shadow-md">Welcome Back</h1>
                <p className="text-black/50 text-center mb-6">Login to your account</p>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className={`w-full rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 border 
                            ${errors.email ? "border-red-400" : "border-gray-300 focus:border-blue-500"} 
                            focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2.5`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPwd ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                className={`w-full rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 border 
                                ${errors.password ? "border-red-400" : "border-gray-300 focus:border-blue-500"} 
                                focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2.5 pr-12`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd((s) => !s)}
                                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-900 cursor-pointer"
                                aria-label={showPwd ? "Hide password" : "Show password"}
                            >
                                {showPwd ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot */}
                    <div className="flex items-center justify-between text-sm text-black">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={onChange}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200"
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            className="text-black hover:underline cursor-pointer"
                            onClick={() => alert("Forgot Password?")}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 transition focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <span className="h-px flex-1 bg-black/30" />
                    <span className="px-3 text-xs uppercase tracking-wider text-black">or</span>
                    <span className="h-px flex-1 bg-black/30" />
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-3 gap-3">
                    <SocialButton icon={<FaGoogle />} label="Google" onClick={() => alert("Google Login")} />
                    <SocialButton icon={<FaGithub />} label="GitHub" onClick={() => alert("GitHub Login")} />
                    <SocialButton icon={<FaTwitter />} label="Twitter" onClick={() => alert("Twitter Login")} />
                </div>

                <p className="mt-8 text-center text-sm text-black">
                    Don&apos;t have an account?{" "}
                    <Link to='/signup' className="text-blue-500 hover:underline cursor-pointer">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}

function SocialButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 text-gray-900 bg-white/70 hover:bg-white border border-white/30 rounded-lg py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
        >
            {icon} {label}
        </button>
    );
}
