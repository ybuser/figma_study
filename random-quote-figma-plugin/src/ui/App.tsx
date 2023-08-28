import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useRandomQuotes } from './hooks/useRandomQuotes';
import { requestToPlugin, requestGenerateRandomQuoteToPlugin } from './lib/figma';

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
  const [libraryData, setLibraryData] = useState(null);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;
      if (type === 'collections-list') {
        setLibraryData(data);
      }
    };
  }, []);

  const getRandomQuote = useRandomQuotes();

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    // console.log("randomQuote is: ", randomQuote);
    requestGenerateRandomQuoteToPlugin(randomQuote);
    setIsLoading(false);
  };

  const fetchFromTeamLibrary = () => {
    requestToPlugin({ type: "fetchFromTeamLibrary" });
  };

  return (
    <Container>
      <Text>Select Text Node and Click</Text>
      <Button onClick={generateRandomQuote}>
        {isLoading ? "Loading..." : "Random Quote"}
      </Button>
      <Button onClick={fetchFromTeamLibrary}>
        Fetch From Team Library
      </Button>

      {libraryData && libraryData.map(collection => (
        <div key={collection.collectionName}>
          <h3>{collection.collectionName}</h3>
          <ul>
            {collection.variables.map(variable => (
              <li key={variable.name}>{variable.name} (Type: {variable.resolvedType})</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
}

export default App;
