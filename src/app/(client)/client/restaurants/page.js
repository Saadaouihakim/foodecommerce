import ListRestaurantsCards from "@/components/client/ListRestaurantsCards";
import { fetchRestaurants } from "@/services/RestaurantService";

const getRestaurants = async () => {
  const data = await fetchRestaurants();
  return data;
};

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return <ListRestaurantsCards restaurants={restaurants} />;
}
