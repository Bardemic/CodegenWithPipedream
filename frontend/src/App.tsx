import './App.css'


function App() {

  return (
      <div className='w-screen bg-white text-black max-w-screen h-screen max-h-screen'>
          <div className='flex flex-col justify-between max-w-96 min-w-60 w-1/4 h-full border-gray-400/70 border-r-2'>
              <h1 className='font-bold text-3xl mx-auto'>CodeGen</h1>
              <div className='h-full justify-end flex flex-col w-full'>
                  <input className='m-2 bg-gray-400/70 p-1 text-black' type="text"/>
              </div>
              <div className='flex w-full h-2/3 border-gray-400/70 border-t-2'>
                  hi
              </div>
          </div>
      </div>
  )
}

export default App
