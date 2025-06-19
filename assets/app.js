const toggleResponsiveHeaderNavbar = () => {
    const navbar = document.querySelector("header nav.navbar");
    const button = document.querySelector("header button.toggleResponsiveNavbar");

    button.classList.toggle("activeResponsiveNavbar");
    navbar.classList.toggle("activeNavbar")
}