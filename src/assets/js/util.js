document.addEventListener("DOMContentLoaded", function () {

    var skipButton = document.getElementById('skip-content');

    skipButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.hash = 'main-content';
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


document.addEventListener("DOMContentLoaded", function () {

    if(document.getElementById("update-title")) {

        var t = document.getElementById("update-title").innerHTML;
        
        document.title = t + " | FedRAMP Marketplace";
        document.getElementById("marketplace-title").innerHTML = t;
    }
});