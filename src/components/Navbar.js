import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

//

const NavBar = () => {

    const [search, setsearch] = useState("");

    const navigate = useNavigate();

    const handleSearch = (serch) => {
        if (search.trim()) {
            navigate(`/search/${search}`);
        }
    }


    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side - Logo */}
                <div className="text-2xl font-bold">
                    <a href="/" className="flex items-center">
                        <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/4e/bc/0e4ebc60-22d5-031f-f809-c563430bb4a5/AppIcon-free-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/1200x630wa.png" alt="logo" className="mr-2 w-10 h-10 rounded-full object-cover" />
                        <h2 style={{ fontFamily: "voyage", letterSpacing: "2px" }} className='font-medium'>Snap</h2>
                    </a>
                </div>

                {/* Middle - Search Bar */}
                <div className="flex-grow hidden md:flex justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        className="px-4 py-2 w-2/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                        Search
                    </button>
                </div>

                {/* Right Side - Login and User Logo */}
                <div className="flex items-center space-x-6">
                    <a href="/login" className="text-sm font-semibold hover:text-gray-300">Login</a>
                    <AccountCircleIcon style={{ fontSize: "5vh" }} />
                </div>
            </div>

            {/* Search bar for mobile */}
            <div className="md:hidden mt-2 flex justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 w-full max-w-xs rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </nav>
    );
};

export default NavBar;
