<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="K">
    <meta name="description" content="This is the homepage of Gettin">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gettin</title>

    <link rel="icon" href="{{ asset('images/gettin-icon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">
                <img src="{{ asset('images/gettin-icon.ico') }}" alt="Gettin Logo">
                <p>Gettin</p>
            </div>

            <ul class="menu">
                <li class="active"><a href="{{ url('/dashboard') }}">Beranda</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Pesanan</a></li>
                <li><a href="#">Inventory</a></li>
                <li><a href="#">Kontak</a></li>
            </ul>

            <div class="actions">
                <a href="#" class="cart-link" aria-label="Keranjang">
                    <img src="{{ asset('images/shopping-cart.ico') }}" alt="keranjang" width="25">
                    <span class="cart-badge" data-cart-count>0</span>
                </a>
                <a href="#" class="profile-link" aria-label="Profil admin">
                    <span class="profile-icon"></span>
                </a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="overlay">
                <h2>Pesan makanan kantin tanpa antre.</h2>
                <h2>Ambil sesuai waktu yang kamu pilih.</h2>
                <div class="hero-actions">
                    <a href="#" class="btn">Pesan Sekarang →</a>
                </div>
            </div>
        </section>

        <section class="stats-section">
            <h2>Statistik Gettin</h2>
            <div class="stats-grid" id="stats-container"></div>
        </section>

        <section class="menu-populer">
            <h2>Menu Populer Minggu Ini</h2>
            <div class="menu-container" id="popular-menu-container"></div>
        </section>

        <section class="cara-kerja">
            <h2>Cara Kerja</h2>
            <div class="cara">
                <ol class="list-cara">
                    <li>Pilih hidangan yang tersedia pada Menu</li><hr>
                    <li>Masuk ke Keranjang untuk memproses pesanan</li><hr>
                    <li>Input estimasi waktu kapan pesanan ingin diambil</li><hr>
                    <li>Klik Checkout, lalu lakukan pembayaran dengan QRIS</li><hr>
                    <li>Tunggu hingga pesanan siap, kemudian jemput pesanan Anda di kantin tersayang</li>
                </ol>
                <img src="{{ asset('images/getto-1.jpg') }}" alt="getto-pesan" width="250">
            </div>
        </section>
    </main>

    <footer class="footer">
        <p><a href="#">Back to Top</a></p><br>

        <div class="footer-top">
            <div class="footer-brand">
                <div class="logo">
                    <img src="{{ asset('images/gettin-icon.ico') }}" alt="Gettin Logo">
                    <p>Gettin</p>
                </div>
                <p>Pesan makananmu di kantin tanpa ribet antri</p>
            </div>

            <div class="footer-topright">
                <div class="footer-nav">
                    <h3>Navigation</h3>
                    <a href="{{ url('/dashboard') }}">Beranda</a>
                    <a href="#">Menu</a>
                    <a href="#">Inventory</a>
                    <a href="#">Kontak</a>
                </div>

                <div class="footer-contact">
                    <h3>Contact</h3>
                    <p>Jl. Kalimantan No.37, Sumbersari, Jember</p>
                    <p>gettinmefood@gmail.com</p>
                    <p>(201) 372-3702</p>
                </div>
            </div>
        </div>

        <br><hr>

        <div class="footer-bottom">
            <p>© Copyright by Gettin 2026</p>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
            </div>
        </div>

        <p class="mysign">Crafted with ❤️ by Kamelia</p>
    </footer>
</body>
</html>
