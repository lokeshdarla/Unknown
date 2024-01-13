import React from 'react'
import { Link } from 'react-router-dom'
import { AudioLines } from 'lucide-react';
import DropdownButton from './userDropdown';

export default function Header() {
    return (
        <header className="">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center text-blue-700 text-lg gap-2">
                            <AudioLines />
                            <h1 className="font-medium">Unknown</h1>
                        </Link>
                        <div className='flex items-center'>
                            <DropdownButton />
                        </div>

                    </div>
                </nav>
            </nav>
        </header>
    );
}
