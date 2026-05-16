import { createContext, useContext, useEffect, useState } from 'react'

const I18nCtx = createContext(null)
const STORAGE_KEY = 'f2y_lang'

export const LANGS = {
  en: { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  ur: { code: 'ur', label: 'Urdu', native: 'اردو', dir: 'rtl' },
}

const dict = {
  en: {
    // chrome
    'announce.tagline': 'Kisaan ka haq · Kissan tak · Free delivery over 2,000 Rs in Karachi',
    'nav.search_placeholder': 'Search for tomato, mango, atta…',
    'nav.account': 'Account',
    'nav.cart': 'Cart',
    'nav.all': 'All Products',
    'nav.same_day': 'Same-day delivery',
    'nav.cod': 'Cash on delivery',
    'nav.signin_signup': 'Sign in / Sign up',

    // hero
    'hero.title.1': 'Taaza sabzi,',
    'hero.title.2': 'seedha kisaan se.',
    'hero.subtitle':
      'Order fresh vegetables, fruits, dairy and more — straight from Pakistani farmers, with Cash on Delivery and no middleman markup.',
    'hero.cta.shop': 'Shop fresh produce',
    'hero.cta.call': 'Call to order',
    'hero.trust.same_day': 'Same-day in Karachi',
    'hero.trust.cod': 'Cash on Delivery',
    'hero.trust.verified': 'Verified farmers',
    'hero.pick.tag': 'PICK · 01',
    'hero.pick.fresh': 'FRESH TODAY',
    'hero.pick.meta': 'PUNJAB · PICKED 06:14 AM',
    'hero.pick.title': 'Vine-ripe tomatoes',
    'hero.pick.price': 'PKR 120 / kg',
    'hero.pick.cta': 'SHOP',
    'hero.stat.payout': 'FARMER PAYOUT',
    'hero.stat.save': 'CONSUMER SAVE',

    // categories
    'cat.eyebrow': '// CATEGORIES',
    'cat.title': 'Shop by category',
    'cat.view_all': 'View all',
    'cat.vegetables': 'Vegetables',
    'cat.fruits': 'Fruits',
    'cat.dairy': 'Dairy',
    'cat.grains': 'Grains & Daal',
    'cat.livestock': 'Livestock',
    'cat.agri': 'Agri-Inputs',

    // featured
    'feat.eyebrow': '// FEATURED',
    'feat.title': 'Hot picks this week',
    'feat.see_all': 'See all products',

    // pillars
    'pillar.direct.title': 'Direct from farmer',
    'pillar.direct.desc': 'Every order pays the farmer directly. No middleman markup, no hidden fees.',
    'pillar.expert.title': 'Plant + vet experts',
    'pillar.expert.desc': 'On-call pathologists and veterinary doctors for farmers who supply our produce.',
    'pillar.fresh.title': 'Verified, fresh, traceable',
    'pillar.fresh.desc': 'Picked, packed and dispatched the same day. Know which farm grew your food.',

    // dual cta
    'dual.family.eyebrow': 'For families',
    'dual.family.title.1': 'Stock the kitchen',
    'dual.family.title.2': 'in 5 minutes.',
    'dual.family.desc': 'Same-day Karachi delivery. Cash on Delivery available. No subscription.',
    'dual.family.cta': 'Shop now',
    'dual.shop.eyebrow': 'For shopkeepers',
    'dual.shop.title': 'Buy bulk, pay less.',
    'dual.shop.desc': 'Wholesale tier with bulk pricing for shops, restaurants and bulk buyers across Karachi.',
    'dual.shop.cta': 'View wholesale rates',

    // common
    'common.continue_shopping': 'Continue shopping',
    'common.subtotal': 'Subtotal',
    'common.delivery': 'Delivery',
    'common.total': 'Total',
    'common.free': 'FREE',
    'common.add_to_cart': 'Add to basket',
    'common.buy_now': 'Buy now (COD)',
    'common.qty': 'Quantity',
    'common.checkout': 'Checkout',
    'common.empty_basket': 'Your basket is empty.',
    'common.start_shopping': 'Start shopping',
    'common.in_stock': 'In stock',
    'common.organic': 'ORGANIC',
    'common.signin': 'Sign in',
    'common.signup': 'Create account',
    'common.signout': 'Sign out',
    'common.show_password': 'Show password',
    'common.hide_password': 'Hide password',

    // language modal
    'lang.title': 'Choose your language',
    'lang.subtitle': 'You can change this anytime in the header.',
  },
  ur: {
    'announce.tagline': 'کسان کا حق · کسان تک · کراچی میں 2,000 روپے سے زیادہ پر مفت ڈیلیوری',
    'nav.search_placeholder': 'ٹماٹر، آم، آٹا تلاش کریں…',
    'nav.account': 'اکاؤنٹ',
    'nav.cart': 'باسکٹ',
    'nav.all': 'تمام پروڈکٹس',
    'nav.same_day': 'اسی دن ڈیلیوری',
    'nav.cod': 'کیش آن ڈیلیوری',
    'nav.signin_signup': 'سائن اِن / اکاؤنٹ بنائیں',

    'hero.title.1': 'تازہ سبزی،',
    'hero.title.2': 'سیدھا کسان سے۔',
    'hero.subtitle':
      'تازہ سبزیاں، پھل، ڈیری اور مزید — پاکستانی کسانوں سے براہِ راست منگوائیں۔ کیش آن ڈیلیوری دستیاب ہے، درمیان میں کوئی منافع خور نہیں۔',
    'hero.cta.shop': 'تازہ پروڈکٹس خریدیں',
    'hero.cta.call': 'کال کر کے آرڈر کریں',
    'hero.trust.same_day': 'کراچی میں اسی دن',
    'hero.trust.cod': 'کیش آن ڈیلیوری',
    'hero.trust.verified': 'تصدیق شدہ کسان',
    'hero.pick.tag': 'پک · 01',
    'hero.pick.fresh': 'آج تازہ',
    'hero.pick.meta': 'پنجاب · صبح 06:14 پر چنا گیا',
    'hero.pick.title': 'بیل کے پکے ٹماٹر',
    'hero.pick.price': '120 روپے / کلو',
    'hero.pick.cta': 'خریدیں',
    'hero.stat.payout': 'کسان کو ادائیگی',
    'hero.stat.save': 'صارف کی بچت',

    'cat.eyebrow': '// زمرہ جات',
    'cat.title': 'زمرے کے مطابق خریدیں',
    'cat.view_all': 'سب دیکھیں',
    'cat.vegetables': 'سبزیاں',
    'cat.fruits': 'پھل',
    'cat.dairy': 'ڈیری',
    'cat.grains': 'اناج اور دال',
    'cat.livestock': 'مویشی',
    'cat.agri': 'زرعی سامان',

    'feat.eyebrow': '// خصوصی',
    'feat.title': 'اس ہفتے کی پسندیدہ',
    'feat.see_all': 'تمام پروڈکٹس دیکھیں',

    'pillar.direct.title': 'سیدھا کسان سے',
    'pillar.direct.desc': 'ہر آرڈر سیدھا کسان کو ادائیگی کرتا ہے۔ کوئی درمیانی منافع نہیں، کوئی پوشیدہ فیس نہیں۔',
    'pillar.expert.title': 'پلانٹ اور ویٹ ماہرین',
    'pillar.expert.desc': 'ہمارے کسانوں کے لیے پلانٹ پیتھولوجسٹ اور ویٹرنری ڈاکٹر آن کال موجود ہیں۔',
    'pillar.fresh.title': 'تصدیق شدہ، تازہ، قابلِ شناخت',
    'pillar.fresh.desc': 'اسی دن چنا، پیک کیا اور بھیجا گیا۔ جانیں آپ کا کھانا کس فارم سے آیا۔',

    'dual.family.eyebrow': 'گھرانوں کے لیے',
    'dual.family.title.1': 'کچن کا سامان',
    'dual.family.title.2': '5 منٹ میں۔',
    'dual.family.desc': 'کراچی میں اسی دن ڈیلیوری۔ کیش آن ڈیلیوری دستیاب ہے۔ کوئی سبسکرپشن نہیں۔',
    'dual.family.cta': 'ابھی خریدیں',
    'dual.shop.eyebrow': 'دکانداروں کے لیے',
    'dual.shop.title': 'تھوک خریدیں، کم ادا کریں۔',
    'dual.shop.desc': 'کراچی بھر میں دکانوں، ریستورانوں اور تھوک خریداروں کے لیے ہول سیل ریٹس۔',
    'dual.shop.cta': 'ہول سیل ریٹس دیکھیں',

    'common.continue_shopping': 'خریداری جاری رکھیں',
    'common.subtotal': 'سب ٹوٹل',
    'common.delivery': 'ڈیلیوری',
    'common.total': 'کل',
    'common.free': 'مفت',
    'common.add_to_cart': 'باسکٹ میں شامل کریں',
    'common.buy_now': 'ابھی خریدیں (COD)',
    'common.qty': 'مقدار',
    'common.checkout': 'چیک آؤٹ',
    'common.empty_basket': 'آپ کا باسکٹ خالی ہے۔',
    'common.start_shopping': 'خریداری شروع کریں',
    'common.in_stock': 'دستیاب ہے',
    'common.organic': 'آرگینک',
    'common.signin': 'سائن اِن',
    'common.signup': 'اکاؤنٹ بنائیں',
    'common.signout': 'سائن آؤٹ',
    'common.show_password': 'پاس ورڈ دکھائیں',
    'common.hide_password': 'پاس ورڈ چھپائیں',

    'lang.title': 'اپنی زبان منتخب کریں',
    'lang.subtitle': 'آپ یہ کبھی بھی ہیڈر سے بدل سکتے ہیں۔',
  },
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && LANGS[saved]) return saved
    } catch {}
    return null // null = not yet chosen → modal will show
  })

  const setLang = (code) => {
    if (!LANGS[code]) return
    try { localStorage.setItem(STORAGE_KEY, code) } catch {}
    setLangState(code)
  }

  // Apply lang + dir on <html>
  useEffect(() => {
    const code = lang || 'en'
    const html = document.documentElement
    html.setAttribute('lang', code)
    html.setAttribute('dir', LANGS[code].dir)
    if (code === 'ur') html.classList.add('lang-ur')
    else html.classList.remove('lang-ur')
  }, [lang])

  const t = (key, fallback) => {
    const code = lang || 'en'
    return dict[code]?.[key] ?? dict.en[key] ?? fallback ?? key
  }

  return (
    <I18nCtx.Provider value={{ lang: lang || 'en', langChosen: !!lang, setLang, t, isUrdu: lang === 'ur' }}>
      {children}
    </I18nCtx.Provider>
  )
}

export function useI18n() { return useContext(I18nCtx) }
