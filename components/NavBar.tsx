import dynamic from 'next/dynamic'
import React from 'react'
import Link from 'next/link'
const RandomAvatar = dynamic(() => import('@/components/RandomAvatar'), {
    ssr: false
})
function NavBar() {
    return (
        <div className="navbar bg-transparent self-start">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-primary text-xl  hidden md:flex">WavScriber</a>
            </div>
            <div className="navbar-end">
            <li><Link href="/status">Home</Link></li>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <RandomAvatar />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar