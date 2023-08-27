"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import { products } from "../data/products";

export default function ({ itm, addBill, removeItemFromCart }) {
  const [item, setItem] = useState(itm);
  const { dispatch } = useContext(Store);

  const [quantity, setQuantity] = useState(item.quantity);
  function handleRemoveFromCart() {
    removeItemFromCart(item.id);
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    toast.success("Item removed from cart", { autoClose: 1000 });
  }
  useEffect(() => {
    const product = products.find((product) => product.id == item.id);
    setItem({ ...product, quantity: itm.quantity });
  }, []);

  useEffect(() => {
    updateCartHandler();
    addBill("Item" + item.id, item.price * quantity);
  }, [quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.stock < quantity) {
      return toast.error("Sorry. Product is out of stock", { autoClose: 1000 });
    }
    setQuantity(quantity + 1);
  };

  const updateCartHandler = () => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <div
      key={item.id}
      className="justify-between mb-6 rounded-lg bg-gray-100 p-6 shadow-md sm:flex sm:justify-start"
    >
      <img
        src={item.thumbnail}
        alt="product-image"
        className="w-full lg:max-h-35 object-contain rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
          <p className="mt-1 text-xs text-gray-700">{item.brand}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="hidden lg:flex md:flex xl:flex flex items-center space-x-4">
            <p className="text-sm">Unit Price {item.price} PKR</p>
            <svg
              onClick={handleRemoveFromCart}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex items-center border-gray-100">
            <span
              onClick={handleDecrease}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <span
              onClick={handleIncrease}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="block lg:hidden md:hidden xl:hidden flex items-center space-x-4">
            <p className="text-sm">Unit Price {item.price} PKR</p>
            <svg
              onClick={handleRemoveFromCart}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="hidden lg:block md:block xl:block flex items-center space-x-4">
            <p className=" text-sm font-semibold">
              SubTotal {item.price * quantity} PKR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
