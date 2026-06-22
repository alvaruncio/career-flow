const KANBAN_COLUMNS = [
  { id: 'applied', label: 'Aplicada', color: 'bg-outline', count: 0 },
  { id: 'interview', label: 'Fase de Entrevista', color: 'bg-primary', count: 0 },
  { id: 'offer', label: 'Oferta', color: 'bg-secondary', count: 0 },
  { id: 'hired', label: 'Contratado', color: 'bg-secondary-container', count: 0 },
  { id: 'rejected', label: 'Rechazada', color: 'bg-error', count: 0 },
] as const

export default function KanbanPage() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Kanban</h1>
        <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm active:scale-95">
          + Añadir candidatura
        </button>
      </div>
      <div className="flex gap-md overflow-x-auto pb-md" style={{ minHeight: 'calc(100vh - 12rem)' }}>
        {KANBAN_COLUMNS.map(col => (
          <div key={col.id} className="w-72 flex-shrink-0 flex flex-col gap-sm bg-surface-container-low rounded-xl p-md border border-outline-variant/30">
            <div className="flex items-center gap-2 px-2 pb-2 border-b border-outline-variant/50">
              <span className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="font-label-md text-label-md text-on-surface">
                {col.label} <span className="text-on-surface-variant ml-1">{col.count}</span>
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-sm">
              <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 shadow-sm opacity-40 flex items-center justify-center" style={{ minHeight: 80 }}>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Arrastra candidaturas aquí</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
