"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { products } from "../data/products";

function Products() {
  const searchParams = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [query, setQuery] = useState(searchParams.get("query") || "");
  //pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(6);
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = productList.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );
  
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //   handlePagination = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(Number(e.target.textContent));
  // };
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(productList.length / productsPerPage); i++) {
  //   pageNumbers.push(i);
  // }


  const [uniquecategory, setUniqueCategory] = useState([]);
  const [checkedcategory, setCheckedCategory] = useState(new Set());
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu open/close

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const uniqueCategories = new Set();
    products.forEach((product) => {
      uniqueCategories.add(product.category);
    });
    const uniqueCategoriesArray = Array.from(uniqueCategories);
    setUniqueCategory(uniqueCategoriesArray);
  }, []);

  useEffect(() => {
    let filteredproducts = products;

    if (sort) {
      filteredproducts = products.sort((a, b) => {
        if (sort === "lowest") {
          if (a.price > b.price) {
            return 1;
          } else {
            return -1;
          }
        } else if (sort === "highest") {
          if (a.price < b.price) {
            return 1;
          } else {
            return -1;
          }
        } else if (sort === "toprated") {
          if (a.rating < b.rating) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      });
    }
    if (query) {
      filteredproducts = filteredproducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    setProductList(filteredproducts);
  }, [sort, query]);

  function handleCategoryChange(e, category) {
    const updatedCategories = new Set(checkedcategory); // Create a copy of the Set
    if (e.target.checked) {
      updatedCategories.add(category); // Add the category to the copied Set
    } else {
      updatedCategories.delete(category); // Remove the category from the copied Set
    }
    setCheckedCategory(updatedCategories);
    setProductList(() => {
      let filterproducts = products.filter((product) => {
        if (updatedCategories.size === 0) {
          return true;
        } else {
          return updatedCategories.has(product.category);
        }
      });
      if (query) {
        filterproducts = filterproducts.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
      }

      const sortedproducts = filterproducts.sort((a, b) => {
        if (sort === "lowest") {
          if (a.price > b.price) {
            return 1;
          } else {
            return -1;
          }
        } else if (sort === "highest") {
          if (a.price < b.price) {
            return 1;
          } else {
            return -1;
          }
        } else if (sort === "toprated") {
          if (a.rating < b.rating) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      });
      return sortedproducts;
    });
  }

  return (
    <>
      <div
        onClick={() => {
          isOpen && setIsOpen(false);
        }}
        className="bg-white"
      >
        <div>
          <div
            className={`relative z-40 xl:hidden lg:hidden ${!menuOpen && "hidden"
              }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 z-40 flex">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* Expand/collapse section button */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* Expand icon, show/hide based on section open state. */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          {/* Collapse icon, show/hide based on section open state. */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* Filter section, show/hide based on section state. */}
                    <div className="pt-6" id="filter-section-mobile-1">
                      <div className="space-y-6">
                        {uniquecategory.map((category, ind) => (
                          <div key={category} className="flex items-center">
                            <input
                              id={category + ind}
                              name="category[]"
                              value={category}
                              checked={checkedcategory.has(category)}
                              onChange={(e) =>
                                handleCategoryChange(e, category)
                              }
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={category + ind}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
              <h1 className="sm:text-3xl xs:text-2xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>
              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      id="menu-button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      Sort
                      <svg
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <a
                          href={`/products?${query ? `query=${query}&` : ""
                            }sort=`}
                          className={
                            sort === ""
                              ? "font-medium text-gray-900 block px-4 py-2 text-sm"
                              : "text-gray-500 block px-4 py-2 text-sm"
                          }
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          Most Popular
                        </a>
                        <a
                          href={`/products?sort=toprated${query ? `&query=${query}` : ""
                            }`}
                          className={
                            sort === "toprated"
                              ? "font-medium text-gray-900 block px-4 py-2 text-sm"
                              : "text-gray-500 block px-4 py-2 text-sm"
                          }
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-1"
                        >
                          Best Rating
                        </a>

                        <a
                          href={`/products?sort=lowest${query ? `&query=${query}` : ""
                            }`}
                          className={
                            sort === "lowest"
                              ? "font-medium text-gray-900 block px-4 py-2 text-sm"
                              : "text-gray-500 block px-4 py-2 text-sm"
                          }
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>
                        <a
                          href={`/products?sort=highest${query ? `&query=${query}` : ""
                            }`}
                          className={
                            sort === "highest"
                              ? "font-medium text-gray-900 block px-4 py-2 text-sm"
                              : "text-gray-500 block px-4 py-2 text-sm"
                          }
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* Expand/collapse section button */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* Expand icon, show/hide based on section open state. */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          {/* Collapse icon, show/hide based on section open state. */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* Filter section, show/hide based on section state. */}
                    <div className="pt-6" id="filter-section-1">
                      <div className="space-y-4">
                        {uniquecategory.map((category, ind) => (
                          <div key={category} className="flex items-center">
                            <input
                              id={category + ind + "1"}
                              name="category[]"
                              value={category}
                              checked={checkedcategory.has(category)}
                              onChange={(e) =>
                                handleCategoryChange(e, category)
                              }
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={category + ind + "1"}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Your content */}
                  <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                    <div className=" flex rounded justify-center  items-center">
                      <div className="bg-gray-100 flex rounded">
                        {productList.length === 0 ? "No" : productList.length}{" "}
                        Results
                        {query && query !== "" && " : " + query}
                        &nbsp;
                        {query && query !== "" ? (
                          <a href="/products">
                            <svg
                              className="h-7 w-7"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 64 64"
                              width="48px"
                              height="48px"
                            >
                              <path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z M36.95,39.778	c0.781,0.781,2.047,0.781,2.828,0c0.781-0.781,0.781-2.047,0-2.828c-0.175-0.175-2.767-2.767-4.95-4.95	c2.183-2.183,4.774-4.774,4.95-4.95c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0	c-0.175,0.175-2.767,2.767-4.95,4.95c-2.183-2.183-4.775-4.775-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0	c-0.781,0.781-0.781,2.047,0,2.828c0.175,0.175,2.767,2.767,4.95,4.95c-2.183,2.183-4.774,4.774-4.95,4.95	c-0.781,0.781-0.781,2.047,0,2.828c0.781,0.781,2.047,0.781,2.828,0c0.175-0.175,2.767-2.767,4.95-4.95	C34.183,37.011,36.775,39.603,36.95,39.778z" />
                            </svg>
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Trending products
                      </h2>
                      <a
                        href="#"
                        className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
                      >
                        See everything
                        <span aria-hidden="true"> →</span>
                      </a>
                    </div>
                    <div className="relative mt-8">
                      <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                        <ul
                          role="list"
                          className="mx-4 flex  justify-center   mx-0 grid sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-12 space-x-0"
                          // className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                        >
                          {productList.map((product) => {
                            return (
                              <li
                                key={product.id}
                                className="inline-flex  w-64  flex-col text-center space-x-3 md:w-auto lg:w-auto"
                              >
                                <Link
                                  href={{
                                    pathname: `/products/${product.id}`,
                                    params: product.id,
                                  }}
                                >
                                  <div className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                      <img
                                        src={product.images[0]}
                                        alt="Black machined steel pen with hexagonal grip and small white logo at top."
                                        className="h-60 w-full object-center group-hover:opacity-75"
                                      />
                                    </div>
                                    <div className="mt-6">
                                      <p className="text-sm text-gray-500">
                                        {product.description.substring(0, 20) +
                                          "..."}
                                      </p>
                                      <h3 className="mt-1 font-semibold text-gray-900">
                                        <span className="absolute inset-0" />
                                        {product.title}
                                      </h3>
                                      <p className="mt-1 text-gray-900">
                                        {product.price} pkr
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}

                          {/* More products... */}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-12 flex px-4 sm:hidden">
                      <a
                        href="#"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        See everything
                        <span aria-hidden="true"> →</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Products;
