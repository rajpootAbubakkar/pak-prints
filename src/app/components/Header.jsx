"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";

export default function Header() {
  const { state } = useContext(Store);
  const [query, setQuery] = useState("");
  const {
    cart: { cartItems },
  } = state;
  const [length, setLength] = useState(0);
  useEffect(() => {
    setLength(cartItems.length);
  }, [cartItems]);

  return (
    <header>
      <nav className=" flex h-16 bg-gray-100 items-center px-4 justify-between shadow-md">
        <Link href="/products">
          <div className="text-lg font-bold">PakPrints</div>
        </Link>
        <form
          action={query ? `/products?query=${query}` : "/products"}
          className="mx-auto  hidden w-full justify-center sm:flex"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
            placeholder="Search products"
          />
          <button
            className="rounded rounded-tl-none rounded-bl-none bg-blue-300 p-1 text-sm dark:text-black"
            type="submit"
            id="button-addon2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
                fill="#0F0F0F"
              />
            </svg>
            {/* <SearchIcon className="h-5 w-5"></SearchIcon> */}
          </button>
        </form>
        <div>
          <Link href="/cart">
            <div className="p-2 relative flex">
              <span className="sm:flex hidden">
              Cart
              </span>
              <svg class="flex-1 w-8 h-8 fill-current">
                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
              </svg>
              
              {length > 0 && (
                // <span className="ml-1 h-5 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                //   {length}
                // </span>
                <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{length}
              </span>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
