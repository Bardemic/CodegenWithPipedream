import './App.css'
import {useState} from "react";
import axios from 'axios';

function App() {
    const [input, setInput] = useState<string>("");

    const handleInputSend = async () => {
        try {
            const response = await axios.post('http://localhost:3000/checkIntegration', {prompt: input}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('response: ', response);
        } catch (e) {
            console.log('error,', e);
        }
    };

  return (
      <div className='w-screen bg-white text-black max-w-screen h-screen max-h-screen'>
          <div className='flex flex-col justify-between max-w-96 min-w-60 w-1/4 h-full border-gray-400/70 border-r-2'>
              <h1 className='font-bold text-3xl mx-auto'>CodeGen</h1>
              <div className='h-14 justify-end flex-col flex min-h-1/2 w-full'>
                  <div className='w-full flex'>
                      <input value={input} onChange={(e) => {setInput(e.target.value)}} className='w-full bg-gray-400/70 p-1 text-black' type="text"/>
                      <div onClick={handleInputSend} className='bg-blue-500 cursor-pointer hover:bg-blue-600 px-4 py-2 text-white'>
                          send
                      </div>
                  </div>
              </div>
              <div className='flex w-full h-2/3 border-gray-400/70 border-t-2'>
                  hi
              </div>
          </div>
      </div>
  )
}

export default App
