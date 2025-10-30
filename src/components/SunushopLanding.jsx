"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Phone, Mail, MapPin, ChevronRight, Check, X, Heart, Star, Truck, Shield, Award, Ruler, Users, TrendingUp, ShoppingCart, Filter, ZoomIn, ChevronLeft, Globe, Gift, Newspaper, Calendar, Menu } from 'lucide-react';

const SunushopLanding = () => {
  const [language, setLanguage] = useState('fr');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showContact, setShowContact] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [colorFilter, setColorFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modalQty, setModalQty] = useState(1);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  const heroRef = useRef(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('sunushop_language');
      const savedCart = localStorage.getItem('sunushop_cart');
      const savedFav = localStorage.getItem('sunushop_favorites');
      const savedReduce = localStorage.getItem('sunushop_reduce_motion');
      if (savedLang) setLanguage(savedLang);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFav) setFavorites(JSON.parse(savedFav));
      if (savedReduce) setReduceMotion(savedReduce === '1');
    } catch (e) {
      // ignore hydration errors
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    try { localStorage.setItem('sunushop_language', language); } catch {}
  }, [language]);

  useEffect(() => {
    try { localStorage.setItem('sunushop_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('sunushop_favorites', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const translations = {
    fr: {
      nav: { home: 'Accueil', products: 'Produits', testimonials: 'Témoignages', about: 'À Propos', contact: 'Contact', blog: 'Blog' },
      hero: {
        title: "L'Élégance Africaine",
        subtitle: 'à Portée de Clic',
        description: 'Découvrez notre collection exclusive de Boubous traditionnels pour hommes et femmes. Commandez facilement via WhatsApp et recevez chez vous en 48h.',
        cta1: 'Voir le Catalogue',
        cta2: 'Commander Maintenant'
      },
      features: {
        quality: { title: 'Qualité Premium', desc: 'Tissus nobles et finitions artisanales impeccables' },
        order: { title: 'Commande Facile', desc: 'Achetez directement via WhatsApp en quelques clics' },
        delivery: { title: 'Livraison Rapide', desc: 'Partout au Sénégal et au Maroc en 48h chrono' }
      },
      products: {
        title: 'Notre Collection',
        subtitle: 'Tradition et modernité réunies dans chaque pièce',
        all: 'Tous',
        men: 'Hommes',
        women: 'Femmes',
        order: 'Commander',
        inStock: 'En Stock',
        outOfStock: 'Rupture',
        addToCart: 'Ajouter au Panier',
        reviews: 'avis clients',
        filters: 'Filtres',
        price: 'Prix',
        color: 'Couleur',
        availability: 'Disponibilité'
      },
      cart: {
        title: 'Mon Panier',
        empty: 'Votre panier est vide',
        total: 'Total',
        checkout: 'Commander',
        remove: 'Retirer',
        points: 'Points de fidélité gagnés'
      },
      loyalty: {
        title: 'Programme de Fidélité',
        points: 'Points',
        description: 'Gagnez 1 point pour chaque 1000 FCFA dépensés',
        rewards: 'Récompenses disponibles'
      },
      blog: {
        title: 'Actualités & Mode Africaine',
        readMore: 'Lire la suite'
      }
    },
    en: {
      nav: { home: 'Home', products: 'Products', testimonials: 'Testimonials', about: 'About', contact: 'Contact', blog: 'Blog' },
      hero: {
        title: 'African Elegance',
        subtitle: 'At Your Fingertips',
        description: 'Discover our exclusive collection of traditional Boubous for men and women. Order easily via WhatsApp and receive in 48h.',
        cta1: 'View Catalog',
        cta2: 'Order Now'
      },
      features: {
        quality: { title: 'Premium Quality', desc: 'Noble fabrics and impeccable craftsmanship' },
        order: { title: 'Easy Ordering', desc: 'Buy directly via WhatsApp in a few clicks' },
        delivery: { title: 'Fast Delivery', desc: 'Throughout Senegal and Morocco in 48h' }
      },
      products: {
        title: 'Our Collection',
        subtitle: 'Tradition and modernity united in every piece',
        all: 'All',
        men: 'Men',
        women: 'Women',
        order: 'Order',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        addToCart: 'Add to Cart',
        reviews: 'customer reviews',
        filters: 'Filters',
        price: 'Price',
        color: 'Color',
        availability: 'Availability'
      },
      cart: {
        title: 'My Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Checkout',
        remove: 'Remove',
        points: 'Loyalty points earned'
      },
      loyalty: {
        title: 'Loyalty Program',
        points: 'Points',
        description: 'Earn 1 point for every 1000 FCFA spent',
        rewards: 'Available Rewards'
      },
      blog: {
        title: 'News & African Fashion',
        readMore: 'Read more'
      }
    }
  };

  const t = translations[language];

  const formatDate = (iso, lang) => {
    const [y, m, d] = iso.split('-');
    if (lang === 'fr') return `${d}/${m}/${y}`;
    return `${m}/${d}/${y}`;
  };

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || reduceMotion) return; // disable parallax on reduced motion

    let ticking = false;
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduceMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animId]));
            obs.unobserve(entry.target); // animate once then stop observing
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    document.querySelectorAll('[data-anim-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try { localStorage.setItem('sunushop_reduce_motion', reduceMotion ? '1' : '0'); } catch {}
  }, [reduceMotion]);

  const products = [
    {
      id: 1,
      name: { fr: 'Costume africain', en: 'African Suit' },
      category: 'homme',
      price: 45000,
      images: [
        '/images/b1.webp',
        '/images/b2.webp'
      ],
      description: { fr: 'Costume africain en coton bleu clair haut de gamme, au tissage léger et ultra‑respirant. Silhouette élégante, détails raffinés et confort irréprochable — idéal pour sublimer vos journées ensoleillées.', en: 'Premium light‑blue cotton African suit with an airy, breathable weave. Elegant silhouette, refined detailing, and effortless comfort — perfect for warm, sunny days.' },
      rating: 4.9,
      reviews: 127,
      inStock: true,
      color: 'beige',
      colors: ['beige', 'white', 'blue']
    },
    {
      id: 2,
      name: { fr: 'Robe africaine', en: 'African Dress' },
      category: 'femme',
      price: 40000,
      images: [
        '/images/b3.webp',
        '/images/b4.webp'
      ],
      description: { fr: 'Robe africaine rouge et blanc, légère et respirante — parfaite pour la chaleur tropicale. Style contemporain mêlant tradition et modernité, finitions soignées et confort élégant toute la journée.', en: 'Red and white African dress, lightweight and breathable — perfect for tropical heat. Contemporary style blending tradition and modernity, refined finishes and elegant all‑day comfort.' },
      rating: 4.8,
      reviews: 98,
      inStock: true,
      color: 'red',
      colors: ['red', 'white']
    },
    {
      id: 3,
      name: { fr: 'Costume africain gris', en: 'Grey African Suit' },
      category: 'homme',
      price: 38000,
      images: [
        '/images/b6.webp'
      ],
      description: { fr: 'Costume africain en coton gris, coupe relax et décontractée qui passe partout. Tissage respirant, style polyvalent et confort premium — l’essentiel chic du quotidien.', en: 'Grey cotton African suit with a relaxed, easygoing fit for any occasion. Breathable weave, versatile style, and premium comfort — your everyday essential.' },
      rating: 5.0,
      reviews: 156,
      inStock: true,
      color: 'gray',
      colors: ['gray', 'black', 'white']
    },
    {
      id: 4,
      name: { fr: 'Grand boubou 3 pièces', en: 'Grand Boubou 3-piece' },
      category: 'homme',
      price: 150000,
      images: [
        '/images/b7.webp'
      ],
      description: { fr: "Grand boubou 3 pièces beige en ganila d'origine Autriche, tissu qualité premium. Tombé impeccable, allure majestueuse et confort luxueux pour les grandes occasions.", en: "Beige 3-piece grand boubou in Austrian original ganila, premium-grade fabric. Impeccable drape, majestic presence, and luxurious comfort for special occasions." },
      rating: 4.9,
      reviews: 143,
      inStock: true,
      color: 'beige',
      colors: ['beige', 'white', 'gold']
    },
    {
      id: 5,
      name: { fr: 'Taille basse blanche', en: 'White Low-Rise' },
      category: 'femme',
      price: 70000,
      images: [
        '/images/b8.webp'
      ],
      description: { fr: "Taille basse blanche en ganila d'origine Autriche, qualité premium. Tissu élégant et résistant, toucher doux et tenue impeccable au quotidien.", en: "White low-rise in original Austrian ganila, premium quality. Elegant, durable fabric with a soft handfeel and impeccable everyday drape." },
      rating: 5.0,
      reviews: 89,
      inStock: false,
      color: 'white',
      colors: ['white']
    },
    {
      id: 6,
      name: { fr: 'Grand boubou Linguère', en: 'Linguere Grand Boubou' },
      category: 'femme',
      price: 16000,
      images: [
        '/images/b9.webp'
      ],
      description: { fr: "Grand boubou Linguère en ganila bleu clair, tissu de qualité supérieure d'origine Allemagne. Tombé fluide, éclat raffiné et confort élégant pour sublimer votre allure.", en: 'Light‑blue ganila Linguere grand boubou with superior German fabric. Fluid drape, refined sheen, and elegant comfort to elevate your style.' },
      rating: 4.8,
      reviews: 112,
      inStock: true,
      color: 'blue',
      colors: ['blue', 'white']
    },
    {
      id: 7,
      name: { fr: 'Grand boubou grande dame', en: 'Grand Boubou Grande Dame' },
      category: 'femme',
      price: 100000,
      images: [
        '/images/b5.webp'
      ],
      description: { fr: 'Grand boubou de grande dame, décontracté et élégant pour les grandes occasions. Tissu palman rouge et noir venant de Guinée — prestance, fluidité et finitions premium.', en: 'Grand boubou for distinguished ladies, relaxed yet elegant for special occasions. Palman red and black fabric from Guinea — poise, fluid drape, and premium finishing.' },
      rating: 4.7,
      reviews: 76,
      inStock: true,
      color: 'red',
      colors: ['red', 'black']
    },
    {
      id: 8,
      name: { fr: 'Costume africain bleu bic', en: 'African Suit Deep Blue' },
      category: 'homme',
      price: 25000,
      images: [
        '/images/b2.webp'
      ],
      description: { fr: "Costume africain bleu bic élégant, en tissu de qualité premium venant d'Australie. Coupe soignée, tenue impeccable et confort léger pour un style affirmé au quotidien.", en: 'Elegant deep-blue African suit crafted from premium Australian fabric. Clean lines, impeccable drape, and lightweight comfort for confident everyday style.' },
      rating: 4.8,
      reviews: 88,
      inStock: true,
      color: 'blue',
      colors: ['blue', 'white']
    },
    {
      id: 9,
      name: { fr: 'Robe en soie multicolore', en: 'Multicolor Silk Dress' },
      category: 'femme',
      price: 45000,
      images: [
        '/images/b4.webp'
      ],
      description: { fr: 'Robe en soie multicolore élégante, idéale pour des sorties imprévues. Confortable, discrète et très jolie — un look chic sans effort.', en: 'Elegant multicolor silk dress, perfect for spontaneous outings. Comfortable, discreet, and very pretty — effortless chic.' },
      rating: 4.9,
      reviews: 94,
      inStock: true,
      color: 'pink',
      colors: ['pink', 'yellow', 'white']
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: { fr: 'Grand Boubou Prestige', en: 'Grand Prestige Boubou' },
      excerpt: { fr: 'Broderies géométriques raffinées et allure majestueuse.', en: 'Refined geometric embroidery with a majestic look.' },
      image: '/images/b1.webp',
      date: '2024-10-15',
      author: 'SUNUSHOP'
    },
    {
      id: 2,
      title: { fr: 'Ensemble Moderne Élite', en: 'Modern Elite Set' },
      excerpt: { fr: 'Coupe contemporaine, tradition et modernité réunies.', en: 'Contemporary cut combining tradition and modernity.' },
      image: '/images/b3.webp',
      date: '2024-10-10',
      author: 'SUNUSHOP'
    },
    {
      id: 3,
      title: { fr: 'Ensemble Brodé Royal', en: 'Royal Embroidered Set' },
      excerpt: { fr: 'Détails floraux délicats et colorés, blanc intemporel.', en: 'Delicate colorful floral details, timeless white.' },
      image: '/images/b6.webp',
      date: '2024-10-05',
      author: 'SUNUSHOP'
    }
  ];


  const filteredProducts = products.filter(p => {
    const categoryMatch = activeCategory === 'all' || p.category === activeCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    const colorMatch = colorFilter === 'all' || p.color === colorFilter;
    const stockMatch = stockFilter === 'all' || (stockFilter === 'inStock' ? p.inStock : !p.inStock);
    return categoryMatch && priceMatch && colorMatch && stockMatch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    setCart(prev => prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const decreaseQty = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    if (item.quantity > 1) {
      setCart(prev => prev.map(p => p.id === productId ? { ...p, quantity: p.quantity - 1 } : p));
    } else {
      // quantity would go to 0 -> remove item entirely
      removeFromCart(productId);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openImageModal = (product, index = 0) => {
    setSelectedProduct(product);
    setCurrentImageIndex(index);
    setShowImageModal(true);
    setModalQty(1);
  };

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const addToCartWithQty = (product, qty) => {
    if (!qty || qty < 1) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleWhatsApp = (product = null) => {
    const phone = '212701193811';
    let message = product 
      ? `${language === 'fr' ? 'Bonjour' : 'Hello'} SUNUSHOP 👋\n\n${language === 'fr' ? "Je suis intéressé(e) par" : "I'm interested in"} :\n📦 *${product.name[language]}*\n💰 ${language === 'fr' ? 'Prix' : 'Price'} : ${product.price.toLocaleString()} FCFA\n\n${language === 'fr' ? "Pouvez-vous me donner plus d\\'informations ?" : 'Can you give me more information?'}\n\n${language === 'fr' ? 'Merci' : 'Thank you'} ! 🙏` 
      : `${language === 'fr' ? 'Bonjour' : 'Hello'} SUNUSHOP 👋\n\n${language === 'fr' ? "Je découvre votre collection et j\\'aimerais en savoir plus." : "I'm discovering your collection and would like to know more."}\n\n${language === 'fr' ? "Pouvez-vous m\\'aider ?" : 'Can you help me?'} 🙏`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCheckout = () => {
    const cartDetails = cart.map(item => 
      `• ${item.name[language]} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FCFA` 
    ).join('\n');
    
    const message = `${language === 'fr' ? 'Bonjour' : 'Hello'} SUNUSHOP 👋\n\n${language === 'fr' ? 'Je souhaite finaliser ma commande' : 'I would like to finalize my order'} :\n\n${cartDetails}\n\n💰 *Total: ${cartTotal.toLocaleString()} FCFA*\n\n${language === 'fr' ? 'Merci' : 'Thank you'} ! 🙏`;
    
    window.open(`https://wa.me/212701193811?text=${encodeURIComponent(message)}`, '_blank');
    setShowCart(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setFormStatus(null);
        setShowContact(false);
      }, 2000);
    }, 1500);
  };

  const rotationDegree = (scrollY / 10) % 360;

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 overflow-visible min-h-[64px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group my-0">
                <img src="/images/logo.webp" alt="SunuShop" className="h-20 w-auto object-contain transition-transform group-hover:scale-105" />
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#accueil" className="text-gray-700 hover:text-teal-700 transition-all hover:scale-105">{t.nav.home}</a>
              <a href="#produits" className="text-gray-700 hover:text-teal-700 transition-all hover:scale-105">{t.nav.products}</a>
              
              <a href="#apropos" className="text-gray-700 hover:text-teal-700 transition-all hover:scale-105">{t.nav.about}</a>
              <button onClick={() => setShowContact(true)} className="text-gray-700 hover:text-teal-700 transition-all hover:scale-105">{t.nav.contact}</button>
            </nav>

            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white text-black border-2 border-gray-200 hover:border-teal-700 transition-all hover:scale-105"
              >
                <span className="text-xl">{language === 'fr' ? '🇫🇷' : '🇺🇸'}</span>
                <span className="font-semibold">{language.toUpperCase()}</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 rounded-lg transition-all hover:scale-105 bg-[#1D8D4C] hover:bg-[#167342] text-white"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setShowMobileNav(true)} className="md:hidden p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-700">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" ref={heroRef} className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white py-32 overflow-hidden">
        <img src="/images/hero.webp" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 via-teal-800/30 to-teal-700/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-10 left-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl ${reduceMotion ? '' : 'animate-pulse'} hidden md:block`} style={{ willChange: 'transform', transform: reduceMotion ? undefined : `translate3d(0, ${-scrollY * 0.08}px, 0) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})` }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl hidden md:block" style={{ willChange: 'transform', transform: reduceMotion ? undefined : `translate3d(0, ${-scrollY * 0.12}px, 0) scale(${1 + Math.cos(scrollY * 0.01) * 0.3})` }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-500 rounded-full blur-3xl hidden md:block" style={{ willChange: 'transform', transform: reduceMotion ? undefined : `translate3d(-50%, calc(-50% + ${-scrollY * 0.06}px), 0) scale(${1 + Math.sin(scrollY * 0.015) * 0.25})` }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${reduceMotion ? '' : 'animate-fade-in'}`}>
              {t.hero.title} <br />
              <span className="text-yellow-400 inline-block animate-bounce-slow">{t.hero.subtitle}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#produits" className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-2xl hover:-translate-y-0.5 focus-visible:ring-4 ring-red-300/50 inline-flex items-center justify-center space-x-2 active:scale-95">
                <span>{t.hero.cta1}</span>
                <ChevronRight size={20} className="animate-pulse" />
              </a>
              <button onClick={() => handleWhatsApp()} className="bg-white text-teal-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-2xl hover:-translate-y-0.5 focus-visible:ring-4 ring-teal-300/50 inline-flex items-center justify-center space-x-2 active:scale-95">
                <Phone size={20} />
                <span>{t.hero.cta2}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* Products Section */}
      <section id="produits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-anim-id="products-header" className={`text-center mb-16 ${visibleElements.has('products-header') ? (reduceMotion ? '' : 'animate-fade-in-up') : 'opacity-0 translate-y-6'}`}>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{t.products.title}</h2>
            <p className="text-xl text-gray-600">{t.products.subtitle}</p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
            <div className="flex gap-3">
              {['all', 'homme', 'femme'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full border-2 font-semibold transition-all hover:scale-105 ${activeCategory === cat ? 'bg-teal-700 border-teal-700 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {cat === 'all' ? t.products.all : cat === 'homme' ? t.products.men : t.products.women}
                </button>
              ))}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-6 py-3 bg-white rounded-lg hover:bg-gray-100 transition-all hover:scale-105">
              <Filter size={20} />
              <span className="font-semibold">{t.products.filters}</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 mb-12 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-semibold mb-3">{t.products.price}: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} FCFA</label>
                  <input type="range" min="0" max="200000" step="5000" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full" />
                </div>
                <div>
                  <label className="block font-semibold mb-3">{t.products.color}</label>
                  <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                    <option value="all">{t.products.all}</option>
                    <option value="white">Blanc</option>
                    <option value="beige">Beige</option>
                    <option value="red">Rouge</option>
                    <option value="blue">Bleu</option>
                    <option value="gold">Or</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-3">{t.products.availability}</label>
                  <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                    <option value="all">{t.products.all}</option>
                    <option value="inStock">{t.products.inStock}</option>
                    <option value="outOfStock">{t.products.outOfStock}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} data-anim-id={`product-${product.id}`} className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group ${visibleElements.has(`product-${product.id}`) ? (reduceMotion ? '' : 'animate-fade-in-up') : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative h-96 overflow-hidden cursor-pointer" onClick={() => openImageModal(product, 0)}>
                  <img src={product.images[0]} alt={product.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {product.price.toLocaleString()} FCFA
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className={`absolute top-4 left-4 p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${favorites.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'}`}>
                    <Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  {product.inStock ? (
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {t.products.inStock}
                    </div>
                  ) : (
                    <div className="absolute bottom-4 left-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {t.products.outOfStock}
                    </div>
                  )}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full">
                    <ZoomIn size={24} className="text-gray-700" />
                  </div>
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                      +{product.images.length - 1}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <button
                      onClick={() => setActiveCategory(product.category)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors ${product.category === 'homme' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'}`}
                    >
                      {product.category === 'homme' ? t.products.men : t.products.women}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name[language]}</h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-1">{product.description[language]}</p>
                  <p className="text-sm text-gray-500 mb-4">{product.reviews} {t.products.reviews}</p>
                  
                  {/* Color Options */}
                  <div className="flex gap-2 mb-4">
                    {product.colors.map((color, cidx) => (
                      <div key={cidx} className={`w-6 h-6 rounded-full border-2 ${color === product.color ? 'border-teal-700' : 'border-gray-300'} hover:scale-110 transition-transform cursor-pointer`} style={{ backgroundColor: color === 'beige' ? '#F5F5DC' : color === 'white' ? '#FFFFFF' : color === 'red' ? '#DC2626' : color === 'blue' ? '#3B82F6' : color === 'gold' ? '#FFD700' : color === 'black' ? '#000000' : color === 'pink' ? '#EC4899' : color === 'yellow' ? '#FBBF24' : color === 'orange' ? '#F97316' : color === 'cream' ? '#FFFDD0' : color === 'silver' ? '#C0C0C0' : color }}></div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => addToCart(product)} disabled={!product.inStock} className="flex-1 bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ShoppingCart size={18} />
                      <span>{t.products.addToCart}</span>
                    </button>
                    <button onClick={() => handleWhatsApp(product)} className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95">
                      <Phone size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">{language === 'fr' ? 'Aucun produit trouvé avec ces filtres' : 'No products found with these filters'}</p>
            </div>
          )}
        </div>
      </section>

      

      {/* About Section */}
      <section id="apropos" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-anim-id="about-text" className={`${visibleElements.has('about-text') ? 'animate-reveal-left' : 'opacity-0 -translate-x-6'}`}>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">{language === 'fr' ? 'À Propos de SUNUSHOP' : 'About SUNUSHOP'}</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                {language === 'fr' ? 'SUNUSHOP est votre destination privilégiée pour des Boubous traditionnels de qualité premium. Nous célébrons l\'élégance africaine en proposant des pièces authentiques qui allient tradition et modernité.' : 'SUNUSHOP is your premier destination for premium quality traditional Boubous. We celebrate African elegance by offering authentic pieces that combine tradition and modernity.'}
              </p>
              <div className="space-y-4 mt-8">
                {[
                  language === 'fr' ? 'Tissus nobles et authentiques importés' : 'Noble and authentic imported fabrics',
                  language === 'fr' ? 'Finitions artisanales soignées' : 'Careful artisanal finishes',
                  language === 'fr' ? 'Service client réactif 7j/7' : 'Responsive customer service 7/7',
                  language === 'fr' ? 'Livraison rapide à Dakar et partout au Sénégal' : 'Fast delivery in Dakar and across Senegal'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <Check className="text-teal-700 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-anim-id="about-image" className={`relative ${visibleElements.has('about-image') ? 'animate-reveal-right' : 'opacity-0 translate-x-6'}`}>
              <div className="relative group">
                <img src="/images/about.webp" alt="Boubou" className="rounded-2xl shadow-2xl" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-teal-400">Sunu</span>
                <span className="text-red-400">Shop</span>
              </div>
              <p className="text-gray-400">{language === 'fr' ? 'L\'élégance africaine à portée de clic' : 'African elegance at your fingertips'}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'fr' ? 'Navigation' : 'Navigation'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#accueil" className="hover:text-white transition">{t.nav.home}</a></li>
                <li><a href="#produits" className="hover:text-white transition">{t.nav.products}</a></li>
                
                <li><a href="#apropos" className="hover:text-white transition">{t.nav.about}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2"><Phone size={16} /> <span>+212701193811</span></li>
                <li className="flex items-center space-x-2"><Mail size={16} /> <span>support@sunushop.com</span></li>
                <li className="flex items-center space-x-2"><MapPin size={16} /> <span>Thiès, Sénégal</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">OMA Digital</h4>
              <p className="text-sm text-gray-400 mb-2">{language === 'fr' ? 'Agence panafricaine de solutions digitales' : 'Pan-African digital solutions agency'}</p>
              <p className="text-sm text-gray-500">www.omadigital.net</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 SUNUSHOP. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button onClick={() => handleWhatsApp()} className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 hover:scale-110 active:scale-95 animate-bounce-slow">
        <Phone size={28} />
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all">
              <X size={28} />
            </button>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
              <ShoppingCart size={32} className="text-teal-700" />
              <span>{t.cart.title}</span>
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">{t.cart.empty}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                    <img src={item.images[0]} alt={item.name[language]} className="w-24 h-24 object-cover rounded-lg" loading="lazy" />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{item.name[language]}</h4>
                      <p className="text-gray-600">{item.price.toLocaleString()} FCFA</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">{language === 'fr' ? 'Quantité' : 'Quantity'}:</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center">-</button>
                          <span className="min-w-6 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => increaseQty(item.id)} className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                        <X size={20} />
                      </button>
                      <p className="font-bold text-lg">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}

                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold">{t.cart.total}:</span>
                    <span className="text-3xl font-bold text-teal-700">{cartTotal.toLocaleString()} FCFA</span>
                  </div>
                  
                  <button onClick={handleCheckout} className="w-full bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-teal-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                    <Phone size={20} />
                    <span>{t.cart.checkout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Modal with Carousel */}
      {showImageModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button onClick={() => setShowImageModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 transition">
            <X size={40} />
          </button>

          <div className="relative w-full max-w-5xl bg-white/5 rounded-2xl p-4 md:p-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left: Carousel */}
              <div className="relative">
                <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name[language]} className="w-full h-auto max-h-[70vh] object-contain rounded-xl bg-black/20" />
                {selectedProduct.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition">
                      <ChevronLeft size={28} />
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition">
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
                {selectedProduct.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {selectedProduct.images.map((src, idx) => (
                      <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`border-2 rounded-lg overflow-hidden ${idx === currentImageIndex ? 'border-white' : 'border-white/40'}`}>
                        <img src={src} alt={`thumb-${idx}`} className="w-full h-16 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="text-white">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{selectedProduct.name[language]}</h3>
                  <div className="flex items-center space-x-1 text-yellow-300">
                    <Star size={18} fill="currentColor" />
                    <span className="text-sm font-semibold">{selectedProduct.rating}</span>
                    <span className="text-xs text-gray-300">({selectedProduct.reviews} {t.products.reviews})</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {selectedProduct.inStock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">{t.products.inStock}</span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-500 text-white text-xs font-semibold">{t.products.outOfStock}</span>
                  )}
                  <span className="text-lg font-bold ml-auto bg-red-600 px-3 py-1 rounded-lg">{selectedProduct.price.toLocaleString()} FCFA</span>
                </div>
                <p className="mt-4 text-gray-200">{selectedProduct.description[language]}</p>

                {/* Colors */}
                {selectedProduct.colors && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-300 mb-2">{language === 'fr' ? 'Couleurs disponibles' : 'Available colors'}</div>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color, cidx) => (
                        <div key={cidx} className={`w-6 h-6 rounded-full border-2 border-white/60`} style={{ backgroundColor: color === 'beige' ? '#F5F5DC' : color === 'white' ? '#FFFFFF' : color === 'red' ? '#DC2626' : color === 'blue' ? '#3B82F6' : color === 'gold' ? '#FFD700' : color === 'black' ? '#000000' : color === 'pink' ? '#EC4899' : color === 'yellow' ? '#FBBF24' : color === 'orange' ? '#F97316' : color === 'cream' ? '#FFFDD0' : color === 'silver' ? '#C0C0C0' : color === 'gray' ? '#6B7280' : color }}></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qty + Actions */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                    <button onClick={() => setModalQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-md bg-white/20 hover:bg-white/30 text-white flex items-center justify-center">-</button>
                    <span className="min-w-8 text-center font-semibold">{modalQty}</span>
                    <button onClick={() => setModalQty(q => q + 1)} className="w-9 h-9 rounded-md bg-white/20 hover:bg-white/30 text-white flex items-center justify-center">+</button>
                  </div>

                  <button onClick={() => addToCartWithQty(selectedProduct, modalQty)} disabled={!selectedProduct.inStock} className="flex-1 bg-[#1D8D4C] hover:bg-[#167342] text-white py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                    {language === 'fr' ? 'Ajouter au Panier' : 'Add to Cart'}
                  </button>

                  <button onClick={() => handleWhatsApp(selectedProduct)} className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95">
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
            <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all">
              <X size={28} />
            </button>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t.nav.contact}</h3>
            
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600" size={40} />
                </div>
                <p className="text-2xl font-semibold text-gray-900">{language === 'fr' ? 'Message envoyé !' : 'Message sent!'}</p>
              </div>
            ) : (
              <div className="space-y-5">
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder={language === 'fr' ? 'Nom' : 'Name'} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder={language === 'fr' ? 'Sujet' : 'Subject'} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"></textarea>
                <button onClick={handleSubmit} disabled={formStatus === 'sending'} className="w-full bg-teal-700 text-white py-4 rounded-xl font-semibold hover:bg-teal-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                  {formStatus === 'sending' ? (language === 'fr' ? 'Envoi...' : 'Sending...') : (language === 'fr' ? 'Envoyer' : 'Send')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default SunushopLanding;
