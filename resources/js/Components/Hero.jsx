import React from "react";

export default function Hero() {
    return (
        <div className="min-h-screen grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 py-8 md:py-0 w-11/12 mx-auto">
            <div className="space-y-8 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 leading-tight">
                    Kehangatan Rempah Asli,
                    <span className="text-green-600"> Manisnya Tradisi Nusantara</span>
                </h1>
                <p className="text-lg text-stone-700">
                    Nikmati manisnya jahe dan kunir pilihan, diolah dari resep warisan untuk menjaga keaslian rasa dan manfaatnya. Sajikan kehangatan alami untuk Anda dan keluarga, dalam setiap gigitan dan seduhan.
                </p>

                <div>
                    <a href="#products">
                        <button className="bg-green-600 text-white text-lg font-bold rounded-full hover:bg-green-700 hover:scale-105 active:scale-95 duration-300 transition-all py-3 px-8">
                            Belanja Sekarang
                        </button>
                    </a>
                </div>
            </div>

            <div className="my-auto">
                <img src="images/hero_img_compressed.JPG" alt="hero.JPG" className="rounded-lg" />
            </div>
        </div>
    )
}