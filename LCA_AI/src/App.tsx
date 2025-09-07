import {Routes, Route } from 'react-router-dom'
import './App.css'
import Pinit from './pages/Pinit'

function App() {
  

  return (
    <div className="bg-blue-500 text-white min-h-screen p-4">
        <Routes>
          <Route path="/" element={<>hello</>}/>
          <Route path ="/register" element={<>register</>} />
          <Route path ="/projects" element={<>projects</>} />
          <Route path ="/project/" element={<>project details</>} />
          <Route path ="/project/initialise" element={<Pinit />} />
          <Route path = "/project/inventory/:id" element={<>project inventory</>} />
          <Route path = "/project/impact/:id" element={<>project analytics</>} />
          <Route path = "/project/circularity/:id" element={<>project settings</>} />
          <Route path ="/project/support/:id" element={<>login</>} />
          <Route path ="/project/report/:id" element={<>report</>} />
         <Route path="/about" element={<>about</>} />
        </Routes>
    </div>
  )
}

export default App
