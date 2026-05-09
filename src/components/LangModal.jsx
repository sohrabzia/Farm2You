import { Sprout, Check } from 'lucide-react'
import { useI18n, LANGS } from '../lib/i18n.jsx'

export default function LangModal() {
  const { langChosen, setLang } = useI18n()
  if (langChosen) return null

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-bone shadow-2xl border border-ink/15 p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="grid place-items-center w-9 h-9 bg-forest text-bone"><Sprout size={18} /></span>
          <span className="font-display text-xl tracking-tightest">Farm2You</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl tracking-tightest leading-tight">
          Choose your language
        </h2>
        <p className="mt-2 text-sm text-ink/65">
          You can change this anytime from the header.
        </p>

        {/* Urdu version under */}
        <p className="mt-3 text-lg text-ink/85 lang-ur" dir="rtl" style={{ fontFamily: '"Noto Nastaliq Urdu", "Noto Naskh Arabic", serif' }}>
          اپنی زبان منتخب کریں — آپ یہ کبھی بھی بدل سکتے ہیں۔
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Btn onClick={() => setLang('en')} active label="English" subtitle="Default" />
          <Btn
            onClick={() => setLang('ur')}
            active
            label="اردو"
            subtitle="Urdu"
            urdu
          />
        </div>

        <p className="mt-6 text-xs text-ink/50 text-center">
          🇵🇰 Made in Karachi · کراچی میں بنایا گیا
        </p>
      </div>
    </div>
  )
}

function Btn({ onClick, label, subtitle, urdu }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-1 p-5 border border-ink/20 hover:border-ink hover:bg-ink hover:text-bone cursor-pointer transition-colors text-left"
    >
      <span
        className={`font-display text-3xl tracking-tightest leading-none ${urdu ? 'lang-ur' : ''}`}
        style={urdu ? { fontFamily: '"Noto Nastaliq Urdu", "Noto Naskh Arabic", serif', lineHeight: 1.4 } : undefined}
        dir={urdu ? 'rtl' : 'ltr'}
      >
        {label}
      </span>
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-70 mt-2 flex items-center gap-2">
        <Check size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        {subtitle}
      </span>
    </button>
  )
}
