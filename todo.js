document.addEventListener("DOMContentLoaded", function () {



    btn = document.querySelector("button");

    btn.addEventListener("click", function(){

        //selection de la valeur de l'income
        const income = document.querySelector("input").value;

        if (income.length === 0) {

            alert("Please enter a movie")

        } else {

            //selection de la liste où vont aller mes éléments
            document.querySelector("#tasks").innerHTML += 
            `
            <div class="task">
            <span id="taskname">
                ${income}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
            
            `;

            var current_tasks = document.querySelectorAll(".delete");
            for(var i=0; i<current_tasks.length; i++){
                current_tasks[i].onclick = function(){
                    this.parentNode.remove();
                }
            }

            //const movie = document.createElement("li")
            //movie.innerText = income; 

            //sectionList.appendChild(movie);
        }
     

       
    })



});