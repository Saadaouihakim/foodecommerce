import ListOrders from "@/components/admin/ordersComponents/listOrders"
import {fetchOrders} from "@/services/OrderService";


async function getData() {
  const data=await fetchOrders()
  return data;
}


const OrderPage = async() => {
  const data = await getData()
  return (
    <div>
      <ListOrders orders={data} />
    </div>
  )
}


export default OrderPage