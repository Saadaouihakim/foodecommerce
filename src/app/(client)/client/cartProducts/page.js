import React from "react";
import CartPlatsItem from '@/components/client/shoppingCart/CartPlatsItem';
import { fetchPlats } from "@/services/PlatService";

async function getPlats() {
  const data = await fetchPlats();
  return data;
}

const CartProductsPage = async () => {
  const plats = await getPlats();

  return (
    <>
      <div className="row">
        {plats && plats.map(plat => (
          <CartPlatsItem key={plat._id} plat={plat} />
        ))}
      </div>
    </>
  );
};

export default CartProductsPage;
