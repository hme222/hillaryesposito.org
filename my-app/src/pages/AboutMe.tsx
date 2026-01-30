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
      
      {/* Floating Luna - Hidden on mobile for WCAG, visible on desktop */}
      <div 
        ref={catRef}
        className="about-luna"
        role="img"
        aria-label="Luna, Hillary's cat companion"
      >
        <img 
          src="/favicon.png"
          alt="Luna, a gray and white cat with orange eyes"
        />
      </div>

      {/* Opening - Setting the Scene */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">
            Let me tell you a story about designing for the moments that matter.
          </p>
          
          <h1 className="about-title">
            I turn complex, high‑emotion systems into experiences that feel intuitive, calm, and human.
          </h1>
        </div>
      </section>

      {/* The Journey Begins */}
      <section className="about-journey">
        <div className="about-chapters">
          
          {/* Chapter: Starting with Joy */}
          <div className="about-chapter about-chapter--reina">
            <div className="chapter-marker">
              <div className="chapter-dot" />
              <span className="chapter-label">
                Where I Started for Fun
              </span>
            </div>
            
            <h2 className="chapter-heading">
              First, I built something for joy.
            </h2>
            
            <p className="chapter-text">
              Not every high-stakes moment happens in a hospital or a war zone. Sometimes it's a couple planning their destination wedding, trying to balance family expectations, budget constraints, and the dream of a perfect day. The stress is different, but the need for clarity and calm is exactly the same.
            </p>
            
            <p className="chapter-text">
              So I created Reina—a mobile app that guides couples through the emotional complexity of planning a celebration in a place they've never been. It's about more than checklists. It's about helping people feel supported, grounded, and confident during one of the most meaningful moments of their lives.
            </p>
            
            <p className="chapter-text">
              This project taught me that whether you're saving lives or planning the best day of your life, you deserve tools that make you feel capable.
            </p>
          </div>

          {/* Chapter: Healthcare */}
          <div className="about-chapter about-chapter--msk">
            <div className="chapter-marker">
              <div className="chapter-dot" />
              <span className="chapter-label">
                Where it Got Real
              </span>
            </div>
            
            <h2 className="chapter-heading">
              Healthcare showed me what's at stake.
            </h2>
            
            <p className="chapter-text">
              At Memorial Sloan Kettering Cancer Center, I led UX research for tools used by 21,000+ staff. Clinicians, administrators, researchers—all navigating life-and-death decisions through digital interfaces. A confusing workflow isn't just frustrating here. It could mean a missed diagnosis, a delayed treatment, a moment of uncertainty when someone needs absolute clarity.
            </p>
            
            <p className="chapter-text">
              I redesigned EHR features. I reengineered certification workflows. I guided massive system rollouts. But more than anything, I learned to design with deep respect for the weight people carry. These weren't just users—they were professionals trying to save lives while drowning in administrative complexity.
            </p>
            
            <p className="chapter-text">
              So I designed for cognitive ease. For trust. For the feeling of "yes, this makes sense" in a world that often doesn't.
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
              The Army taught me to design for pressure.
            </h2>
            
            <p className="chapter-text">
              As a logistics officer in the Army National Guard, I directed systems for 5,000+ deployed soldiers. When you're coordinating supplies across combat zones, there's no room for ambiguity. Every interface, every workflow, every decision point needs to work under the worst possible conditions.
            </p>
            
            <p className="chapter-text">
              That experience didn't just teach me discipline—it taught me empathy. I learned to design for people who are stressed, overwhelmed, and making decisions that truly matter. People who need systems that hold up when everything else is falling apart.
            </p>
            
            <p className="chapter-text">
              My deployment shaped who I am today. It gave me a steady, thoughtful perspective that I bring to every project.
            </p>
          </div>

        </div>
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

      {/* Skills & Growth */}
      <section className="about-growth">
        <h2 className="about-growth-title">
          Always learning, always growing
        </h2>
        
        <p className="about-growth-text">
          After years in healthcare and government systems, I've recently completed several bootcamps to sharpen my technical skills and stay at the forefront of UX best practices. I've deepened my expertise in interaction design, accessibility standards, and research methodologies—all while keeping my focus on what matters most: designing tools that help people.
        </p>
        
        <p className="about-growth-text">
          I work at the intersection of UX, service design, and systems thinking. My focus is healthcare, government, wellness—anywhere people are time-pressed, overwhelmed, or making decisions that shape their lives.
        </p>
      </section>

      {/* Ready for New Opportunities */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2 className="about-cta-title">
            Ready for what's next
          </h2>
          
          <div className="about-cta-content">
            <p>
              I'm currently seeking new opportunities where I can bring my unique combination of military discipline, healthcare systems expertise, and human-centered design thinking to teams that value clarity, empathy, and impact.
            </p>
            
            <p>
              Whether it's improving clinical workflows, streamlining government services, or building consumer products that bring joy—I specialize in reducing cognitive load and creating experiences that help people feel more capable, more informed, and more at ease.
            </p>
            
            <p className="about-cta-highlight">
              If you're building something that matters, let's talk.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="about-closing">
        <p className="about-closing-text">
          That's my journey. Let's see where yours takes us.
        </p>
      </section>
    </div>
  );
}