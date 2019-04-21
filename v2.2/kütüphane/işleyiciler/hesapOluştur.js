/**
 * Yönlendirici ile çalıştıran kontrol işlemleri işleyicisi
 * * Kullanım Şekli: localhost:3000/kontroller
 */

import {
    kalıpAl as sayfaKalıbınıAl,
    evrenselKalıplarıAl
} from './../yardımcılar';
import { debuglog as hataKaydı } from 'util'

// Hata ayıklama modundaki (debug mode) mesajları göstermek için kullanılacak 
const hataAyıkla = hataKaydı('hesapOluştur');

/**
 * Örnek: localhost:3000/hesap/olustur yazıldığında bu fonksiyon çalışır.
 *
 * Not: ornek, yönlendirici "nin bir objesidir.
 *
 * @param {object} veri Index.js"te tanımlanan veri objesidir. İstekle gelir.
 * @param {function(number, string, string):void} geriCagirma İşlemler bittiği zaman verilen yanıt
 ** arg0: HTTP varsayılan durum kodları
 ** arg0: HTTP yanıtı veya tanımsızlık
 ** arg1: İçerik tipi (Content-type) [http, json vs.]
 */
const hesapOluştur = (veri, geriCagirma) => {
    // Sadece GET metodunda çalışmalı
    if (veri.metot == 'get') {
        // Araya sıkıştırılacak kalıp verileri oluşturuyoruz (_üstBilgi.html için)
        const kalıpVerisi = {
            'başlık.konu': "Hesap - Oluştur",
            'başlık.açıklama': "Ücretsiz kayıt ol (:",
            'vücut.sınıf': "hesapOluştur"
        }

        // Sayfa kalıbını alma
        sayfaKalıbınıAl('hesapOluştur', kalıpVerisi, (hata, dizgi) => {
            if (!hata && dizgi) {
                evrenselKalıplarıAl(dizgi, kalıpVerisi, (hata, dizgi) => {
                    if (!hata && dizgi) {
                        // Sayfayı html olarak geri döndürme
                        geriCagirma(200, dizgi, 'html');
                        
                    } else {
                        hataAyıkla(hata);
                        geriCagirma(500, undefined, 'html');
                    }
                });
            } else {
                hataAyıkla(hata);
                geriCagirma(500, undefined, 'html');
            }
        });
    } else {
        hataAyıkla(`Veri metodu hatalıdır. (Metot: ${veri.metot})`);
        geriCagirma(405, undefined, 'html');
    }
}

export default hesapOluştur;