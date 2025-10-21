import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="bg-stone-900">
            <div className="w-11/12 mx-auto text-white pt-14 space-y-6">
                <div className="text-white grid grid-cols-1 md:grid-cols-3 justify-center gap-8">
                    <div>
                        <h3 className="text-lg font-bold">Masinis (Manisan Manis)</h3>
                        <p className="text-stone-400 mt-2">Kehangatan rempah asli, manisnya tradisi nusantara.</p>

                        <div className="mt-10">
                            <a href="/admin">
                                <p className="font-semibold text-stone-400">Login Admin</p> 
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">Kontak</h3>
                        <ul className="text-stone-400 mt-2 space-y-1">
                            <li className="flex items-center gap-2">
                                <FaWhatsapp /> 
                                <span>WhatsApp</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaInstagram />
                                <a href="https://www.instagram.com/manisanmasinisofficial/">Instagram</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaFacebook />
                                <a href="https://www.facebook.com/profile.php?id=61580941484369">Facebook</a>
                            </li>
                        </ul>
                    </div>

                    <div> 
                        <h3 className="text-lg font-bold">Lokasi</h3>
                        <p className="text-stone-400 mt-2">Dusun Nganen, Desa Ngrayun, Kec. Ngrayun, Kab. Ponorogo Jawa Timur.</p>
                    </div>
                </div>

                <div className="border-t border-stone-700 text-stone-500 text-center p-8">
                    &copy; 2025 Masinis. Program Kerja KKN.
                </div>

            </div>

        </div>
    )
}