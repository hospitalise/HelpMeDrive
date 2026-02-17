document.addEventListener('DOMContentLoaded', () => {

  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // navbar scroll
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // mobile menu
  var mobileToggle = document.getElementById('mobile-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  mobileToggle.addEventListener('click', () => {
    var isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open', isOpen);
  });

  // smooth scroll for anything with data-target
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      var target = document.querySelector(btn.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
      }
    });
  });

  // brand link goes to top
  document.getElementById('brand-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // reviews carousel
  var reviews = [
    { name: "Dan Si", text: "Ellie was extremely patient, very professional, and supportive throughout the entire learning process. She guided me every step of the way and helped me gain the confidence I needed to get my license. I couldn't have done it without her. Highly recommended!" },
    { name: "Sreya Sasi", text: "I'm really grateful I took my driving lessons with Ellie for converting my overseas license. From the very first session, she boosts your confidence, and each class after focuses on your weaknesses to help you improve dramatically." },
    { name: "Joshua Drogemuller", text: "Fantastic driving instructor, never thought I'd be able to get my license but Ellie was calm, clear and direct with instructions and guided me through the whole process." },
    { name: "Mafer Vallejo", text: "Ellie did a great job explaining everything about the driving test. During our drives, she went over all the traffic rules and what I needed to know in a really clear way. At the end of each session, she gave helpful feedback." },
    { name: "Shanaye Kennedy", text: "I had a really good experience with Ellie, she was very clear and communicative which made her instructions easy to understand. I would highly recommend her as she is very supportive and experienced." },
    { name: "Tim Winter", text: "Ellie is a great teacher. Patient, kind and accommodating. I highly recommend her." },
    { name: "John Kennedy", text: "Ellie is an excellent instructor who has successfully assisted 2 of my 'young adults' obtain their licences first time." },
    { name: "Tahlia", text: "I had a good experience with Ellie, she was kind and helpful with advice. I learnt a lot about being a safe driver with Ellie :))" },
    { name: "Morteza Nazari", text: "I had an excellent experience with Ellie. Her professionalism, patience, and clear instruction made learning to drive enjoyable and effective. She tailored each lesson to my needs, boosting my confidence and ensuring I was well-prepared." }
  ];

  var currentReview = 0;
  var reviewText = document.getElementById('review-text');
  var reviewName = document.getElementById('review-name');
  var reviewDots = document.getElementById('review-dots');

  reviews.forEach((_, i) => {
    var dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Review ' + (i + 1));
    dot.addEventListener('click', () => showReview(i));
    reviewDots.appendChild(dot);
  });

  function showReview(index) {
    currentReview = index;
    reviewText.textContent = '\u201C' + reviews[index].text + '\u201D';
    reviewName.textContent = reviews[index].name;
    reviewDots.querySelectorAll('.review-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  document.getElementById('review-prev').addEventListener('click', () => {
    showReview(currentReview === 0 ? reviews.length - 1 : currentReview - 1);
  });

  document.getElementById('review-next').addEventListener('click', () => {
    showReview(currentReview === reviews.length - 1 ? 0 : currentReview + 1);
  });

  showReview(0);

  // gallery lightbox
  var galleryImages = [
    { src: 'assets/images/gallery-1.jpg', alt: 'Happy student holding congratulations card next to HELP ME DRIVE car' },
    { src: 'assets/images/gallery-2.jpg', alt: 'Student celebrating passing driving test with HELP ME DRIVE' },
    { src: 'assets/images/gallery-3.jpg', alt: 'Ellie with happy student after successful driving lesson' },
    { src: 'assets/images/gallery-4.jpg', alt: 'Student with congratulations card next to instructor car' },
    { src: 'assets/images/gallery-5.jpg', alt: 'Proud student after passing driving test in Mooroolbark' },
    { src: 'assets/images/gallery-6.jpg', alt: 'Student with congratulations certificate next to HELP ME DRIVE car' }
  ];

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      var img = galleryImages[parseInt(item.dataset.index)];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxImg.addEventListener('click', (e) => e.stopPropagation());

  // contact modal
  var contactModal = document.getElementById('contact-modal');

  document.getElementById('contact-cta-btn').addEventListener('click', () => {
    contactModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeContactModal() {
    contactModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close').addEventListener('click', closeContactModal);
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });
  document.querySelector('.contact-modal-card').addEventListener('click', (e) => e.stopPropagation());

  // esc to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('open')) closeLightbox();
      if (contactModal.classList.contains('open')) closeContactModal();
    }
  });

  // scroll animations
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
});
