
const SkapaKontaktBtn = document.getElementById("skapaKontakt");
const kontaktLista = document.querySelector(".kontakt-lista");

//Funktion för att skapa en ny kontakt
SkapaKontaktBtn.addEventListener("click", () => {

    const förnamn = document.getElementById("förnamn").value;
    const efternamn = document.getElementById("efternamn").value;
    const telefon = doncument.getElementById("telefon").value;
    const email = document.getElementById("email").value;

    //Kontrollerar att alla fält är ifyllda
    if (förnamn && efternamn && telefon && email) {
        
        const kontaktItem = document.createElement("li");
        kontaktItem.classList.add("kontakt-item");

        //Lägger till innehållet för en ny kontakt
        kontaktItem.innerHTML = `
            <input type="text" class="kontakt-förnamn" value="${förnamn}" disabled>
            <input type="text" class="kontakt-efternamn" value="${efternamn}" disabled>
            <input type="text" class="kontakt-telefon" value="${telefon}" disabled>
            <input type="text" class="kontakt-mail" value="${email}" disabled>
            <button class="ändra-kontakt">Ändra</button>
            <button class="radera-kontakt">Radera</button>
        `;

        kontaktLista.appendChild(kontaktItem);

        document.getElementById("förnamn").value="";
        document.getElementById("efternamn").value="";
        document.getElementById("telefon").value="";
        document.getElementById("email").value="";

    } else {

        //Felmeddelande om något fält inte är i fyllt
        alert("Fyll i alla fält för att skapa en kontakt.")
    }
});
