"use client";

import { useContext, useState } from "react";
import { Store } from "../utils/Store";
import CartItem from "../../components/CartItem";
import Link from "next/link";


export default function page() {
    const { state } = useContext(Store);
    const {
        cart: { cartItems },
      } = state;
    const [bill,setBill]=useState({})
    const updateBill = (itemName, amount) => {
        setBill(prevBill => ({
          ...prevBill,
          [itemName]: amount
        }));
      };
    const removeItemFromCart = (itemId) => {
        // Implement logic to remove item from cart
        // Remove the item's entry from the bill state
        const updatedBill = { ...bill };
        delete updatedBill[`Item${itemId}`];
        setBill(updatedBill);
      };
    const sendWhatsappmsg = () => {
        // Implement logic to send the bill to the whatsapp number
        // Use the bill state to get the bill
        // Use the whatsapp api to send the message
        // Use the whatsapp api to send the message
        const msg = Object.entries(bill).map(([itemName, amount]) => `${itemName}: ${amount}`).join('\n');
        const url = `https://wa.me/923073021756?text=${encodeURIComponent(msg)}`;
        
        
    }

      
  return cartItems.length === 0 ? (
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <h2 className="mb-10 text-center text-xl ">
      Nothing in cart.{" "}
      <Link className="text-blue-500 underline ml-1" href="/products">
        Go shopping
        </Link>
    </h2>
    </div>
  ) :

  (
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      { (
        cartItems.map((item) =>{ 
        return <CartItem key={item.id} item={...item}  removeItemFromCart={removeItemFromCart}  addBill={updateBill} />}
        )
      )}
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      {Object.entries(bill).map(([, amount],ind) => (
        <div key={ind} className="mb-2 flex justify-between">
        <p className="text-gray-700">ITEM {ind+1}</p>
        <p className="text-gray-700">{amount} PKR</p>
      </div>
      ))}
    
{/*         
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">$129.99</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$4.99</p>
        </div> */}
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{Object.values(bill).reduce((total, amount) => total + amount, 0)} PKR</p>
            {/* <p className="text-sm text-gray-700">including VAT</p> */}
          </div>
        </div>
        <button onClick={sendWhatsappmsg} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>
    
  )
}
