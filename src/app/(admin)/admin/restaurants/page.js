import ListRestaurants from '@/components/admin/restaurantComponents/listrestaurants';
import { fetchRestaurants } from '@/services/RestaurantService';

const getRestaurants = async () => {
  const data = await fetchRestaurants();
  return data;
};

const RestaurantPage = async () => {
  const restaurants = await getRestaurants();

  return (
    <div className="container">
      <ListRestaurants restaurants={restaurants} />
    </div>
  );
};

export default RestaurantPage;
