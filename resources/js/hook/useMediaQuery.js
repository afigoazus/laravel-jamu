import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mendeteksi media query CSS.
 * @param {string} query - String media query (misal: "(min-width: 768px)").
 * @returns {boolean} - True jika query cocok, false jika tidak.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    // Langsung atur state awal saat komponen dimuat
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Buat listener untuk memantau perubahan ukuran layar
    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);

    // Hapus listener saat komponen di-unmount untuk mencegah memory leak
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}