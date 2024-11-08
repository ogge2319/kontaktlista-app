document.addEventListener("DOMContentLoaded", () => {
    const skapaKontaktBtn = document.getElementById("skapaKontakt");
    const kontaktLista = document.querySelector(".kontakt-lista");
    const raderaListaBtn = document.getElementById("raderaLista");

    // Funktion för att skapa en ny kontakt
    skapaKontaktBtn.addEventListener("click", () => {
        const förnamn = document.getElementById("förnamn").value;
        const efternamn = document.getElementById("efternamn").value;
        const telefon = document.getElementById("telefon").value;
        const email = document.getElementById("email").value;

        // Kontrollera att alla fält är ifyllda innan kontakten skapas
        if (valideraKontakt(förnamn, efternamn, telefon, email)) {
            rensaFelMeddelande();

            const kontaktItem = skapaKontaktItem(förnamn, efternamn, telefon, email);
            kontaktLista.appendChild(kontaktItem);

            document.getElementById("förnamn").value = "";
            document.getElementById("efternamn").value = "";
            document.getElementById("telefon").value = "";
            document.getElementById("email").value = "";
        } else {
            visaFelMeddelande("Fyll i alla fält för att skapa en kontakt.");
        }
    });


    raderaListaBtn.addEventListener("click", () => {
        kontaktLista.innerHTML = "";
    });
});

// Skapa kontakt-element
function skapaKontaktItem(förnamn, efternamn, telefon, email) {
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

    setupContactActions(kontaktItem);
    return kontaktItem;
}


function valideraKontakt(förnamn, efternamn, telefon, email) {
    return förnamn.trim() !== "" && efternamn.trim() !== "" && telefon.trim() !== "" && email.trim() !== "";
}

function visaFelMeddelande(meddelande) {
    const felMeddelande = document.getElementById("felMeddelande");
    felMeddelande.textContent = meddelande;
}


function rensaFelMeddelande() {
    const felMeddelande = document.getElementById("felMeddelande");
    felMeddelande.textContent = "";
}


function raderaKontakt(kontaktItem) {
    kontaktItem.remove();
}

// Funktion för att ändra kontaktuppgifter
function ändraKontakt(kontaktItem) {
    const ändraBtn = kontaktItem.querySelector(".ändra-kontakt");
    const fält = kontaktItem.querySelectorAll("input");

    const isEditing = ändraBtn.textContent === "Spara";

    if (isEditing) {

        let allFieldsFilled = true;
        let validEmail = true;

        fält.forEach(input => {
            if (input.value.trim() === "") {
                allFieldsFilled = false;
            }

            if (input.classList.contains("kontakt-mail")) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                if (!emailPattern.test(input.value)) {
                    validEmail = false;
                }
            }
        });

        //Valedering för fält och email
        if (allFieldsFilled && validEmail) {

            fält.forEach(input => input.disabled = true);
            ändraBtn.textContent = "Ändra";
            rensaFelMeddelande();
        } else {
            if (!allFieldsFilled) visaFelMeddelande("Inget fält får vara tomt vid sparning.");
            if (!validEmail) visaFelMeddelande("Ange en giltig e-postadress.");
        }
    } else {

        fält.forEach(input => input.disabled = false);
        ändraBtn.textContent = "Spara";
    }
}

function setupContactActions(kontaktItem) {
    const ändraBtn = kontaktItem.querySelector(".ändra-kontakt");
    const raderaBtn = kontaktItem.querySelector(".radera-kontakt");

    ändraBtn.addEventListener("click", () => ändraKontakt(kontaktItem));
    raderaBtn.addEventListener("click", () => raderaKontakt(kontaktItem));
}
