import { Link } from 'react-router-dom'

export default function PricingSection() {
  return (
    <section className="max-w-7xl mx-auto px-gutter py-xl flex flex-col items-center" id="pricing">
      <div className="text-center mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Precios simples y transparentes</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[42rem] mx-auto mt-2">Elige el plan que mejor se adapte a tu ritmo de búsqueda de empleo.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-lg w-full justify-center">
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col relative">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Plan Gratis</h3>
          <div className="mb-md">
            <span className="font-display-lg text-display-lg font-bold text-on-surface">0€</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-md h-10">Para quienes buscan organizar sus primeras candidaturas.</p>
          <ul className="flex flex-col gap-sm flex-1 mb-lg">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Kanban básico</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Hasta 10 candidaturas</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Métricas esenciales</span>
            </li>
          </ul>
          <Link
            to="/register"
            className="block w-full text-center bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-variant transition-all shadow-sm"
          >
            Empezar Gratis
          </Link>
        </div>
        <div className="flex-1 bg-surface-container-lowest border-2 border-primary rounded-xl p-lg shadow-md flex flex-col relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
            Recomendado
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Plan Pro</h3>
          <div className="mb-md">
            <span className="font-display-lg text-display-lg font-bold text-on-surface">20€</span>
            <span className="font-body-md text-body-md text-on-surface-variant">/mes</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-md h-10">Para búsquedas activas y gestión profesional de contactos.</p>
          <ul className="flex flex-col gap-sm flex-1 mb-lg">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Candidaturas ilimitadas</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Métricas avanzadas</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Gestión de empresas</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
              <span className="font-body-md text-body-md text-on-surface">Soporte prioritario</span>
            </li>
          </ul>
          <Link
            to="/register"
            className="block w-full text-center bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md active:scale-95"
          >
            Suscribirse
          </Link>
        </div>
      </div>
    </section>
  )
}
