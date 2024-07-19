import { useState, useCallback, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
 
  const generatePassword = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str +="!@#$%^&*()_+"
    for(let i =1;i<=length;i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length, charAllowed, numberAllowed] )

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const copyPaawordToClipboard = () =>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className="text-white text-center my-3"> Password Generator </h1>
      <div className='flex-shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPaawordToClipboard} className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={30} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} name='' id=''/>
         <label htmlFor='length'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} className='cursor-pointer' onChange={()=>{setNumberAllowed(prev => !prev)}} name='' id=''/>
         <label htmlFor='numbers'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={charAllowed} className='cursor-pointer' onChange={()=>{setCharAllowed(prev => !prev)}} name='' id=''/>
         <label htmlFor='char'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
