import React, { useRef, useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme } from "./theme";

// --- GLOBAL STYLES ---
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    min-height: 100%;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', 'Segoe UI', Arial, Helvetica, sans-serif;
    background: ${({ theme }) => theme.banner || "#181A1B"};
    color: ${({ theme }) => theme.text || "#fff"};
    scroll-behavior: smooth;
  }
`;

// --- NAVBAR ---
const Navbar = styled.nav`
  width: 100vw;
  background: ${({ theme }) => theme.banner || "#181A1B"};
  box-shadow: 0 2px 24px 0 rgba(17,17,34,0.13);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
`;

const NavbarInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 2rem;
  margin: 0 0.18rem;
  cursor: pointer;
  background: ${({ theme, selected }) => selected ? theme.accent : "rgba(255,255,255,0.06)"};
  color: ${({ theme, selected }) => selected ? theme.text : theme.secondaryText};
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: none;
  transition: background 0.18s, color 0.18s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }
`;

const HomeButton = styled(NavButton)`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  margin-right: 1.1rem;
  &:hover, &:focus {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.banner || "#181A1B"};
  }
`;

// --- HERO SECTION ---
const HeroSection = styled.section`
  width: 100vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.sectionBg || "#232325"};
  transition: opacity 0.7s, transform 0.7s;
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25em;
  letter-spacing: 0.08em;
  text-align: center;
`;

const HeroSubtitle = styled.h2`
  font-size: 1.55rem;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 400;
  margin: 0 0 2.1rem;
  text-align: center;
`;

const HeroImg = styled.img`
  width: 95vw;
  max-width: 900px;
  height: 68vh;
  max-height: 480px;
  border-radius: 1.2rem;
  object-fit: cover;
  box-shadow: 0 2px 22px 0 rgba(17,17,34,0.18);
`;

// --- SECTION WRAPPERS ---
const SectionWrapper = styled.section`
  width: 100vw;
  background: ${({ theme }) => theme.sectionBg || "#232325"};
  padding: 7vh 0;
  border-top: 1.5px solid ${({ theme }) => theme.accent};
  border-bottom: 1.5px solid ${({ theme }) => theme.accent};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0) scale(1)" : "translateY(8vh) scale(0.97)"};
  transition: 
    opacity 0.7s cubic-bezier(.4, 0, .2, 1),
    transform 0.7s cubic-bezier(.4, 0, .2, 1);
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const SectionInner = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.4rem;
`;

// --- ABOUT ---
const AboutFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const AboutLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  max-width: 320px;
`;

const AboutImg = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 1px 8px 0 rgba(17,17,34,0.09);
  margin-bottom: 1.1rem;
  background: #222;
`;

const ResumeLink = styled.a`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  padding: 0.45rem 1.3rem;
  border-radius: 1rem;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.18rem;
  margin-bottom: 0.7rem;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.banner || "#181A1B"};
  }
  svg { margin-right: 0.5rem; }
`;

const LinkedInLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #0e76a8;
  font-weight: 600;
  font-size: 1.18rem;
  text-decoration: none;
  margin-top: 0.14rem;
  transition: color 0.14s;
  svg { margin-right: 0.5rem; }
  &:hover {
    color: #09527a;
    text-decoration: underline;
  }
`;

const AboutRight = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.27rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  min-width: 340px;
  max-width: 600px;
`;

const AboutSectionHeader = styled.h3`
  font-size: 1.21rem;
  margin: 0 0 0.4rem 0;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
`;

// --- SECTION TITLE ---
const SectionTitle = styled.h2`
  font-size: 2.05rem;
  margin: 0 0 0.9em 0;
  color: ${({ theme }) => theme.text};
`;

// --- IMAGES GRID ---
const ImagesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.2rem;
  margin-bottom: 2.2rem;
`;

const SectionImg = styled.img`
  width: 440px;
  max-width: 100%;
  height: auto;
  max-height: 440px;
  object-fit: contain;
  border-radius: 0.8rem;
  background: #222;
  box-shadow: 0 1px 12px 0 rgba(17,17,34,0.12);
  margin-bottom: 0.8rem;
  aspect-ratio: 4/3;
`;

// --- SECTION ANCHOR UTILITY ---
const SectionAnchor = styled.span`
  display: block;
  position: relative;
  top: -80px;
  height: 0;
`;

// --- HOOK: SECTION VISIBILITY ---
function useSectionVisibility(refs, setStates) {
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section-id");
          if (entry.isIntersecting) {
            setStates((prev) => {
              if (prev[id]) return prev; // No unnecessary updates
              const updated = {};
              Object.keys(prev).forEach((k) => (updated[k] = false));
              updated[id] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.48 }
    );
    Object.entries(refs).forEach(([id, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("data-section-id", id);
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);
}

// --- MAIN APP ---
function App() {
  // --- Section Refs ---
  const refs = {
    about: useRef(null),
    work: useRef(null),
    school: useRef(null),
    personal: useRef(null),
  };
  const heroRef = useRef(null);

  // --- Section State ---
  const [visible, setVisible] = useState({
    about: false,
    work: false,
    school: false,
    personal: false,
  });
  const [active, setActive] = useState(null);
  const [showHero, setShowHero] = useState(true);

  useSectionVisibility(refs, setVisible);

  // --- Scroll Effects: Hero & Section Nav ---
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      if (window.scrollY < 35) {
        setShowHero(true);
        setActive(null);
      } else {
        setShowHero(heroBottom > 64);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Scroll to Section with Navbar Offset ---
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        // Scroll up for sticky nav
        const rect = ref.current.getBoundingClientRect();
        const nav = document.querySelector("nav");
        const navHeight = nav ? nav.offsetHeight : 72;
        if (rect.top < navHeight + 2 && Math.abs(rect.top) > 2) {
          window.scrollBy({ top: rect.top - navHeight - 2, left: 0, behavior: "smooth" });
        }
      }, 420);
    }
  };

  // --- NAVIGATION HANDLERS ---
  const handleNav = (id) => {
    setVisible((prev) => {
      const updated = {};
      Object.keys(prev).forEach((k) => (updated[k] = false));
      updated[id] = true;
      return updated;
    });
    setActive(id);
    setShowHero(false);
    setTimeout(() => scrollToSection(refs[id]), 120);
  };

  const handleHome = () => {
    setActive(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      {/* NAVBAR */}
      <Navbar>
        <NavbarInner>
          <HomeButton
            onClick={handleHome}
            selected={active === null}
            aria-label="Home"
          >
            Home
          </HomeButton>
          <NavButton
            onClick={() => handleNav("about")}
            selected={active === "about"}
          >
            About
          </NavButton>
          <NavButton
            onClick={() => handleNav("work")}
            selected={active === "work"}
          >
            Professional Work
          </NavButton>
          <NavButton
            onClick={() => handleNav("school")}
            selected={active === "school"}
          >
            School Work
          </NavButton>
          <NavButton
            onClick={() => handleNav("personal")}
            selected={active === "personal"}
          >
            Personal Projects
          </NavButton>
        </NavbarInner>
      </Navbar>

      {/* HERO */}
      {showHero && (
        <HeroSection ref={heroRef}>
          <HeroTitle>Tanner Josiah Peck</HeroTitle>
          <HeroSubtitle>Engineering and Design Portfolio</HeroSubtitle>
          <HeroImg src="docs/assets/Background.jpg" alt="Background" />
        </HeroSection>
      )}

      {/* ABOUT */}
      <SectionAnchor id="about-anchor" />
      <SectionWrapper ref={refs.about} visible={visible.about}>
        <SectionInner>
          <SectionTitle>About</SectionTitle>
          <AboutFlex>
            <AboutLeft>
              <AboutImg src="docs/assets/About.jpg" alt="Tanner Josiah Peck" />
              <ResumeLink
                href="docs/assets/Tanner-Peck-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <svg
                  height="1.18em"
                  viewBox="0 0 24 24"
                  width="1.18em"
                  fill="currentColor"
                  style={{ marginRight: "0.4rem", marginBottom: "0.12em" }}
                >
                  <path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z" />
                </svg>
                Download Resume
              </ResumeLink>
              <LinkedInLink
                href="https://www.linkedin.com/in/tanner-josiah-peck/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" width="1.18em" height="1.18em">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.46-2.154 2.969v5.698h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.044 0 3.604 2.004 3.604 4.609v5.587z"/>
                </svg>
                LinkedIn
              </LinkedInLink>
            </AboutLeft>
            <AboutRight>
              <AboutSectionHeader>Background</AboutSectionHeader>
              <div>B.S in Mechanical Engineering, Syracuse University</div>
              <AboutSectionHeader>Skills</AboutSectionHeader>
              <div>
                Solidworks, Autodesk Inventor, Onshape, MATLAB, RStudio, NI Multisim, Arduino, Microsoft (Word, Powerpoint, Excel),<br />
                3D Printing, Mechanical Assembly, Machine Lab Trained.
              </div>
            </AboutRight>
          </AboutFlex>
        </SectionInner>
      </SectionWrapper>

      {/* PROFESSIONAL WORK */}
      <SectionAnchor id="work-anchor" />
      <SectionWrapper ref={refs.work} visible={visible.work}>
        <SectionInner>
          <SectionTitle>Professional Work Experience</SectionTitle>
          <h3 style={{ fontSize: "1.5rem" }}>Engineering Internship at Lasko Products, West Chester PA</h3>
          <p style={{ fontSize: "1.22rem" }}>Managed multiple projects in different divisions of Lasko Products as the sole Engineering Intern</p>
          <h4>Product Breakdown and Cost Analysis</h4>
          <p>
            Took apart and categorized all parts of multiple models of fans, blowers, heaters, and even dehumidifiers to create a detailed cost analysis of the materials used in each model. Each unit was taken apart, and all the materials were weighed, down to the copper in the wiring.
          </p>
          <h4>2000 CFM Test Chamber</h4>
          <p>
            Operated a 2000 CFM Test Chamber developed by Airflow Measurement Systems. Was tasked to correlate results from the chamber with data received from outsourced testing to assess accuracy of the machine. I also wrote an operating procedure for testing Box Fan units on this specific model.
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Lasko-CFM.jpg" alt="2000 CFM Test Chamber" />
            <SectionImg src="docs/assets/Lasko-CFM-2.jpg" alt="2000 CFM Test Chamber 2" />
          </ImagesGrid>
          <h4>Motor Failure Testing</h4>
          <p>
            Ran locked rotary tests on multiple models of fan motors to identify if any models were unsafe when surrounded by a flammable material like insulation. Each motor had the TCU (thermal cutoff) removed, which is the mechanism that shuts down the motor if it gets too hot.
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Lasko-Motor.jpg" alt="Motor Failure Testing" />
            <SectionImg src="docs/assets/Lasko-Motor-2.jpg" alt="Motor Failure Testing 2" />
          </ImagesGrid>
          <h4>Heat Rise Testing</h4>
          <p>
            Developed and wrote the operating procedure for a Heat-Rise Testing Room. This room was used as a control area to gauge how effective different models of household heaters are at changing the temperature of a room. Soldered and set up thermocouples throughout the room connecting them to a DATAQ analyzer, and ran multiple base tests to assess the success of the project.
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Lasko-Heat-Rise.jpg" alt="Heat Rise Testing" />
            <SectionImg src="docs/assets/Lasko-Heat-Rise-2.jpg" alt="Heat Rise Testing 2" />
          </ImagesGrid>
          <h3 style={{ fontSize: "1.5rem" }}>WEB GCS Accessories Project with RedCat Holdings, Salt Lake City UT</h3>
          <p style={{ fontSize: "1.22rem" }}>
            Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Assembly-2.jpg" alt="WEB GCS" />
            <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Assembly.jpg" alt="WEB GCS 2" />
            <SectionImg src="docs/assets/REDCAT-Assembly.jpg" alt="WEB GCS 3" />
          </ImagesGrid>
          <h4>Secondary Display Unit</h4>
          <p>
            Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Screen.jpg" alt="Secondary Display Unit" />
            <SectionImg src="docs/assets/REDCAT-Screen.jpg" alt="Secondary Display Unit 2" />
          </ImagesGrid>
          <h4>Sunshade/Protective Cover</h4>
          <p>
            Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Shader.jpg" alt="Sunshade/Protective Cover" />
            <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Shader-2.jpg" alt="Sunshade/Protective Cover 2" />
          </ImagesGrid>
          <h4>Directional Antenna</h4>
          <p>
            Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/REDCAT-Antenna-Specs.jpg" alt="Directional Antenna" />
          </ImagesGrid>
        </SectionInner>
      </SectionWrapper>

      {/* SCHOOL WORK */}
      <SectionAnchor id="school-anchor" />
      <SectionWrapper ref={refs.school} visible={visible.school}>
        <SectionInner>
          <SectionTitle>School and Educational Work</SectionTitle>
          <h3>Project 1: Linear Inverted Pendulum Control</h3>
          <ImagesGrid>
            <SectionImg src="/images/lip.jpg" alt="LIP Control" />
          </ImagesGrid>
          <p>
            Implemented LQR state-feedback in MATLAB to control an inverted pendulum on a cart, analyzing stability and performance.
          </p>
          <h3>Project 2: Fatigue Testing of SLS-Printed Hinges</h3>
          <ImagesGrid>
            <SectionImg src="/images/fatigue.jpg" alt="Fatigue Testing" />
          </ImagesGrid>
          <p>
            Used Ansys to simulate fatigue behavior of PA12-polyamide hinges under repeated loading in aerospace mockups.
          </p>
        </SectionInner>
      </SectionWrapper>

      {/* PERSONAL PROJECTS */}
      <SectionAnchor id="personal-anchor" />
      <SectionWrapper ref={refs.personal} visible={visible.personal}>
        <SectionInner>
          <SectionTitle>Personal Projects</SectionTitle>
          <h4>College Dorm Room Layout</h4>
          <p>Designed in Onshape</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Dorm-Room.jpg" alt="College Dorm Room" />
            <SectionImg src="docs/assets/Dorm-Room-2.jpg" alt="College Dorm Room 2" />
            <SectionImg src="docs/assets/Dorm-Room-3.jpg" alt="College Dorm Room 3" />
          </ImagesGrid>
          <h4>Remote Control Door Lock</h4>
          <p>
            Created a fully functional, screen-accurate remote control door lock as seen in the 2012 Amazing Spider-Man movie. This lock was a bolt lock powered by a linear actuator and connected to a remote control switch, allowing me to lock and unlock the door without having to move.
          </p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Arduino-Lock.jpg" alt="Spider-Man Remote Control Door Lock" />
            <SectionImg src="docs/assets/Arduino-Lock-2.jpg" alt="Spider-Man Remote Control Door Lock 2" />
          </ImagesGrid>
          <h4>Rocket Design</h4>
          <ImagesGrid>
            <SectionImg src="docs/assets/Rocket-Full.jpg" alt="Rocket Design" />
            <SectionImg src="docs/assets/Rocket-1.jpg" alt="Rocket Design 1" />
            <SectionImg src="docs/assets/Rocket-2.jpg" alt="Rocket Design 2" />
            <SectionImg src="docs/assets/Rocket-3.jpg" alt="Rocket Design 3" />
            <SectionImg src="docs/assets/Rocket-4.jpg" alt="Rocket Design 4" />
            <SectionImg src="docs/assets/Rocket-5.jpg" alt="Rocket Design 5" />
            <SectionImg src="docs/assets/Rocket-6.jpg" alt="Rocket Design 6" />
            <SectionImg src="docs/assets/Rocket-7.jpg" alt="Rocket Design 7" />
            <SectionImg src="docs/assets/Rocket-Engine.jpg" alt="Rocket Engine" />
            <SectionImg src="docs/assets/Rocket-Engine-Diagram.jpg" alt="Rocket Engine Diagram" />
            <SectionImg src="docs/assets/Rocket-Fuel-Pump.jpg" alt="Rocket Fuel Pump" />
          </ImagesGrid>
          <hr style={{ margin: "2.2rem 0" }} />
          <h3>3D Printed Projects</h3>
          <h4 style={{ fontStyle: 'italic' }}>Design Based</h4>
          <h5>Obi-Wan's Lightsaber</h5>
          <p>Designed in Autodesk Inventor</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/ObiWan-Lightsaber-Render.jpg" alt="Obi-Wan's Lightsaber Render" />
            <SectionImg src="docs/assets/ObiWan-Lightsaber.jpg" alt="Obi-Wan's Lightsaber" />
            <SectionImg src="docs/assets/ObiWan-Lightsaber-2.jpg" alt="Obi-Wan's Lightsaber 2" />
            <SectionImg src="docs/assets/ObiWan-Lightsaber-3.jpg" alt="Obi-Wan's Lightsaber 3" />
          </ImagesGrid>
          <h5>Luke's Lightsaber</h5>
          <p>Designed in Autodesk Inventor</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Luke-Lightsaber-Render.jpg" alt="Luke's Lightsaber Render" />
          </ImagesGrid>
          <h5>Millennium Falcon</h5>
          <p>Designed in Autodesk Inventor</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Millenium-falcon.jpg" alt="Millennium Falcon" />
            <SectionImg src="docs/assets/Millenium-falcon-2.jpg" alt="Millennium Falcon 2" />
          </ImagesGrid>
          <h5>64-Bit Mario</h5>
          <p>Designed in Autodesk Inventor</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Mario.jpg" alt="64-Bit Mini Mario" />
            <SectionImg src="docs/assets/Mario-2.jpg" alt="64-Bit Mini Mario 2" />
          </ImagesGrid>
          <hr style={{ margin: "2.2rem 0" }} />
          <h4 style={{ fontStyle: 'italic' }}>Downloaded Prints</h4>
          <h5>Han's Blaster</h5>
          <p>Downloaded the file and printed</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Hans-blaster.jpg" alt="Han's Blaster" />
            <SectionImg src="docs/assets/Hans-blaster-2.jpg" alt="Han's Blaster 2" />
          </ImagesGrid>
          <h5>Dark Saber</h5>
          <p>Downloaded the file and printed</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Darksaber-2.jpg" alt="Dark Saber" />
            <SectionImg src="docs/assets/Darksaber.jpg" alt="Dark Saber 2" />
          </ImagesGrid>
          <h5>Pellet Gun</h5>
          <p>Downloaded the file and printed</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Pellet-gun.jpg" alt="Pellet Gun" />
            <SectionImg src="docs/assets/Pellet-gun-2.jpg" alt="Pellet Gun 2" />
          </ImagesGrid>
          <h5>Master Chief Bust</h5>
          <p>Downloaded the file and printed</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Master-Chief.jpg" alt="Master Chief Bust" />
            <SectionImg src="docs/assets/Master-Chief-2.jpg" alt="Master Chief Bust 2" />
            <SectionImg src="docs/assets/Master-Chief-3.jpg" alt="Master Chief Bust 3" />
          </ImagesGrid>
          <h5>Buddha Darth Vader</h5>
          <p>Downloaded the file and printed</p>
          <ImagesGrid>
            <SectionImg src="docs/assets/Darth-Buddah.jpg" alt="Buddha Darth Vader" />
            <SectionImg src="docs/assets/Darth-Buddah-2.jpg" alt="Buddha Darth Vader 2" />
          </ImagesGrid>
        </SectionInner>
      </SectionWrapper>
    </ThemeProvider>
  );
}

export default App;
