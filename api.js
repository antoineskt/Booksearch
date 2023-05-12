

document.addEventListener('DOMContentLoaded', function() {


  let input = document.querySelector("#search");


  input.addEventListener("keydown", async function(event) {
      if (event.key === "Enter") {
        document.querySelector(".sectionBook").innerHTML = "";
        const income = document.querySelector("input").value;

        if (income.length === 0) {
          alert("write something")
        } else {
      
          const response = await fetch("http://openlibrary.org/search.json?title=" + income);
          
          const books = await response.json();
          console.log("CHARGE");
          console.log(books);
          
          



          for (let i = 0; i < 5 ; i++) {

            const book = books.docs[i];
            console.log("je log chaque livre(i) : " + book);

            //récupération de l'élement dom qui accueillera les articles
            const sectionBook = document.querySelector(".sectionBook");

            //creation d'une balise/d'un article pour chaque éléments
            const article = document.createElement("article");

            const titreLivre = document.createElement("h2");
            titreLivre.innerText = book.title;
            
            const imgLivre = document.createElement("img");
            imgLivre.src = (`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`) ?? "no coverage";
            
            const authorLivre = document.createElement("p");
            authorLivre.innerText = (`Author : ${book.author_name[0]}`) ?? "No known author";

            const publishDate = document.createElement("p");
            publishDate.innerText = (`Publish date : ${book.publish_date[0]}`);

            const buttonReadList = document.createElement("button");
            buttonReadList.innerText = "Add to my ReadList";
            buttonReadList.classList.add("buttonReadList");
            buttonReadList.addEventListener("click", function(){
              console.log("ajout du livre numéro : " + [i]);

              const books = {
                id: book.key,
                title: book.title, 
                author_name: book.author_name[0],
                publish_date: book.publish_date[0],
                cover_i: parseInt(book.cover_i)
              };

              // Création de la charge utile au format JSON
              const chargeUtile = JSON.stringify(books);
              console.log(chargeUtile);
              //appel de la fonction fetch
              fetch("http://localhost:8081/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
              })
            });
        
            sectionBook.appendChild(article);
            article.appendChild(titreLivre);
            article.appendChild(imgLivre);
            article.appendChild(authorLivre);
            article.appendChild(publishDate);
            article.appendChild(buttonReadList);

            
          };
          // addToReadList();
        }
      };
  });

});

