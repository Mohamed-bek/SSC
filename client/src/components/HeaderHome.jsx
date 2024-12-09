import React from 'react'
import { NavLink } from 'react-router-dom'

function HeaderHome() {
  const  links =  [{
        id : 0 , 
        to : "/",
        name : "Home"
    },{
        id : 1, 
        to : "/participe",
        name : "Participe"
    },
    {
        id : 2, 
        to : "/members",
        name : "Memebers"
    },
    // {
    //     id : 3, 
    //     to : "/about",
    //     name : "About Us"
    // }
]
  return (
    <div className=' fixed top-0 left-0 w-full flex justify-between items-center  px-10 text-white z-50'>
        <div className="logo text-[3rem]">SCC</div>
        <nav> 
            {links.map(link => <NavLink className="link px-2 py-3 text-[1.2rem] font-semibold cursor-pointer duration-300 hover:text-primary" to={link.to} key={link.id}> {link.name} </NavLink>)}
        </nav>
    </div>
  )
}

export default HeaderHome