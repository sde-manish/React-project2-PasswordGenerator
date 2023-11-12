import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const[length, setLength] = useState('8');
  const[numbersAllowed, setNumbersAllowed] = useState('false');
  const[charAllowed, setCharAllwed] = useState('false');
  const[Password, setPassword] = useState("")

// useRef

const passwordRef = useRef(null);

/*  useCallback
useCallback is a React Hook that lets you cache a function definition between re-renders.
const cachedFn = useCallback(fn, dependencies)      */

const passwordGenerator = useCallback(() => {
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let pass = ''

  

  if (numbersAllowed) str += '0123456789';

  if (charAllowed) str += "~!@#$%^&*(){}_?/;.,";

  for(let i = 0; i < length; i++){
    let charIndex =   Math.floor(Math.random()*str.length + 1);
    pass += str.charAt(charIndex);
  }

  setPassword(pass);

}, [length, numbersAllowed, charAllowed, setPassword])

const copyPasswordToClip = useCallback(() => {
  passwordRef.current?.select()   //using optional selection
  passwordRef.current?.setSelectionRange(0,99)
  window.navigator.clipboard.writeText(Password)
}, [Password])
 

useEffect(() => {
  passwordGenerator()
}, [length, numbersAllowed, charAllowed, passwordGenerator])

  return (
    <>
     <div id='container'>
        <h1>Password Generator</h1>
        <div className='mini-container'>
          <input type="text" id='input-btn-1' value={Password} placeholder='Password' readOnly
          ref={passwordRef} />
          <button id='copy-btn' onClick={copyPasswordToClip}>Copy</button>
          <button id='new' onClick={passwordGenerator} >New</button>
        </div>
        <div className='mini-container mi-cont-3'>
          <div>
            <input className='items' id='length' type="range" min={6} max={100} value={length}
            onChange={(e) => setLength(e.target.value)}/>
            <label  htmlFor="length"> Length: {length}  </label>
          </div>
          <div>
            <input className='items' id='numberInput' type="checkbox" 
            defaultChecked = {numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
              console.log(numbersAllowed);
            }}/>
            <label htmlFor="numberInput"> Numbers </label>
          </div>
          <div>
          <input className='items' id='characterInput' type="checkbox" 
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllwed((prev) => !prev);
            console.log(charAllowed);
          }}/>
          <label htmlFor="characterInput"> Characters</label>
          </div>
          
        </div>
     </div>
    </>
  )
}

export default App
