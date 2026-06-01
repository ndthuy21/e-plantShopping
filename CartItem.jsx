import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const calculateTotalAmount = () => cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Total Amount: ${calculateTotalAmount()}</h2>
            {cartItems.map(item => (
                <div key={item.name}>
                    <h3>{item.name} - ${item.cost}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
                    <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
                </div>
            ))}
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
    );
}
export default CartItem;
