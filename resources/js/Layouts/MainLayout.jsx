import React, { cloneElement, useState } from "react";
import Navbar from "@/Components/Navbar";
import CartBar from "@/Components/CartBar";
import Footer from "@/Components/Footer";
import { Toaster } from "@/Components/ui/sonner";
import { useMediaQuery } from "@/hook/useMediaQuery";

const initialCartProducts = []

export default function MainLayout({ children }) {
    const [cartbarOpen, setCartbarOpen] = React.useState(false);

    const [cartItems, setCartItems] = useState(initialCartProducts)

    //  to detect screen resolution
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const toasPosition = isDesktop ? "top-center" : "bottom-center"

    // function to add product to cart
    const handleAddToCart = (productToAdd) => {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === productToAdd.id)

            if (existingItem) {
                return currentItems.map(item => 
                    item.id === productToAdd.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            }
            return [...currentItems, {...productToAdd, quantity: 1}]
        })
    }

    // function to delete from cart
    const handleDeleteFromCart = (productId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId))
    }

    // function to handle quantity change
    const handleQuantityChange = (productId, amount) => {
        setCartItems(currentItems => 
            currentItems.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount
                    return { ...item, quantity: newQuantity > 0 ? newQuantity: 1 }
                }
                return item
            })
        )
    }

    // function for calc item in cart for notification
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div>
            <header className="sticky top-0 z-10 shadow-sm bg-white/50 backdrop-blur-md">
                <Navbar onCartClick={() => setCartbarOpen(!cartbarOpen)} cartCount={cartCount} />
            </header>

            <div className="flex max-h-min">
                {/* main content */}
                <main className="relative flex-1">
                    {/* backdrop when cart bar is open */}
                    {cartbarOpen &&
                        <div className="absolute inset-0 z-10 bg-black/50"
                        onClick={() => setCartbarOpen(false)}>
                        </div>
                    }
                    {cloneElement(children, { onAddToCart: handleAddToCart })}
                </main>
                <Toaster position={toasPosition} richColors />

            </div>

            <footer>
                <Footer />
            </footer>

            {/* cart bar */}
            <CartBar isOpen={cartbarOpen} closeCartBar={() => setCartbarOpen(false)}
            cartItems={cartItems}
            onDelete={handleDeleteFromCart}
            onQuantityChange={handleQuantityChange} />
        </div>
    )
}