import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";



function CartOverview() {
  const totalCartQuantity  = useSelector(getTotalCartQuantity); 
 const totalCartPrice  = useSelector(getTotalCartPrice);
 if(!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 text-stone-200 sm:px-6 text-sm , md:text-base flex justify-between items-center mt-auto">
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalCartQuantity}</span>
        <span>{totalCartPrice}</span>
      </p>
      <Link to="/cart">Open Cart</Link>
    </div>
  );
}

export default CartOverview;
