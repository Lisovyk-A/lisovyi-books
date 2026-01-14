let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('#navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x') 
    navbar.classList.toggle('active');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
 }

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

        // Закриття модального вікна при кліку поза ним
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

        // Закриття модального вікна клавішею Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
             modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});
