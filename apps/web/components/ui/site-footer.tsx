export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">KaizenForm</p>
          <p className="mt-3 max-w-xl text-sm text-white/70">
            Modern, immersive page experiences built for teams who want premium product storytelling.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/70 md:flex-row md:items-center">
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#pricing" className="transition hover:text-white">Docs</a>
          <a href="mailto:hello@kaizenform.com" className="transition hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  )
}
