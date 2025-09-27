const API_BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api"

async function fetchData(url) {
    try {
        const response = await fetch(url) 
        if (!response.ok) {
            throw new Error(`Gagal mengambil data, statur: ${response.status}`) 
        }

        return await response.json()
    } catch (error) {
        console.error("Terjadi kesalahan pada API:", error) 
        throw error
    } 
}

export const getProvinsi = () => {
    return fetchData(`${API_BASE_URL}/provinces.json`)
}

export const getKota = (idProvinsi) => {
    return fetchData(`${API_BASE_URL}/regencies/${idProvinsi}.json`)
}

export const getKecamatan = (idKota) => {
    return fetchData(`${API_BASE_URL}/districts/${idKota}.json`)
}

export const getKelurahan = (idKecamatan) => {
    return fetchData(`${API_BASE_URL}/villages/${idKecamatan}.json`)
}