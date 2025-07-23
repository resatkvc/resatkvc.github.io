function toggleNightMode(){
	if(document.documentElement.getAttribute('data-theme') == 'light'){
		document.documentElement.setAttribute('data-theme', 'dark');
		document.getElementById('mode-switcher').classList.add('active');
		localStorage.setItem("theme","dark");
	}
	else{
		document.documentElement.setAttribute('data-theme', 'light');
		document.getElementById('mode-switcher').classList.remove('active');
		localStorage.setItem("theme","");
	}
}

// Lightbox Functions
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  lightboxImg.src = imageSrc;
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Prevent event bubbling
  event.preventDefault();
  event.stopPropagation();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    lightboxImg.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
});

// Scroll Animasyonları
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Tüm post kartlarını gözlemle
  document.querySelectorAll('.post-list').forEach(post => {
    observer.observe(post);
  });
}

// Arama ve Filtreleme Fonksiyonları
let searchTimeout;
let currentFilter = 'all';
let searchTerm = '';

function initSearchAndFilter() {
  const searchInput = document.getElementById('searchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const postContainer = document.getElementById('postContainer');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  // Arama fonksiyonu
  searchInput.addEventListener('input', function(e) {
    searchTerm = e.target.value.toLowerCase();
    
    // Debounce arama
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterPosts();
    }, 300);
  });

  // Filtre tab'ları
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Aktif tab'ı güncelle
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      currentFilter = this.dataset.filter;
      filterPosts();
    });
  });

  function filterPosts() {
    const posts = document.querySelectorAll('.post-list');
    let visibleCount = 0;

    posts.forEach(post => {
      const title = post.dataset.title || '';
      const tags = post.dataset.tags || '';
      const categories = post.dataset.categories || '';
      
      // Arama filtresi
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        tags.includes(searchTerm) || 
        categories.includes(searchTerm);
      
      // Kategori filtresi
      const matchesFilter = currentFilter === 'all' || 
        tags.includes(currentFilter.toLowerCase()) || 
        categories.includes(currentFilter.toLowerCase());
      
      if (matchesSearch && matchesFilter) {
        post.classList.remove('hidden');
        post.classList.add('visible');
        visibleCount++;
      } else {
        post.classList.add('hidden');
        post.classList.remove('visible');
      }
    });

    // Sonuç sayısını güncelle
    resultsCount.textContent = `${visibleCount} yazı bulundu`;
    
    // Sonuç yoksa mesaj göster
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      postContainer.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      postContainer.style.display = 'block';
    }
  }
}

// Sosyal Medya Paylaşım Fonksiyonları
function shareToTwitter(title, url) {
  const text = encodeURIComponent(`${title} - Reşat Kavcı'nın Blog'u`);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToLinkedIn(title, url) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToWhatsApp(title, url) {
  const text = encodeURIComponent(`${title} - Reşat Kavcı'nın Blog'u\n\n${url}`);
  const shareUrl = `https://wa.me/?text=${text}`;
  window.open(shareUrl, '_blank');
}

// Like ve Bookmark Sistemi
function initLikeAndBookmark() {
  const likeButtons = document.querySelectorAll('.like-btn');
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

  // LocalStorage'dan verileri yükle
  const likes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
  const bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');

  // Like butonları
  likeButtons.forEach(btn => {
    const postUrl = btn.dataset.post;
    const countSpan = btn.querySelector('.action-count');
    
    // Mevcut like sayısını göster
    if (likes[postUrl]) {
      btn.classList.add('liked');
      countSpan.textContent = likes[postUrl];
    }

    btn.addEventListener('click', function() {
      if (likes[postUrl]) {
        likes[postUrl]--;
        if (likes[postUrl] === 0) {
          delete likes[postUrl];
          btn.classList.remove('liked');
        }
      } else {
        likes[postUrl] = 1;
        btn.classList.add('liked');
      }
      
      countSpan.textContent = likes[postUrl] || 0;
      localStorage.setItem('blogLikes', JSON.stringify(likes));
      
      // Animasyon efekti
      btn.style.transform = 'scale(1.1)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  // Bookmark butonları
  bookmarkButtons.forEach(btn => {
    const postUrl = btn.dataset.post;
    
    // Mevcut bookmark durumunu göster
    if (bookmarks.includes(postUrl)) {
      btn.classList.add('bookmarked');
    }

    btn.addEventListener('click', function() {
      if (bookmarks.includes(postUrl)) {
        const index = bookmarks.indexOf(postUrl);
        bookmarks.splice(index, 1);
        btn.classList.remove('bookmarked');
      } else {
        bookmarks.push(postUrl);
        btn.classList.add('bookmarked');
      }
      
      localStorage.setItem('blogBookmarks', JSON.stringify(bookmarks));
      
      // Animasyon efekti
      btn.style.transform = 'scale(1.1)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });
}

// Medium Blog Entegrasyonu
async function loadMediumPosts() {
  const mediumUsername = 'kavciresat';
  
  try {
    // Medium RSS feed'ini çek
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items) {
      displayMediumPosts(data.items);
    } else {
      throw new Error('Medium feed yüklenemedi');
    }
  } catch (error) {
    console.error('Medium posts yüklenemedi:', error);
    // Hata durumunda manuel linkler göster
    displayManualMediumPosts();
  }
}

function displayMediumPosts(items) {
  const mediumContainer = document.getElementById('mediumPosts');
  if (!mediumContainer) return;
  
  let html = '<div class="medium-section"><h2>📝 Medium Blog Yazılarım</h2><div class="medium-grid">';
  
  items.slice(0, 6).forEach(item => {
    const title = item.title || '';
    const link = item.link || '';
    const pubDate = item.pubDate || '';
    const description = item.description || '';
    
    // Tarihi formatla
    const date = new Date(pubDate);
    const formattedDate = date.toLocaleDateString('tr-TR');
    
    // HTML'den temizle
    const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    
    html += `
      <div class="medium-post">
        <a href="${link}" target="_blank" class="medium-title">${title}</a>
        <div class="medium-date">📅 ${formattedDate}</div>
        <div class="medium-excerpt">${cleanDescription}</div>
        <a href="${link}" target="_blank" class="medium-read-more">Devamını Oku →</a>
      </div>
    `;
  });
  
  html += '</div></div>';
  mediumContainer.innerHTML = html;
}

function displayManualMediumPosts() {
  const mediumContainer = document.getElementById('mediumPosts');
  if (!mediumContainer) return;

  const mediumPosts = [
    {
      title: "Docker + LocalStack ile AWS S3 & MySQL Tabanlı Selenium Test Otomasyonu",
      date: "22.07.2025",
      excerpt: "Modern test otomasyonu süreçlerinde, test sonuçlarını güvenli bir şekilde saklamak ve veritabanı entegrasyonlarıyla test verilerini etkin şekilde yön...",
      link: "https://medium.com/@resatkvc/docker-localstack-ile-aws-s3-mysql-tabanlı-selenium-test-otomasyonu"
    },
    {
      title: "Docker Üzerinde PostgreSQL Kurulumu: IDE ile Entegrasyon ve PgAdmin ile Görsel Yönetim",
      date: "14.07.2025",
      excerpt: "Merhabalar! 👋 Modern yazılım geliştirme süreçlerinde, veritabanlarını izole ve kontrol edilebilir ortamlarda çalıştırmak artık bir ihtiyaç haline g...",
      link: "https://medium.com/@resatkvc/docker-üzerinde-postgresql-kurulumu"
    },
    {
      title: "Java'da Şart Blokları Nedir? Test Otomasyonunda Nasıl Kullanılır?",
      date: "23.06.2025",
      excerpt: "Merhaba 👋 Bu yazıda Java'da karar verme mekanizmalarını oluşturan şart bloklarını (diğer adıyla koşul ifadeleri) ele alacağım. Şart blokları, pro...",
      link: "https://medium.com/@resatkvc/java-şart-blokları-test-otomasyonu"
    },
    {
      title: "Java'da Döngüler Nedir? Test Otomasyonunda Nasıl Kullanılır?",
      date: "20.06.2025",
      excerpt: "Merhaba 👋 Bu yazıda Java öğrenen çoğu kişinin aklındaki şu soruya yanıt arayacağız: 💡 \"Döngüler gerçek projelerde nerede ve nasıl kullanılıyor?\"...",
      link: "https://medium.com/@resatkvc/java-döngüler-test-otomasyonu"
    },
    {
      title: "Uygulamalı Test Otomasyon Siteleri",
      date: "12.06.2025",
      excerpt: "Merhabalar Bu yazımda, test otomasyon alanında pratik yapmak ve mevcut becerilerini geliştirmek isteyenler için kategorilere ayrılmış demo test sitel...",
      link: "https://medium.com/@resatkvc/uygulamalı-test-otomasyon-siteleri"
    },
    {
      title: "Java Operatörleri Nedir? Test Otomasyonunda Nasıl ve Nerede Kullanılır?",
      date: "03.06.2025",
      excerpt: "Merhabalar Bu yazımda, herkesin sıkça duyduğu ve gördüğü ama ne olduğunu ve ne için kullanıldığını merak ettiği bir konuya değinmek istiyorum. Operatö...",
      link: "https://medium.com/@resatkvc/java-operatörleri-test-otomasyonu"
    }
  ];

  const postsHTML = mediumPosts.map(post => `
    <div class="medium-post" onclick="window.open('${post.link}', '_blank')">
      <h3 class="medium-title">${post.title}</h3>
      <span class="medium-date">${post.date}</span>
      <p class="medium-excerpt">${post.excerpt}</p>
      <a href="${post.link}" class="medium-read-more" target="_blank" onclick="event.stopPropagation()">
        Devamını Oku
      </a>
    </div>
  `).join('');

  const html = `
    <div class="medium-section">
      <h2>📝 Medium Blog Yazılarım</h2>
      <div class="medium-grid">
        ${postsHTML}
      </div>
    </div>
  `;
  
  mediumContainer.innerHTML = html;
}

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initSearchAndFilter();
  initLikeAndBookmark();
  
  // Medium yazılarını yükle
  setTimeout(() => {
    loadMediumPosts();
  }, 1000);
  
  // Smooth scroll için link tıklamalarını yakala
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});