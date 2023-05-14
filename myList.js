document.addEventListener("DOMContentLoaded", async function() {

    const response = await fetch("http://localhost:8081/books");
    const books = await response.json();
    console.log("ok")
    console.log(books);
    function genererListBook (books) {

        for (let i = 0; i < books.length ; i++ ) {
            const book = books[i]

            //récupération de l'élement dom qui accueillera les articles
            const sectionBook = document.querySelector(".sectionBook");

            //creation d'une balise/d'un article pour chaque éléments
            const article = document.createElement("article");

            const titreLivre = document.createElement("h2");
            titreLivre.innerText = book.title;
            
            const imgLivre = document.createElement("img");
            imgLivre.src = (`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`) ?? "no coverage";
            
            const authorLivre = document.createElement("p");
            authorLivre.innerText = (`Author : ${book.author_name}`) ?? "No known author";

            const publishDate = document.createElement("p");
            publishDate.innerText = (`Publish date : ${book.publish_date}`);

            const deleteButton = document.createElement("button")
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = `
            
                <i class="far fa-trash-alt"></i>
            
            `;
            deleteButton.onclick = function () {
                console.log("suppression du livre :" + book.title);
                

                fetch("http://localhost:8081/books/" + book.cover_i, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
                
              })
            };

           
            

            sectionBook.appendChild(article);
            article.appendChild(titreLivre);
            article.appendChild(imgLivre);
            article.appendChild(authorLivre);
            article.appendChild(publishDate);
            article.appendChild(deleteButton);
            

        }

    }
    genererListBook(books);


});