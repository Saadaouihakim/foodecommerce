"use client";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';


import axios from 'axios'
import { useRouter } from 'next/navigation'





import {addOrder} from "@/services/OrderService";


import { signIn, useSession } from "next-auth/react";


import {updateQuantity} from "@/services/PlatService";


export default function cartModal() {


   const router = useRouter();
    
    const { shouldDisplayCart,cartDetails,cartCount , removeItem , clearCart, totalPrice,} = useShoppingCart();


    const [status, setStatus] = useState("idle");


    const { data: session } = useSession();


const checkAuth=()=>{
  if (!session) {
    signIn(); // Force sign in to hopefully resolve error
  }
}


const addToOrder=async ()=>{ 
  
  const lineOrder= Object.values(cartDetails).map((lc) => ({
    articleID: lc.id,
    quantity: lc.quantity,
    totalPrice: lc.price*lc.quantity
  }));
  const objectOrder ={
    "client": session?.user.email||"client x",
    "status":"Not processed",
    "lineOrder": lineOrder
  }
   
  addOrder(objectOrder)
  updateQuantity(lineOrder)
}


async function handleClick() {    
  checkAuth();
  setStatus("loading");

  const firstName = "H";
  const lastName = "H";
  const phoneNumber = "98123456"; 
  const email = "hh@gmail.com";
  const orderId = "1234657"; 

  const objPay = {
    receiverWalletId: "683390f0d9dd82b88594c36c",
    token: "TND",
    amount: Math.round(Number(totalPrice) * 1000),
 // Corrigé : forcer en number
    type: "immediate",
    description: "payment description",
    acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
    lifespan: 10,
    checkoutForm: true,
    addPaymentFeesToAmount: true,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    orderId: orderId,
    webhook: "https://merchant.tech/api/notification_payment", 
    silentWebhook: true,
    successUrl: "https://gateway.sandbox.konnect.network/payment-success",
    failUrl: "https://gateway.sandbox.konnect.network/payment-failure",
    theme: "light"
  };

  const headers = {
    'x-api-key': '683390f0d9dd82b88594c364:KBE2gqgzi913x4iTM'
  };

  try {
    const response = await axios.post(
      "https://api.preprod.konnect.network/api/v2/payments/init-payment",
      objPay,
      { headers }
    );

    console.log("Réponse Konnect :", response.data);

    const payUrl = response.data.payUrl;
    router.push(payUrl);
    clearCart();
    addToOrder();
  } catch (error) {
    console.error("Erreur Konnect :", error.response?.data || error.message);
  }
}






    return (
    <div
      className={`bg-white flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 ${
        shouldDisplayCart ? "opacity-100 z-10" : "opacity-0"
      }`}
    >
    {cartCount && cartCount > 0 ? (
        <>
        <div 
            onClick={() => clearCart()}
            >
             <ClearIcon/>
        </div>
       
          {Object.values(cartDetails).map((item) => (
    
            <div className="flex items-center gap-4 mb-3" key={item.id}>
            <p>
                          <img
                          src={item.image}
                          width={60} height={60} 
                          alt={item.title}
                         />
                         </p>
            <div>
             {item.title} <span className="text-xs">({item.quantity})</span>
            </div>
            <div className="ml-auto">{item.price} TND</div>
            <button className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
            onClick={() => removeItem(item.id)}
            >
            <DeleteIcon color="secondary"/>
            </button>
          </div>
      
          ))}
                <article className="mt-3 flex flex-col">
                    Total : {totalPrice} TND
                   <button 
                   className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100"
                   onClick={()=>handleClick()}
                   >
                     {status !== "loading" ? "Proceed to checkout with Konnect" : "Loading..."}
                  </button>

               </article>
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}
    </div>
 
  );
}
