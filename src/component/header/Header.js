import React from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, MenuItem } from "@material-ui/core";
import categories from '../../data/category';
import './Header.css';

const Header = ({ word, setWord, category, setCategory, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#000": "#fff",
      },
      type: lightMode ? "light": "dark",
    },
  });

  const handleChange = (language) => {
      setCategory(language);
      setWord('');
  }

  return (
    <div className="header">
      <span className="title">{word ? word : "Lexicon"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            value={word}
            label="Search a word"
            onChange={(e)=>setWord(e.target.value)}
          />
          <TextField
            className="select"
            select
            label="Select a language"
            helperText="Please select a language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
        >
          {categories.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
