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
    loader.style.display = "none";
    content.style.display = "block";
    content.classList.add("slide-up");
    const arrow = document.getElementById("arrow-container");
    arrow.style.display = "block";
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

