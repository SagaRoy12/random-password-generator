import { useState, useCallback , useEffect , useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [character, setCharcter] = useState(false)
  const [numeric, setNumeric] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (character) {
      str += "@#$%"
    }
    if (numeric) {
      str += "0123456789"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)   // to put the value in the pass from the string
    }
    setPassword(pass)  // updating the setPassword method(line 7) with generated password method

  }, [length, character, numeric])   // importent dependecnies

const copyPasswordToClip =useCallback(()=>{
  passwordRef.current?.select() // to show the selection area effect 
  passwordRef.current?.setSelectionRange(0 , 5)  // to limit the selection range 
  window.navigator.clipboard.writeText(password) // to copy on the clipboard of system
}, [password]) // if password changes it should keep in cash memo dependencies only on the password 

  useEffect(()=>{
    passwordGenerator()
  }, [length , numeric , character , passwordGenerator])  // if any change happen to these re run 

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}   // from the line 7  as teh value will be saved on teh state
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClip}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setlength(e.target.value) }}  // sliding bar of length 
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numeric}
              id="numberInput"
              onChange={() => {
                setNumeric((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharcter((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div></>
  )
}

export default App
