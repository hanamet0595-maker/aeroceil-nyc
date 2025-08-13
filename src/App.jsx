import React, { useMemo, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Star, Phone, Mail, MapPin, ChevronRight, ArrowUpRight,
  Instagram, Images, Sparkles, CheckCircle, Loader2
} from "lucide-react";

// ---- Minimal client-side router (2 pages) ----
function useRoute() {
  const getHash = () =>
    (typeof window !== "undefined" && window.location.hash.replace("#", "")) || "/";
  const [route, setRoute] = useState(getHash());
  useEffect(() => {
    const onHashChange = () => setRoute(getHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const push = (path) => {
    if (typeof window !== "undefined") window.location.hash = path;
  };
  return { route, push };
}

// ---- SEO Helpers ----
const DOMAIN = "https://www.aeroceilnyc.com"; // заменишь после подключения домена

function SEO({ route }) {
  const meta = useMemo(() => {
    if (route === "/projects") {
      return {
        title:
          "AeroCeil NYC Projects — Luxury Stretch Ceilings & Light Lines in Manhattan",
        description:
          "Curated portfolio of luxury stretch ceilings and architectural light lines across Manhattan and NYC. Premium PVC & fabric membranes, museum-grade finishes.",
        url: DOMAIN + "/#projects",
        breadcrumbs: [
          { name: "Home", item: DOMAIN + "/" },
          { name: "Projects", item: DOMAIN + "/projects" },
        ],
      };
    }
    return {
      title:
        "AeroCeil NYC — Ultra-Luxury Stretch Ceilings & Light Lines in Manhattan",
      description:
        "Ultra-luxury stretch ceilings and architectural light lines in Manhattan & NYC. Flawless finishes, acoustic comfort, and bespoke design for penthouses and flagship spaces.",
      url: DOMAIN + "/",
      breadcrumbs: [{ name: "Home", item: DOMAIN + "/" }],
    };
  }, [route]);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AeroCeil NYC",
    image: DOMAIN + "/og-cover.jpg",
    url: DOMAIN,
    telephone: "+1 (606) 733-5555",
    email: "Han.amet0595@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fifth Ave",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    areaServed: "New York City",
    priceRange: "$$$",
    sameAs: ["https://www.instagram.com/aeroceilnyc"],
    openingHours: "Mo,Tu,We,Th,Fr 09:00-19:00",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury stretch ceilings with light lines",
        },
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AeroCeil NYC",
    url: DOMAIN,
    potentialAction: {
      "@type": "SearchAction",
      target: DOMAIN + "/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: meta.breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a stretch ceiling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A premium PVC or fabric membrane tensioned under the existing ceiling, creating a perfectly level, flawless surface with options for acoustic and integrated lighting.",
        },
      },
      {
        "@type": "Question",
        name: "Do you install light lines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we integrate architectural LED light lines and profiles to achieve museum-grade illumination and modern geometry.",
        },
      },
      {
        "@type": "Question",
        name: "Where do you work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve Manhattan and the greater NYC area for residential and flagship commercial interiors.",
        },
      },
    ],
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={DOMAIN + "/og-cover.jpg"} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DOMAIN + "/og-cover.jpg"} />
      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}

// ---- UI Components ----
function Navbar({ push, route }) {
  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "#contact" },
  ];
  const handleClick = (href) => {
    if (href.startsWith("/")) push(href);
    else if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="tracking-tight font-semibold">AeroCeil NYC</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <button
              key={l.label}
              className={`transition hover:opacity-70 ${
                route === l.href ? "font-semibold" : ""
              }`}
              onClick={() => handleClick(l.href)}
            >
              {l.label}
            </button>
          ))}
          <a
            href="tel:+16067335555"
            className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-1.5 border border-black/10 shadow-sm hover:shadow transition"
          >
            <Phone className="w-4 h-4" /> <span>+1 (606) 733-5555</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

function Hero({ push }) {
  return (
    <section className="pt-24 md:pt-28 bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Ultra-Luxury <span className="italic">Stretch Ceilings</span> &
              <br /> Architectural Light Lines in Manhattan
            </h1>
            <p className="mt-4 text-neutral-600">
              Flawless, level surfaces. Museum-grade illumination. Acoustic
              comfort. Designed and installed for penthouses, flagship retail,
              and refined residences.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-2xl px-4 py-2 bg-black text-white shadow hover:shadow-md transition inline-flex items-center gap-2"
              >
                Request a Consultation <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => push("/projects")}
                className="rounded-2xl px-4 py-2 border border-black/10 hover:bg-white shadow-sm inline-flex items-center gap-2"
              >
                View Projects <Images className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" /> Designer-approved
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Dust-free install
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 10-year warranty
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a4007d?q=80&w=2000&auto=format&fit=crop"
                alt="Luxury stretch ceiling with integrated light lines in Manhattan penthouse"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur rounded-2xl px-3 py-2 shadow flex items-center gap-2 border border-black/5">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Clean installation • 1–2 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      title: "Perfectly Level Surface",
      desc: "Mirror-flat finish hides imperfections and wiring.",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      title: "Architectural Light Lines",
      desc: "Seamless LED profiles with dim-to-warm options.",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Acoustic & Moisture Options",
      desc: "Reduce echo and improve comfort; bathroom-safe.",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Fast, Clean Install",
      desc: "Minimal dust; most rooms complete in 1–2 days.",
      icon: <Loader2 className="w-5 h-5" />,
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Made for Manhattan Interiors
        </h2>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Premium PVC and fabric membranes, precision-cut and heat-tensioned on
          site. We work alongside designers to match color, gloss, and geometry.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl p-4 border border-black/10 shadow-sm hover:shadow-md transition bg-neutral-50"
            >
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                {it.icon}
                <span>{it.title}</span>
              </div>
              <p className="mt-2 text-neutral-600 text-sm">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsGrid() {
  const projects = [
    {
      title: "Park Ave Penthouse",
      img: "https://images.unsplash.com/photo-1600585154340-1e4ce9a9d095?q=80&w=2000&auto=format&fit=crop",
      desc: "Matte white stretch ceiling with 12mm light lines.",
    },
    {
      title: "SoHo Flagship Retail",
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2000&auto=format&fit=crop",
      desc: "High-gloss membrane to amplify display lighting.",
    },
    {
      title: "Chelsea Gallery",
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop",
      desc: "Acoustic fabric ceiling with continuous profiles.",
    },
    {
      title: "Upper East Residence",
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2000&auto=format&fit=crop",
      desc: "Dim-to-warm linear geometry, hidden drivers.",
    },
  ];
  return (
    <section className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Selected Projects
            </h2>
            <p className="mt-2 text-neutral-600">
              A curated look at recent Manhattan installs.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-black/10 bg-white hover:shadow"
          >
            Book a Visit <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-black/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.title} — stretch ceiling with light lines`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="font-medium flex items-center justify-between">
                  <span>{p.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
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

function FAQ() {
  const qa = [
    {
      q: "How long does installation take?",
      a: "Most rooms are completed in 1–2 days. We coordinate with your designer and electrician in advance for a clean, quiet process.",
    },
    {
      q: "Can you integrate light lines and spots?",
      a: "Yes. We supply and install linear LED profiles, diffusers, and recessed spots, with drivers hidden above the membrane.",
    },
    {
      q: "What finishes are available?",
      a: "Matte, satin, high-gloss, and acoustic fabric. We color-match to RAL/Pantone and provide samples for approval.",
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 overflow-hidden">
          {qa.map((item, i) => (
            <details key={i} className="group open:bg-neutral-50">
              <summary className="list-none cursor-pointer p-4 flex items-center justify-between">
                <span className="font-medium">{item.q}</span>
                <ChevronRight className="w-4 h-4 group-open:rotate-90 transition" />
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
            Tell us about your project. A senior specialist will respond the same
            day.
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
            <a
              href="mailto:Han.amet0595@gmail.com"
              className="flex items-center gap-2"
            >
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
            <button onClick={() => push("/")} className="hover:opacity-80">
              Home
            </button>
            <button onClick={() => push("/projects")} className="hover:opacity-80">
              Projects
            </button>
            <a href="#contact" className="hover:opacity-80">
              Contact
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/60">
          © {new Date().getFullYear()} AeroCeil NYC. All rights reserved. •{" "}
          <span className="underline">Robots: index, follow</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ push }) {
  return (
    <main>
      <Hero push={push} />
      <Benefits />
      <ProjectsGrid />
      <FAQ />
      <Contact />
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Projects in Manhattan
          </h1>
          <p className="mt-3 text-neutral-600 max-w-2xl">
            Each project is tailored: geometry, gloss, and lighting are curated
            with the interior designer. Below is a sampling of our work and
            typical specifications.
          </p>
        </div>
      </section>
      <ProjectsGrid />
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl border border-black/10 p-6 bg-neutral-50">
            <h2 className="text-xl font-semibold">Typical Specifications</h2>
            <ul className="mt-4 space-y-2 text-neutral-700 text-sm">
              <li>
                • Premium PVC & fabric membranes (matte, satin, gloss, acoustic)
              </li>
              <li>• LED light lines: 8–20mm profiles, CRI 90+, 2700–4000K</li>
              <li>• Hidden drivers, service hatches, fire-rated components</li>
              <li>• Dust-free installation, low noise, minimal disruption</li>
              <li>• 10-year warranty on materials and workmanship</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-black/10 p-6 bg-neutral-50">
            <h2 className="text-xl font-semibold">For Designers & Architects</h2>
            <p className="mt-4 text-neutral-700 text-sm">
              We provide samples, RCP coordination, and profile details. CAD/REVIT
              families available upon request.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-black text-white"
            >
              Request Samples <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
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
