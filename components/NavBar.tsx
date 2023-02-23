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
                <a className="btn btn-ghost normal-case text-primary text-xl  hidden md:flex">WavScribe</a>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <RandomAvatar />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NavBar