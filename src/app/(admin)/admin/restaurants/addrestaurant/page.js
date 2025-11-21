import AddRestaurant from '@/components/admin/restaurantComponents/addrestaurant';
import { fetchCategories } from '@/services/CategorieService';

const getCategories = async () => {
  const data = await fetchCategories();
  return data;
};

const AddRestaurantPage = async () => {
  const categories = await getCategories();

  return (
    <div className="container">
      <AddRestaurant categories={categories} />
    </div>
  );
};

export default AddRestaurantPage;
