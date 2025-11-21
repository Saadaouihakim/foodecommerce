import NewPlat from "@/components/admin/newProductComponent";
import {fetchRestaurants} from "@/services/RestaurantService"
const getrestaurants=async()=>{
    const data=await fetchRestaurants()
    return data;
}
const NewProductPage = async() => {
    const restaurants=await getrestaurants()
    
  return (
    <div>
     <NewPlat restaurants={restaurants}/>
    </div>
  )
}


export default NewProductPage