// Données des matchs
const matchesData = {
    1: {
        id: 1,
        homeTeam: '🔴 Manchester City',
        awayTeam: '⚪ Real Madrid',
        homeTeamName: 'Manchester City',
        awayTeamName: 'Real Madrid',
        stadium: 'Etihad Stadium - Manchester',
        homeScore: 2,
        awayScore: 1,
        time: '45\'',
        status: 'EN DIRECT',
        possession: { home: 55, away: 45 },
        shots: { home: 6, away: 4 },
        formation: { home: '4-3-3', away: '4-2-3-1' }
    },
    2: {
        id: 2,
        homeTeam: '🔵 Bayern Munich',
        awayTeam: '🔴 Liverpool',
        homeTeamName: 'Bayern Munich',
        awayTeamName: 'Liverpool',
        stadium: 'Allianz Arena - Munich',
        homeScore: 1,
        awayScore: 1,
        time: '62\'',
        status: 'EN DIRECT',
        possession: { home: 50, away: 50 },
        shots: { home: 5, away: 4 },
        formation: { home: '4-2-3-1', away: '4-3-3' }
    },
    3: {
        id: 3,
        homeTeam: '🟡 Paris Saint-Germain',
        awayTeam: '🔵 Inter Milan',
        homeTeamName: 'Paris Saint-Germain',
        awayTeamName: 'Inter Milan',
        stadium: 'Parc des Princes - Paris',
        homeScore: 2,
        awayScore: 0,
        time: '78\'',
        status: 'EN DIRECT',
        possession: { home: 60, away: 40 },
        shots: { home: 7, away: 3 },
        formation: { home: '3-4-3', away: '3-5-2' }
    },
    4: {
        id: 4,
        homeTeam: '🔵 Barcelona',
        awayTeam: '⚫ AC Milan',
        homeTeamName: 'Barcelona',
        awayTeamName: 'AC Milan',
        stadium: 'Camp Nou - Barcelone',
        homeScore: 1,
        awayScore: 1,
        time: '35\'',
        status: 'EN DIRECT',
        possession: { home: 65, away: 35 },
        shots: { home: 4, away: 2 },
        formation: { home: '4-3-3', away: '4-2-3-1' }
    }
};

// Récupérer l'ID du match depuis l'URL
function getMatchIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('matchId') || '1';
}

// Charger les données du match
function loadMatchData() {
    const matchId = getMatchIdFromURL();
    const match = matchesData[matchId];

    if (!match) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px;"><h2>Match non trouvé</h2><a href="index.html">Retour</a></div>';
        return;
    }

    // Mise à jour du titre et du score
    document.getElementById('homeTeamLogo').textContent = match.homeTeam.substring(0, 1);
    document.getElementById('homeTeamName').textContent = match.homeTeamName;
    document.getElementById('homeScore').textContent = match.homeScore;

    document.getElementById('awayTeamLogo').textContent = match.awayTeam.substring(0, 1);
    document.getElementById('awayTeamName').textContent = match.awayTeamName;
    document.getElementById('awayScore').textContent = match.awayScore;

    document.getElementById('matchTime').textContent = match.time;
    document.getElementById('matchStatus').textContent = match.status;
    document.getElementById('matchStadium').textContent = '🏟️ ' + match.stadium;

    // Compositions
    document.getElementById('homeTeamCompositionTitle').textContent = match.homeTeamName;
    document.getElementById('homeFormation').textContent = match.formation.home;

    document.getElementById('awayTeamCompositionTitle').textContent = match.awayTeamName;
    document.getElementById('awayFormation').textContent = match.formation.away;

    // Charger les commentaires
    loadComments();
}

// Gestion des onglets
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activer l'onglet sélectionné
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Gestion des commentaires
function initializeComments() {
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        commentForm.addEventListener('submit', addComment);
    }
}

function addComment(e) {
    e.preventDefault();

    const name = document.getElementById('commentName').value.trim();
    const text = document.getElementById('commentText').value.trim();

    if (!name || !text) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Créer un nouvel objet commentaire
    const comment = {
        name: name,
        text: text,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    // Ajouter aux commentaires locaux
    let comments = getComments();
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    // Réinitialiser le formulaire
    document.getElementById('commentForm').reset();

    // Afficher le nouveau commentaire
    displayComments();

    // Animation
    const commentsList = document.getElementById('commentsList');
    commentsList.scrollTop = 0;
}

function getComments() {
    const stored = localStorage.getItem('comments');
    return stored ? JSON.parse(stored) : [];
}

function loadComments() {
    displayComments();
}

function displayComments() {
    const commentsList = document.getElementById('commentsList');
    const comments = getComments();

    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="empty-comments">Aucun commentaire pour le moment. Soyez le premier!</div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-author">${escapeHtml(comment.name)}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-time">${comment.time}</div>
        </div>
    `).reverse().join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Animer les scores
function animateScores() {
    const scoreElements = document.querySelectorAll('.score-big');
    
    scoreElements.forEach(element => {
        const finalScore = parseInt(element.textContent);
        let currentScore = 0;
        
        const interval = setInterval(() => {
            if (currentScore < finalScore) {
                currentScore++;
                element.textContent = currentScore;
            } else {
                clearInterval(interval);
            }
        }, 100);
    });
}

// Simuler les mise à jour du match
function simulateLiveUpdates() {
    const matchId = getMatchIdFromURL();
    const match = matchesData[matchId];

    setInterval(() => {
        // Augmenter le temps
        const timeStr = document.getElementById('matchTime').textContent;
        const currentTime = parseInt(timeStr.match(/\d+/)[0]);
        const newTime = currentTime + Math.floor(Math.random() * 3) + 1;
        
        if (newTime < 95) {
            document.getElementById('matchTime').textContent = newTime + '\'';
        }

        // Mise à jour aléatoire des statistiques
        if (Math.random() < 0.3) {
            const possession = Math.floor(Math.random() * 30) + 40;
            const newPossession = possession;
            match.possession.home = newPossession;
            match.possession.away = 100 - newPossession;
        }
    }, 30000); // Mettre à jour toutes les 30 secondes
}

// Initialiser la page
document.addEventListener('DOMContentLoaded', () => {
    loadMatchData();
    initializeTabs();
    initializeComments();
    animateScores();
    simulateLiveUpdates();
});
