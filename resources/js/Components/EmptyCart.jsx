import { ShoppingCart } from "lucide-react";
import React from "react";

export default function EmptyCart() {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-2">
            <ShoppingCart className="h-16 w-16 text-gray-500" />     
            <p className="text-xl font-semibold text-gray-700">Keranjang Anda Kosong</p>
            <p className="text-gray-500">Ayo, temukan produk favoritmu!</p>
        </div>
    )
}