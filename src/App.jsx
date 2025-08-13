import React, { useMemo, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Star, Phone, Mail, MapPin, ChevronRight, ArrowUpRight,
  Instagram, Images, Sparkles, CheckCircle, Loader2
} from "lucide-react";
import { HOME_GALLERY, PROJECTS, CEILING_TYPES, SYSTEM_TYPES } from "./media";

function useRoute(){
  const getHash=()=> (typeof window!=="undefined" && window.location.hash.replace("#","")) || "/";
  const [route,setRoute]=useState(getHash());
  useEffect(()=>{ const on=()=>setRoute(getHash()); window.addEventListener("hashchange",on); return ()=>window.removeEventListener("hashchange",on) },[]);
  const push=(p)=>{ if(typeof window!=="undefined") window.location.hash=p };
  return {route,push};
}

const DOMAIN = "https://www.aeroceilnyc.com";

function SEO({route}) {
  const meta = useMemo(() => route==="/projects"
    ? {
        title: "AeroCeil NYC Projects — Luxury Stretch Ceilings & Light Lines in Manhattan",
        description: "Curated portfolio of luxury stretch ceilings and architectural light lines across Manhattan and NYC.",
        url: DOMAIN + "/#projects",
        breadcrumbs: [{name:"Home",item:DOMAIN+"/"},{name:"Projects",item:DOMAIN+"/projects"}],
      }
    : {
        title: "AeroCeil NYC — Ultra-Luxury Stretch Ceilings & Light Lines in Manhattan",
        description: "Ultra-luxury stretch ceilings and architectural light lines in Manhattan & NYC.",
        url: DOMAIN + "/",
        breadcrumbs: [{name:"Home",item:DOMAIN+"/"}],
      }, [route]);

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={DOMAIN + "/og-cover.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DOMAIN + "/og-cover.jpg"} />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}

function Navbar({push,route}) {
  const links=[{label:"Home",href:"/"},{label:"Projects",href:"/projects"},{label:"Contact",href:"#contact"}];
  const onClick=(href)=>{
    if(href.startsWith("/")) push(href);
    else if(href.startsWith("#")) document.querySelector(href)?.scrollIntoView({behavior:"smooth"});
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" /><span className="tracking-tight font-semibold">AeroCeil NYC</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {links.map(l=>(
            <button key={l.label}
              className={`transition hover:opacity-70 ${route===l.href?"font-semibold":""}`}
              onClick={()=>onClick(l.href)}>{l.label}</button>
          ))}
          <a href="tel:+16067335555" className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-1.5 border border-black/10 shadow-sm hover:shadow transition">
            <Phone className="w-4 h-4"/><span>+1 (606) 733-5555</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

function Hero({push}) {
  return (
    <section className="pt-24 md:pt-28 bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}
          className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Ultra-Luxury <span className="italic">Stretch Ceilings</span> &<br/>Architectural Light Lines in Manhattan
            </h1>
            <p className="mt-4 text-neutral-600">
              Flawless, level surfaces. Museum-grade illumination. Acoustic comfort.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="rounded-2xl px-4 py-2 bg-black text-white shadow hover:shadow-md inline-flex items-center gap-2">
                Request a Consultation <ChevronRight className="w-4 h-4"/>
              </a>
              <button onClick={()=>push("/projects")}
                className="rounded-2xl px-4 py-2 border border-black/10 hover:bg-white shadow-sm inline-flex items-center gap-2">
                View Projects <Images className="w-4 h-4"/>
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600">
              <span className="flex items-center gap-2"><Star className="w-4 h-4"/> Designer-approved</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4"/> Dust-free install</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> 10-year warranty</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl">
              <img src="/home/home-1.webp" alt="Warm perimeter backlight in beige living room"
                   className="w-full h-full object-cover filter contrast-105" loading="eager"/>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur rounded-2xl px-3 py-2 shadow flex items-center gap-2 border border-black/5">
              <Loader2 className="w-4 h-4 animate-spin"/><span className="text-sm">Clean installation • 1–2 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomeGallery(){
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Luxury Highlights</h2>
        <p className="mt-2 text-neutral-600">Curated warm-tone gallery for the homepage.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {HOME_GALLERY.map((x,i)=>(
            <div key={i} className="rounded-3xl overflow-hidden shadow-lg bg-white border border-black/5">
              <img src={x.src} alt={x.alt}
                   className="w-full h-full object-cover filter contrast-105" loading="lazy"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypesAndSystems(){
  return (
    <section className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Types & Systems</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {CEILING_TYPES.map((t)=>(
            <div key={t.label} className="rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow transition overflow-hidden">
              <div className="aspect-[4/3]"><img src={t.img} alt={t.alt} className="w-full h-full object-cover filter contrast-105"/></div>
              <div className="p-4">
                <div className="font-medium">{t.label}</div>
                <p className="mt-1 text-sm text-neutral-700">{t.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="mt-10 text-xl font-semibold">Lighting & Mounting Systems</h3>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {SYSTEM_TYPES.map((s)=>(
            <div key={s.label} className="rounded-2xl bg-white border border-black/10 shadow-sm overflow-hidden">
              <div className="aspect-[4/3]"><img src={s.img} alt={s.alt} className="w-full h-full object-cover filter contrast-105"/></div>
              <div className="p-3">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-neutral-700 mt-1">{s.copy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsGrid(){
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Selected Projects</h2>
            <p className="mt-2 text-neutral-600">Separate set from the homepage for clean curation.</p>
          </div>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-black/10 bg-white hover:shadow">
            Book a Visit <ArrowUpRight className="w-4 h-4"/>
          </a>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {PROJECTS.map(p=>(
            <div key={p.title} className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-black/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={`${p.title} — stretch ceiling`} className="w-full h-full object-cover group-hover:scale-[1.02] transition filter contrast-105" loading="lazy"/>
              </div>
              <div className="p-4">
                <div className="font-medium flex items-center justify-between">
                  <span>{p.title}</span><ArrowUpRight className="w-4 h-4 opacity-60"/>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ(){ /* оставляем как было */ 
  const qa=[{q:"How long does installation take?",a:"Most rooms are completed in 1–2 days."},
            {q:"Can you integrate light lines and spots?",a:"Yes — profiles, diffusers and recessed spots."},
            {q:"What finishes are available?",a:"Matte, satin, high-gloss, acoustic fabric."}];
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 overflow-hidden">
          {qa.map((item,i)=>(
            <details key={i} className="group open:bg-neutral-50">
              <summary className="list-none cursor-pointer p-4 flex items-center justify-between">
                <span className="font-medium">{item.q}</span>
                <ChevronRight className="w-4 h-4 group-open:rotate-90 transition"/>
              </summary>
              <div className="p-4 pt-0 text-neutral-700">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Request a Private Consultation
          </h2>
          <p className="mt-2 text-neutral-600">
            Tell us about your project. A senior specialist will respond the same day.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              className="rounded-2xl border border-black/10 px-4 py-2"
              placeholder="Full Name"
              aria-label="Full Name"
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-2"
              placeholder="Email"
              type="email"
              aria-label="Email"
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-2"
              placeholder="Phone"
              aria-label="Phone"
            />
            <textarea
              className="rounded-2xl border border-black/10 px-4 py-2"
              placeholder="Project details (location, timeline, finishes)"
              rows={4}
              aria-label="Project details"
            />
            <button
              type="submit"
              className="rounded-2xl px-4 py-2 bg-black text-white shadow hover:shadow-md inline-flex items-center gap-2"
            >
              Send Request <Mail className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-neutral-700">
            <a href="tel:+16067335555" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +1 (606) 733-5555
            </a>
            <a href="mailto:Han.amet0595@gmail.com" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Han.amet0595@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Manhattan, NYC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ push }) {
  return (
    <footer className="py-10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-semibold">AeroCeil NYC</div>
            <div className="text-sm text-white/70">
              Ultra-luxury stretch ceilings & light lines for Manhattan.
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button onClick={() => push("/")} className="hover:opacity-80">Home</button>
            <button onClick={() => push("/projects")} className="hover:opacity-80">Projects</button>
            <a href="#contact" className="hover:opacity-80">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-80 inline-flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/60">
          © {new Date().getFullYear()} AeroCeil NYC • Robots: index, follow
        </div>
      </div>
    </footer>
  );
}

function HomePage({ push }) {
  return (
    <main>
      <Hero push={push} />
      <HomeGallery />
      <TypesAndSystems />
      <FAQ />
      <Contact />
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="pt-24 md:pt-28">
      <ProjectsGrid />
      <Contact />
    </main>
  );
}

export default function App() {
  const { route, push } = useRoute();
  const page = route === "/projects" ? <ProjectsPage /> : <HomePage push={push} />;
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <SEO route={route} />
        <Navbar push={push} route={route} />
        {page}
        <Footer push={push} />
      </div>
    </HelmetProvider>
  );
}
