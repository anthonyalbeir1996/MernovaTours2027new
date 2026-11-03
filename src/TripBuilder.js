import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import experiences, { WHATSAPP_NUMBER } from './experiences';
import './trip-builder.css';

const ADD_ONS = {
  airport: 65,
  car: 90,
  fullDay: 120,
};

const money = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function TripBuilder() {
  const [step, setStep] = useState(1);
  const [arrival, setArrival] = useState('already');
  const [transport, setTransport] = useState('none');
  const [selected, setSelected] = useState([]);
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const [isCapturing, setIsCapturing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const quotationRef = useRef(null);

  const selectedExperiences = experiences.filter((item) =>
    selected.includes(item.id)
  );

  const toggleExperience = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const subtotal = useMemo(() => {
    const experienceTotal = selectedExperiences.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );

    const airportTotal = arrival === 'airport' ? ADD_ONS.airport : 0;

    const transportTotal =
      transport === 'car'
        ? ADD_ONS.car * Number(days)
        : transport === 'full'
        ? ADD_ONS.fullDay * Number(days)
        : 0;

    return experienceTotal + airportTotal + transportTotal;
  }, [selectedExperiences, arrival, transport, days]);

  const canContinue = () => {
    if (step === 2 && selected.length === 0) {
      window.alert('Please select at least one experience.');
      return false;
    }

    if (step === 4 && !date) {
      window.alert('Please select your preferred travel date.');
      return false;
    }

    return true;
  };

  const next = () => {
    if (canContinue()) {
      setStep((current) => Math.min(5, current + 1));
    }
  };

  const previous = () => {
    setStep((current) => Math.max(1, current - 1));
  };

  const sendWhatsApp = async () => {
    if (isSending) return;
    setIsSending(true);

    // 1. تفعيل وضع التصوير
    setIsCapturing(true);

    // 2. استنى لحظة عشان React يعمل re-render
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      const card = quotationRef.current;
      if (!card) return;

      // 3. صور الكارت
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: '#f8f5ee',
        useCORS: true,
        logging: false,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png', 1.0)
      );

      // 4. رفع الصورة على ImgBB في الخلفية
      const formData = new FormData();
      formData.append('image', blob);

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=52d0a267039d6163da70c8d6d0052b9c`,
        { method: 'POST', body: formData }
      );

      const imgbbData = await imgbbResponse.json();

      if (!imgbbData.success) {
        throw new Error('Failed to upload image');
      }

      const imageUrl = imgbbData.data.url;

      // 5. تجهيز الرسالة (حطينا اللينك في آخر سطر عشان الواتساب يقراه كصورة)
      const caption = [
        'Thank you for choosing MERNOVA TOURS! 🇪🇬',
        '',
        'I have created my personal trip quotation. Please find the image below:',
        '',
        `Name: ${name || 'Not provided'}`,
        `Preferred date: ${date}`,
        `Guests: ${guests}`,
        '',
        discountCode ? `Discount code applied: ${discountCode}` : '',
        'Please confirm availability and final pricing.',
        '',
        imageUrl, // اللينك المباشر للصورة
      ]
        .filter(Boolean)
        .join('\n');

      // 6. فتح الواتساب على طول
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(caption)}`,
        '_blank'
      );
    } catch (error) {
      console.error(error);
      window.alert('Failed to prepare quotation. Please try again.');
    } finally {
      // 7. إلغاء وضع التصوير
      setIsCapturing(false);
      setIsSending(false);
    }
  };

  const steps = [
    'Arrival',
    'Experiences',
    'Transportation',
    'Trip Details',
    'Quotation',
  ];

  return (
    <main className="trip-builder">
      <section className="trip-hero">
        <span className="section-label">DESIGNED AROUND YOU</span>
        <h1>
          Build Your <span>Egyptian Journey</span>
        </h1>
        <p>
          Choose your experiences, personalize your arrangements, and create
          your own trip quotation.
        </p>
      </section>

      <div className="trip-container">
        <div className="trip-progress">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`trip-progress-step ${
                step >= index + 1 ? 'active' : ''
              }`}
            >
              <span>{index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        {step === 1 && (
          <section className="trip-panel">
            <span className="section-label">STEP 01</span>
            <h2>
              How will your journey <span>begin?</span>
            </h2>
            <p className="trip-description">
              Let us know your arrival situation.
            </p>

            <div className="trip-choice-grid">
              <button
                type="button"
                className={`trip-choice ${
                  arrival === 'already' ? 'selected' : ''
                }`}
                onClick={() => setArrival('already')}
              >
                <span className="trip-choice-icon">⌂</span>
                <strong>I'm already in Cairo</strong>
                <small>I don't need airport pickup.</small>
              </button>

              <button
                type="button"
                className={`trip-choice ${
                  arrival === 'airport' ? 'selected' : ''
                }`}
                onClick={() => setArrival('airport')}
              >
                <span className="trip-choice-icon">✈</span>
                <strong>I need airport pickup</strong>
                <small>Add VIP Airport Welcome to my trip.</small>
                <b>{money(ADD_ONS.airport)}</b>
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="trip-panel">
            <span className="section-label">STEP 02</span>
            <h2>
              Choose your <span>experiences</span>
            </h2>
            <p className="trip-description">
              Select as many experiences as you like. Prices are shown as listed
              on our website.
            </p>

            <div className="trip-experience-grid">
              {experiences.map((item) => {
                const active = selected.includes(item.id);

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`trip-experience ${active ? 'selected' : ''}`}
                    onClick={() => toggleExperience(item.id)}
                  >
                    <img src={item.image} alt={item.title} />
                    <span className="trip-experience-content">
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                      <span>{item.duration}</span>
                      <b>From {money(Number(item.price || 0))}</b>
                    </span>
                    <span className="trip-check">{active ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>

            <p className="trip-selection-count">
              {selected.length} experience(s) selected
            </p>
          </section>
        )}

        {step === 3 && (
          <section className="trip-panel">
            <span className="section-label">STEP 03</span>
            <h2>
              How would you like <span>to travel?</span>
            </h2>
            <p className="trip-description">
              Choose the transportation that suits your plans.
            </p>

            <div className="trip-choice-grid">
              <button
                type="button"
                className={`trip-choice ${
                  transport === 'none' ? 'selected' : ''
                }`}
                onClick={() => setTransport('none')}
              >
                <span className="trip-choice-icon">—</span>
                <strong>No transportation</strong>
                <small>I will arrange my own transportation.</small>
                <b>Free</b>
              </button>

              <button
                type="button"
                className={`trip-choice ${
                  transport === 'car' ? 'selected' : ''
                }`}
                onClick={() => setTransport('car')}
              >
                <span className="trip-choice-icon">🚘</span>
                <strong>Private Chauffeur</strong>
                <small>Private vehicle and professional driver.</small>
                <b>{money(ADD_ONS.car)} / day</b>
              </button>

              <button
                type="button"
                className={`trip-choice ${
                  transport === 'full' ? 'selected' : ''
                }`}
                onClick={() => setTransport('full')}
              >
                <span className="trip-choice-icon">✦</span>
                <strong>Full-Day Transportation</strong>
                <small>Extended daily transportation service.</small>
                <b>{money(ADD_ONS.fullDay)} / day</b>
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="trip-panel">
            <span className="section-label">STEP 04</span>
            <h2>
              Your trip <span>details</span>
            </h2>
            <p className="trip-description">
              A few details to personalize your quotation.
            </p>

            <div className="trip-form">
              <div className="form-group">
                <label htmlFor="trip-name">Full Name</label>
                <input
                  id="trip-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="trip-email">Email Address</label>
                <input
                  id="trip-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="trip-date">Preferred Date *</label>
                  <input
                    id="trip-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="trip-guests">Number of Guests</label>
                  <select
                    id="trip-guests"
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map(
                      (number) => (
                        <option key={number} value={number}>
                          {number} {number === 1 ? 'Guest' : 'Guests'}
                        </option>
                      )
                    )}
                    <option value="10+">More than 10 Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="trip-days">Trip Duration</label>
                <select
                  id="trip-days"
                  value={days}
                  onChange={(event) => setDays(event.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? 'Day' : 'Days'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="trip-notes">Additional Requests</label>
                <textarea
                  id="trip-notes"
                  rows="4"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Tell us about any preferences or special requests..."
                />
              </div>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="trip-panel quotation-panel">
            <span className="section-label">YOUR JOURNEY, YOUR WAY</span>
            <h2>
              Your Personal <span>Quotation</span>
            </h2>
            <p className="trip-description">
              Review your selections and estimated trip total.
            </p>

            <div className="quotation-card" ref={quotationRef}>
              <div className="quotation-heading">
                <div className="quotation-brand">
                  <img
                    src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f8f5ee'/%3E%3Crect x='15' y='15' width='70' height='70' fill='none' stroke='%23c9a96e' stroke-width='2'/%3E%3Ctext x='50' y='58' font-family='Georgia, serif' font-size='28' fill='%23c9a96e' text-anchor='middle' font-weight='bold'%3EMT%3C/text%3E%3C/svg%3E"
                    alt="MERNOVA TOURS"
                    className="quotation-logo"
                  />
                  <div>
                    <small>MERNOVA TOURS</small>
                    <h3>Personal Trip Quotation</h3>
                  </div>
                </div>
                <span>USD</span>
              </div>

              <div className="quotation-section">
                <h4>Trip Details</h4>
                <p>
                  Customer <strong>{name || 'Not provided'}</strong>
                </p>
                <p>
                  Email <strong>{email || 'Not provided'}</strong>
                </p>
                <p>
                  Travel date <strong>{date}</strong>
                </p>
                <p>
                  Guests <strong>{guests}</strong>
                </p>
                <p>
                  Duration <strong>{days} day(s)</strong>
                </p>
                <p>
                  Arrival{' '}
                  <strong>
                    {arrival === 'airport'
                      ? 'Airport pickup'
                      : 'Already in Cairo'}
                  </strong>
                </p>
              </div>

              <div className="quotation-section">
                <h4>Selected Experiences</h4>
                {selectedExperiences.map((item) => (
                  <p key={item.id}>
                    {item.title}
                    <strong>{money(Number(item.price || 0))}</strong>
                  </p>
                ))}
              </div>

              <div className="quotation-section">
                <h4>Additional Services</h4>
                {arrival === 'airport' && (
                  <p>
                    VIP Airport Welcome
                    <strong>{money(ADD_ONS.airport)}</strong>
                  </p>
                )}

                {transport !== 'none' && (
                  <p>
                    {transport === 'car'
                      ? `Private Chauffeur (${days} day/s)`
                      : `Full-Day Transportation (${days} day/s)`}
                    <strong>
                      {money(
                        (transport === 'car' ? ADD_ONS.car : ADD_ONS.fullDay) *
                          Number(days)
                      )}
                    </strong>
                  </p>
                )}

                {arrival !== 'airport' && transport === 'none' && (
                  <p>
                    No additional services selected
                    <strong>{money(0)}</strong>
                  </p>
                )}
              </div>

              {notes && (
                <div className="quotation-section">
                  <h4>Additional Requests</h4>
                  <p className="quotation-notes">{notes}</p>
                </div>
              )}

              <div className="quotation-total">
                <p>
                  Subtotal <strong>{money(subtotal)}</strong>
                </p>

                {isCapturing ? (
                  discountCode && (
                    <div className="discount-display-static">
                      <span>Discount Code</span>
                      <strong>{discountCode}</strong>
                    </div>
                  )
                ) : (
                  <div className="discount-display">
                    <label htmlFor="discount-code">Discount Code</label>
                    <input
                      id="discount-code"
                      type="text"
                      value={discountCode}
                      onChange={(event) => setDiscountCode(event.target.value)}
                      placeholder="Enter your discount code (optional)"
                    />
                  </div>
                )}

                <p className="final-total">
                  Estimated Total <strong>{money(subtotal)}</strong>
                </p>

                <small>
                  {discountCode
                    ? `Discount code "${discountCode}" will be reviewed and applied by our team.`
                    : 'This is an estimated quotation before discount. Our team will review your request and confirm the final price and any applicable discount.'}
                </small>
              </div>

              <div className="quotation-footer">
                <span>mernovatours.com</span>
                <span>Thank you for choosing MERNOVA TOURS</span>
              </div>
            </div>

            <button
              type="button"
              className="primary-button quotation-whatsapp"
              onClick={sendWhatsApp}
              disabled={isSending}
            >
              {isSending
                ? 'Preparing your quotation...'
                : 'Send My Quotation via WhatsApp ↗'}
            </button>
          </section>
        )}

        <div className="trip-navigation">
          {step > 1 ? (
            <button type="button" className="text-button" onClick={previous}>
              ← Back
            </button>
          ) : (
            <Link className="text-button" to="/">
              Cancel
            </Link>
          )}

          {step < 5 && (
            <button type="button" className="primary-button" onClick={next}>
              {step === 4 ? 'Create My Quotation' : 'Continue'} →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
