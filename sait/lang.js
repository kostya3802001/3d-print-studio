// ===============================
// SIMPLE LANG SWITCH UA / PL
// ===============================

let currentLang = localStorage.getItem("lang") || "ua";

function applyLang() {
    document.querySelectorAll("[data-ua]").forEach(el => {
        el.textContent =
            currentLang === "ua"
                ? el.getAttribute("data-ua")
                : el.getAttribute("data-pl");
    });

    const langBtn = document.querySelector(".lang");
    if (langBtn) {
        langBtn.textContent = currentLang.toUpperCase();
    }
}

function toggleLang() {
    currentLang = currentLang === "ua" ? "pl" : "ua";
    localStorage.setItem("lang", currentLang);
    applyLang();
}

document.addEventListener("DOMContentLoaded", () => {
    applyLang();
    const langBtn = document.querySelector(".lang");
    if (langBtn) {
        langBtn.style.cursor = "pointer";
        langBtn.onclick = toggleLang;
    }
});
