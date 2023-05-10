document.addEventListener("DOMContentLoaded", function () {



    btn = document.querySelector("button");

    btn.addEventListener("click", function(){

        const income = document.querySelector("input").value;

        const sectionList = document.querySelector(".myList");

        const movie = document.createElement("li")
        movie.innerText = income; 

        sectionList.appendChild(movie);

     

       
    })



});