/**
 * Elegant Reader — Markdown Edition
 */

const App = {
  book: null,
  chapter: 0,
  settings: {
    theme: 'dark',
    fontSize: 'm'
  },

  el: {},

  init() {
    this.cacheElements();
    this.loadSettings();
    this.loadBook();
    this.bindEvents();
    this.setupScrollDetection();
  },

  cacheElements() {
    this.el = {
      coverScreen: document.getElementById('coverScreen'),
      coverImage: document.getElementById('coverImage'),
      coverTitle: document.getElementById('coverTitle'),
      coverAuthor: document.getElementById('coverAuthor'),
      startReadingBtn: document.getElementById('startReadingBtn'),
      header: document.getElementById('header'),
      title: document.getElementById('bookTitle'),
      progress: document.getElementById('progress'),
      chapter: document.getElementById('chapter'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      navInfo: document.getElementById('navInfo'),
      toc: document.getElementById('toc'),
      tocList: document.getElementById('tocList'),
      tocBtn: document.getElementById('tocBtn'),
      closeToc: document.getElementById('closeToc'),
      overlay: document.getElementById('overlay'),
      settings: document.getElementById('settings'),
      settingsBtn: document.getElementById('settingsBtn'),
      downloadPopup: document.getElementById('downloadPopup'),
      downloadBtn: document.getElementById('downloadBtn'),
      copyrightModal: document.getElementById('copyrightModal'),
      copyrightBtn: document.getElementById('copyrightBtn'),
      copyrightContent: document.getElementById('copyrightContent'),
      closeCopyright: document.getElementById('closeCopyright')
    };
  },

  // ─── Settings ───
  loadSettings() {
    try {
      const saved = localStorage.getItem('reader');
      if (saved) {
        const data = JSON.parse(saved);
        this.settings = { ...this.settings, ...data.settings };
        this.chapter = data.chapter || 0;
      }
    } catch (e) {}
    this.applySettings();
  },

  saveSettings() {
    try {
      localStorage.setItem('reader', JSON.stringify({
        settings: this.settings,
        chapter: this.chapter
      }));
    } catch (e) {}
  },

  applySettings() {
    const { theme, fontSize } = this.settings;
    
    document.body.classList.remove('light', 'sepia');
    if (theme !== 'dark') document.body.classList.add(theme);
    
    document.body.classList.remove('font-s', 'font-m', 'font-l');
    document.body.classList.add(`font-${fontSize}`);
    
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    document.querySelectorAll('[data-size]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === fontSize);
    });
  },

  // ─── Book Loading ───
  async loadBook() {
    try {
      const res = await fetch('data/book.json');
      if (!res.ok) throw new Error('book.json не знайдено');
      this.book = await res.json();
      
      // Заповнюємо обкладинку
      this.el.coverTitle.textContent = this.book.title;
      this.el.coverAuthor.textContent = this.book.author || '';
      this.el.coverImage.src = this.book.cover || '';
      this.el.coverImage.alt = this.book.title;
      
      this.el.title.textContent = this.book.title;
      document.title = this.book.title;
      
      this.renderToc();
      
      // Перевіряємо чи вже читали (є збережений прогрес)
      if (this.chapter > 0) {
        this.startReading();
      }
    } catch (err) {
      this.showError('Не вдалося завантажити книгу', 'Перевірте файл data/book.json');
      this.el.coverScreen.classList.add('hidden');
    }
  },

  // ─── Start Reading ───
  startReading() {
    this.el.coverScreen.classList.add('hidden');
    this.loadChapter(this.chapter);
  },

  // ─── Chapter Loading (Markdown) ───
  async loadChapter(index) {
    if (!this.book || index < 0 || index >= this.book.chapters.length) return;
    
    this.chapter = index;
    const ch = this.book.chapters[index];
    
    // Show loading
    this.el.chapter.innerHTML = `
      <div class="loading">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    `;
    
    try {
      const res = await fetch(`data/${ch.file}`);
      if (!res.ok) throw new Error('Файл не знайдено');
      const markdown = await res.text();
      
      // Convert markdown to HTML
      const html = this.parseMarkdown(markdown);
      
      this.el.chapter.innerHTML = `
        <h1 class="chapter-title">${ch.title}</h1>
        <div class="chapter-text">${html}</div>
      `;
      
      this.updateNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.saveSettings();
      
    } catch (err) {
      this.showError(`Не вдалося завантажити розділ`, `Перевірте файл data/${ch.file}`);
    }
  },

  // ─── Simple Markdown Parser ───
  parseMarkdown(text) {
    let paragraphs = text.split(/\n\n+/);
    
    return paragraphs
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => {
        // Bold: **text** or __text__
        p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        p = p.replace(/__(.+?)__/g, '<strong>$1</strong>');
        
        // Italic: *text* or _text_
        p = p.replace(/\*(.+?)\*/g, '<em>$1</em>');
        p = p.replace(/_(.+?)_/g, '<em>$1</em>');
        
        // Line breaks within paragraph
        p = p.replace(/\n/g, '<br>');
        
        return `<p>${p}</p>`;
      })
      .join('\n');
  },

  // ─── Navigation ───
  updateNav() {
    const total = this.book.chapters.length;
    
    this.el.prevBtn.disabled = this.chapter === 0;
    this.el.nextBtn.disabled = this.chapter === total - 1;
    this.el.navInfo.textContent = `${this.chapter + 1} / ${total}`;
    
    const progress = ((this.chapter + 1) / total) * 100;
    this.el.progress.style.width = `${progress}%`;
    
    document.querySelectorAll('.toc-item').forEach((item, i) => {
      item.classList.toggle('active', i === this.chapter);
    });
  },

  goTo(index) {
    this.loadChapter(index);
    this.closeToc();
  },

  prev() {
    if (this.chapter > 0) this.loadChapter(this.chapter - 1);
  },

  next() {
    if (this.chapter < this.book.chapters.length - 1) this.loadChapter(this.chapter + 1);
  },

  // ─── Table of Contents ───
  renderToc() {
    this.el.tocList.innerHTML = this.book.chapters.map((ch, i) => `
      <div class="toc-item ${i === this.chapter ? 'active' : ''}" data-index="${i}">
        <span class="toc-num">${i + 1}</span>
        <span class="toc-title">${ch.title}</span>
      </div>
    `).join('');
  },

  openToc() {
    this.el.toc.classList.add('active');
    this.el.overlay.classList.add('active');
  },

  closeToc() {
    this.el.toc.classList.remove('active');
    this.el.overlay.classList.remove('active');
  },

  // ─── Settings Panel ───
  toggleSettings() {
    this.el.settings.classList.toggle('active');
    this.el.downloadPopup.classList.remove('active');
  },

  closeSettings() {
    this.el.settings.classList.remove('active');
  },

  // ─── Download Popup ───
  toggleDownload() {
    this.el.downloadPopup.classList.toggle('active');
    this.el.settings.classList.remove('active');
  },

  closeDownload() {
    this.el.downloadPopup.classList.remove('active');
  },

  // ─── Copyright Modal ───
  async openCopyright() {
    this.closeDownload();
    this.el.copyrightModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Завантажуємо текст якщо ще не завантажений
    if (this.el.copyrightContent.querySelector('.loading')) {
      try {
        const res = await fetch('data/copyright.md');
        if (!res.ok) throw new Error();
        const text = await res.text();
        this.el.copyrightContent.innerHTML = this.parseMarkdown(text);
      } catch (e) {
        this.el.copyrightContent.innerHTML = '<p>Не вдалося завантажити інформацію.</p>';
      }
    }
  },

  closeCopyright() {
    this.el.copyrightModal.classList.remove('active');
    document.body.style.overflow = '';
  },

  // ─── Error Display ───
  showError(title, subtitle) {
    this.el.chapter.innerHTML = `
      <div class="loading" style="flex-direction: column; gap: 1rem;">
        <p style="color: var(--text-muted);">${title}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); opacity: 0.6;">${subtitle}</p>
      </div>
    `;
  },

  // ─── Scroll Detection ───
  setupScrollDetection() {
    let lastY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          
          if (y < lastY || y < 100) {
            this.el.header.classList.add('visible');
          } else {
            this.el.header.classList.remove('visible');
            this.closeSettings();
            this.closeDownload();
          }
          
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    });
    
    this.el.header.classList.add('visible');
  },

  // ─── Event Binding ───
  bindEvents() {
    // Cover screen
    this.el.startReadingBtn.addEventListener('click', () => {
      this.startReading();
    });

    this.el.prevBtn.addEventListener('click', () => this.prev());
    this.el.nextBtn.addEventListener('click', () => this.next());
    
    this.el.tocBtn.addEventListener('click', () => this.openToc());
    this.el.closeToc.addEventListener('click', () => this.closeToc());
    this.el.overlay.addEventListener('click', () => this.closeToc());
    this.el.tocList.addEventListener('click', (e) => {
      const item = e.target.closest('.toc-item');
      if (item) this.goTo(parseInt(item.dataset.index));
    });
    
    this.el.settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleSettings();
    });

    this.el.downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDownload();
    });

    this.el.copyrightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.openCopyright();
    });

    this.el.closeCopyright.addEventListener('click', () => {
      this.closeCopyright();
    });

    this.el.copyrightModal.addEventListener('click', (e) => {
      if (e.target === this.el.copyrightModal) {
        this.closeCopyright();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!this.el.settings.contains(e.target) && e.target !== this.el.settingsBtn) {
        this.closeSettings();
      }
      if (!this.el.downloadPopup.contains(e.target) && e.target !== this.el.downloadBtn) {
        this.closeDownload();
      }
    });
    
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.settings.theme = btn.dataset.theme;
        this.applySettings();
        this.saveSettings();
      });
    });
    
    document.querySelectorAll('[data-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.settings.fontSize = btn.dataset.size;
        this.applySettings();
        this.saveSettings();
      });
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'Escape') {
        this.closeToc();
        this.closeSettings();
        this.closeCopyright();
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());