import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import Signupbg from "../../assets/SignupBG.jpg"

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
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.fullname,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            localStorage.setItem("token", data.token);

            alert("Signup successful!");
            window.location.href = "/";
        } catch (err) {
            alert("Something went wrong!");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main
            className="pt-36 pb-20 flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{
                backgroundImage: `url(${Signupbg})`,
            }}
        >
            <div className="w-full max-w-md backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-black text-center mb-2 drop-shadow-md">Create Account</h1>
                <p className="text-black/50 text-center mb-6">Sign up to get started</p>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-black mb-1">
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            value={form.fullname}
                            onChange={onChange}
                            className={`w-full rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 border 
                            ${errors.fullname ? "border-red-400" : "border-gray-300 focus:border-blue-500"} 
                            focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2.5`}
                            placeholder="John Doe"
                        />
                        {errors.fullname && <p className="mt-1 text-sm text-red-500">{errors.fullname}</p>}
                    </div>

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
                            >
                                {showPwd ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 transition focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    >
                        {submitting ? "Signing up..." : "Sign Up"}
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
                    <SocialButton icon={<FaGoogle />} label="Google" onClick={() => alert("Google")} />
                    <SocialButton icon={<FaGithub />} label="GitHub" onClick={() => alert("GitHub")} />
                    <SocialButton icon={<FaTwitter />} label="Twitter" onClick={() => alert("Twitter")} />
                </div>

                <p className="mt-8 text-center text-sm text-black">
                    Already have an account?{" "}
                    <Link to='/login' className="text-blue-500 hover:underline cursor-pointer">
                        Login
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
