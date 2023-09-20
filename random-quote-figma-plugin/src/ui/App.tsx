import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useRandomQuotes } from './hooks/useRandomQuotes';
import { requestToPlugin, requestGenerateRandomQuoteToPlugin, requestImportAndCreateComponentInstance } from './lib/figma';
import { getTeamComponents } from './api/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007BFF;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuote = useRandomQuotes();

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    // console.log("randomQuote is: ", randomQuote);
    requestGenerateRandomQuoteToPlugin(randomQuote);
    setIsLoading(false);
  };

  const importComponentAndCreateInstance = () => {
    const componentKey = "9bd20395512bb30e867ee121d558e2e357383483"; 
    requestToPlugin({ type: "importAndCreateComponentInstance", componentKey });
  };

  const getComponent = (componentKey: String) => {
    requestToPlugin({ type: "importAndCreateComponentInstance", componentKey });
  };

  const fetchTeamComponents = async () => {
    try {
        const teamKey = "1272804570808577063"; 
        const accessToken = "figd_yOr9I0qJyR21BzXF02_v1OxK6g0tdVXryd5Z4vks";  // change later so that it is not hardcoded

        const library_components = await getTeamComponents(teamKey, accessToken);
        console.log(library_components);

        let components = library_components.meta.components
        console.log(components);
        for (let i=components.length; i--; i>0){
          console.log("component", 4-i, "is ", components[i])
          getComponent(components[i].key)
        }


    } catch (error) {
        console.error("Failed to fetch components:", error);
    }
};


  return (
    <Container>
      <Text>Select Text Node and Click</Text>
      <Button onClick={generateRandomQuote}>
        {isLoading ? "Loading..." : "Random Quote"}
      </Button>
      <Button onClick={importComponentAndCreateInstance}>Import Component</Button>
      <Button onClick={fetchTeamComponents}>Console team components</Button>
    
    </Container>
  );
}

export default App;
