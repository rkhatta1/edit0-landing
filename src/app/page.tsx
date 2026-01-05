"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Base path for GitHub Pages deployment
  const BASE_PATH = "/edit0-landing";

  useEffect(() => {
    // Fallback to ensure loading screen goes away
    const timer = setTimeout(() => setIsLoaded(true), 3000);

    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  // Simple parallax effect for the hero text
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrolled = window.scrollY;
        scrollRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
        scrollRef.current.style.opacity = `${1 - scrolled / 700}`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const trimmedEmail = email.trim();

    if (!supabaseUrl) {
      setStatus("error");
      setErrorMessage("Missing Supabase URL.");
      return;
    }

    try {
      if (!trimmedEmail) {
        throw new Error("Please enter a valid email.");
      }
      const response = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/functions/v1/beta-signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(anonKey ? { Authorization: `Bearer ${anonKey}`, apikey: anonKey } : {}),
          },
          body: JSON.stringify({ email: trimmedEmail }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Signup failed.");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Signup failed.");
    }
  };

  return (
    <div className="bg-white w-full overflow-x-hidden font-sans selection:bg-pink-500 selection:text-white">
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img src={`${BASE_PATH}/e0.png`} alt="Edit0 Logo" className="w-16 h-16 opacity-80" />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {/* Stock Video Background (Studio/Film vibe) */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster={`${BASE_PATH}/Poster.png`}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={`${BASE_PATH}/Stock.webm`} type="video/webm" />
        </video>

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Pill Navigation (Top Center) */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl px-1.5 py-1.5 rounded-full flex items-center gap-1 shadow-2xl border border-white/20 transition-all hover:scale-105 hover:bg-white">
          <div className="px-5 py-2 rounded-full bg-transparent text-sm font-bold tracking-tight text-black cursor-default">
            Edit0
          </div>
          <a href="https://www.youtube.com/watch?v=BpK0e2AXPV0&pp=0gcJCU0KAYcqIYzv" target="_blank">
          <button
            type="button"
            className="cursor-pointer px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            View Demo
          </button>
          </a>
        </nav>

        {/* Hero Typography (Bottom Left) */}
        <div
          ref={scrollRef}
          className="absolute bottom-12 left-6 md:left-12 lg:left-24 max-w-5xl z-10 pointer-events-none"
        >
          <h1 className="text-white text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter mix-blend-overlay opacity-90">
            Built to Create.
          </h1>
          <h1 className="text-white text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter">
            Born to Edit.
          </h1>
        </div>
      </div>

      {/* --- FOOTER (Gradient) --- */}
      <div className="relative min-h-screen flex flex-col justify-end bg-black text-white overflow-hidden p-6 md:p-12 lg:p-24">
        {/* Animated Gradient Blob */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-800 via-gray-950 to-black opacity-90" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[150%] h-[150%] bg-cyan-800/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-serif mb-8">
              We're just getting started.
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mb-12">
              The project is currently in alpha testing phase. Fill the form to become a beta tester.
            </p>
            <a href="https://www.youtube.com/watch?v=BpK0e2AXPV0&pp=0gcJCU0KAYcqIYzv" target="_blank">
            <button
              type="button"
              className="cursor-pointer bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Watch the Demo
            </button>
            </a>
          </div>

          <form
            className="w-full md:max-w-md flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              Sign up as a beta tester
            </p>
            <div className="flex flex-row flex-wrap gap-3">
              <input
                type="email"
                name="email"
                placeholder="you@studio.com"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-cyan-500 text-black px-8 py-4 font-semibold cursor-pointer hover:bg-cyan-300 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Join Beta"}
              </button>
            </div>
            {status === "success" ? (
              <p className="text-xs text-emerald-300">
                Thanks! We will email you when the private beta opens.
              </p>
            ) : (
              <p className="text-xs text-white/50">
                {status === "error" && errorMessage
                  ? errorMessage
                  : "We will email you when the private beta opens."}
              </p>
            )}
          </form>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-8 mt-24">
          <div className="text-3xl font-bold tracking-tighter mb-4 md:mb-0">Edit0</div>

          <div className="flex gap-8 text-sm text-white/60">
            <a href="https://raajveer.vercel.app/" target="_blank" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  desc: string;
  img: string;
  icon: ReactNode;
};

const FeatureCard = ({ title, desc, img, icon }: FeatureCardProps) => (
  <div className="min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-3xl relative overflow-hidden group snap-center cursor-pointer shadow-lg">
    <img
      src={img}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

    <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
      {icon}
    </div>

    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <h4 className="text-3xl font-serif text-white mb-2">{title}</h4>
      <p className="text-white/80 leading-relaxed text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        {desc}
      </p>
    </div>
  </div>
);
