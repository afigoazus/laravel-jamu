import React from "react";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button"; // Menggunakan Button dari shadcn

export default function ProductList({ onAddToCart, products }) {

    const showToastAndAddToCart = (product) => {
        onAddToCart(product);
        toast.success(`${product.name} ditambahkan ke keranjang`);
    };

    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="my-10 w-11/12 mx-auto" id="products">
            <h2 className="text-center text-3xl font-bold">Produk Kami</h2> 

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {products.map((product) => (
                    <Dialog key={product.id}> 
                        <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="">
                                        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                                        <div className="p-4">
                                            <div className="font-semibold space-y-2 min-h-20">
                                                <h2 className="text-lg truncate">{product.name}</h2>
                                                <p className="text-md">{formatToRupiah(product.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                                <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                                <DialogDescription className="text-xl pt-2">
                                    {formatToRupiah(product.price)}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <h3 className="font-semibold mb-1">Komposisi:</h3>
                                    {/* Pastikan data produk Anda punya properti .komposisi */}
                                    { product.composition && product.composition.length > 0 ? (
                                            <ol>
                                                {
                                                    product.composition.map((item, index) => (
                                                        <li key={index} className="text-sm text-muted-foreground">{`${index + 1}. ${item.ingredient}`}</li>
                                                    ))
                                                }
                                            </ol>
                                    ) : (
                                            <p className="text-sm text-muted-foreground">Informasi khasiat tidak tersedia.</p>
                                        )
                                    }
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Khasiat:</h3>
                                    {/* Pastikan data produk Anda punya properti .khasiat */}
                                    <p className="text-sm text-muted-foreground">{product.benefits ? product.benefits : 'Informasi khasiat tidak tersedia.'}</p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => showToastAndAddToCart(product)}>
                                    <Plus className="mr-2 h-4 w-4" /> Tambahkan ke Keranjang
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}