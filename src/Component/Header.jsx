import React from "react";
import {Link} from "react-router-dom"

function Header(){

    return(
        <>
       	<ul className="App-header">
		   dashboard
			<li>
				<Link to="/signin">Signin</Link>
			</li>
			<li>
				<Link to="/dashboard">dashboard</Link>
			</li>
			</ul>
        </>
    )
}
export default Header;