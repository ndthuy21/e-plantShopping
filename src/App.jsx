import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
    const [showProductList, setShowProductList] = useState(false);
    return (
        <div>
            {!showProductList ? (
                <div className="landing-page">
                    <h1>Paradise Nursery</h1>
                    <button className="get-started-btn" onClick={() => setShowProductList(true)}>Get Started</button>
                    <AboutUs />
                </div>
            ) : (
                <ProductList />
            )}
        </div>
    );
}
export default App;
