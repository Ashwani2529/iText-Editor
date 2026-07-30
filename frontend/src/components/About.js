import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    title: "A calmer writing surface",
    copy: "A focused editor with just enough structure to help ideas flow—never a wall of controls.",
  },
  {
    number: "02",
    title: "Useful insight, instantly",
    copy: "Word count, character count, and reading time update as your draft changes.",
  },
  {
    number: "03",
    title: "Your notes, within reach",
    copy: "Save important fragments to your private cloud library and return to them from any screen.",
  },
];

export default function About() {
  return (
    <div className="about-page page-wrap">
      <section className="about-hero">
        <span className="eyebrow">Why iText exists</span>
        <h1 className="page-title">
          Better writing begins with <span className="gradient-text">less noise.</span>
        </h1>
        <p className="page-lead">
          iText Studio is a lightweight writing companion for everyday thinking—notes, drafts,
          captions, essays, and the half-formed ideas that deserve somewhere beautiful to grow.
        </p>
        <div className="about-actions">
          <Link to="/" className="btn-ui btn-primary-ui">Open the editor →</Link>
          <Link to="/home" className="btn-ui">Explore cloud notes</Link>
        </div>
      </section>

      <section className="manifesto-card">
        <div className="manifesto-index">Our point of view</div>
        <blockquote>
          “The best writing tool should feel less like software and more like a clear desk.”
        </blockquote>
        <p>
          That means fast interactions, readable typography, honest controls, and no unnecessary
          friction between a thought and the finished sentence.
        </p>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Made for momentum</span>
            <h2>Everything you need. Nothing you don’t.</h2>
          </div>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <div>
          <span className="eyebrow">Start where you are</span>
          <h2>Your next clear sentence is waiting.</h2>
        </div>
        <Link to="/" className="btn-ui btn-primary-ui">Start writing</Link>
      </section>
    </div>
  );
}
