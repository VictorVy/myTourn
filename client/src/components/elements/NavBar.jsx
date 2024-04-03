import { Link } from 'react-router-dom'

const NavBar = () => {
    return (  
        <div>
      <h1 className="text-2xl font-bold">My Tourn</h1>
      <nav>
        <div className='flex space-x-4 mt-4'>
          <Link to="/tournaments" className="text-blue-500 hover:text-blue-700">Tournaments</Link>
          <a href="/" className="text-blue-500 hover:text-blue-700">Players</a>
          <Link to ="/Teams" className="text-blue-500 hover:text-blue-700">Teams</Link>
          <a href="/" className="text-blue-500 hover:text-blue-700">Streams</a>
        </div>
      </nav>
    </div>
    );
}
 
export default NavBar;