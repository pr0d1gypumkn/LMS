import {NavLink} from 'react-router-dom';


export default function NavBar() {
  return (
    <div className="px-[100px] py-5 border-solid border-b dark:bg-neutral-800 dark:border-neutral-500" style={{ display: "flex", justifyContent: "space-between" }}>
      <NavLink to="/" className="m-[-10px] pl-[10px] text-left text-main font-bold text-5xl">LMS</NavLink>
      <div className='space-x-10 leading-7 dark:text-white'>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/">Libraries & Hours</NavLink>
        <NavLink to="/">Login</NavLink>
      </div>
    </div>
  )
}
