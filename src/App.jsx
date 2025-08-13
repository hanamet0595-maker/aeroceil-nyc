export default function App() {
  return (
    <div style={{fontFamily:"system-ui",minHeight:"100vh"}} className="bg-neutral-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-black/10 px-4 py-3">
        <b>AeroCeil NYC</b> — Ultra-Luxury Stretch Ceilings
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Ultra-Luxury Stretch Ceilings & Light Lines
        </h1>
        <p className="mt-3 text-neutral-600">
          Manhattan • Designer-approved • Dust-free install • 10-year warranty
        </p>
        <a href="#contact" className="inline-block mt-6 px-4 py-2 rounded-2xl bg-black text-white">
          Request a Consultation
        </a>
        <div id="contact" className="mt-10 p-4 rounded-2xl border border-black/10 bg-white">
          <div><b>Phone:</b> +1 (606) 733-5555</div>
          <div><b>Email:</b> Han.amet0595@gmail.com</div>
          <div><b>Location:</b> Manhattan, NYC</div>
        </div>
      </main>
    </div>
  );
}
