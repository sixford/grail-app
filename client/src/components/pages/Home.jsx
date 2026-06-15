import { Link } from 'react-router-dom'

const featuredItems = [
  {
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  },
  {
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600&h=600&fit=crop',
  },
  {
    brand: 'Jordan',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop',
  },
  {
    brand: 'New Balance',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop',
  },
]

export default function Home() {
  return (
    <div className="bg-cream">
      {/* Announcement bar */}
      <div className="bg-electric text-cream text-center py-2 px-4">
        <p className="font-sans text-xs md:text-sm tracking-widest2 uppercase underline">
          New drops added weekly &mdash; check the feed
        </p>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 pt-20 pb-16 text-center">
        <p className="font-sans text-sm md:text-base tracking-widest2 uppercase text-electric underline mb-8">
          If you&rsquo;re hunting for your next pair,
        </p>
        <h1 className="font-serif text-electric text-[13vw] md:text-[7vw] leading-[1.05] tracking-tight">
          YOU HAVE TO<br />
          FIND THE <span className="italic">RIGHT</span><br />
          ONES, <span className="italic">FIRST.</span>
        </h1>
      </section>

      {/* Marquee strip */}
      <div className="bg-electric text-cream overflow-hidden whitespace-nowrap py-3 border-y border-ink/10">
        <div className="inline-block animate-[marquee_30s_linear_infinite]">
          {Array(2).fill('SNEAKERS — STREETWEAR — COLLABS — RESELL — GRAIL — ').map((text, i) => (
            <span key={i} className="font-sans text-sm tracking-widest2 uppercase mx-2">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Featured grid */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {featuredItems.map((item) => (
          <Link
            to="/homefeed"
            key={item.brand}
            className="relative aspect-square overflow-hidden group"
          >
            <img
              src={item.image}
              alt={item.brand}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-4 left-4 font-serif text-cream text-2xl md:text-3xl drop-shadow-lg">
              {item.brand}
            </span>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-8">
          Ready to find your grail?
        </h2>
        <Link
          to="/homefeed"
          className="inline-block bg-electric text-cream px-10 py-4 font-sans text-sm uppercase tracking-widest2 hover:bg-ink transition-colors duration-300"
        >
          Browse the Marketplace
        </Link>
      </section>
    </div>
  )
}