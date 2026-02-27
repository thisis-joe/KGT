import { ArrowRight } from 'lucide-react';

export function BusinessPortfolio() {
  const portfolioItems = [
    {
      icon: 'layers',
      title: 'Film & Tape',
      description: 'High-precision functional films and double-sided tapes for electronics and automotive applications.',
      image: 'https://images.unsplash.com/photo-1721048379815-751e1c6a748a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdGFwZSUyMHJvbGxzfGVufDF8fHx8MTc3MTU1ODI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: 'opacity',
      title: 'Raw Material',
      description: 'Premium acrylic adhesives, silicone bases, and release liners for specialized manufacturing.',
      image: 'https://images.unsplash.com/photo-1761095596584-34731de3e568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5JTIwYmVha2Vyc3xlbnwxfHx8fDE3NzE1NTgyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: 'engineering',
      title: 'Technical Service',
      description: 'Custom formulation, testing, and converting services tailored to specific client requirements.',
      image: 'https://images.unsplash.com/photo-1621905253185-95614217f357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjBlbmdpbmVlciUyMHNlcnZpY2V8ZW58MXx8fHwxNzcxNTU4Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50 dark:bg-[#141414] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-['Oswald'] font-bold mb-2 uppercase text-gray-900 dark:text-white">
              Business Portfolio
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Specialized solutions for every adhesive need.
            </p>
          </div>
          <a
            href="/catalog/KGT_Catalog_Placeholder.txt"
            download
            className="hidden md:flex items-center text-sm font-bold uppercase tracking-wide border-b-2 border-[#FFD700] pb-1 text-gray-900 dark:text-white hover:text-[#FFD700] transition-colors mt-4 md:mt-0"
          >
            Download Catalog
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="relative group h-96 overflow-hidden border-r border-b lg:border-b-0 last:border-r-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e]"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-20 grayscale group-hover:grayscale-0"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 bg-[#FFD700] rounded-full flex items-center justify-center text-black">
                  <span className="material-icons-outlined">{item.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.description}
                </p>

                {/* Link */}
                <a
                  href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[#FFD700] text-sm font-bold uppercase tracking-wider flex items-center"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
