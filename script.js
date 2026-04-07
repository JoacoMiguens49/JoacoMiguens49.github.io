// ===== Scroll animation =====
const events = document.querySelectorAll(".event");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

events.forEach(e => observer.observe(e));


// ===== Música autoplay (con fallback realista) =====
const music = document.getElementById("music");

music.play().catch(() => {
    // fallback: primer toque en pantalla
    document.addEventListener("click", () => {
        music.play();
    }, { once: true });
});


// ===== Partículas suaves tipo nieve =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        d: Math.random() * 1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();

    particles.forEach(p => {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    });

    ctx.fill();
    update();
}

function update() {
    particles.forEach(p => {
        p.y += p.d;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });
}

setInterval(draw, 33);