import { useState, useCallback,useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [copy,setCopy] = useState(false);
  //useRef hook 
  const passwordRef = useRef(null);

  // ✅ Password generator function
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (NumberAllowed) str += "0123456789";
    if (CharacterAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass); // ✅ This sets the generated password
  }, [length, NumberAllowed, CharacterAllowed]);

  const copyPasswordToClipboard = useCallback(()=>{
          passwordRef.current?.select(); // ✅ Select the password text
        window.navigator.clipboard.writeText(Password)
        setCopy(true);
        settime (()=>{
          setCopy(false);
        },2000)
  },[Password]);

  useEffect(() => { 
    passwordGen(); // ✅ Call the password generator function whenever dependencies change

  },[length, NumberAllowed, CharacterAllowed]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3 text-2xl font-bold">Password Generator</h1>

      {/* ✅ Password input and generate button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3 border border-white bg-gray-100 text-black"
          placeholder="Password"
          readOnly
          ref={passwordRef} // ✅ Attach the ref to the input
        />
        <button className='outline-none bg-blue-700 text-white px-3
         py-0.5 shrink-0'
         onClick={copyPasswordToClipboard}
         >
          {copy ? "Copied" :"Copy"}
         </button>
   
      </div>
      <div className='flex text-sm  gap-x-2'>
        <div className='flex item-center gap-x-1'>
           <input type="range" 
              min= {6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange = {(e) =>{ setLength(e.target.value)}}
           />
           <label >Length: {length}</label>
        </div>
      <div className='flex item-center gap-x-1'>
           <input type="checkbox" 
           defaultChecked={NumberAllowed}
           id="numberInput" 
           onChange ={()=>{
            setNumberAllowed((prev) => !prev);
           }} 
           />
           <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex item-center gap-x-1'>
           <input type="checkbox" 
           defaultChecked={CharacterAllowed}
           id="characterInput" 
           onChange ={() =>{
            setCharAllowed((prev) => !prev);
           }}   
           />
           <label htmlFor="characterInput">Characters</label>
      </div>
      </div>

    </div>
  );
}

export default App;
