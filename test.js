document.addEventListener('DOMContentLoaded', function() {


  let income = document.querySelector("#search");


  income.addEventListener("keydown", async function(event) {
      if (event.key === "Enter") {
        document.querySelector(".sectionBook").innerHTML = "";
        const income = document.querySelector("input").value;
      
        const response = await fetch("http://openlibrary.org/search.json?title=" + income);
        
        const books = await response.json();
        console.log("CHARGE");
        console.log(books);
        
        for (let i = 0; i < 5 ; i++) {

          const book = books.docs[i];
          console.log(book)

          //récupération de l'élement dom qui accueillera les articles
          const sectionBook = document.querySelector(".sectionBook");

          //creation d'une balise/d'un article pour chaque éléments
          const article = document.createElement("article");

          const titreLivre = document.createElement("h2");
          titreLivre.innerText = book.title;
          
          const imgLivre = document.createElement("img");
          imgLivre.src = (`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`)
          
          const authorLivre = document.createElement("p");
          authorLivre.innerText = (`Author : ${book.author_name[0]}`); 

          const publishDate = document.createElement("p");
          publishDate.innerText = (`Publish date : ${book.publish_date[0]}`);
      
          sectionBook.appendChild(article);
          article.appendChild(titreLivre);
          article.appendChild(imgLivre);
          article.appendChild(authorLivre);
          article.appendChild(publishDate);
        }
      };
  });

});

