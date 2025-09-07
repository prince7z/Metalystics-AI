export default function Navbar( props: any) {

  // 0 not valid, 1 valid , 2 filled
  const metadata = props.metadata;

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        {metadata.stage.init != 0 && <li><a className={`${metadata.stage.init === 2 ? 'text-green-400' : ''}`} href="/initialise/:id">Initialise</a></li>}
        <li className="relative group">
          <button className="hover:bg-blue-600 px-3 py-1 rounded">
            Inventory ▼
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
           {metadata.stage.inve.extraction != 0 && <a href="/inventory/extraction/:id" className={`${metadata.stage.inve.extraction === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Extraction</a>}
            {metadata.stage.inve.Tport_to_refinary != 0 && <a href="/inventory/transport-refinery/:id" className={`${metadata.stage.inve.Tport_to_refinary === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Transport to Refinery</a>}
            {metadata.stage.inve.refining != 0 && <a href="/inventory/refining/:id" className={`${metadata.stage.inve.refining === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Refining</a>}
            {metadata.stage.inve.smelting != 0 && <a href="/inventory/smelting/:id" className={`${metadata.stage.inve.smelting === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Smelting</a>}
            {metadata.stage.inve.Tport_to_factory != 0 && <a href="/inventory/transport-factory/:id" className={`${metadata.stage.inve.Tport_to_factory === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Transport to Factory</a>}
            {metadata.stage.inve.manufacturing != 0 && <a href="/inventory/manufacturing/:id" className={`${metadata.stage.inve.manufacturing === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Manufacturing</a>}
            {metadata.stage.inve.Tport_to_consumer != 0 && <a href="/inventory/transport-consumer/:id" className={`${metadata.stage.inve.Tport_to_consumer === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Transport to Consumer</a>}
            {metadata.stage.inve.usage_phase != 0 && <a href="/inventory/usage-phase/:id" className={`${metadata.stage.inve.usage_phase === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Usage Phase</a>}
            {metadata.stage.inve.Recycle != 0 && <a href="/inventory/recycle/:id" className={`${metadata.stage.inve.Recycle === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>Recycle</a>}
            {metadata.stage.inve.end_of_life != 0 && <a href="/inventory/end-of-life/:id" className={`${metadata.stage.inve.end_of_life === 2 ? 'block px-4 py-2 text-green-500 hover:bg-green-300' : 'block px-4 py-2 hover:bg-gray-100'}`}>End of Life</a>}
          </div>
        </li>
        <li><a href="/results/:id">Results</a></li>
      </ul>
    </nav>
  )
}
