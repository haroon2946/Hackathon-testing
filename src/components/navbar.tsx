'use client';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosContact } from 'react-icons/io';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';  

// Wishlist import

import { useWishlist } from '@/app/context/WishlistContext';

const NavbarClient = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);

  // Wishlist state
  const { wishlist } = useWishlist(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-4 w-full h-auto sticky top-0 z-50 bg-white">
      {/* Top Section */}
      <div className="flex justify-between items-center py-2">
        <div className="hidden md:block">
          <CiSearch size={25} className="text-[#2A254B]" />
        </div>

        <h1 className="text-[#2A254B] text-xl md:text-2xl md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          Avion
        </h1>

        <div className="hidden md:flex gap-4">
          {/* Wishlist Icon with Count */}
          <div className="relative">
            <Link href={'/wishlist'}>
              <span className='absolute -top-1 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'> 
                {wishlist.length}
              </span>
              ❤️ {/* Wishlist Icon */}
            </Link>
          </div>

          {/* Cart Icon with Count */}
          <div className="relative">
            <Link href={'/shopping'}>
              <span className='absolute -top-1 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'> 
                {cartItems.length}
              </span>
              <IoCartOutline size={25} className="text-[#2A254B]" />
            </Link>
          </div>

          <IoIosContact size={25} cursor={'pointer'} className="text-[#2A254B]" />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <CiSearch size={25} className="text-[#2A254B]" />

          {/* Wishlist Icon (Mobile) */}
          <div className="relative">
            <Link href={'/wishlist'}>
              <span className='absolute top-4 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
                {wishlist.length}
              </span>
              ❤️
            </Link>
          </div>

          {/* Cart Icon (Mobile) */}
          <Link href={'/shopping'}>
            <span className='absolute top-4 -right-8 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
              {cartItems.length}
            </span>
            <IoCartOutline size={25} className="text-[#2A254B]" />
          </Link>

          <IoIosContact size={25} cursor={'pointer'} className="text-[#2A254B]" />

          <button className="text-2xl focus:outline-none z-30" onClick={toggleMenu}>
            {!menuOpen && <IoMenu />}
          </button>
        </div>
      </div>

      <hr />

      {/* Mobile Menu */}
      <header
        className={`fixed top-0 right-0 py-6 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:static md:w-auto md:translate-x-0 md:bg-transparent md:shadow-none z-20`}
      >
        {menuOpen && (
          <div className="flex justify-end p-4 md:hidden">
            <button className="text-2xl focus:outline-none" onClick={toggleMenu}>
              <IoClose />
            </button>
          </div>
        )}

        <ul className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 md:gap-8 text-[#726E8D] text-base p-6 md:p-0">
          {[ 'Plant pots', 'Ceramics', 'Tables', 'Chairs', 'Crockery', 'Tableware', 'Cutlery' ].map((item) => (
            <li key={item}>
              <Link href="/">{item}</Link>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default NavbarClient;