import React from 'react';
import {
Nav,
NavLink,
// Bars,
NavMenu,
// NavBtn,
// NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		{/* <Bars /> */}
		<NavMenu>
        <NavLink end to='/'>Home</NavLink>
		<NavLink to='/subjects'>Subjects</NavLink>
		<NavLink to='/books'>Books</NavLink>
		<NavLink to='/store'>Store</NavLink>
		<NavLink to='/publications'>Publication</NavLink>
		<NavLink to='/schools'>Schools</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>Contact-Us</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		{/* <NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
	</Nav>
	</>
);
};

export default Navbar;
