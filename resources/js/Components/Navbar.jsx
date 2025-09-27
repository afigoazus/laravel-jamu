import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Navbar({ onCartClick, cartCount }) {
    return (
        <nav className="flex justify-between items-center py-6 w-11/12 mx-auto">
            <div className="text-2xl font-bold text-stone-900">
                <h1>Masinis</h1>
            </div>

            <div className="relative">
                <ShoppingCart 
                    className="text-stone-700 hover:text-green-600 transition-colors h-6 w-6 cursor-pointer"
                    onClick={onCartClick}
                />

                {
                    cartCount > 0 && (
                        <Badge
                            variant={"destructive"}
                            className={"absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full px-1.5 text-xs"}
                        >
                            {cartCount}
                        </Badge>
                    )
                } 
            </div>
        </nav>
    )
}