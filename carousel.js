const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");

let isDragging = false;
let startX, scrollLeft;

// Pause auto-scroll on manual scroll
track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
});
track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
});

// Mouse Events
carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    track.style.animationPlayState = "paused"; // Pause animation
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust speed
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    track.style.animationPlayState = "running"; // Resume animation
});

carousel.addEventListener("mouseleave", () => {
    isDragging = false;
});

// Touch Events (for mobile)
carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    track.style.animationPlayState = "paused";
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener("touchend", () => {
    isDragging = false;
    track.style.animationPlayState = "running";
});

function shuffleItems() {
    let container = document.getElementById("shuffleContainer");
    let items = Array.from(container.children);

    for(let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    container.innerHTML = "";
    items.forEach(item => container.append(item));
}

window.onload = shuffleItems;