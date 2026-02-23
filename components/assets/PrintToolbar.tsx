'use client';

interface PrintToolbarProps {
  title?: string;
}

export function PrintToolbar({ title = 'Printable Sheet' }: PrintToolbarProps) {
  return (
    <div className="print:hidden mb-6 rounded-lg border border-gray-800 bg-gray-900/60 p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-military-gold">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded border border-military-gold/60 bg-military-gold/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.12em] text-military-gold transition-colors hover:bg-military-gold/20"
        >
          Print or Save as PDF
        </button>
      </div>
    </div>
  );
}
