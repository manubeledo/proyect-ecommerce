document.getElementById('main-li').addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "A") {
        let elements = document.getElementById('main-li').children;
        for (let i = 0; i < elements.length; ++i) {
            elements[i].classList.remove("active");
        }
        e.target.classList.add("active");
     }
}, true);

//true value: this is the use capture and is used to suggest that UL event must be captured by LI childrens. In this case A childrens