import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';


export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/">
      <FontAwesomeIcon icon={faHouse} /> &nbsp;
      Home
    
      </Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/recipes">
          <FontAwesomeIcon icon={faUtensils} /> &nbsp;
          All Recipes
          </Link>
          &nbsp; | &nbsp;
          <Link to="/recipes/new">
          <FontAwesomeIcon icon={faPlus} /> &nbsp;
          New Recipe
          </Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
          <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;
            Log Out
          </Link>
          &nbsp; | &nbsp;
          <Link to="/my-recipes">
          <FontAwesomeIcon icon={faUser} /> &nbsp;
          {user.name}
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
          <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;
          Log In
          </Link>
          &nbsp; | &nbsp;
          <Link to="/signup">
          <FontAwesomeIcon icon={faUserPlus} /> &nbsp;
          Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
