import React, { useEffect, useRef } from 'react';


export default function About() {
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (catRef.current) {
        const scrollY = window.scrollY;
        const movement = Math.sin(scrollY * 0.002) * 20;
        catRef.current.style.transform = `translateY(${movement}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      
      {/* Floating Luna - Hidden on mobile for WCAG, visible on desktop
      <div 
        ref={catRef}
        className="about-luna"
        role="img"
        aria-label="Luna, Hillary's cat companion"
      >
        <img 
          src="assets/favicon.png"
          alt="Luna, a gray and white cat with orange eyes"
        />
      </div> */}

      {/* Opening - Setting the Scene */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">
            I'm a UX designer driven by curiosity and a desire to help people navigate complexity with more clarity and confidence.
          </p>
          
          <h1 className="about-title">
            I turn complex, high‑pressure systems into experiences that feel intuitive, manageable, and human.
          </h1>
        </div>
      </section>

      {/* The Journey Begins */}
      <section className="about-journey">
        <div className="about-chapters">
          
          {/* Chapter: Healthcare - Where It Started */}
          <div className="about-chapter about-chapter--msk">
            <div className="chapter-marker">
              <div className="chapter-dot" />
              <span className="chapter-label">
                Where I Discovered UX
              </span>
            </div>
            
            <h2 className="chapter-heading">
              Healthcare showed me what design can do.
            </h2>
            
            <p className="chapter-text">
              I was introduced to UX while working at Memorial Sloan Kettering Cancer Center, where I supported research and design efforts for internal tools used by 21,000+ staff. Clinicians, administrators, researchers—all navigating life-and-death decisions through digital interfaces.
            </p>
            
            <p className="chapter-text">
              Seeing how small interface decisions could influence understanding, efficiency, and stress levels sparked my interest in designing systems that prioritize clarity and ease of use. A confusing workflow isn't just frustrating in healthcare—it could mean a missed diagnosis, a delayed treatment, a moment of uncertainty when someone needs absolute clarity.
            </p>
            
            <p className="chapter-text">
              I redesigned EHR features. I reengineered certification workflows. I guided system rollouts. But more than anything, I learned to design with deep respect for the weight people carry.
            </p>
          </div>

          {/* Chapter: Army Foundation */}
          <div className="about-chapter about-chapter--army">
            <div className="chapter-marker">
              <div className="chapter-dot" />
              <span className="chapter-label">
                Where the Foundation Was Built
              </span>
            </div>
            
            <h2 className="chapter-heading">
              The Army taught me adaptability and systems thinking.
            </h2>
            
            <p className="chapter-text">
              Earlier in my career, I served in the Army National Guard while balancing civilian work. As a logistics officer, I directed systems for 5,000+ deployed soldiers. When you're coordinating supplies across combat zones, there's no room for ambiguity.
            </p>
            
            <p className="chapter-text">
              That experience strengthened my adaptability, collaboration skills, and comfort working within complex systems. It also shaped how I approach problem-solving—with steadiness and care for the people navigating those systems under pressure.
            </p>
            
            <p className="chapter-text">
              My deployment gave me a perspective I bring to every project: design for people who are stressed, overwhelmed, and making decisions that truly matter.
            </p>
          </div>

          {/* Chapter: Personal Projects - Reina */}
          <div className="about-chapter about-chapter--reina">
            <div className="chapter-marker">
              <div className="chapter-dot" />
              <span className="chapter-label">
                Where I Explored End-to-End
              </span>
            </div>
            
            <h2 className="chapter-heading">
              Personal projects taught me to design for emotion.
            </h2>
            
            <p className="chapter-text">
              Outside of professional work, I enjoy building projects that let me explore design problems from end to end. One of those projects, Reina, is a mobile app created to help couples plan destination weddings with less uncertainty.
            </p>
            
            <p className="chapter-text">
              Not every high-stakes moment happens in a hospital or a combat zone. Sometimes it's a couple trying to balance family expectations, budget constraints, and the dream of a perfect day. The stress is different, but the need for clarity and calm is exactly the same.
            </p>
            
            <p className="chapter-text">
              Designing for an emotionally charged experience reinforced an important lesson: regardless of context, people benefit from tools that help them feel informed, supported, and capable.
            </p>
          </div>

        </div>
      </section>

      {/* Skills & Growth */}
      <section className="about-growth">
        <h2 className="about-growth-title">
          Building technical fluency
        </h2>
        
        <p className="about-growth-text">
          After transitioning fully out of the military, I made a deliberate decision to focus on strengthening my design and technical foundation. I completed three full-time bootcamps in UX design, data analytics, and software engineering to better understand how design, data, and technology work together.
        </p>
        
        <p className="about-growth-text">
          This experience helped me become more fluent in collaborating across disciplines and more confident working within technical constraints. I work at the intersection of UX, service design, and systems thinking—with a focus on healthcare, government, and products where people are time-pressed or making decisions that shape their lives.
        </p>
      </section>

      {/* Life After Service - Luna, Running, Reading */}
      <section className="about-life">
        <div className="about-life-card">
          <h2 className="about-life-title">
            Life as a veteran
          </h2>
          
          <div className="about-life-intro">
            <p>
              After my deployment, I found myself gravitating toward routines that bring calm and clarity—the same things I try to design into every interface.
            </p>
          </div>
          
          <div className="about-hobbies">
            <div className="hobby-card">
              <div className="hobby-icon">🏃‍♀️</div>
              <h3 className="hobby-title">Running</h3>
              <p className="hobby-desc">
                Miles give me time to think through design problems and decompress from complexity.
              </p>
            </div>
            
            <div className="hobby-card">
              <div className="hobby-icon">📚</div>
              <h3 className="hobby-title">Reading</h3>
              <p className="hobby-desc">
                Books remind me that every good story—like every good design—needs structure, empathy, and purpose.
              </p>
            </div>
            
            <div className="hobby-card">
              <div className="hobby-icon">🐱</div>
              <h3 className="hobby-title">Luna</h3>
              <p className="hobby-desc">
                My cat Luna keeps me grounded. She's excellent at reminding me when it's time to step away from the screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready for New Opportunities */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2 className="about-cta-title">
            What I'm looking for
          </h2>
          
          <div className="about-cta-content">
            <p>
              I'm seeking a junior UX role where I can continue learning, contribute thoughtfully to cross-functional teams, and apply my skills in research, interaction design, and systems thinking across a variety of products and industries.
            </p>
            
            <p>
              Whether it's improving clinical workflows, streamlining government services, or building consumer products that reduce cognitive load—I specialize in creating experiences that help people feel more capable, more informed, and more at ease.
            </p>
            
            <p className="about-cta-highlight">
              If you're building something that matters, let's talk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}