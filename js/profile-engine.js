let profile = {
    time: 0,
    clicks: 0,
    scroll: 0,
    type: "frio"
};

export function updateProfile() {
    setInterval(() => {
        profile.time++;

        if (profile.clicks > 4 && profile.time < 40) {
            profile.type = "decisor";
        } else if (profile.time > 45 && profile.scroll > 1200) {
            profile.type = "analitico";
        } else if (profile.time > 25 && profile.scroll > 600) {
            profile.type = "morno";
        } else {
            profile.type = "frio";
        }
    }, 1000);

    document.addEventListener("click", () => profile.clicks++);
    window.addEventListener("scroll", () => {
        profile.scroll = window.scrollY;
    });
}

export function getUserType() {
    return profile.type;
}