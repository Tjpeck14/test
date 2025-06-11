import React, { useRef } from "react";
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
  margin-bottom: 3rem;
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

const sections = [
  { id: "work", label: "Work" },
  { id: "school", label: "School" },
  { id: "personal", label: "Personal Projects" }
];

function App() {
  const sectionRefs = {
    work: useRef(null),
    school: useRef(null),
    personal: useRef(null)
  };
  const [active, setActive] = React.useState(null);

  const handleNav = (id) => {
    setActive(id);
    setTimeout(() => {
      sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <NameTitle>
        <Name>Tj Peck</Name>
        <Title>Developer & Creator</Title>
      </NameTitle>
      <ButtonRow>
        {sections.map(({ id, label }) => (
          <SectionButton key={id} onClick={() => handleNav(id)}>
            {label}
          </SectionButton>
        ))}
      </ButtonRow>
      <div>
        {sections.map(({ id, label }) => (
          <Section
            key={id}
            ref={sectionRefs[id]}
            visible={active === id}
            style={{ minHeight: "340px" }}
          >
            <h2 style={{ marginTop: 0 }}>{label}</h2>
            <p>
              {/* Placeholder, replace with your content and images */}
              Add your {label.toLowerCase()} content here, including images and descriptions.
            </p>
          </Section>
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;