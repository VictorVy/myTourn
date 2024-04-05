import { Link } from 'react-router-dom'

const NavBar = () => {
    return (  
        <div>
      <h1 className="text-2xl font-bold">My Tourn</h1>
      <nav>
        <div className='flex space-x-4 mt-4'>
          <Link to="/" className="text-blue-500 hover:text-blue-700">Tournaments</Link>
          <Link to="/Players" className="text-blue-500 hover:text-blue-700">Players</Link>
          <Link to="/Teams" className="text-blue-500 hover:text-blue-700">Teams</Link>
          <Link to="/Streams" className="text-blue-500 hover:text-blue-700">Streams and Games</Link>
        </div>
      </nav>
    </div>
    );
}
 
export default NavBar;