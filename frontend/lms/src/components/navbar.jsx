import {NavLink} from 'react-router-dom';


export default function NavBar() {
  return (
    <div className="navbar-padding dark:bg-neutral-900 bg-lightTint" style={{ display: "flex", justifyContent: "space-between" }}>
      <NavLink to="/" className="m-[-10px] pl-[10px] text-left text-main font-bold text-5xl">LMS</NavLink>
      <div className='space-x-10 leading-7 dark:text-white'>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/">Libraries & Hours</NavLink>
        <NavLink to="/">Login</NavLink>
      </div>
    </div>
  )
}
