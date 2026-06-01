import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    
    // Tính tổng số lượng item để cập nhật dynamically lên badge icon giỏ hàng
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Dữ liệu chuẩn thỏa mãn: 3 danh mục (Categories), mỗi danh mục có đúng 6 loại cây (Tựu chung 18 cây)
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
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", cost: 20, image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a" },
                { name: "Rosemary", cost: 15, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2" },
                { name: "Mint", cost: 8, image: "https://images.unsplash.com/photo-1603504818274-1b777a829ba5" },
                { name: "Basil", cost: 9, image: "https://images.unsplash.com/photo-1594489385611-6677f50a3195" },
                { name: "Jasmine", cost: 22, image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071" },
                { name: "Eucalyptus", cost: 17, image: "https://images.unsplash.com/photo-1550948390-6eb7fa78e0cd" }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "ZZ Plant", cost: 19, image: "https://images.unsplash.com/photo-1632207691143-643c2a9a9361" },
                { name: "Pothos", cost: 11, image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a" },
                { name: "Cast Iron Plant", cost: 25, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" },
                { name: "Succulent Mix", cost: 7, image: "https://images.unsplash.com/photo-1520302638574-899f880ba527" },
                { name: "Jade Plant", cost: 16, image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf" },
                { name: "Chinese Evergreen", cost: 14, image: "https://images.unsplash.com/photo-1597055181300-e3633a207518" }
            ]
        }
    ];

    return (
        <div>
            {/* bao gồm navbar liên kết Home, Plants, và Cart icon cập nhật số lượng */}
            <nav style={{ display: 'flex', justifyContent: 'space-around', background: '#333', color: 'white', padding: '15px' }}>
                <div style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>Home</div>
                <div style={{ cursor: 'pointer' }} onClick={() => setShowCart(false)}>Plants</div>
                <div style={{ cursor: 'pointer' }} onClick={() => setShowCart(true)}>Cart ({totalCartQuantity})</div>
            </nav>

            {!showCart ? (
                <div style={{ padding: '20px' }}>
                    {categories.map(cat => (
                        <div key={cat.category}>
                            <h2>{cat.category} Plants</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {cat.plants.map(plant => {
                                    const isAdded = cartItems.some(item => item.name === plant.name);
                                    return (
                                        <div key={plant.name} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                                            <img src={plant.image} alt={plant.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                            <h3>{plant.name}</h3>
                                            <p>${plant.cost}</p>
                                            {/* Nút Add to Cart bị disable sau khi thêm sản phẩm thành công */}
                                            <button disabled={isAdded} onClick={() => dispatch(addItem(plant))}>
                                                {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
