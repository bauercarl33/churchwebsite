import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCar,
  FaShareAlt,
  FaGoogle,
  FaApple,
  FaChurch,
} from "react-icons/fa";

import "./consecration.css";
import Photo from "../../components/Photo/Photo";
import { photos } from "../../images/photos";
import { featuredEvent as event } from "../../data/event";
import { googleCalendarUrl, icsFile } from "../../lib/addToCalendar";

// Everything on this page comes from the parish's invitation, the parking
// maps, and facts already published elsewhere on the site (About page,
// footer). Service times are not published yet, so the page points to the
// parish calendar instead of listing any.

const PHONE = { display: "(737) 400-4458", href: "tel:+17374004458" };
const EMAIL = "church@saintmaryaustin.org";

const milestones = [
  { year: "2002", text: "First Divine Liturgy of our parish in Austin, on September 8" },
  { year: "2009", text: "Property purchased at 200 Monaco Drive, Cedar Park" },
  { year: "2024", text: "Building begins on our feast day, the Nativity of the Theotokos" },
  { year: "Nov 2026", text: "Consecration of the new church", highlight: true },
];

const parkingMaps = [
  {
    photo: "parking-street",
    title: "Street parking",
    caption: "Park along Monaco Dr and Versailles Dr, as shown on the map.",
    alt: "Aerial map showing street parking along both sides of Monaco Dr and along Versailles Dr",
  },
  {
    photo: "parking-overflow",
    title: "Overflow parking",
    caption:
      "If street parking is full, use the overflow lot shown here, near Riviera Dr and S Bell Blvd. The yellow arrows show the route.",
    alt: "Aerial map showing the route from the church via Riviera Dr to the overflow parking lot near S Bell Blvd",
  },
];

/** Largest generated version of a photo, for "open full size" links. */
const fullSizeUrl = (name) => photos[name].srcSet.split(", ").at(-1).split(" ")[0];

const calendarDetails = `You're invited to the consecration of Saint Mary Orthodox Church's new building. Details: https://saintmaryaustin.org${event.path}`;

const downloadIcs = () => {
  const blob = new Blob([icsFile({ ...event, details: calendarDetails })], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "st-mary-consecration.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const ShareButton = () => {
  const [status, setStatus] = useState("");
  const share = async () => {
    const url = window.location.href;
    const data = { title: `${event.title} · ${event.fullDateLabel}`, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch (err) {
      if (err?.name !== "AbortError") setStatus("Couldn't share. Copy the address bar link instead.");
    }
  };
  return (
    <>
      <button type="button" className="button empty" onClick={share}>
        <FaShareAlt aria-hidden="true" /> Share this invitation
      </button>
      <span className="share-status" role="status">
        {status}
      </span>
    </>
  );
};

const Consecration = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${event.title} · ${event.fullDateLabel} | Saint Mary Orthodox Church`;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <article className="consecration">
      {/* Hero */}
      <header className="c-hero">
        <Photo
          name="consecration-church"
          className="c-hero-photo"
          sizes="100vw"
          alt="The new Saint Mary Orthodox Church building in Cedar Park, with golden domes"
          loading="eager"
          fetchpriority="high"
        />
        <div className="c-hero-overlay" />
        <div className="c-hero-content">
          <p className="c-eyebrow">You&rsquo;re invited</p>
          <h1>Consecration of our new church</h1>
          <p className="c-subtitle">Saint Mary Orthodox Church · Cedar Park, Texas</p>
          <p className="c-date">
            <FaRegCalendarAlt aria-hidden="true" />
            <time dateTime={event.startDate}>{event.fullDateLabel}</time>
          </p>
          <div className="c-hero-actions">
            <a href={event.mapLink} target="_blank" rel="noreferrer" className="button c-gold">
              <FaMapMarkerAlt aria-hidden="true" /> Get directions
            </a>
            <a href="#plan-your-visit" className="button empty light">
              Plan your visit
            </a>
          </div>
        </div>
      </header>

      {/* Story */}
      <section className="c-section c-story" aria-labelledby="story-heading">
        <div className="c-story-text">
          <h2 id="story-heading" className="c-heading">
            A milestone more than <span className="c-highlight">twenty years</span> in the making
          </h2>
          <p>
            Since our first Divine Liturgy in Austin in 2002, our community has prayed for a
            permanent church to serve this and future generations. In 2009 we purchased the
            property at 200 Monaco Drive, and on our feast day, the Nativity of the Theotokos, in
            2024 we began to build.
          </p>
          <p>
            This November our new church will be consecrated, and we would love for you to
            celebrate with us.
          </p>
        </div>
        <ol className="c-timeline" aria-label="Our journey">
          {milestones.map((m) => (
            <li key={m.year} className={m.highlight ? "highlight" : undefined}>
              <span className="c-timeline-year">{m.year}</span>
              <span className="c-timeline-text">{m.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* What is a consecration */}
      <section className="c-band" aria-labelledby="about-heading">
        <div className="c-band-inner">
          <h2 id="about-heading" className="c-heading light">
            What is a consecration?
          </h2>
          <p>
            In the Orthodox Church, a new church is consecrated by a bishop, setting it apart
            as a house of prayer. The service includes the washing and anointing of the Holy Table
            (the altar) with holy chrism, the placing of holy relics in the altar, and a procession
            around the church. It is a rare and joyful celebration in the life of a parish.
          </p>
        </div>
      </section>

      {/* Plan your visit */}
      <section className="c-section" id="plan-your-visit" aria-labelledby="visit-heading">
        <h2 id="visit-heading" className="c-heading">
          Plan your <span className="c-highlight">visit</span>
        </h2>
        <div className="c-cards">
          <div className="c-card">
            <FaRegCalendarAlt className="c-card-icon" aria-hidden="true" />
            <h3>When</h3>
            <p className="c-card-main">{event.fullDateLabel}</p>
            <p>
              For service times, see the <Link to="/calendar">parish calendar</Link>.
            </p>
            <div className="c-card-actions">
              <a
                href={googleCalendarUrl({ ...event, details: calendarDetails })}
                target="_blank"
                rel="noreferrer"
                className="c-chip"
              >
                <FaGoogle aria-hidden="true" /> Google Calendar
              </a>
              <button type="button" className="c-chip" onClick={downloadIcs}>
                <FaApple aria-hidden="true" /> Apple / Outlook
              </button>
            </div>
          </div>

          <div className="c-card">
            <FaMapMarkerAlt className="c-card-icon" aria-hidden="true" />
            <h3>Where</h3>
            <address>
              <p className="c-card-main">Saint Mary Orthodox Church</p>
              <p>200 Monaco Dr., Cedar Park, TX 78613</p>
            </address>
            <div className="c-card-actions">
              <a href={event.mapLink} target="_blank" rel="noreferrer" className="c-chip">
                Get directions
              </a>
              <a href="#parking" className="c-chip">
                <FaCar aria-hidden="true" /> Parking
              </a>
            </div>
          </div>

          <div className="c-card">
            <FaPhoneAlt className="c-card-icon" aria-hidden="true" />
            <h3>Questions?</h3>
            <p>We&rsquo;re happy to help.</p>
            <div className="c-card-actions">
              <a href={PHONE.href} className="c-chip">
                <FaPhoneAlt aria-hidden="true" /> {PHONE.display}
              </a>
              <a href={`mailto:${EMAIL}`} className="c-chip">
                <FaEnvelope aria-hidden="true" /> Email us
              </a>
            </div>
          </div>

          <div className="c-card">
            <FaChurch className="c-card-icon" aria-hidden="true" />
            <h3>Everyone is welcome</h3>
            <p>
              You don&rsquo;t need to be Romanian or Orthodox to join us. New to Orthodox worship?
              Our visitor guide explains what to expect.
            </p>
            <div className="c-card-actions">
              <Link to="/visitors" className="c-chip">
                Visitor guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parking */}
      <section className="c-section c-parking" id="parking" aria-labelledby="parking-heading">
        <h2 id="parking-heading" className="c-heading">
          <span className="c-highlight">Parking</span>
        </h2>
        <div className="c-maps">
          {parkingMaps.map((map) => (
            <figure key={map.photo} className="c-map">
              <a
                href={fullSizeUrl(map.photo)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${map.title} map, open full size`}
              >
                <Photo
                  name={map.photo}
                  sizes="(max-width: 960px) 100vw, 600px"
                  alt={map.alt}
                />
              </a>
              <figcaption>
                <strong>{map.title}</strong>
                <span>{map.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="c-cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="c-heading">
          We hope to see <span className="c-highlight">you</span> there
        </h2>
        <p className="c-cta-date">
          {event.fullDateLabel} · 200 Monaco Dr., Cedar Park
        </p>
        <div className="c-hero-actions">
          <ShareButton />
          <Link to="/donate" className="button filled">
            Support the new church
          </Link>
        </div>
      </section>
    </article>
  );
};

export default Consecration;
