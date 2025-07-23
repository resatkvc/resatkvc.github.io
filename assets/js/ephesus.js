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

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initSearchAndFilter();
  initLikeAndBookmark();
  
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