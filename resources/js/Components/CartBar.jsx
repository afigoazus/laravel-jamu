import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { FaTrashAlt, FaWhatsapp } from "react-icons/fa";
import { ArrowLeft, Minus, MoveRight, Plus, X } from "lucide-react";
import { getKecamatan, getKelurahan, getKota, getProvinsi } from "@/services/territoryApi";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "6282337681654"

export default function CartBar({ isOpen, closeCartBar, cartItems, onDelete, onQuantityChange }) {

    const [currentView, setCurrentView] = useState('cart')

    const [pilihan, setPilihan] = useState({
        provinsi: '',
        kota: '',
        kecamatan: '',
        kelurahan: ''
    })

    const [opsi, setOpsi] = useState({
        provinsi: [],
        kota: [],
        kecamatan: [],
        kelurahan: []
    })

    const [isLoading, setIsLoading] = useState({
        provinsi: false,
        kota: false,
        kecamatan: false,
        kelurahan: false
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
        reset
    } = useForm ({
        mode: "onChange",
        defaultValues: {
            recipientName: "",
            fullAddress: "",
            provinsi: "",
            kota: "",
            kecamatan: "",
            kelurahan: ""
        }
    })

    useEffect(() => {
        const fetchProvinsi = async () => {
            setIsLoading(prev => ({ ...prev, provinsi: true }))

            try {
                const dataProvinsi = await getProvinsi()
                setOpsi(prev => ({ ...prev, provinsi: dataProvinsi }))
            } catch (error) {
                console.error("Error di komponen:", error)
            } finally {
                setIsLoading(prev => ({ ...prev, provinsi: false }))
            }
        }
        fetchProvinsi()
    }, [])

    const handleDropdownChange = async (level, value, fieldOnChange) => {
        fieldOnChange(value) 
        if (!value) return

        const [id, name] = value.split(',')

        let newPilihan = { ...pilihan, [level]: {id, name} }
        let newOpsi = { ...opsi }

        if (level === "provinsi") {
            newPilihan = { ...newPilihan, kota: null, kecamatan: null, kelurahan: null } 
            newOpsi = { ...newOpsi, kota: [], kecamatan: [], kelurahan: [] }
        } else if (level === "kota") {
            newPilihan = { ...newPilihan, kecamatan: null, kelurahan: null } 
            newOpsi = { ...newOpsi, kecamatan: [], kelurahan: [] }
        } else if (level === "kecamatan") {
            newPilihan = { ...newPilihan, kelurahan: null } 
            newOpsi = { ...newOpsi, kelurahan: [] }
        }

        setPilihan(newPilihan)
        setOpsi(newOpsi)

        try {
            if (level === 'provinsi' && id) {
                setIsLoading(prev => ({ ...prev, kota: true }));
                const dataKota = await getKota(id);
                setOpsi(prev => ({ ...prev, kota: dataKota }));
                setIsLoading(prev => ({ ...prev, kota: false }));
            } else if (level === 'kota' && id) {
                setIsLoading(prev => ({ ...prev, kecamatan: true }));
                const dataKecamatan = await getKecamatan(id);
                setOpsi(prev => ({ ...prev, kecamatan: dataKecamatan }));
                setIsLoading(prev => ({ ...prev, kecamatan: false }));
            } else if (level === 'kecamatan' && id) {
                setIsLoading(prev => ({ ...prev, kelurahan: true }));
                const dataKelurahan = await getKelurahan(id);
                setOpsi(prev => ({ ...prev, kelurahan: dataKelurahan }));
                setIsLoading(prev => ({ ...prev, kelurahan: false }));
            }
        } catch (error) {
            console.error(`Gagal memuat data untuk level ${level}`, error)
        }
    }

    const isProductsListNull = cartItems.length === 0

    // function for calc total price
    const totalPrice = cartItems.reduce((accumulator, currentProduct) => {
        return accumulator + (currentProduct.price * currentProduct.quantity)
    }, 0)

    // function to convert total price to IDR
    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number)
    }
    
    const handleContinueToForm = () => {
        setCurrentView('form')
    }

    const onFormSubmit = (data) => {
        const productList = cartItems.map((item, index) =>
            `${index + 1}. ${item.name} (x${item.quantity})`
        ).join('\n')

        const fullAddress = `
${data.fullAddress}
Kel. ${pilihan.kelurahan.name}, Kec ${pilihan.kecamatan.name}
${pilihan.kota.name}
${pilihan.provinsi.name}`

        const messageTemplate = `
Halo, saya mau pesan:
        
*Daftar Pesanan:*
${productList} 

------------------------------
*Total Harga:* ${formatToRupiah(totalPrice)}
------------------------------

*Data Pengiriman:*
Nama Penerima: ${data.recipientName}
Alamat Lengkap:
${fullAddress}

Terima kasih!`

        const encodedMessage = encodeURIComponent(messageTemplate)

        const WhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
        window.open(WhatsappUrl, "_blank")

        toast.success("Pesanan Anda sedang diproses! Silakan kirim pesan di WhatsApp.")
        reset()

        setPilihan({
            provinsi: null,
            kota: null,
            kecamatan: null,
            kelurahan: null
        })

        setCurrentView("cart")
    }

    return (
        <aside 
            className={`fixed z-10 inset-y-0 right-0 w-full md:w-1/3 bg-white border-l shadow-lg duration-300 ease-in-out transform overflow-y-auto ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {
                currentView === 'cart' ? (
                    <div className="h-full flex flex-col">
                        <div className="flex justify-between items-center border-b p-6">
                            <span className="text-2xl text-stone-900 font-bold">Keranjang Saya</span>
                            <button>
                                <X onClick={closeCartBar} className="text-gray-500 hover:text-gray-800 " />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                            {
                                isProductsListNull ? (
                                    <div className="h-full">
                                        <EmptyCart />
                                    </div>
                                )
                                :
                                (
                                    cartItems.map((product => (
                                        <div className="flex gap-4 border-b border-gray-300 p-3" key={product.id}>
                                            <img src={product.image_url} alt={product.name} className="w-40 rounded-md" />

                                            <div className="flex-grow space-y-4">
                                                <div>
                                                    <p className="font-semibold">{product.name}</p>
                                                    <p className="text-gray-500 text-sm">{formatToRupiah(product.price)}</p>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <button className="bg-gray-100 rounded-full p-1 hover:bg-gray-200" onClick={() => onQuantityChange(product.id, -1)}>
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    
                                                    <p>{product.quantity}</p>

                                                    <button className="bg-gray-100 rounded-full p-1 hover:bg-gray-200" onClick={() => onQuantityChange(product.id, 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <FaTrashAlt className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer" onClick={() => [onDelete(product.id), toast.error(`${product.name} telah dihapus dari keranjang` )]} />
                                        </div>
                                    )))
                                )
                            }
                        </div>

                        <div className="bg-gray-50 p-5 space-y-6">
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>{formatToRupiah(totalPrice)}</span>
                            </div>
                            
                            <button disabled={isProductsListNull} onClick={handleContinueToForm} className="flex justify-center items-center gap-2 bg-green-600 w-full rounded-lg text-lg font-semibold text-white p-5 hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                                <span>Lanjutkan ke Pengiriman</span>
                                <MoveRight className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center border-b p-6 gap-4">
                            <button onClick={() => setCurrentView('cart')}>
                                <ArrowLeft className="text-gray-500 hover:text-gray-800" />
                            </button>
                            <span className="text-2xl text-stone-900 font-bold">Data Pengirim</span> 
                        </div> 

                        <div className="h-full">
                            <div className="p-6 flex-grow overflow-y-auto">
                                <form onSubmit={handleSubmit(onFormSubmit)} id="address-form">
                                    <span className="text-stone-800 font-semibold">Lengkapi data di bawah ini:</span>

                                    <div className="space-y-4 mt-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Nama Penerima:</label>
                                            <input type="text" name="recipientName" placeholder="Masukkan nama lengkap Anda" {...register("recipientName", { required: true })} className="w-full border-2 rounded-lg border-green-700 h-10 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Data Alamat
                                            </label>

                                            <Controller
                                                name="provinsi" 
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <select {...field} onChange={(e) => handleDropdownChange("provinsi", e.target.value, field.onChange)} disabled={isLoading.provinsi} className="w-full h-10 pl-4 pr-10 text-gray-800 bg-white border-2 border-green-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out">
                                                        <option value="">{isLoading.provinsi ? "Memuat" : "Pilih Provinsi"}</option>
                                                        {opsi.provinsi.map(prov => <option key={prov.id} value={`${prov.id},${prov.name}`}>{prov.name}</option>)}
                                                    </select>
                                                )}
                                            />

                                            <Controller
                                                name="kota" 
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <select {...field} onChange={(e) => handleDropdownChange("kota", e.target.value, field.onChange)} disabled={!pilihan.provinsi || isLoading.kota} className="w-full h-10 pl-4 pr-10 text-gray-800 bg-white border-2 border-green-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out">
                                                        <option value="">{isLoading.kota ? "Memuat" : "Pilih Kota"}</option>
                                                        {opsi.kota.map(kota => <option key={kota.id} value={`${kota.id},${kota.name}`}>{kota.name}</option>)}
                                                    </select>
                                                )}
                                            />

                                            <Controller
                                                name="kecamatan" 
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <select {...field} onChange={(e) => handleDropdownChange("kecamatan", e.target.value, field.onChange)} disabled={!pilihan.kota || isLoading.kecamatan} className="w-full h-10 pl-4 pr-10 text-gray-800 bg-white border-2 border-green-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out">
                                                        <option value="">{isLoading.kecamatan? "Memuat" : "Pilih Kecamatan"}</option>
                                                        {opsi.kecamatan.map(kec => <option key={kec.id} value={`${kec.id},${kec.name}`}>{kec.name}</option>)}
                                                    </select>
                                                )}
                                            />
                                            
                                            <Controller
                                                name="kelurahan" 
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <select {...field} onChange={(e) => handleDropdownChange("kelurahan", e.target.value, field.onChange)} disabled={!pilihan.kecamatan || isLoading.kelurahan} className="w-full h-10 pl-4 pr-10 text-gray-800 bg-white border-2 border-green-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out">
                                                        <option value="">{isLoading.kelurahan ? "Memuat" : "Pilih Kelurahan/Desa"}</option>
                                                        {opsi.kelurahan.map(kel => <option key={kel.id} value={`${kel.id},${kel.name}`}>{kel.name}</option>)}
                                                    </select>
                                                )}
                                            />
                                        </div>

                                        {/* Input Alamat Lengkap */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                                            <textarea name="fullAddress"
                                            {...register("fullAddress", { required: true })}
                                            rows={3} placeholder="Jl. Pahlawan No. 123, RT 01/RW 02, Kel. Suka Maju, Kec. Damai Sejahtera, Kota Bahagia, 12345" className="w-full border-2 rounded-lg border-green-700 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 ease-in-out" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-5 space-y-6">
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>{formatToRupiah(totalPrice)}</span>
                            </div>
                            
                            <button type="submit" form="address-form" disabled={!isValid || isProductsListNull} className="flex justify-center items-center gap-2 bg-green-600 w-full rounded-lg text-lg font-semibold text-white p-5 hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                                <FaWhatsapp />
                                <span>Pesan via WhatsApp</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </aside>)
}