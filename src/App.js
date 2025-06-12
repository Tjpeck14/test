import React, { useRef, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { darkTheme } from "./theme";
import SectionButton from "./SectionButton";

// --- NEW BANNER NAV STYLES ---
const BannerNav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: ${({ theme }) => theme.banner || "#181A1B"};
  box-shadow: 0 2px 24px 0 rgba(17,17,34,0.18);
  padding: 0.5rem 0.5rem;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: background 0.3s;
`;

const BannerNavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 900px;
  width: 100%;
`;

const BannerButton = styled.button`
  background: ${({ theme, selected }) =>
    selected ? theme.accent : "rgba(255,255,255,0.07)"};
  color: ${({ theme, selected }) =>
    selected ? theme.text : theme.secondaryText};
  border: none;
  outline: none;
  border-radius: 1.2rem;
  padding: 0.7rem 1.7rem;
  margin: 0 0.15rem;
  font-size: 1.13rem;
  font-family: inherit;
  cursor: pointer;
  font-weight: 600;
  box-shadow: none;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }
`;

const BannerHomeButton = styled(BannerButton)`
  margin-right: 1.1rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  &:hover, &:focus {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.banner || "#181A1B"};
  }
`;

const NameTitle = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  transition: opacity 0.6s, transform 0.6s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? "0px" : "-30px")});
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  height: ${({ visible }) => (visible ? "auto" : "0px")};
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

const HeroImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  width: 100%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(-40px)"};
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
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

// === CHANGE: About image is now larger and supports retina/high-dpi screens via srcSet ===
const AboutSection = styled.section`
  width: 100vw;
  background: ${({ theme }) => theme.sectionBg || "#212325"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 0;
  margin: 0;
  min-height: 320px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});
  transition: opacity 0.7s, transform 0.7s;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  border-bottom: 1px solid ${({ theme }) => theme.accent};
`;

const AboutContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  max-width: 900px;
  width: 100%;
  padding: 0 2rem;
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const AboutLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 275px;
  max-width: 350px;
`;

const AboutImg = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 1px 16px 0 rgba(17,17,34,0.16);
  background: #222;
  image-rendering: auto;
`;

const ResumeLink = styled.a`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  text-decoration: none;
  font-size: 1.03rem;
  box-shadow: 0 1px 8px 0 rgba(17,17,34,0.11);
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.banner || "#181A1B"};
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const LinkedInLink = styled.a`
  display: flex;
  align-items: center;
  color: #0e76a8;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  margin-top: 0.2rem;
  svg {
    margin-right: 0.4rem;
    font-size: 1.3em;
  }
  &:hover {
    text-decoration: underline;
    color: #09527a;
  }
`;

const AboutRight = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.12rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  min-width: 260px;
  max-width: 400px;
  @media (max-width: 760px) {
    max-width: 100%;
    min-width: 0;
    align-items: center;
    text-align: center;
  }
`;

const AboutSectionHeader = styled.h3`
  font-size: 1.16rem;
  margin: 0 0 0.4rem 0;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
`;

// --- BREAKOUT SECTION STYLES ---
const Section = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 3rem auto;
  padding: 3rem 0 3rem 0;
  background: ${({ theme }) => theme.sectionBg || "#212325"};
  border-radius: 0;
  box-shadow: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: opacity 0.7s, transform 0.7s;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.accent};
  border-bottom: 1px solid ${({ theme }) => theme.accent};
`;

const SectionInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const ContentAnchor = styled.div`
  height: 0;
`;

const ImagesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

const SectionImg = styled.img`
  width: 350px;
  max-width: 100%;
  height: auto;
  max-height: 360px;
  object-fit: contain;
  border-radius: 0.7rem;
  background: #222;
  box-shadow: 0 1px 8px 0 rgba(17,17,34,0.09);
  margin-bottom: 0.5rem;
  aspect-ratio: 4/3;
`;

function App() {
  const sectionRefs = {
    about: useRef(null),
    work: useRef(null),
    school: useRef(null),
    personal: useRef(null),
  };
  const heroImageRef = useRef(null);
  const contentAnchorRef = useRef(null);

  const [revealedSections, setRevealedSections] = useState({
    about: false,
    work: false,
    school: false,
    personal: false,
  });

  const [active, setActive] = useState(null);
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [showNameTitle, setShowNameTitle] = useState(true);
  const [showAbout, setShowAbout] = useState(true);

  // Show about section only when hero is not visible and before first breakout section is reached.
  useEffect(() => {
    const handleScroll = () => {
      // Viewport offsets
      const heroRect = heroImageRef.current
        ? heroImageRef.current.getBoundingClientRect()
        : { bottom: 0, top: 0 };
      const aboutRect = sectionRefs.about.current
        ? sectionRefs.about.current.getBoundingClientRect()
        : { top: 0, bottom: 0, height: 1 };
      const workRect = sectionRefs.work.current
        ? sectionRefs.work.current.getBoundingClientRect()
        : { top: 0, height: 1 };

      // Show hero if at the very top, else hide
      if (window.scrollY < 30) {
        setShowHeroImage(true);
        setShowNameTitle(true);
        setActive(null);
        setShowAbout(true);
      } else {
        setShowHeroImage(heroRect.bottom > 64);
        setShowNameTitle(false);
      }

      // About section shows after hero has scrolled out, but before work section begins
      // About section is visible if its top is above nav but work section is not yet at top
      if (!heroImageRef.current) {
        setShowAbout(false);
        return;
      }
      const navHeight = document.querySelector("nav")?.offsetHeight || 64;
      if (
        heroRect.bottom <= navHeight + 1 && // Hero is out of view
        workRect.top > navHeight + 1 // Work section not reached yet
      ) {
        setShowAbout(true);
      } else {
        setShowAbout(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  // Section reveal on scroll
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
      {
        threshold: 0.01,
        rootMargin: "0px 0px -40% 0px",
      }
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

  // Helper: Scroll with navbar offset
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 64;
      const top =
        ref.current.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        10; // Add a little extra spacing
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNav = (id) => {
    setRevealedSections((rs) => ({ ...rs, [id]: true }));
    setActive(id);
    setShowHeroImage(false);
    setShowNameTitle(false);
    setTimeout(() => {
      scrollToSection(sectionRefs[id]);
    }, 120);
  };

  const handleHome = () => {
    setActive(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <NameTitle visible={showNameTitle}>
        <Name>Tanner Josiah Peck</Name>
        <Title>Engineering and Design Portfolio</Title>
      </NameTitle>

      <BannerNav>
        <BannerNavInner>
          <BannerHomeButton
            onClick={handleHome}
            selected={active === null}
            aria-label="Home"
          >
            Home
          </BannerHomeButton>
          <BannerButton
            onClick={() => handleNav("about")}
            selected={active === "about"}
          >
            About
          </BannerButton>
          <BannerButton
            onClick={() => handleNav("work")}
            selected={active === "work"}
          >
            Professional Work
          </BannerButton>
          <BannerButton
            onClick={() => handleNav("school")}
            selected={active === "school"}
          >
            School Work
          </BannerButton>
          <BannerButton
            onClick={() => handleNav("personal")}
            selected={active === "personal"}
          >
            Personal Projects
          </BannerButton>
        </BannerNavInner>
      </BannerNav>

      <HeroImageWrapper
        visible={showHeroImage}
        ref={heroImageRef}
      >
        <HeroImage src="docs/assets/background.jpg" alt="Background" />
      </HeroImageWrapper>
      {/* About Me Section */}
      <AboutSection
        ref={sectionRefs.about}
        visible={showAbout}
        style={{
          margin: 0,
          borderTop: showHeroImage ? "none" : undefined,
        }}
      >
        <AboutContent>
          <AboutLeft>
            {/* For best quality, place high-res versions at docs/assets/DSC07786@2x.jpg and @3x.jpg */}
            <AboutImg
              src="docs/assets/DSC07786.jpg"
              alt="Tanner Josiah Peck"
              srcSet="
                docs/assets/DSC07786.jpg 1x,
                docs/assets/DSC07786@2x.jpg 2x,
                docs/assets/DSC07786@3x.jpg 3x
              "
            />
            <ResumeLink
              href="docs/assets/Tanner-Peck-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <svg
                height="1.2em"
                viewBox="0 0 24 24"
                width="1.2em"
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
              <svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.46-2.154 2.969v5.698h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.044 0 3.604 2.004 3.604 4.609v5.587z"/>
              </svg>
              LinkedIn
            </LinkedInLink>
          </AboutLeft>
          <AboutRight>
            <AboutSectionHeader>Background</AboutSectionHeader>
            <div>
              B.S in Mechanical Engineering, Syracuse University
            </div>
            <AboutSectionHeader>Skills</AboutSectionHeader>
            <div>
              Solidworks, Autodesk Inventor, Onshape, MATLAB, RStudio, NI Multisim, Arduino, Microsoft (Word, Powerpoint, Excel),<br />
              3D Printing, Mechanical Assembly, Machine Lab Trained.
            </div>
          </AboutRight>
        </AboutContent>
      </AboutSection>

      <ContentAnchor ref={contentAnchorRef} />

      <div>
        {/* SECTION 1 */}
        <Section
          ref={sectionRefs.work}
          visible={revealedSections.work}
          style={{ minHeight: "340px" }}
        >
          <SectionInner>
            <h2 style={{ marginTop: 0 }}>Professional Work Experience</h2>
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
            <ImagesRow>
              <SectionImg src="docs/assets/Lasko-CFM.jpg" alt="2000 CFM Test Chamber" />
              <SectionImg src="docs/assets/Lasko-CFM-2.jpg" alt="2000 CFM Test Chamber 2" />
            </ImagesRow>
            <h4>Motor Failure Testing</h4>
            <p>
              Ran locked rotary tests on multiple models of fan motors to identify if any models were unsafe when surrounded by a flammable material like insulation. Each motor had the TCU (thermal cutoff) removed, which is the mechanism that shuts down the motor if it gets too hot.
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/Lasko-Motor.jpg" alt="Motor Failure Testing" />
              <SectionImg src="docs/assets/Lasko-Motor-2.jpg" alt="Motor Failure Testing 2" />
            </ImagesRow>
            <h4>Heat Rise Testing</h4>
            <p>
              Developed and wrote the operating procedure for a Heat-Rise Testing Room. This room was used as a control area to gauge how effective different models of household heaters are at changing the temperature of a room. Soldered and set up thermocouples throughout the room connecting them to a DATAQ analyzer, and ran multiple base tests to assess the success of the project.
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/Lasko-Heat-Rise.jpg" alt="Heat Rise Testing" />
              <SectionImg src="docs/assets/Lasko-Heat-Rise-2.jpg" alt="Heat Rise Testing 2" />
            </ImagesRow>
            <h3>WEB GCS Accessories Project with RedCat Holdings, Salt Lake City UT</h3>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Assembly-2.jpg" alt="WEB GCS" />
              <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Assembly.jpg" alt="WEB GCS 2" />
              <SectionImg src="docs/assets/REDCAT-Assembly.jpg" alt="WEB GCS 3" />
            </ImagesRow>
            <h4>Secondary Display Unit</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Screen.jpg" alt="Secondary Display Unit" />
              <SectionImg src="docs/assets/REDCAT-Screen.jpg" alt="Secondary Display Unit 2" />
            </ImagesRow>
            <h4>Sunshade/Protective Cover</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Shader.jpg" alt="Sunshade/Protective Cover" />
              <SectionImg src="docs/assets/REDCAT-SOLIDWORKS-Shader-2.jpg" alt="Sunshade/Protective Cover 2" />
            </ImagesRow>
            <h4>Directional Antenna</h4>
            <p>
              Developed field-attachable accessories for a military-grade drone controller, including a secondary display unit, glare-reducing screens, and light-blocking stealth shields
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/REDCAT-Antenna-Specs.jpg" alt="Directional Antenna" />
            </ImagesRow>
          </SectionInner>
        </Section>
        {/* SECTION 2 */}
        <Section
          ref={sectionRefs.school}
          visible={revealedSections.school}
          style={{ minHeight: "340px" }}
        >
          <SectionInner>
            <h2 style={{ marginTop: 0 }}>School and Educational Work</h2>
            <h3>Project 1: Linear Inverted Pendulum Control</h3>
            <ImagesRow>
              <SectionImg src="/images/lip.jpg" alt="LIP Control" />
            </ImagesRow>
            <p>
              Implemented LQR state-feedback in MATLAB to control an inverted pendulum on a cart, analyzing stability and performance.
            </p>
            <h3>Project 2: Fatigue Testing of SLS-Printed Hinges</h3>
            <ImagesRow>
              <SectionImg src="/images/fatigue.jpg" alt="Fatigue Testing" />
            </ImagesRow>
            <p>
              Used Ansys to simulate fatigue behavior of PA12-polyamide hinges under repeated loading in aerospace mockups.
            </p>
          </SectionInner>
        </Section>
        {/* SECTION 3 */}
        <Section
          ref={sectionRefs.personal}
          visible={revealedSections.personal}
          style={{ minHeight: "340px" }}
        >
          <SectionInner>
            <h2 style={{ marginTop: 0 }}>Personal Projects</h2>
            <h4>College Dorm Room Layout</h4>
            <p>Designed in Onshape</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Dorm-Room.jpg" alt="College Dorm Room" />
              <SectionImg src="docs/assets/Dorm-Room-2.jpg" alt="College Dorm Room 2" />
              <SectionImg src="docs/assets/Dorm-Room-3.jpg" alt="College Dorm Room 3" />
            </ImagesRow>
            <h4>Remote Control Door Lock</h4>
            <p>
              Created a fully functional, screen-accurate remote control door lock as seen in the 2012 Amazing Spider-Man movie. This lock was a bolt lock powered by a linear actuator and connected to a remote control switch, allowing me to lock and unlock the door without having to move.
            </p>
            <ImagesRow>
              <SectionImg src="docs/assets/Arduino-Lock.jpg" alt="Spider-Man Remote Control Door Lock" />
              <SectionImg src="docs/assets/Arduino-Lock-2.jpg" alt="Spider-Man Remote Control Door Lock 2" />
            </ImagesRow>
            <h4>Rocket Design</h4>
            <ImagesRow>
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
            </ImagesRow>
            <hr />
            <h3>3D Printed Projects</h3>
            <h4 style={{ fontStyle: 'italic' }}>Design Based</h4>
            <h5>Obi-Wan's Lightsaber</h5>
            <p>Designed in Autodesk Inventor</p>
            <ImagesRow>
              <SectionImg src="docs/assets/ObiWan-Lightsaber-Render.jpg" alt="Obi-Wan's Lightsaber Render" />
              <SectionImg src="docs/assets/ObiWan-Lightsaber.jpg" alt="Obi-Wan's Lightsaber" />
              <SectionImg src="docs/assets/ObiWan-Lightsaber-2.jpg" alt="Obi-Wan's Lightsaber 2" />
              <SectionImg src="docs/assets/ObiWan-Lightsaber-3.jpg" alt="Obi-Wan's Lightsaber 3" />
            </ImagesRow>
            <h5>Luke's Lightsaber</h5>
            <p>Designed in Autodesk Inventor</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Luke-Lightsaber-Render.jpg" alt="Luke's Lightsaber Render" />
            </ImagesRow>
            <h5>Millennium Falcon</h5>
            <p>Designed in Autodesk Inventor</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Millenium-falcon.jpg" alt="Millennium Falcon" />
              <SectionImg src="docs/assets/Millenium-falcon-2.jpg" alt="Millennium Falcon 2" />
            </ImagesRow>
            <h5>64-Bit Mario</h5>
            <p>Designed in Autodesk Inventor</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Mario.jpg" alt="64-Bit Mini Mario" />
              <SectionImg src="docs/assets/Mario-2.jpg" alt="64-Bit Mini Mario 2" />
            </ImagesRow>
            <hr />
            <h4 style={{ fontStyle: 'italic' }}>Downloaded Prints</h4>
            <h5>Han's Blaster</h5>
            <p>Downloaded the file and printed</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Hans-blaster.jpg" alt="Han's Blaster" />
              <SectionImg src="docs/assets/Hans-blaster-2.jpg" alt="Han's Blaster 2" />
            </ImagesRow>
            <h5>Dark Saber</h5>
            <p>Downloaded the file and printed</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Darksaber-2.jpg" alt="Dark Saber" />
              <SectionImg src="docs/assets/Darksaber.jpg" alt="Dark Saber 2" />
            </ImagesRow>
            <h5>Pellet Gun</h5>
            <p>Downloaded the file and printed</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Pellet-gun.jpg" alt="Pellet Gun" />
              <SectionImg src="docs/assets/Pellet-gun-2.jpg" alt="Pellet Gun 2" />
            </ImagesRow>
            <h5>Master Chief Bust</h5>
            <p>Downloaded the file and printed</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Master-Chief.jpg" alt="Master Chief Bust" />
              <SectionImg src="docs/assets/Master-Chief-2.jpg" alt="Master Chief Bust 2" />
              <SectionImg src="docs/assets/Master-Chief-3.jpg" alt="Master Chief Bust 3" />
            </ImagesRow>
            <h5>Buddha Darth Vader</h5>
            <p>Downloaded the file and printed</p>
            <ImagesRow>
              <SectionImg src="docs/assets/Darth-Buddah.jpg" alt="Buddha Darth Vader" />
              <SectionImg src="docs/assets/Darth-Buddah-2.jpg" alt="Buddha Darth Vader 2" />
            </ImagesRow>
          </SectionInner>
        </Section>
      </div>
    </ThemeProvider>
  );
}

export default App;
