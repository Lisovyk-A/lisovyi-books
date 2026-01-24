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

// Particles System
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const homeImg = document.querySelector('.home-img');
    
    function resizeCanvas() {
        const rect = homeImg.getBoundingClientRect();
        canvas.width = rect.width + 100;
        canvas.height = rect.height + 100;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const ringRadius = Math.min(canvas.width, canvas.height) / 2 - 50;
            
            const angle = Math.random() * Math.PI * 2;
            const radiusOffset = (Math.random() - 0.5) * 60;
            
            this.x = centerX + Math.cos(angle) * (ringRadius + radiusOffset);
            this.y = centerY + Math.sin(angle) * (ringRadius + radiusOffset);
            this.size = Math.random() * 1 + 2;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.fadeSpeed = Math.random() * 0.002 + 0.001;
            this.color = Math.random() > 0.5 ? '#ff6b00' : '#ffcc00';
            this.angle = angle;
            this.orbitSpeed = (Math.random() - 0.5) * 0.0008;
            this.radiusOffset = radiusOffset;
            this.ringRadius = ringRadius;
            this.centerX = centerX;
            this.centerY = centerY;
        }

        update() {
            this.angle += this.orbitSpeed;
            this.x = this.centerX + Math.cos(this.angle) * (this.ringRadius + this.radiusOffset);
            this.y = this.centerY + Math.sin(this.angle) * (this.ringRadius + this.radiusOffset);
            this.opacity -= this.fadeSpeed;
            
            if (this.opacity <= 0) {
                this.reset();
                this.opacity = Math.random() * 0.8 + 0.2;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        
        requestAnimationFrame(animate);
    }

    animate();
}