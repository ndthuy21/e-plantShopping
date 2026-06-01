import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const categories = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", cost: 15, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921" },
                { name: "Spider Plant", cost: 12, image: "https://images.unsplash.com/photo-1572590285030-0eb174b1638e" },
                { name: "Peace Lily", cost: 18, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32" },
                { name: "Boston Fern", cost: 14, image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42" },
                { name: "Aloe Vera", cost: 10, image: "https://images.unsplash.com/photo-1596547610352-736f1c42f36b" },
                { name: "English Ivy", cost: 13, image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5" }
            ]
        },
        { category: "Aromatic", plants: [{ name: "Lavender", cost: 20, image: "" }, { name: "Rosemary", cost: 15, image: "" }, { name: "Mint", cost: 8, image: "" }, { name: "Basil", cost: 9, image: "" }, { name: "Jasmine", cost: 22, image: "" }, { name: "Eucalyptus", cost: 17, image: "" }] },
        { category: "Low Maintenance", plants: [{ name: "ZZ Plant", cost: 19, image: "" }, { name: "Pothos", cost: 11, image: "" }, { name: "Cast Iron", cost: 25, image: "" }, { name: "Succulent", cost: 7, image: "" }, { name: "Jade Plant", cost: 16, image: "" }, { name: "Evergreen", cost: 14, image: "" }] }
    ];
    return (
        <div>
            <nav style={{ display: 'flex', gap: '20px', background: '#333', color: 'white', padding: '10px' }}>
                <div onClick={() => setShowCart(false)}>Plants</div>
                <div onClick={() => setShowCart(true)}>Cart ({totalCartQuantity})</div>
            </nav>
            {!showCart ? (
                <div>
                    {categories.map(cat => (
                        <div key={cat.category}>
                            <h2>{cat.category}</h2>
                            {cat.plants.map(plant => (
                                <div key={plant.name}>
                                    <h3>{plant.name} - ${plant.cost}</h3>
                                    <button onClick={() => dispatch(addItem(plant))}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : ( <CartItem onContinueShopping={() => setShowCart(false)} /> )}
        </div>
    );
}
export default ProductList;
