import React from 'react'

function Navbar() {
    return(
        <div className="flex w-screen h-20 bg-gray-900 items-center">
            <b className="text-white pl-6 text-4xl">
                Portfolio Tracker
            </b>

            <div className="flex-grow"></div>

            <div className="text-white animate-underline px-5 text-xl" onClick={() => console.log("ok")}>
                Login/Register
            </div>
            
        </div>
    )
}

export default Navbar;