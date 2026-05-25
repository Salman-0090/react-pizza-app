import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({pizzaId}) {
  
   const dispatch = useDispatch()
  function handleDeleteItem(id) {
      dispatch(deleteItem(id))
  }
    return(
        <Button type="small" onClick={()=> handleDeleteItem(pizzaId)}>Delete</Button>
    )
        
}