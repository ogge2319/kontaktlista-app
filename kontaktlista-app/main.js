// Hämta knapp och lista
document.addEventListener("DOMContentLoaded", () => {
    const skapaKontaktBtn = document.getElementById("skapaKontakt");
    const kontaktLista = document.querySelector(".kontakt-lista");


    // Funktion för att skapa en ny kontakt 
    skapaKontaktBtn.addEventListener("click", () => {


        const förnamn = document.getElementById("förnamn").value;
        const efternamn = document.getElementById("efternamn").value;
        const telefon = document.getElementById("telefon").value;
        const email = document.getElementById("email").value;

        // Kontrollera att alla fält är ifyllda innan kontakten skapas
        if (förnamn && efternamn && telefon && email) {

            // Skapa ett nytt <li>-element för kontakten
            const kontaktItem = document.createElement("li");
            kontaktItem.classList.add("kontakt-item");

            // Lägg till HTML-innehåll för den nya kontakten med inmatade uppgifter
            kontaktItem.innerHTML = `
            <input type="text" class="kontakt-förnamn" value="${förnamn}" disabled>
            <input type="text" class="kontakt-efternamn" value="${efternamn}" disabled>
            <input type="text" class="kontakt-telefon" value="${telefon}" disabled>
            <input type="text" class="kontakt-mail" value="${email}" disabled>
            <button class="ändra-kontakt">Ändra</button>
            <button class="radera-kontakt">Radera</button>
        `;

            kontaktLista.appendChild(kontaktItem);

            setupContactActions(kontaktItem);

            // Rensa alla inmatningsfält efter att kontakten har skapats
            document.getElementById("förnamn").value = "";
            document.getElementById("efternamn").value = "";
            document.getElementById("telefon").value = "";
            document.getElementById("email").value = "";

        } else {

            alert("Fyll i alla fält för att skapa en kontakt.");
        }
    });
    //funktion för ändra och radera funktionerna 
    function setupContactActions(kontaktItem) {

        const ändraBtn = kontaktItem.querySelector(".ändra-kontakt");
        const fält = kontaktItem.querySelectorAll("input");

        ändraBtn.addEventListener("click", () => {

            const isEditing = ändraBtn.textContent === "Spara";

            if (isEditing) {
                // Validera att inga fält är tomma innan sparning
                let allFieldsFilled = true;
    
                fält.forEach(input => {
                    if (input.value.trim() === "") {
                        allFieldsFilled = false;
                    }
                });
    
                if (allFieldsFilled) {
                    // Om alla fält är ifyllda, lås dem och ändra knapptexten
                    fält.forEach(input => input.disabled = true);
                    ändraBtn.textContent = "Ändra";
                } else {
                    // Visa varning om något fält är tomt
                    alert("Inget fält får vara tomt vid sparning.");
                }
            } else {
                // Om användaren klickar för att ändra, lås upp alla fält och ändra knapptexten
                fält.forEach(input => input.disabled = false);
                ändraBtn.textContent = "Spara";
            }
        });
    
        //hantera radering av kontakt
        const raderaBtn = kontaktItem.querySelector(".radera-kontakt");
    raderaBtn.addEventListener("click", () => {
        kontaktItem.remove();
        });
    }
});
