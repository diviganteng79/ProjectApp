<script type = "module" > 
  // Impor fungsi-fungsi yang Anda butuhkan dari SDK yang Anda perlukan
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js" ; 
  impor { getAnalytics } dari "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js" ; 
  // TODO: Tambahkan SDK untuk produk Firebase yang ingin Anda gunakan
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Konfigurasi Firebase aplikasi web Anda
  // Untuk Firebase JS SDK v7.20.0 dan yang lebih baru, measurementId bersifat opsional
  const firebaseConfig = { 
    apiKey : "AIzaSyAc06GR9kgHbfZ_8IBWeDWet__d7aE9wA4" , 
    authDomain : "jsc-database-d49f2.firebaseapp.com" , 
    ID proyek : "jsc-database-d49f2" , 
    storageBucket : "jsc-database-d49f2.firebasestorage.app" , 
    messagingSenderId : "494874117797" , 
    ID aplikasi : "1:494874117797:web:f6eb3275c68a6a7b82ef4c" , 
    ID pengukuran : "G-4DE2EYFQXH" 
  };

  // Inisialisasi Firebase
  const app = initializeApp ( firebaseConfig );
  const analytics = getAnalytics ( app );
</script>
