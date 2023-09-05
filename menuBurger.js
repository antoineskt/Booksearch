document.addEventListener("DOMContentLoaded", function () {
  const openSvg = document.querySelector(".openSvg");
  const menu = document.querySelector(".menu");
  const closeSvg = document.querySelector(".closeSvg");

  openSvg.addEventListener("click", function () {
    openSvg.style.display = "none";
    menu.classList.add("active"); /* ajoute la classe active au menu */
    closeSvg.classList.add("active");
  });

  closeSvg.addEventListener("click", function () {
    menu.classList.remove("active");
    closeSvg.classList.remove("active");
    openSvg.style.display = "block";
  });
});
