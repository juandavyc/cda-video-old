(() => {
    "use strict";

    const storedTheme = localStorage.getItem("theme");
    const activeThemeIcon = document.getElementById('theme-icon-active');

    const iconsTheme = {
        dark: 'fa-moon',
        light: 'fa-sun'
    }
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme;
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return "dark";
            } else {
                return "light";
            }
        }
    };

    const setTheme = function(theme) {
        if (
            theme === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    };

    setTheme(getPreferredTheme());

    const showActiveTheme = (theme) => {
        const btnToActive = document.querySelector(
            `[data-bs-theme-value="${theme}"]`
        );
        document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
            element.classList.remove("active");
        });
        btnToActive.classList.add("active");

        activeThemeIcon.removeAttribute('class');
        activeThemeIcon.classList.add("fa-solid", iconsTheme[theme]);
    };

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            if (storedTheme !== "light" || storedTheme !== "dark") {
                setTheme(getPreferredTheme());
            }
        });

    window.addEventListener("DOMContentLoaded", () => {
        showActiveTheme(getPreferredTheme());

        document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const theme = toggle.getAttribute("data-bs-theme-value");
                localStorage.setItem("theme", theme);
                setTheme(theme);
                showActiveTheme(theme);
            });
        });
    });
})();