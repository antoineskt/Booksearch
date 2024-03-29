document.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelector("#search");
  let loader = document.querySelector("#loader");

  input.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      //affiche le loader
      loader.style.display = "block";

      document.querySelector(".sectionBook").innerHTML = "";
      const income = document.querySelector("input").value;

      if (income.length === 0) {
        alert("write something");
      } else {
        try {
          //lance la requete de recherche par rapport au nom entrée par l'utilisateur
          const response = await fetch(
            "https://openlibrary.org/search.json?title=" +
              income +
              "&limit=10" +
              "&offset=0",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              cache: "default",
            },
          );

          const books = await response.json();
          console.log("CHARGE");
          console.log(books);
          loader.style.display = "none";

          for (let i = 0; i < 5; i++) {
            const book = books.docs[i];

            //selection des livres avec couverture
            if (book.cover_i === undefined) {
              console.log("pas de couverture");
            } else {
              const imgLivre = document.createElement("img");
              imgLivre.src =
                `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` ??
                "no coverage";

              //récupération de l'élement dom qui accueillera les articles
              const sectionBook = document.querySelector(".sectionBook");

              //creation d'une balise/d'un article pour chaque éléments
              const article = document.createElement("article");

              //const titreLivre = document.createElement("h2");
              //titreLivre.innerText = book.title;

              const authorLivre = document.createElement("p");
              authorLivre.innerText =
                `Author : ${book.author_name[0]}` ?? "No known author";

              const publishDate = document.createElement("p");
              publishDate.innerText = `Publish date : ${book.publish_date[0]}`;

              const genreLivre = document.createElement("p");
              genreLivre.innerText =
                `Genre : ${book.subject[0]}` || "Unknown Genre";

              const buttonReadList = document.createElement("button");
              buttonReadList.innerText = "Add to my ReadList";
              buttonReadList.classList.add("buttonReadList");

              //ajout du livre en mémoire
              buttonReadList.addEventListener("click", function () {
                const books = {
                  id: parseInt(book.cover_i),
                  //title: book.title,
                  author_name: book.author_name[0],
                  publish_date: book.publish_date[0],
                  cover_i: parseInt(book.cover_i),
                };

                // Changez le texte du bouton et ajoutez la classe "checkmark" au clic
                buttonReadList.innerText = "✔️";
                buttonReadList.classList.add("checkmark");
                buttonReadList.disabled = true; // Désactivez le bouton après le clic

                // Récupérer les données existantes du localStorage
                const existingData = localStorage.getItem("readList");

                // Si des données existent déjà, les parser depuis JSON
                const existingBooks = existingData
                  ? JSON.parse(existingData)
                  : [];

                // Ajouter de nouvelles données (books) aux données existantes
                existingBooks.push(...[books]);

                // Convertir le tout en JSON
                const updatedData = JSON.stringify(existingBooks);

                // Stocker les données mises à jour dans le localStorage
                localStorage.setItem("readList", updatedData);

                //appel de la fonction fetch SI UTILISATION D UN SERVEUR NODE JS
                // fetch("http://localhost:8081/books", {
                //   method: "POST",
                //   headers: { "Content-Type": "application/json" },
                //   body: chargeUtile,
                // });
              });

              sectionBook.appendChild(article);
              //article.appendChild(titreLivre);
              article.appendChild(imgLivre);
              article.appendChild(authorLivre);
              article.appendChild(publishDate);
              article.appendChild(genreLivre);
              article.appendChild(buttonReadList);
            }
          }
        } catch (error) {
          console.error(
            "Une erreur s'est produite lors de la requête fetch : ",
            error,
          );
        }
        // addToReadList();
      }
    }
  });
});
