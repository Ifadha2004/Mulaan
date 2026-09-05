// app/(customer)/journal/page.tsx
export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center py-32 px-4">
      <div className="text-center space-y-6 max-w-lg">
        <span className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-bold">
          Coming Soon
        </span>
        <h1 className="heading-luxury text-4xl text-brand-green tracking-[0.2em] uppercase">
          The Mulaan Journal
        </h1>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
        <p className="text-gray-500 text-sm leading-relaxed">
          Stories, styling notes, and behind-the-scenes moments from the Mulaan atelier —
          arriving soon.
        </p>
      </div>
    </div>
  )
}