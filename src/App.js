import React, { useRef, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { darkTheme } from "./theme";
import SectionButton from "./SectionButton";

const NameTitle = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
`;

const Name = styled.h1`
  font-size: 2.8rem;
  margin: 0;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.08em;
`;

const Title = styled.h2`
  font-size: 1.35rem;
  margin: 0.5rem 0 0 0;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 400;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
`;

// For smooth fade/slide transitions
const HeroImageWrapper = styled.div`
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
  width: 100%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(-40px)"};
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  display: flex;
  position: relative;
  min-height: 40px;
`;

const HeroImage = styled.img`
  max-width: 700px;
  width: 90vw;
  height: auto;
  border-radius: 1.2rem;
  box-shadow: 0 2px 24px 0 rgba(17,17,34,0.18);
  object-fit: cover;
`;

const Section = styled.section`
  max-width: 800px;
  margin: 0 auto 3rem auto;
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.accent};
  border-radius: 2rem;
  box-shadow: 0 2px 24px 0 rgba(17,17,34,0.18);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: opacity 0.7s, transform 0.7s;
  color: ${({ theme }) => theme.text};
`;

const ContentAnchor = styled.div`
  height: 0;
`;

function App() {
  const sectionRefs = {
    work: useRef(null),
    school: useRef(null),
    personal: useRef(null),
  };
  const heroImageRef = useRef(null);
  const contentAnchorRef = useRef(null);

  const [revealedSections, setRevealedSections] = useState({
    work: false,
    school: false,
    personal: false,
  });

  const [active, setActive] = useState(null);
  const [showHeroImage, setShowHeroImage] = useState(true);

  // --- Observer to reveal sections on scroll ---
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            setRevealedSections((rs) => {
              if (!rs[id]) return { ...rs, [id]: true };
              return rs;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("data-section-id", id);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line
  }, []);

  // --- Hero image fade-in/out and logic for scrolling to top ---
  useEffect(() => {
    const handleScroll = () => {
      // Always show hero at the very top, and reset active to null so text/hero fade is smooth
      if (window.scrollY < 50) {
        setShowHeroImage(true);
        setActive(null); // This allows the hero image to come back after section click
      } else {
        setShowHeroImage(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Section navigation ---
  const handleNav = (id) => {
    setRevealedSections((rs) => ({ ...rs, [id]: true }));
    setActive(id);
    setShowHeroImage(false);
    setTimeout(() => {
      // If you want to scroll to just below the image
      contentAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  // --- Render ---
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <NameTitle>
        <Name>Tanner Josiah Peck</Name>
        <Title>Engineering and Design Portfolio</Title>
      </NameTitle>
      <ButtonRow>
        <SectionButton onClick={() => handleNav("work")}>
          Professional Work Experience
        </SectionButton>
        <SectionButton onClick={() => handleNav("school")}>
          School and Educational Work
        </SectionButton>
        <SectionButton onClick={() => handleNav("personal")}>
          Personal Projects
        </SectionButton>
      </ButtonRow>
      {/* Hero image below title and section selects, always rendered for smooth fade/slide */}
      <HeroImageWrapper
        visible={showHeroImage}
        ref={heroImageRef}
      >
        <HeroImage src="docs/assets/background.jpg" alt="Background" />
      </HeroImageWrapper>
      <ContentAnchor ref={contentAnchorRef} />
      <div>
        <Section
          ref={sectionRefs.work}
          visible={revealedSections.work}
          style={{ minHeight: "340px" }}
        >
          <>
            <h2 style={{ marginTop: 0 }}>Professional Work Experience</h2>
            <h2>Professional Projects &amp; Work Experience</h2>
            <h3>Engineering Internship at Lasko Products, West Chester PA</h3>
            <p>Managed multiple projects in different divisions of Lasko Products as the sole Engineering Intern</p>
            <h4>Product Breakdown and Cost Analysis</h4>
            <p>
              Took apart and categorized all parts of multiple models of fans, blowers, heaters, and even dehumidifiers to create a detailed cost analysis of the materials used in each model. Each unit was taken apart, and all the materials were weighed, down to the copper in the wiring.
            </p>
            <h4>2000 CFM Test Chamber</h4>
            <p>
              Operated a 2000 CFM Test Chamber developed by Airflow Measurement Systems. Was tasked to correlate results from the chamber with data received from outsourced testing to assess accuracy of the machine. I also wrote an operating procedure for testing Box Fan units on this specific model.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Lasko-CFM.jpg" alt="2000 CFM Test Chamber" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Lasko-CFM-2.jpg" alt="2000 CFM Test Chamber 2" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Motor Failure Testing</h4>
            <p>
              Ran locked rotary tests on multiple models of fan motors to identify if any models were unsafe when surrounded by a flammable material like insulation. Each motor had the TCU (thermal cutoff) removed, which is the mechanism that shuts down the motor if it gets too hot.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Lasko-Motor.jpg" alt="Motor Failure Testing" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Lasko-Motor-2.jpg" alt="Motor Failure Testing 2" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Heat Rise Testing</h4>
            <p>
              Developed and wrote the operating procedure for a Heat-Rise Testing Room. This room was used as a control area to gauge how effective different models of household heaters are at changing the temperature of a room. Soldered and set up thermocouples throughout the room connecting them to a DATAQ analyzer, and ran multiple base tests to assess the success of the project.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Lasko-Heat-Rise.jpg" alt="Heat Rise Testing" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Lasko-Heat-Rise-2.jpg" alt="Heat Rise Testing 2" style={{ maxWidth: '300px' }} />
            </div>

            <h3>WEB GCS Accessories Project with RedCat Holdings, Salt Lake City UT</h3>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/REDCAT-SOLIDWORKS-Assembly-2.jpg" alt="WEB GCS" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/REDCAT-SOLIDWORKS-Assembly.jpg" alt="WEB GCS 2" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/REDCAT-Assembly.jpg" alt="WEB GCS 3" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Secondary Display Unit</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/REDCAT-SOLIDWORKS-Screen.jpg" alt="Secondary Display Unit" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/REDCAT-Screen.jpg" alt="Secondary Display Unit 2" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Sunshade/Protective Cover</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/REDCAT-SOLIDWORKS-Shader.jpg" alt="Sunshade/Protective Cover" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/REDCAT-SOLIDWORKS-Shader-2.jpg" alt="Sunshade/Protective Cover 2" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Directional Antenna</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/REDCAT-Antenna-Specs.jpg" alt="Directional Antenna" style={{ maxWidth: '300px' }} />
            </div>
          </>
        </Section>
        <Section
          ref={sectionRefs.school}
          visible={revealedSections.school}
          style={{ minHeight: "340px" }}
        >
          <>
            <h2 style={{ marginTop: 0 }}>School and Educational Work</h2>
            <h2>School Projects and Educational Pursuits</h2>

            <h3>Project 1: Linear Inverted Pendulum Control</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="/images/lip.jpg" alt="LIP Control" style={{ maxWidth: '300px' }} />
            </div>
            <p>
              Implemented LQR state-feedback in MATLAB to control an inverted pendulum on a cart, analyzing stability and performance.
            </p>

            <h3>Project 2: Fatigue Testing of SLS-Printed Hinges</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="/images/fatigue.jpg" alt="Fatigue Testing" style={{ maxWidth: '300px' }} />
            </div>
            <p>
              Used Ansys to simulate fatigue behavior of PA12-polyamide hinges under repeated loading in aerospace mockups.
            </p>
          </>
        </Section>
        <Section
          ref={sectionRefs.personal}
          visible={revealedSections.personal}
          style={{ minHeight: "340px" }}
        >
          <>
            <h2 style={{ marginTop: 0 }}>Personal Projects</h2>
            <h2>Personal &amp; Passion Projects</h2>

            <h4>College Dorm Room Layout</h4>
            <p>Designed in Onshape</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Dorm-Room.jpg" alt="College Dorm Room" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Dorm-Room-2.jpg" alt="College Dorm Room 2" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Dorm-Room-3.jpg" alt="College Dorm Room 3" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Remote Control Door Lock</h4>
            <p>
              Created a fully functional, screen-accurate remote control door lock as seen in the 2012 Amazing Spider-Man movie. This lock was a bolt lock powered by a linear actuator and connected to a remote control switch, allowing me to lock and unlock the door without having to move.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Arduino-Lock.jpg" alt="Spider-Man Remote Control Door Lock" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Arduino-Lock-2.jpg" alt="Spider-Man Remote Control Door Lock 2" style={{ maxWidth: '300px' }} />
            </div>

            <h4>Rocket Design</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Rocket-Full.jpg" alt="Rocket Design" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-1.jpg" alt="Rocket Design 1" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-2.jpg" alt="Rocket Design 2" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-3.jpg" alt="Rocket Design 3" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-4.jpg" alt="Rocket Design 4" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-5.jpg" alt="Rocket Design 5" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-6.jpg" alt="Rocket Design 6" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-7.jpg" alt="Rocket Design 7" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-Engine.jpg" alt="Rocket Engine" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-Engine-Diagram.jpg" alt="Rocket Engine Diagram" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Rocket-Fuel-Pump.jpg" alt="Rocket Fuel Pump" style={{ maxWidth: '300px' }} />
            </div>

            <hr />

            <h3>3D Printed Projects</h3>

            <h4 style={{ fontStyle: 'italic' }}>Design Based</h4>

            <h5>Obi-Wan's Lightsaber</h5>
            <p>Designed in Autodesk Inventor</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/ObiWan-Lightsaber-Render.jpg" alt="Obi-Wan's Lightsaber Render" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/ObiWan-Lightsaber.jpg" alt="Obi-Wan's Lightsaber" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/ObiWan-Lightsaber-2.jpg" alt="Obi-Wan's Lightsaber 2" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/ObiWan-Lightsaber-3.jpg" alt="Obi-Wan's Lightsaber 3" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Luke's Lightsaber</h5>
            <p>Designed in Autodesk Inventor</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Luke-Lightsaber-Render.jpg" alt="Luke's Lightsaber Render" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Millennium Falcon</h5>
            <p>Designed in Autodesk Inventor</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Millenium-falcon.jpg" alt="Millennium Falcon" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Millenium-falcon-2.jpg" alt="Millennium Falcon 2" style={{ maxWidth: '300px' }} />
            </div>

            <h5>64-Bit Mario</h5>
            <p>Designed in Autodesk Inventor</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Mario.jpg" alt="64-Bit Mini Mario" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Mario-2.jpg" alt="64-Bit Mini Mario 2" style={{ maxWidth: '300px' }} />
            </div>

            <hr />

            <h4 style={{ fontStyle: 'italic' }}>Downloaded Prints</h4>

            <h5>Han's Blaster</h5>
            <p>Downloaded the file and printed</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Hans-blaster.jpg" alt="Han's Blaster" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Hans-blaster-2.jpg" alt="Han's Blaster 2" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Dark Saber</h5>
            <p>Downloaded the file and printed</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Darksaber-2.jpg" alt="Dark Saber" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Darksaber.jpg" alt="Dark Saber 2" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Pellet Gun</h5>
            <p>Downloaded the file and printed</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Pellet-gun.jpg" alt="Pellet Gun" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Pellet-gun-2.jpg" alt="Pellet Gun 2" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Master Chief Bust</h5>
            <p>Downloaded the file and printed</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Master-Chief.jpg" alt="Master Chief Bust" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Master-Chief-2.jpg" alt="Master Chief Bust 2" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Master-Chief-3.jpg" alt="Master Chief Bust 3" style={{ maxWidth: '300px' }} />
            </div>

            <h5>Buddha Darth Vader</h5>
            <p>Downloaded the file and printed</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <img src="docs/assets/Darth-Buddah.jpg" alt="Buddha Darth Vader" style={{ maxWidth: '300px' }} />
              <img src="docs/assets/Darth-Buddah-2.jpg" alt="Buddha Darth Vader 2" style={{ maxWidth: '300px' }} />
            </div>
          </>
        </Section>
      </div>
    </ThemeProvider>
  );
}

export default App;
