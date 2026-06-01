import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Tính tổng số tiền giỏ hàng (Total cart amount)
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cartItems.map(item => (
                    <div key={item.name} style={{ display: 'flex', gap: '20px', margin: '20px 0', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        {/* Hiển thị thumbnail hình ảnh, tên và giá đơn vị */}
                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>Unit Price: ${item.cost}</p>
                            {/* Hiển thị tổng chi phí riêng cho từng loại cây dựa vào số lượng */}
                            <p>Total Cost: ${item.cost * item.quantity}</p>
                            <div>
                                {/* Nút tăng và giảm số lượng */}
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            {/* Nút xóa sản phẩm khỏi giỏ hàng */}
                            <button style={{ marginTop: '10px', color: 'red' }} onClick={() => dispatch(removeItem(item.name))}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                {/* Nút tiếp tục mua sắm liên kết ngược về danh sách sản phẩm */}
                <button onClick={onContinueShopping}>Continue Shopping</button>
                {/* Nút thanh toán hiển thị Coming Soon */}
                <button onClick={() => alert('Coming Soon')}>Checkout</button>
            </div>
        </div>
    );
}

export default CartItem;
