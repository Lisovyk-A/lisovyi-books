document.addEventListener('DOMContentLoaded', function() {
  const header = `
    <header class="header">
      <a href="/index.html" class="logo">
        Андрій <span>ЛІСОВИЙ</span>
      </a>

      <i class="bx bx-menu" id="menu-icon"></i>

      <nav class="navbar" id="navbar">
        <a href="/pages/about.html">Про автора</a>
      </nav>

      <button class="gradient-btn" onclick="window.location.href='/index.html#books'">Придбати книги</button>
    </header>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', header);

  // Mobile menu toggle
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');

  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
});