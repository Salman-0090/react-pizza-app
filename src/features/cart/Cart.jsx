import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';

import { clearCart } from './cartSlice';



function Cart() {
   const username = useSelector((store)=> store.user.username)
   const cart = useSelector((store)=> store.cart.cart)
      const dispatch = useDispatch()
   function handleClearCart() {
        dispatch(clearCart())
   }
  return (
    <div className='py-3 px-4'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='divide-y divide-stone-200 border-b border-stone-200 mt-3'>
        {cart.map(item=> <CartItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">Order Pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>Clear Cart</Button>
      </div>
    </div>
  );
} 

export default Cart;  
