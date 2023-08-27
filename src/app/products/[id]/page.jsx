"use client";
import { useParams } from "next/navigation";
import { products } from "../../data/products";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";

function Product() {
  const params = useParams();
  const { state, dispatch } = useContext(Store);
  const productId = params.id;
  const router = useRouter();
  const product = products.find((product) => product.id == productId);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const {
    cart: { cartItems },
  } = state;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  // console.log(product);
  const addToCartHandler = async (e) => {
    e.preventDefault();
    if (cartItems.find((item) => item.id === product.id)) {
      toast.info("Item already in cart", { autoClose: 1000 });
    } else {
      const quantity = 1;
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
      toast.success("Item added to cart", { autoClose: 1000 });
    }
    router.push("/cart");
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}

              <div className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <div
                    className="grid grid-cols-4 gap-6"
                    aria-orientation="horizontal"
                    role="tablist"
                  >
                    {product.images.map((image, index) => {
                      return (
                        <button
                          key={index}
                          id="tabs-1-tab-1"
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          aria-controls="tabs-1-panel-1"
                          role="tab"
                          type="button"
                          onClick={() => handleImageClick(image)}
                        >
                          <span className="sr-only">Angled view</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image}
                              alt=""
                              
                              
                              className="h-full w-full object-contain object-center"
                            />
                          </span>
                          {/* Selected: "ring-indigo-500", Not Selected: "ring-transparent" */}
                          <span
                            className="ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                    {/* More images... */}
                  </div>
                </div>
                <div className="aspect-h-1 aspect-w-1 w-full">
                  {/* Tab panel, show/hide based on tab state. */}
                  <div
                    id="tabs-1-panel-1"
                    aria-labelledby="tabs-1-tab-1"
                    role="tabpanel"
                    tabIndex={0}
                    
                  >
                    <img
                      width={545}
                      src={selectedImage}
                      alt="Angled front view with bag zipped and handles upright."
                      


                      // className="w-[545px] h-[310px]  object-cover object-center sm:rounded-lg"
                      className="w-[545px] h-[310px] object-center  object-contain sm:rounded-lg"


                    />
                  </div>
                  {/* More images... */}
                </div>
              </div>
              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product.title}
                </h1>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {product.price} pkr
                  </p>
                </div>
                {/* Reviews */}
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {/* Active: "text-indigo-500", Inactive: "text-gray-300" */}
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-indigo-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-indigo-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-indigo-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-indigo-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="sr-only">4 out of 5 stars</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6 text-base text-gray-700">
                    <p>{product.description}</p>
                  </div>
                </div>
                <form className="mt-6">
                  <div className="mt-10 flex">
                    <button
                      onClick={addToCartHandler}
                      // type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <svg
                        className="h-6 w-6 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </form>
                {/* <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>
                  <div className="divide-y divide-gray-200 border-t">
                    <div>
                      <h3>
                        <button
                          type="button"
                          className="group relative flex w-full items-center justify-between py-6 text-left"
                          aria-controls="disclosure-1"
                          aria-expanded="false"
                        >
                          <span className="text-gray-900 text-sm font-medium">
                            Features
                          </span>
                          <span className="ml-6 flex items-center">
                            <svg
                              className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                            <svg
                              className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      <div className="prose prose-sm pb-6" id="disclosure-1">
                        <ul role="list">
                          <li>Multiple strap configurations</li>
                          <li>Spacious interior with top zip</li>
                          <li>Leather handle and tabs</li>
                          <li>Interior dividers</li>
                          <li>Stainless strap loops</li>
                          <li>Double stitched construction</li>
                          <li>Water-resistant</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
