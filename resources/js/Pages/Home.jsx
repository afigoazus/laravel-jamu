import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "@/Components/Hero";
import ProductList from "@/Components/ProductList";
import HowToOrder from "@/Components/HowToOrder";

export default function Home({ onAddToCart, products }) {
    return (
        <div>
            {/* hero section */}
            <Hero />

            {/* how to order section */}
            <HowToOrder />

            {/* product section */}
            <ProductList onAddToCart={onAddToCart} products={products} />
        </div>
    )
}

Home.layout = page => <MainLayout children={page} />;