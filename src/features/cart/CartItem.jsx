import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import {formatCurrency} from '../../utilities/helpers'
import { deleteItem } from './cartSlice';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './updateItemQuantity';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className='sm:flex sm:justify-between sm:items-center py-3'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex justify-between items-center sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId}/>
          <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
