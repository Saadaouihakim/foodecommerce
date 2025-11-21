import Listplats from '@/components/admin/listproducts';


import {fetchPlats} from "@/services/PlatService"
const getProducts=async()=>{
const data=await fetchPlats()
return data;
}
const ProductPage = async() =>{
    const plats=await getProducts()
    
  return (
   <div className="container">
      <Listplats plats={plats}/>
    </div>
  )
}


export default ProductPage