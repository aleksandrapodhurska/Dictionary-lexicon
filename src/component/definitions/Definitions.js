import React from 'react';
import './Definitions.css';

const Definitions = ({word, category, meaning, lightMode}) => {
    return (
      <div className="meaning">
        {meaning[0] && word && category === "en_US" && (
          <audio
            src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
            className="audio"
            controls
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        )}
        {word ? (
          meaning.map((mean) =>
            mean.meanings.map((item) =>
              item.definitions.map((def) => (
                <div
                  className="singleMeaning"
                  style={{
                    backgroundColor: lightMode ? "darkslategrey" : "azure",
                    color: lightMode ? "white" : "black",
                  }}
                >
                  <b>{def.definition.slice(0, -1)}</b>
                  <hr />
                  {def.example && (
                    <span>
                      <b>Example: </b>
                      {def.example}
                    </span>
                  )}
                  {def.synonyms.length > 0 && (
                    <span>
                      <b>Synonyms: </b>
                      {def.synonyms.map((syn) => `${syn}, `)}
                    </span>
                  )}
                </div>
              ))
            )
          )
        ) : (
          <span className="subTitle">Please enter a word</span>
        )}
      </div>
    );
}

export default Definitions
