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

// IMAGE SIZE: Doubled from previous (width: 350px, max-height: 360px)
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
  const [showNameTitle, setShowNameTitle] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeroImage(true);
        setShowNameTitle(true);
        setActive(null);
      } else {
        setShowHeroImage(false);
        setShowNameTitle(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to scroll with navbar offset
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
