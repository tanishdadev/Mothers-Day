import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.10.4/+esm"

const dots = document.querySelectorAll(".dot")
animate(
    dots,
    { y: -30 },
    {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delay: stagger(0.2, { startDelay: -0.5 }),
    }
)

setTimeout(() => {
    const loader = document.querySelector(".containerone");
    const content = document.getElementById("main-content");
    loader.style.opacity = "0";
    
    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
        content.classList.add("slide-up");
        const arrow = document.getElementById("arrow-container");
        arrow.style.display = "block";
    }, 500);
}, 3000);

const arrow = document.querySelector(".ico");

function checkScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    
    if (scrollTop + windowHeight >= docHeight - 10) {
        arrow.classList.add("hide-arrow");
    } else {
        arrow.classList.remove("hide-arrow");
    }
}

window.addEventListener("scroll", checkScroll);

let currentThumbnail = null;

function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    currentThumbnail = img;
    const rect = img.getBoundingClientRect();
    lightboxImg.src = img.src;
    lightboxImg.style.transition = "none";
    lightboxImg.style.transform = "none";
    lightboxImg.style.position = "fixed";
    lightboxImg.style.top = `${rect.top}px`;
    lightboxImg.style.left = `${rect.left}px`;
    lightboxImg.style.width = `${rect.width}px`;
    lightboxImg.style.height = `${rect.height}px`;
    lightboxImg.style.margin = "0";
    lightboxImg.style.objectFit = "contain";
    lightboxImg.style.borderRadius = "8px";
    lightbox.style.display = "block";
    img.style.visibility = "hidden";
    void lightboxImg.offsetWidth;
    const maxW = window.innerWidth * 0.8;
    const maxH = window.innerHeight * 0.8;
    const aspectRatio = rect.width / rect.height;
    let targetW = maxW;
    let targetH = maxW / aspectRatio;

    if (targetH > maxH) {
        targetH = maxH;
        targetW = maxH * aspectRatio;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const scaleX = targetW / rect.width;
    const scaleY = targetH / rect.height;
    const offsetX = centerX - (rect.left + rect.width / 2);
    const offsetY = centerY - (rect.top + rect.height / 2);

    requestAnimationFrame(() => {
        lightboxImg.style.transition = "transform 0.2s linear";
        lightboxImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleX}, ${scaleY})`;
    });
}

function closeLightbox() {
    if (!currentThumbnail) return;
  
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const rect = currentThumbnail.getBoundingClientRect();
    lightboxImg.style.transition = "transform 0.2s linear";
    lightboxImg.style.transform = "translate(0px, 0px) scale(1)";

    setTimeout(() => {
        currentThumbnail.style.visibility = "visible";
        lightbox.style.display = "none";
        lightboxImg.style.transition = "none";
        currentThumbnail = null;
    }, 200);
}

document.querySelectorAll(".thumbnail").forEach(img => {
    img.addEventListener("click", () => openLightbox(img));
});

document.getElementById("lightbox").addEventListener("click", (e) => {
    const lightboxImg = document.getElementById("lightbox-img");
    if (!lightboxImg.contains(e.target)) {
        closeLightbox();
    }
});
