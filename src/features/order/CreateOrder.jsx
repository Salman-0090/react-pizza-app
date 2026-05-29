
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"
  const formErrors = useActionData();
   const {username, status:addressStatus, position, address, error: errorAddress} = useSelector((store)=> store.user)
   const isLoadingAddress = addressStatus === "loading";  
   const cart = useSelector((store)=> store.cart.cart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const dispatch = useDispatch();
if(!cart.length) return <EmptyCart />

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>


      <Form method="POST" >
        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-center mb-4">
          <label className="sm:basis-40">First Name</label>
          <input  className="input grow" type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-center mb-4">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-center mb-4 relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"  type="text" name="address"  disabled={isLoadingAddress} defaultValue={address} required />
               {addressStatus === "error" && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p>}
          </div>
         {!position.lattitude && !position.longitude && <span className="absolute right-[10px] top-[34px] bottom-[4px] sm:right-[8px] sm:top-[5px] sm:bottom-[10px] z-50">
             <Button type="small" disabled={isLoadingAddress}  onClick={(e)=> 
             {
              e.preventDefault()
              dispatch(fetchAddress())}}>Get Postion</Button>
          </span>}

        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
          className="h-6 w-6 accent-yellow-400 focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"

            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">You want to  give your order priority?</label>
        </div>

        <div>
          <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.lattitude ? `${position.lattitude}, ${position.longitude}`: ""} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? 
          "Placing order...." : `Order Now for ${formatCurrency(totalPrice)}`}    
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action( { request } ) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === "on"
    }

    const errors = {}
    if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct Phone number. we might need it to contact you"
    if(Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    store.dispatch(clearCart());
    return  redirect(`/order/${newOrder.id}`)
  }


export default CreateOrder;
