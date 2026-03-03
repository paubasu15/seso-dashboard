export default function LandingPreview({ config, viewport }) {
  const primary = config.primaryColor || '#6366f1'
  const secondary = config.secondaryColor || '#8b5cf6'
  const background = config.backgroundColor || '#ffffff'
  const textColor = config.textColor || '#1f2937'
  const hero = config.hero || {}
  const features = config.features || []
  const footer = config.footer || {}

  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'

  const containerStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: background,
    color: textColor,
    '--primary': primary,
    '--secondary': secondary,
  }

  return (
    <div style={containerStyle} className="h-full overflow-y-auto text-sm">
      {/* Header */}
      <header
        style={{ backgroundColor: primary }}
        className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 shadow-sm"
      >
        {config.logo ? (
          <img src={config.logo} alt={config.name} className="w-7 h-7 rounded object-cover" />
        ) : (
          <div
            className="w-7 h-7 rounded bg-white bg-opacity-30 flex items-center justify-center text-white font-bold text-xs"
          >
            {config.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
        )}
        <span className="font-semibold text-white text-sm">{config.name || 'Mi Empresa'}</span>
      </header>

      {/* Hero */}
      <section
        style={{ background: `linear-gradient(135deg, ${primary}15, ${secondary}15)` }}
        className={`px-6 py-12 text-center`}
      >
        <h1
          className={`font-bold mb-3 leading-tight ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}
          style={{ color: textColor }}
        >
          {hero.title || 'Título principal'}
        </h1>
        <p
          className={`mb-6 opacity-70 ${isMobile ? 'text-xs' : 'text-sm'}`}
          style={{ color: textColor }}
        >
          {hero.subtitle || 'Subtítulo de tu landing page'}
        </p>
        {hero.ctaText && (
          <a
            href={hero.ctaLink || '#'}
            style={{ backgroundColor: primary }}
            className="inline-block px-5 py-2.5 rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {hero.ctaText}
          </a>
        )}
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="px-6 py-10">
          <div
            className={`grid gap-4 ${
              isMobile
                ? 'grid-cols-1'
                : isTablet
                ? 'grid-cols-2'
                : 'grid-cols-3'
            }`}
          >
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-4 rounded-xl border"
                style={{ borderColor: primary + '30', backgroundColor: primary + '08' }}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: textColor }}>
                  {feature.title}
                </h3>
                <p className="text-xs opacity-60" style={{ color: textColor }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{ backgroundColor: textColor + '08', borderTopColor: primary + '30' }}
        className="px-6 py-6 border-t mt-auto"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs opacity-60" style={{ color: textColor }}>
            {footer.text || '© 2025 Mi Empresa'}
          </p>
          {footer.links && footer.links.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {footer.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url || '#'}
                  style={{ color: primary }}
                  className="text-xs hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
