import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css";
import {Container, withStyles, Switch} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Header from './component/header/Header';
import Definitions from './component/definitions/Definitions';

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeanings] = useState([]);
  const [category, setCategory] = useState("en_US");
  const [lightMode, setLightMode] = useState(false);

  const ThemeMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    word && dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: lightMode ? "azure" : "darkslategrey",
        color: lightMode ? "darkslategrey" : "azure",
      }}
    >
      <Container className="container" maxWidth="md">
        <h1 className="headline">Dictionary</h1>
        <div className="switch">
          <span>{lightMode ? "Dark Mode" : "Light Mode"}</span>
          <ThemeMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          lightMode={lightMode}
        />
        <Definitions
          word={word}
          category={category}
          meaning={meaning}
          lightMode={lightMode}
        />
      </Container>
    </div>
  );
}

export default App;
