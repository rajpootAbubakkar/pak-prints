"use client";
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';
import {Store} from "../utils/Store"
import { useRouter } from 'next/navigation';

export default function Header() {
  const { state } = useContext(Store);
  const [query, setQuery] = useState('');
  const {
    cart: { cartItems},
  } = state;
  const [length,setLength]=useState(0);
  useEffect(()=>{
    setLength(cartItems.length)
  }
  ,[cartItems])
  

  return (
    <header>
          <nav className="flex h-20 bg-gray-100 items-center px-4 justify-between shadow-md">
            <Link href="/products">
              <div className="text-lg font-bold">PakPrints</div>
            </Link>
            <form
              action={query ? `/products?query=${query}` : '/products'}
              className="mx-auto  hidden w-full justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                name='query'
                
                className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <svg  className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="#0F0F0F"/>
                </svg>
                {/* <SearchIcon className="h-5 w-5"></SearchIcon> */}
              </button>
            </form>
            <div>
              <Link href="/cart">
                <div className="p-2">
                  Cart
                  {length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {length}
                    </span>
                  )}
                </div>
              </Link>

              
            </div>
          </nav>
        </header>
  )
}
