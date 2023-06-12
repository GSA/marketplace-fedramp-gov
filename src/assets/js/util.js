document.addEventListener("DOMContentLoaded", function () {

    var skipButton = document.getElementById('skip-content');

    skipButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById('main-content').scrollIntoView();
    });
});

document.addEventListener("DOMContentLoaded", function () {

    var topButton = document.getElementById('topButton');

    window.onscroll = function (e) {
        if(window.pageYOffset > 300) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    }

    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

