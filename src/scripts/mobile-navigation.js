
document.addEventListener("DOMContentLoaded", function() {
    
    const hamburguer = document.getElementById("hamburguer");
    const header = document.querySelector(".header__content");
    const navbarItems = document.querySelectorAll(".header__content .navbar__item");
    const logo = document.querySelector(".header__logo_image");
    const overlay = document.querySelector(".header__overlay");

    const toggleMenu = function() {
        const isOpen = !header.classList.contains("header__content--expanded");
        header.classList.toggle("header__content--expanded");
        navbarItems.forEach(item => item.classList.toggle("navbar__item--expanded"));
        logo.src = isOpen ? "/images/logo_dark.png" : "/images/logo_light.png";
        overlay.classList.toggle("active");
    }
    
    const closeMenu = () => {
        header.classList.remove("header__content--expanded");
        navbarItems.forEach(item => item.classList.remove("navbar__item--expanded"));
        logo.src = "/images/logo_light.png";
        overlay.classList.remove("active");
    }

    const handleResize = () => {
        if (window.innerWidth > 992 && header.classList.contains("header__content--expanded")) {
            closeMenu();
        }
    };
    
    hamburguer.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);
    window.addEventListener('resize', handleResize);
});

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
        console.log("hi");
    }
}
