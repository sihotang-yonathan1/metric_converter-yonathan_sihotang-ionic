# Metric Converter
Aplikasi ini merupakan aplikasi sederhana yang bertujuan untuk mengkonversi 
satuan pada suatu metrik.

## Cara Kerja
Aplikasi ini menggunakan array yang tersedia di `availableMetric`.
Pada setiap metrik terdapat kumpulan satuan pada `units`. Setiap `unit` dalam `units` disusun secara berurutan untuk dapat dibandingkan posisi indexnya antara satuan unit konversi `dari` ke `ke`. Perbedaan nilai index ini kemudian dikalikan dengan faktor pengali (`unit_factor`) pada metrik tersebut dan dimasukan ke dalam nilai hasil.

## Cara Penggunaan
1. Pilih metrik pada dropdown Pilih metrik
2. Pilih Satuan yang di konversi di dropdown Dari dan Ke
3. Masukkan nilai angka yang diinginkan

## Metrik dan Satuan yang didukung
1. Panjang:
    - km
    - hm
    - dam
    - m
    - dm
    - cm
    - mm
2. Massa:
    - kg
    - hg
    - dag
    - g
    - dg
    - cg
    - mg
3. Waktu:
    - Jam
    - Menit
    - Detik
4. Kuat Arus
    - kA
    - hA
    - daA
    - A
    - dA
    - cA
    - mA
5. Suhu
    - C
    - F
    - R
    - K

## Demo