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
const captureBtn = document.getElementById('capturer-btn');
const sauvegarderBtn = document.getElementById('sauvegarder-btn');
const resetBtn = document.getElementById('reset-btn');

// Variables globales
let compteur = 0;

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
    sauvegarderEl.textContent += compteurStr;
    localStorage.setItem('compteur', sauvegarderEl.textContent)
    compteur = 0;
    compteurEl.textContent = compteur;
    compteurEl.style.color = 'black';
}
// Fonction pour reset le compteur + sauvegarde
function reset() {
    compteur = 0;
    compteurEl.textContent = compteur;
    compteurEl.style.color = 'black';
    sauvegarderEl.textContent = "";
    localStorage.removeItem('compteur');
}

// Initialisation au chargement
window.addEventListener('load', () => {
    sauvegarderEl.textContent = localStorage.getItem('compteur') || "";
});

// Écouteurs d'événements
captureBtn.addEventListener('click', capturer);
sauvegarderBtn.addEventListener('click', sauvegarder);
resetBtn.addEventListener('click', reset);