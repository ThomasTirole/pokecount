/**
 * Fichier JavaScript pour l'application PokeCount.
 * @author Thomas Tirole <thomas.tirole@divtec.ch>
 * @version 1.0 (Version actuelle)
 * @since 2025-06-07 (Date de création / YYYY-MM-DD)
 */

"use strict";

// Sélection DOM
const compteurEl = document.getElementById('compteur-el');
const sauvegarderEl = document.getElementById('sauvegarde-el');
const listEl = document.getElementById('list-el');
const tableauEl = document.getElementById('tableau-el');
const captureBtn = document.getElementById('capturer-btn');
const sauvegarderBtn = document.getElementById('sauvegarder-btn');
const resetBtn = document.getElementById('reset-btn');


// Variables globales
let compteur = 0;
let tableauCompteur = [];

// Fonction pour capturer les pokmons
function capturer() {
    compteur++;
    compteurEl.textContent = compteur.toString();
    if (compteur < 5 ){
        compteurEl.style.color = 'green';
    } else if (compteur >= 5 && compteur <= 10) {
        compteurEl.style.color = 'yellow';
    } else {
        compteurEl.style.color = 'red';
    }
}

// Fonction pour sauvegarder le copmteur de pokemon dans la String et localStorage
function sauvegarder() {
    let compteurStr = compteur + " Pokémons - ";
    tableauCompteur.push(compteurStr);
    sauvegarderEl.textContent += compteurStr;
    // Utiliser la fonction de MaJ de la liste
    afficherListe();
    //Utiliser la fonction d'affichage du tableau
    afficherTableau();
    localStorage.setItem('compteur', sauvegarderEl.textContent)
    // Sauvegarder la liste dans le localStorage
    localStorage.setItem('listeCaptures', JSON.stringify(tableauCompteur));
    compteur = 0;
    compteurEl.textContent = compteur;
    compteurEl.style.color = 'black';
}
// Fonction pour reset le compteur + sauvegarde
function reset() {
    compteur = 0;
    compteurEl.textContent = compteur;
    tableauCompteur = [];
    listEl.innerHTML = '';
    tableauEl.innerHTML = '';
    compteurEl.style.color = 'black';
    sauvegarderEl.textContent = "";
    localStorage.removeItem('compteur');
    localStorage.removeItem('listeCaptures');
}

// Fonction pour afficher la liste des captures
function afficherListe() {
    listEl.innerHTML = "";
    tableauCompteur.forEach((capture, index) => {
        const li = document.createElement('li');
        li.textContent = capture;
        listEl.appendChild(li);
    });
}

function afficherTableau() {
    tableauEl.innerHTML = ""; // Vide l'ancien tableau
    const tableau = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Captures';
    headerRow.appendChild(headerCell);

    // Ajout d'un en-tête pour la colonne "Action"
    const actionHeader = document.createElement('th');
    actionHeader.textContent = 'Action';
    headerRow.appendChild(actionHeader);

    tableau.appendChild(headerRow);

    tableauCompteur.forEach((capture, index) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = capture;
        row.appendChild(cell);

        // Création du bouton de suppression
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'supprimer-btn';
        deleteBtn.addEventListener('click', () => {
            tableauCompteur.splice(index, 1);
            afficherTableau();
            afficherListe();
            // Mettre à jour le localStorage
            localStorage.setItem('listeCaptures', JSON.stringify(tableauCompteur));
        });
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);

        tableau.appendChild(row);
    });

    tableauEl.appendChild(tableau);
}

// Initialisation au chargement
window.addEventListener('load', () => {
    sauvegarderEl.textContent = "Mes captures : " + (localStorage.getItem('compteur') || "");
    tableauCompteur = JSON.parse(localStorage.getItem('listeCaptures')) || [];
});

// Écouteurs d'événements
captureBtn.addEventListener('click', capturer);
sauvegarderBtn.addEventListener('click', sauvegarder);
resetBtn.addEventListener('click', reset);