import React from 'react'
import Navbar from '../Components/Navbar.tsx';

const metadata = {
    id: "1234",
    stage: {
        init: 2,
        inve: {
            extraction: 2,
            Tport_to_refinary: 2,
            refining: 2,
            smelting: 1,
            Tport_to_factory: 0,
            manufacturing: 0,
            Tport_to_consumer: 1,
            usage_phase: 1,
            Recycle: 1,
            end_of_life: 0
        },
        results: 0 
    }
}

export default function Pinit() {
  return (

    <div className="bg-blue-500 text-white min-h-screen p-4">
      <Navbar metadata={metadata} />
      initialise project
    </div>
  )
}