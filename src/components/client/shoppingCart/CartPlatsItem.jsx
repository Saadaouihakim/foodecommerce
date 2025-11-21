"use client";
import React, { useState } from "react";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useShoppingCart } from "use-shopping-cart";

const CartPlatsItem = ({ plat }) => {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < plat.qtestock) setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (quantity > plat.qtestock) {
      window.alert("Stock insuffisant");
      return;
    }

    const target = {
      id: plat._id,
      title: plat.nom,       // utilise nom ici
      image: plat.imageart,
      price: plat.prix
    };

    addItem(target, { count: quantity })
      .then(() => {
        console.log('Plat ajouté au panier:', target);
        setQuantity(1);
      })
      .catch(err => console.log(err));
  };

  return (
    <article className="col-sm-3 mt-5">
      <div className="card">
        <img
          src={plat?.imageart}
          className="card-img-top p-5"
          alt={plat.nom}
        />
      </div>
      <div className="text-center">
        <div>{plat.nom.slice(0, 20)}...</div>
        <div>Prix : {plat.prix} TND</div>
        <div className="flex flex-col items-center justify-center">
          <Rating style={{ maxWidth: 100 }} value={5} />
        </div>
      </div>
      <div className="text-center">
        <button className="mr-5" onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button className="ml-5" onClick={increaseQuantity}>+</button>
      </div>
      <div className="text-center mt-2">
        <button
          className="btn btn-warning"
          disabled={plat.qtestock <= 0}
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default CartPlatsItem;
