import './App.css';
// import InputField from './components/InputField';
import { useState, useRef, useEffect} from 'react';

// create input field, button and output
function InputField() {
  const [username, setUsername] = useState("")
  const [outputname, setOutputName] = useState("")
  const inputRef = useRef()
  const [apiCountryName, setApiCountryName] = useState()
  const [apiCountryProb, setApiCountryProb] = useState(null)
  const [apiName, setApiName] = useState(null)

  // automatic focus on input field
  useEffect(() => {
      inputRef.current.focus()
  }, [])

  // api fetching nationality data
  useEffect(() => {
    async function fetchData() {
      let response = await
      fetch(`https://api.nationalize.io?name=${outputname}`)
      let data = await response.json()
        setApiCountryName(data.country[0].country_id)
        setApiCountryProb(data.country[0].probability)
        setApiName(data.name)
    }
    fetchData()
  }, [outputname])

  // return statement
  return (
      <div>
          {/* input field */}
          <input id="inputField"
              ref={inputRef}
              type="text"
              value={username}
              placeholder="Enter a name here."
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOutputName(e.target.value)
                }}
            }
          />
          {/* submit button */}
          <button id="submitBtn" type='text'
                  onClick={(e) => setOutputName(e.target.previousSibling.value) }>Submit</button>
          {/* results */}
          <div className="answers" style={{display: apiName ? undefined : 'none' }} >
              <p> Name: { apiName }</p>
              <p> Country: { apiCountryName }</p>
              <p> Probability: { apiCountryProb }</p>
          </div>
      </div>
  )
}

// root export
function App() {
  return (
    <div className="App">
    <h1> THE Nationality Predictor!</h1>
    <h3>Discover your origin.</h3>
    <InputField/>
    </div>
  );
}

export default App;