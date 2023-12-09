export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // Rastgele bir indeks seç
        const j = Math.floor(Math.random() * (i + 1));

        // Elemanları swap et
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export const trimPhone = (str) => {
    // Boşlukları, karakterleri ve sembolleri temizle
    let temizlenmisStr = str.replace(/[^0-9]/g, '');
    temizlenmisStr = temizlenmisStr.replace(/\s/g, '');
    temizlenmisStr = temizlenmisStr.slice(-10);
    // Numarayı "xxx xxx xx xx" formatına düzenle
    var duzenlenmisNumara = temizlenmisStr.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

    return duzenlenmisNumara;
}



