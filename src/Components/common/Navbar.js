import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../../Components/Core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {RiArrowDropDownLine} from "react-icons/ri"

const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "Web Dev",
        link: "/catalog/web-development"
    }
]

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const [ssubLinks, setSsubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("Printing Sublinks result: ", result);
            setSsubLinks(result.data.data);
        } catch (error) {
            console.log("Cannot fetch category list")
        }
    }

    useEffect( ( ) => {
        fetchSubLinks();
    }, [])

    const location = useLocation();

    const matchRoute = (route) => {
        // console.log(route);
        return matchPath({path:route}, location.pathname);
    }

  return (

    
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='w-10/12 max-w-maxContent flex items-center justify-between'>

            <Link to={"/"}>
                <img src={logo}
                alt='logo'
                className=' w-40 '></img>
            </Link>

            {/* nav links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'> 
                {
                    NavbarLinks?.map( (link, index) => {
                        return (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='relative flex items-center gap-1 group hover:cursor-pointer'>
                                            <p>{link.title}</p>
                                            <RiArrowDropDownLine className=' text-2xl'/>

                                            <div className='invisible absolute left-[50%]
                                                    translate-x-[-50%] translate-y-[30%]
                                                top-[50%]
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px]'> 

                                                <div className='absolute left-[50%] top-0
                                                translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5'> 
                                                
                                                                
                                                </div>
                                                {
                                                    subLinks?.length ? (
                                                        
                                                            subLinks?.map( (subLink, index) => (
                                                                <Link to={`${subLink.link}`} key={index}>
                                                                <p>{subLink.title}</p>

                                                                </Link>
                                                            ))
                                                        
                                                    ) : (<div></div>)
                                                }

                                            </div>
               
                                        </div>
                                    ) 
                                    : 
                                    ( 
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : " text-richblack-25"}`}>
                                                
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        )
                    })
                }

                </ul>
            </nav>

            {/* Login/Signup/Dashboard */}
            <div className='flex gap-x-3 items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                        <AiOutlineShoppingCart/>
                        {
                            totalItems > 0 && (
                                <span>{totalItems}</span>
                            )
                        }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md
                                                hover:scale-95 hover:bg-richblack-900 transition-all duration-200'>
                                Login
                            </button>
                        </Link>
                    )

                }
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md
                                                hover:scale-95 hover:bg-richblack-900 transition-all duration-200'>
                                Sign Up
                            </button>
                        </Link>
                    )
                    
                }
                {
                    token !== null && <ProfileDropDown/>
                    
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar