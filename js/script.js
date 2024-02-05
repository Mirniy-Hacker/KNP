// p - player, comp - PC
let pScore = 0;
let compScore = 0;
let рistory = [];
let choiceCounter = { K: 0, P: 0, N: 0 };

document.getElementById("startGame").onclick = () => {
    alert("Hra zacina! Zadaj 'K' pre kamen, 'P' pre papier alebo 'N' pre noznice.");
    const compChoice = getCompChoice();
    const pChoice = prompt("Zadaj K, P, alebo N").toUpperCase();

    if (!["K", "P", "N"].includes(pChoice)) {
        alert("Napis K, P alebo N. Skús znova.");
        return;
    }

    choiceCounter[pChoice]++;
    console.log(`Player zvolil: ${pChoice}, PC zvolil: ${compChoice}`);
    const result = determineWinner(pChoice, compChoice);
    alert(result.message);
    updateScore(result.winner);
    updateHistory(pChoice, compChoice, result.message);
    console.log(`Aktualne skore - Player: ${pScore}, PC: ${compScore}`);
    console.log(`Pouzitie - Kamen: ${choiceCounter.K}, Papier: ${choiceCounter.P}, Noznice: ${choiceCounter.N}`);
};

function getCompChoice() {
    const choices = ["K", "P", "N"];
    const index = Math.floor(Math.random() * 3);
    return choices[index];
}

function determineWinner(p, comp) {
    if (p === comp) return { winner: "none", message: "Remiza!" };
    if ((p === "K" && comp === "N") ||
        (p === "P" && comp === "K") ||
        (p === "N" && comp === "P")) {
        return { winner: "p", message: "Vyhravas!" };
    }
    return { winner: "comp", message: "Pocitac vyhrava!" };
}

function updateScore(winner) {
    if (winner === "p") {
        pScore++;
    } else if (winner === "comp") {
        compScore++;
    }
    document.getElementById("score").innerText = `Skore: Player: ${pScore}, PC: ${compScore}`;
}

function updateHistory(pChoice, compChoice, result) {
    const historyElement = document.getElementById("history");
    рistory.push(`Player: ${pChoice}, PC: ${compChoice}, Vysledok: ${result}`);
    historyElement.innerHTML = `<h3>Historia hier:</h3><ul>${рistory.map(item => `<li>${item}</li>`).join("")}</ul>`;
}