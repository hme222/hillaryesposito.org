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
    <div className="min-h-screen bg-[#f8d2b7] dark:bg-[#1a0e03] transition-colors duration-300 relative">
      
      {/* Floating Luna - Hidden on mobile for WCAG, visible on desktop */}
      <div 
        ref={catRef}
        className="hidden lg:block fixed right-12 top-1/3 z-10 transition-transform duration-300 ease-out"
        role="img"
        aria-label="Luna, Hillary's cat companion"
      >
        <img 
          src="/mnt/user-data/uploads/ChatGPT_Image_Jan_26__2026__05_30_36_PM.png"
          alt="Luna, a gray and white cat with orange eyes"
          className="w-32 h-32 object-contain opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Opening - Setting the Scene */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="space-y-8">
          <p 
            className="text-lg md:text-xl text-[#5f3f1c] dark:text-[#EBA352] leading-relaxed opacity-90"
            style={{ fontFamily: " serif" }}
          >
            Let me tell you a story about designing for the moments that matter.
          </p>
          
          <h1 
            className="text-4xl md:text-6xl leading-tight text-[#36220c] dark:text-[#f8d2b7] font-normal"
            style={{ fontFamily: " serif" }}
          >
            I turn complex, high‑emotion systems into experiences that feel intuitive, calm, and human.
          </h1>
        </div>
      </section>

      {/* The Journey Begins */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          
          {/* Chapter: Starting with Joy */}
          <div className="space-y-6 border-l-4 border-[#EBA352] dark:border-[#ba803f] pl-8 py-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#EBA352] dark:bg-[#ba803f]" />
              <span className="text-sm uppercase tracking-wider text-[#8b5f2d] dark:text-[#EBA352] font-medium">
                Where I Started for Fun
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-[#36220c] dark:text-[#f8d2b7] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
              First, I built something for joy.
            </h2>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              Not every high-stakes moment happens in a hospital or a war zone. Sometimes it's a couple planning their destination wedding, trying to balance family expectations, budget constraints, and the dream of a perfect day. The stress is different, but the need for clarity and calm is exactly the same.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              So I created Reina—a mobile app that guides couples through the emotional complexity of planning a celebration in a place they've never been. It's about more than checklists. It's about helping people feel supported, grounded, and confident during one of the most meaningful moments of their lives.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              This project taught me that whether you're saving lives or planning the best day of your life, you deserve tools that make you feel capable.
            </p>
          </div>

          {/* Chapter: Healthcare */}
          <div className="space-y-6 border-l-4 border-[#ba803f] dark:border-[#8b5f2d] pl-8 py-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#ba803f] dark:bg-[#8b5f2d]" />
              <span className="text-sm uppercase tracking-wider text-[#8b5f2d] dark:text-[#ba803f] font-medium">
                Where it Got Real
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-[#36220c] dark:text-[#f8d2b7] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
              Healthcare showed me what's at stake.
            </h2>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              At Memorial Sloan Kettering Cancer Center, I led UX research for tools used by 21,000+ staff. Clinicians, administrators, researchers—all navigating life-and-death decisions through digital interfaces. A confusing workflow isn't just frustrating here. It could mean a missed diagnosis, a delayed treatment, a moment of uncertainty when someone needs absolute clarity.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              I redesigned EHR features. I reengineered certification workflows. I guided massive system rollouts. But more than anything, I learned to design with deep respect for the weight people carry. These weren't just users—they were professionals trying to save lives while drowning in administrative complexity.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              So I designed for cognitive ease. For trust. For the feeling of "yes, this makes sense" in a world that often doesn't.
            </p>
          </div>

          {/* Chapter: Army Foundation */}
          <div className="space-y-6 border-l-4 border-[#8b5f2d] dark:border-[#5f3f1c] pl-8 py-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#8b5f2d] dark:bg-[#5f3f1c]" />
              <span className="text-sm uppercase tracking-wider text-[#8b5f2d] dark:text-[#8b5f2d] font-medium">
                Where the Foundation Was Built
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-[#36220c] dark:text-[#f8d2b7] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
              The Army taught me to design for pressure.
            </h2>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              As a logistics officer in the Army National Guard, I directed systems for 5,000+ deployed soldiers. When you're coordinating supplies across combat zones, there's no room for ambiguity. Every interface, every workflow, every decision point needs to work under the worst possible conditions.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              That experience didn't just teach me discipline—it taught me empathy. I learned to design for people who are stressed, overwhelmed, and making decisions that truly matter. People who need systems that hold up when everything else is falling apart.
            </p>
            
            <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
              My deployment shaped who I am today. It gave me a steady, thoughtful perspective that I bring to every project.
            </p>
          </div>

        </div>
      </section>

      {/* Life After Service - Luna, Running, Reading */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#f8d2b7]/30 dark:bg-[#36220c] p-8 md:p-12 rounded-sm border-2 border-[#ba803f] dark:border-[#8b5f2d]">
          <h2 className="text-3xl md:text-4xl text-[#36220c] dark:text-[#f8d2b7] leading-snug mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Life as a veteran
          </h2>
          
          <div className="space-y-6 text-lg text-[#5f3f1c] dark:text-[#f8d2b7]/90 leading-relaxed">
            <p>
              After my deployment, I found myself gravitating toward routines that bring calm and clarity—the same things I try to design into every interface.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-6">
              <div className="space-y-3">
                <div className="text-4xl">🏃‍♀️</div>
                <h3 className="text-xl font-medium text-[#36220c] dark:text-[#EBA352]">Running</h3>
                <p className="text-base text-[#5f3f1c] dark:text-[#f8d2b7]/80">
                  Miles give me time to think through design problems and decompress from complexity.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl">📚</div>
                <h3 className="text-xl font-medium text-[#36220c] dark:text-[#EBA352]">Reading</h3>
                <p className="text-base text-[#5f3f1c] dark:text-[#f8d2b7]/80">
                  Books remind me that every good story—like every good design—needs structure, empathy, and purpose.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl">🐱</div>
                <h3 className="text-xl font-medium text-[#36220c] dark:text-[#EBA352]">Luna</h3>
                <p className="text-base text-[#5f3f1c] dark:text-[#f8d2b7]/80">
                  My cat Luna keeps me grounded. She's excellent at reminding me when it's time to step away from the screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Growth */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl text-[#36220c] dark:text-[#f8d2b7] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
            Always learning, always growing
          </h2>
          
          <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
            After years in healthcare and government systems, I've recently completed several bootcamps to sharpen my technical skills and stay at the forefront of UX best practices. I've deepened my expertise in interaction design, accessibility standards, and research methodologies—all while keeping my focus on what matters most: designing tools that help people.
          </p>
          
          <p className="text-lg leading-relaxed text-[#5f3f1c] dark:text-[#f8d2b7]/80">
            I work at the intersection of UX, service design, and systems thinking. My focus is healthcare, government, wellness—anywhere people are time-pressed, overwhelmed, or making decisions that shape their lives.
          </p>
        </div>
      </section>

      {/* Ready for New Opportunities */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#36220c] dark:bg-[#EBA352] p-10 md:p-16 rounded-sm">
          <h2 className="text-3xl md:text-4xl text-[#f8d2b7] dark:text-[#1a0e03] leading-snug mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Ready for what's next
          </h2>
          
          <div className="space-y-6 text-lg text-[#f8d2b7]/90 dark:text-[#1a0e03]/90 leading-relaxed">
            <p>
              I'm currently seeking new opportunities where I can bring my unique combination of military discipline, healthcare systems expertise, and human-centered design thinking to teams that value clarity, empathy, and impact.
            </p>
            
            <p>
              Whether it's improving clinical workflows, streamlining government services, or building consumer products that bring joy—I specialize in reducing cognitive load and creating experiences that help people feel more capable, more informed, and more at ease.
            </p>
            
            <p className="text-xl text-[#f8d2b7] dark:text-[#1a0e03] font-normal pt-4">
              If you're building something that matters, let's talk.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-4xl mx-auto px-6 py-20 pb-32">
        <p className="text-xl md:text-2xl text-[#5f3f1c] dark:text-[#EBA352] leading-relaxed text-center" style={{ fontFamily: "'Georgia', serif" }}>
          That's my journey. Let's see where yours takes us.
        </p>
      </section>
    </div>
  );
}