import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import experiences, { WHATSAPP_NUMBER } from './experiences';
import TripBuilder from './TripBuilder';
import './style.css';

function SafeImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={className}
        role="img"
        aria-label={alt}
        style={{ background: '#252525' }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const destinationDetails = {
  'great-pyramids-of-giza': {
    subtitle: 'THE LAST REMAINING WONDER OF THE ANCIENT WORLD',
    hero: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=2000&q=90',
    about:
      'Step into the extraordinary world of ancient Egypt and stand before the Great Pyramids of Giza. Built thousands of years ago, these monumental structures remain among humanity’s greatest architectural achievements. Discover their fascinating history, explore the Giza Plateau, and enjoy breathtaking views of the desert landscape.',
    highlights: [
      'The Great Pyramid of Khufu',
      'The Pyramid of Khafre',
      'The Pyramid of Menkaure',
      'The Great Sphinx',
      'Panoramic views of the Giza Plateau',
      'Memorable photography opportunities',
    ],
    places: [
      {
        title: 'The Great Pyramid of Khufu',
        description:
          'Discover the largest pyramid in Giza and the only surviving wonder of the ancient world. Learn about its construction, remarkable architecture, and the mysteries surrounding its history.',
        image:
          'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'The Pyramid of Khafre',
        description:
          'Admire the pyramid of Khafre, recognizable by the remaining casing stones near its summit. It stands beside the Great Sphinx and forms a magnificent part of the Giza landscape.',
        image:
          'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'The Great Sphinx',
        description:
          'Meet one of Egypt’s most iconic monuments: a monumental sculpture with the body of a lion and the head of a king. Discover the stories and theories connected to this ancient guardian.',
        image:
          'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    itinerary: [
      'Private pickup from your hotel in Cairo or Giza.',
      'Arrival at the Giza Plateau and introduction to its history.',
      'Explore the Great Pyramids and discover their fascinating stories.',
      'Visit the Great Sphinx and enjoy the surrounding views.',
      'Enjoy time for photography at selected panoramic viewpoints.',
      'Private transfer back to your hotel.',
    ],
    included: [
      'Private air-conditioned transportation',
      'Professional English-speaking guide',
      'Hotel pickup and drop-off',
      'Personalized tour assistance',
    ],
    note: 'Entrance tickets, access inside the pyramids, meals, and additional services should be confirmed with our team before booking.',
  },

  'grand-egyptian-museum': {
    subtitle: 'A JOURNEY THROUGH THOUSANDS OF YEARS',
    hero: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Egyptian_Museum_Facade.jpg',
    about:
      'Discover the fascinating world of ancient Egyptian civilization at the Grand Egyptian Museum, located near the Giza Pyramids. Explore remarkable archaeological collections, monumental statues, and objects that reveal the stories of Egypt’s kings, queens, and everyday life.',
    highlights: [
      'Explore the Grand Egyptian Museum',
      'Discover remarkable ancient artifacts',
      'Learn about Egyptian kings and queens',
      'Admire monumental statues',
      'Explore the museum architecture',
      'Enjoy a cultural experience with a guide',
    ],
    places: [
      {
        title: 'The Grand Hall',
        description:
          'Begin your museum experience in the monumental entrance hall, where the colossal statue of King Ramses II welcomes visitors beneath the museum’s impressive modern architecture.',
        image:
          'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Egyptian_Museum_Grand_Hall_%28Atrium%29.jpg',
      },
      {
        title: 'Ancient Egyptian Collections',
        description:
          'Explore original ancient Egyptian statues and archaeological treasures displayed inside the Grand Egyptian Museum, revealing the history, beliefs, and achievements of ancient Egyptian civilization.',
        image:
          'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Egyptian_Museum_-_Row_of_Old_Kingdom_statues.jpg',
      },
      {
        title: 'Museum Architecture',
        description:
          'Admire the real exterior architecture of the Grand Egyptian Museum, its monumental geometric design, and its distinctive façade overlooking the Giza Plateau.',
        image:
          'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Egyptian_Museum_Facade.jpg',
      },
    ],
    itinerary: [
      'Private pickup from your hotel.',
      'Arrival at the Grand Egyptian Museum.',
      'Explore the museum’s available galleries and collections.',
      'Discover the stories behind selected artifacts.',
      'Enjoy free time for photography and exploration.',
      'Return transfer to your hotel.',
    ],
    included: [
      'Private air-conditioned transportation',
      'Professional English-speaking guide',
      'Hotel pickup and drop-off',
      'Personalized tour assistance',
    ],
    note: 'Museum admission and access to specific galleries should be confirmed with our team before booking.',
  },

  'nile-dinner-cruise': {
    subtitle: 'AN UNFORGETTABLE EVENING ON THE NILE',
    hero: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=90',
    about:
      'Experience Cairo from a different perspective with an evening on the legendary Nile River. Enjoy beautiful city views, a relaxing atmosphere, dinner, and live entertainment aboard a Nile cruise. It is a wonderful way to experience the spirit of Cairo after sunset.',
    highlights: [
      'Cruise along the legendary Nile River',
      'Enjoy dinner onboard',
      'Discover Cairo’s night atmosphere',
      'Live entertainment',
      'Beautiful river views',
      'An unforgettable evening experience',
    ],
    places: [
      {
        title: 'The Nile River',
        description:
          'Enjoy the atmosphere of sailing along the river that has shaped Egyptian life and civilization for thousands of years.',
        image:
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Dinner Onboard',
        description:
          'Relax and enjoy your dinner while taking in the beautiful atmosphere of the Nile.',
        image:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Cairo by Night',
        description:
          'See the city from the river and enjoy the lights and atmosphere of Cairo after dark.',
        image:
          'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    itinerary: [
      'Pickup from your hotel.',
      'Arrival at the selected Nile cruise boat.',
      'Board the cruise and settle into your table.',
      'Enjoy dinner and onboard entertainment.',
      'Experience the Nile views throughout the evening.',
      'Return transfer to your hotel.',
    ],
    included: [
      'Nile dinner cruise experience',
      'Dinner onboard',
      'Entertainment as offered by the selected cruise',
      'Hotel pickup and drop-off',
    ],
    note: 'Cruise schedule, menu, beverages, entertainment, and table arrangements are subject to the selected boat and should be confirmed before booking.',
  },

  'vip-airport-welcome': {
    subtitle: 'ARRIVE IN EGYPT THE COMFORTABLE WAY',
    hero: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=90',
    about:
      'Start your Egyptian journey with a smooth and comfortable arrival. Our VIP airport welcome experience is designed to make your arrival easier with personalized assistance, meet-and-greet coordination, and support throughout the airport arrival process.',
    highlights: [
      'Personalized airport meet and greet',
      'Arrival assistance',
      'Dedicated guest support',
      'Transfer coordination',
      'A comfortable start to your trip',
      'Personalized service',
    ],
    places: [
      {
        title: 'Airport Meet & Greet',
        description:
          'A representative welcomes you at the agreed meeting point and helps coordinate your arrival experience.',
        image:
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Arrival Assistance',
        description:
          'Receive personalized guidance and assistance with the agreed arrival arrangements.',
        image:
          'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Private Transfer',
        description:
          'Continue your journey with a coordinated transfer to your hotel or preferred destination.',
        image:
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    itinerary: [
      'Share your flight details with our team.',
      'Confirm the airport meeting point and service arrangements.',
      'Meet your representative upon arrival.',
      'Receive the agreed airport assistance.',
      'Meet your driver if a transfer is included.',
      'Continue to your destination.',
    ],
    included: [
      'Airport meet and greet',
      'Personalized arrival assistance',
      'Guest support',
      'Transfer coordination',
    ],
    note: 'Airport access, fast-track services, visa assistance, baggage handling, and private transfers depend on the selected service package and must be confirmed in advance.',
  },

  'private-chauffeur': {
    subtitle: 'YOUR CITY. YOUR SCHEDULE. YOUR PRIVATE RIDE.',
    hero: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90',
    about:
      'Explore Egypt at your own pace with a private chauffeur service. Enjoy the comfort of a dedicated vehicle and professional driver, with a flexible schedule tailored to your plans. Whether you are exploring Cairo, attending meetings, or visiting attractions, travel with comfort and convenience.',
    highlights: [
      'Private vehicle and driver',
      'Flexible daily schedule',
      'Comfortable transportation',
      'Personalized pickup arrangements',
      'Convenient city travel',
      'A service tailored to your itinerary',
    ],
    places: [
      {
        title: 'Cairo City',
        description:
          'Travel around Cairo and discover its landmarks, neighborhoods, restaurants, and attractions at your own pace.',
        image:
          'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Giza & The Pyramids',
        description:
          'Arrange a comfortable visit to the Giza area and its famous ancient monuments.',
        image:
          'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Your Private Journey',
        description:
          'Create a travel schedule based on your preferred destinations and daily plans.',
        image:
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    itinerary: [
      'Share your preferred date and pickup location.',
      'Confirm your destinations and daily schedule.',
      'Meet your professional driver.',
      'Travel according to your personalized itinerary.',
      'Enjoy the flexibility of your private journey.',
      'Return to your preferred destination.',
    ],
    included: [
      'Private vehicle',
      'Professional driver',
      'Agreed transportation service',
      'Personalized pickup arrangements',
    ],
    note: 'Vehicle category, working hours, mileage limits, waiting time, fuel, parking, and additional charges should be confirmed with our team.',
  },

  'old-cairo-khan-el-khalili': {
    subtitle: 'DISCOVER THE SOUL OF HISTORIC CAIRO',
    hero: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2000&q=90',
    about:
      'Explore the character and history of Old Cairo, where historic architecture, traditional streets, and local culture come together. Walk through the famous Khan El Khalili bazaar, discover traditional crafts, and experience the lively atmosphere of one of Cairo’s most memorable districts.',
    highlights: [
      'Explore historic Cairo',
      'Discover Khan El Khalili bazaar',
      'See traditional architecture',
      'Explore local shops and crafts',
      'Experience Egyptian culture',
      'Enjoy memorable photography opportunities',
    ],
    places: [
      {
        title: 'Khan El Khalili',
        description:
          'Walk through one of Cairo’s best-known traditional markets, famous for its lively streets, crafts, souvenirs, and historic atmosphere.',
        image:
          'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Historic Streets',
        description:
          'Discover the character of old Cairo through its traditional streets, historic buildings, and distinctive architecture.',
        image:
          'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Local Culture',
        description:
          'Experience the atmosphere of Cairo’s traditional markets and discover local products, crafts, and everyday life.',
        image:
          'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    itinerary: [
      'Pickup from your hotel.',
      'Head to the historic district of Cairo.',
      'Explore selected historic streets and landmarks.',
      'Visit Khan El Khalili bazaar.',
      'Enjoy time for shopping, photography, and local discovery.',
      'Return transfer to your hotel.',
    ],
    included: [
      'Private transportation',
      'Professional English-speaking guide',
      'Hotel pickup and drop-off',
      'Personalized tour assistance',
    ],
    note: 'Entrance tickets, meals, shopping, and any optional visits are not included unless confirmed in your booking.',
  },
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">MT</span>
          <span className="brand-copy">
            <strong>MERNOVA</strong>
            <small>TOURS</small>
          </span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/experiences" onClick={() => setMenuOpen(false)}>
            Experiences
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link
            to="/plan-your-journey"
            className="nav-book-button"
            onClick={() => setMenuOpen(false)}
          >
            Plan Your Journey
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">MT</span>
            <span className="brand-copy">
              <strong>MERNOVA</strong>
              <small>TOURS</small>
            </span>
          </Link>
          <p>
            Creating extraordinary journeys and unforgettable memories across
            Egypt.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-column">
          <h4>Get In Touch</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href="mailto:info@mernovatours.com">Email Us</a>
          <span>Cairo, Egypt</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} MERNOVA TOURS. All Rights Reserved.
        </span>
        <span>DISCOVER MORE. EXPERIENCE MORE.</span>
      </div>
    </footer>
  );
}

function ExperienceCard({ experience }) {
  return (
    <article className="experience-card">
      <div className="experience-image">
        <SafeImage src={experience.image} alt={experience.title} />
        <span className="image-category">{experience.category}</span>
      </div>
      <div className="experience-info">
        <div className="experience-meta">
          <span>{experience.duration}</span>
          <span>From ${experience.price}</span>
        </div>
        <h3>{experience.title}</h3>
        <p>{experience.description}</p>
        <Link
          className="experience-link"
          to={`/experiences/${experience.slug}`}
        >
          Discover This Experience <span>↗</span>
        </Link>
      </div>
    </article>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="eyebrow">EXPERIENCE EGYPT DIFFERENTLY</span>
          <h1>
            Discover Egypt.
            <br />
            <span>Beyond Expectations.</span>
          </h1>
          <p>
            Extraordinary journeys, exclusive experiences, and unforgettable
            moments. Discover the beauty of Egypt with MERNOVA TOURS.
          </p>
          <div className="hero-actions">
            <Link to="/experiences" className="primary-button">
              Explore Experiences
            </Link>
            <Link to="/plan-your-journey" className="secondary-button">
              Plan Your Journey
            </Link>
          </div>
          <div className="hero-note">
            <span className="gold-line"></span>
            <span>YOUR JOURNEY, OUR PASSION</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>CAIRO · EGYPT</span>
          <span>01 — 06</span>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-label">THE MERNOVA EXPERIENCE</div>
        <h2>
          More Than a Trip.
          <br />
          <span>A Story Worth Telling.</span>
        </h2>
        <p className="intro-description">
          At MERNOVA TOURS, we believe that travel should be personal,
          effortless, and unforgettable. We create journeys designed around you.
        </p>
        <div className="intro-stats">
          <div>
            <strong>01</strong>
            <span>Personalized Journeys</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Premium Experiences</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Exceptional Service</span>
          </div>
        </div>
      </section>

      <section className="experiences-section">
        <div className="section-heading">
          <div>
            <div className="section-label">CURATED FOR YOU</div>
            <h2>Featured Experiences</h2>
          </div>
          <Link to="/experiences" className="experience-link">
            View All Experiences ↗
          </Link>
        </div>
        <div className="experience-grid">
          {experiences.slice(0, 3).map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="section-label">YOUR EGYPTIAN STORY STARTS HERE</div>
        <h2>
          Ready to Discover
          <br />
          <span>Something Extraordinary?</span>
        </h2>
        <p>
          Tell us what you have in mind. We'll help you create an unforgettable
          experience.
        </p>
        <Link to="/plan-your-journey" className="primary-button">
          Plan Your Journey
        </Link>
      </section>
    </>
  );
}

function Experiences() {
  return (
    <main className="page-content">
      <div className="page-heading">
        <div className="section-label">DISCOVER EGYPT</div>
        <h1>
          Our <span>Experiences</span>
        </h1>
        <p>
          Explore our carefully curated collection of unforgettable Egyptian
          experiences.
        </p>
      </div>
      <div className="experience-grid">
        {experiences.map((item) => (
          <ExperienceCard key={item.id} experience={item} />
        ))}
      </div>
    </main>
  );
}

function ExperienceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((item) => item.slug === slug);
  const details = destinationDetails[slug];

  if (!experience || !details) {
    return (
      <main className="page-content">
        <h1>Experience not found</h1>
        <Link to="/experiences" className="primary-button">
          Back to Experiences
        </Link>
      </main>
    );
  }

  return (
    <main className="destination-page">
      <section
        className="destination-hero"
        style={{ backgroundImage: `url("${details.hero}")` }}
      >
        <div className="destination-hero-overlay"></div>
        <div className="destination-hero-content">
          <span className="eyebrow">{details.subtitle}</span>
          <h1>{experience.title}</h1>
          <p>
            {experience.duration} · From ${experience.price} per person
          </p>
          <Link
            to={`/contact?experience=${encodeURIComponent(experience.title)}`}
            className="primary-button"
          >
            Book This Experience
          </Link>
        </div>
      </section>

      <section className="destination-intro">
        <div className="section-label">DISCOVER THE DESTINATION</div>
        <h2>
          A Place Like <span>No Other</span>
        </h2>
        <p>{details.about}</p>
      </section>

      <section className="destination-highlights">
        <div className="section-label">WHAT YOU WILL DISCOVER</div>
        <h2>
          Experience <span>Highlights</span>
        </h2>
        <div className="destination-highlight-grid">
          {details.highlights.map((highlight, index) => (
            <div className="destination-highlight" key={highlight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{highlight}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="destination-places">
        <div className="section-label">EXPLORE THE AREA</div>
        <h2>
          Places You Will <span>Discover</span>
        </h2>
        <div className="destination-place-grid">
          {details.places.map((place) => (
            <article className="destination-place-card" key={place.title}>
              <SafeImage src={place.image} alt={place.title} />
              <div>
                <h3>{place.title}</h3>
                <p>{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-itinerary">
        <div className="section-label">YOUR JOURNEY, STEP BY STEP</div>
        <h2>
          Experience <span>Itinerary</span>
        </h2>
        <div className="destination-timeline">
          {details.itinerary.map((step, index) => (
            <div className="destination-timeline-item" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="destination-included">
        <div>
          <div className="section-label">YOUR EXPERIENCE</div>
          <h2>
            What's <span>Included</span>
          </h2>
          <ul>
            {details.included.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <p className="destination-note">{details.note}</p>
        </div>
        <aside className="destination-booking-card">
          <span className="section-label">MAKE IT YOURS</span>
          <h3>{experience.title}</h3>
          <div className="destination-price">
            From ${experience.price}
            <small> / person</small>
          </div>
          <p>Duration: {experience.duration}</p>
          <Link
            to={`/contact?experience=${encodeURIComponent(experience.title)}`}
            className="primary-button"
          >
            Request This Experience
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hello MERNOVA TOURS, I am interested in ${experience.title}. Please share more details.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="destination-whatsapp"
          >
            Ask us on WhatsApp ↗
          </a>
        </aside>
      </section>

      <section className="destination-bottom-cta">
        <div className="section-label">YOUR EGYPTIAN STORY STARTS HERE</div>
        <h2>
          Ready to Experience <span>{experience.title}?</span>
        </h2>
        <p>Let us help you plan a memorable journey in Egypt.</p>
        <Link
          to={`/contact?experience=${encodeURIComponent(experience.title)}`}
          className="primary-button"
        >
          Plan Your Visit
        </Link>
      </section>

      <div className="destination-back">
        <button
          className="text-button"
          onClick={() => navigate('/experiences')}
        >
          ← Back to All Experiences
        </button>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="page-content about-page">
      <div className="section-label">WHO WE ARE</div>
      <h1>
        About <span>MERNOVA TOURS</span>
      </h1>
      <p>
        We believe Egypt deserves to be experienced beyond the ordinary. MERNOVA
        TOURS brings together local knowledge, thoughtful planning, and personal
        service to create memorable journeys.
      </p>
      <div className="intro-stats">
        <div>
          <strong>01</strong>
          <span>Personalized Journeys</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Local Expertise</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Dedicated Support</span>
        </div>
      </div>
      <Link to="/experiences" className="primary-button">
        Explore Our Experiences
      </Link>
    </main>
  );
}

function Contact() {
  const params = new URLSearchParams(window.location.search);
  const initialExperience = params.get('experience') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    pickup: '',
    experience: initialExperience,
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      'Hello MERNOVA TOURS, I would like to request a booking:',
      '',
      `Experience: ${formData.experience || 'Custom Egypt Experience'}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Preferred Date: ${formData.date}`,
      `Number of Guests: ${formData.guests}`,
      `Pickup Location: ${formData.pickup || 'Not specified'}`,
      `Additional Notes: ${formData.notes || 'None'}`,
      '',
      'Please contact me with availability and final pricing.',
    ].join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <main className="page-content contact-page">
      <div className="page-heading">
        <div className="section-label">LET'S PLAN YOUR JOURNEY</div>
        <h1>
          Get In <span>Touch</span>
        </h1>
        <p>
          Share your plans with us and let our team help create your Egyptian
          experience.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Country code + number"
            />
          </div>
          <div className="form-group">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Custom Egypt Experience</option>
              {experiences.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Number of Guests</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
              <option value="10+">More than 10 Guests</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Pickup Location</label>
          <input
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            placeholder="Hotel / Airport / Address"
          />
        </div>

        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your preferences or special requests..."
          />
        </div>

        <button type="submit" className="submit-button">
          Send Booking Request via WhatsApp ↗
        </button>
        <p className="form-disclaimer">
          Your request will open WhatsApp so you can send it directly to our
          team.
        </p>
      </form>
    </main>
  );
}

function NotFound() {
  return (
    <main className="page-content">
      <h1>Page not found</h1>
      <Link to="/" className="primary-button">
        Return Home
      </Link>
    </main>
  );
}

function Website() {
  useEffect(() => {
    document.title = 'MERNOVA TOURS | Discover Egypt in Luxury';
  }, []);

  return (
    <div className="website">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/:slug" element={<ExperienceDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan-your-journey" element={<TripBuilder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <a
        className="whatsapp-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Hello! 👋 Welcome to MERNOVA TOURS 🇪🇬\n\nThank you for reaching out! We are here to help you discover Egypt and create an unforgettable experience.\n\nHow can we assist you today? 😊'
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <span>☏</span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Website />
    </BrowserRouter>
  );
}
