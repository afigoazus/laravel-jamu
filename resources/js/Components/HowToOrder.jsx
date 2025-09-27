import React from "react";
import { Card, CardContent, } from "./ui/card";
import { ShoppingBasket, ShoppingCart, SquarePen } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function HowToOrder() {
    return (
        <div className="w-11/12 mt-10 md:mt-0 mx-auto">
            <Card>
                <CardContent className="py-10">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl text-stone-900 font-bold">Pesan Dengan Mudah</h2>
                        <p className="text-muted-foreground">Tidak perlu login atau registrasi. Cukup ikuti 4 langkah sederhana untuk menikmati jamu kami.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                        <div>
                            <div className="text-green-600 p-4 bg-green-200 rounded-full max-w-min mx-auto border-8 border-green-100">
                                <ShoppingBasket className="h-8 w-8 md:h-10 md:w-10" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-4">1. Pilih Produk</h3>
                                <p className="text-stone-700">Telusuri katalog kami dan pilih jamu yang Anda inginkan. Klik tombol 'Tambah Ke Keranjang' pada jamu yang Anda inginkan.</p>
                            </div>
                        </div>

                        
                        <div>
                            <div className="text-green-600 p-4 bg-green-200 rounded-full max-w-min mx-auto border-8 border-green-100">
                                <ShoppingCart className="h-8 w-8 md:h-10 md:w-10" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-4">2. Cek Keranjang</h3>
                                <p className="text-stone-700">Klik ikon keranjang di pojok kanan atas untuk melihat daftar pesanan Anda dan totalnya.</p>
                            </div>
                        </div>

                        <div>
                            <div className="text-green-600 p-4 bg-green-200 rounded-full max-w-min mx-auto border-8 border-green-100">
                                <SquarePen className="h-8 w-8 md:h-10 md:w-10" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-4">3. Lengkapi Data</h3>
                                <p className="text-stone-700">Isi nama dan alamat lengkap Anda pada formulir yang tersedia di dalam keranjang belanja.</p>
                            </div>
                        </div>

                        
                        <div>
                            <div className="text-green-600 p-4 bg-green-200 rounded-full max-w-min mx-auto border-8 border-green-100">
                                <FaWhatsapp className="h-8 w-8 md:h-10 md:w-10" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-4">4. Kirim Pesan</h3>
                                <p className="text-stone-700">Klik tombol pesan via Whatsapp, data Anda akan otomatis ikut terkirim untuk kami proses.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}