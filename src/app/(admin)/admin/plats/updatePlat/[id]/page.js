import { fetchRestaurants } from "@/services/RestaurantService";
import { fetchPlatById } from "@/services/PlatService";
import UpdatePlat from "@/components/admin/updateProductComponent";

const getRestaurants = async () => {
  const data = await fetchRestaurants();
  return data;
};

const getPlat = async (id) => {
  const data = await fetchPlatById(id);
  return data;
};

const PlatUpdatePage = async ({ params }) => {
  const restaurants = await getRestaurants();
  const plat = await getPlat(params.id);

  return (
    <div>
      <UpdatePlat plat={plat} restaurants={restaurants} />
    </div>
  );
};

export default PlatUpdatePage;
