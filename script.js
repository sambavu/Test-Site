// Données des matchs de la Ligue des Champions
const matches = [
    {
        id: 1,
        homeTeam: '🔴 Manchester City',
        awayTeam: '⚪ Real Madrid',
        homeCountry: 'Angleterre',
        awayCountry: 'Espagne',
        homeScore: 0,
        awayScore: 0,
        time: '0\'',
        status: 'EN DIRECT',
        possession: { home: 55, away: 45 },
        shots: { home: 0, away: 0 },
        stadium: 'Etihad Stadium - Manchester'
    },
    {
        id: 2,
        homeTeam: '🔵 Bayern Munich',
        awayTeam: '🔴 Liverpool',
        homeCountry: 'Allemagne',
        awayCountry: 'Angleterre',
        homeScore: 0,
        awayScore: 0,
        time: '0\'',
        status: 'EN DIRECT',
        possession: { home: 50, away: 50 },
        shots: { home: 0, away: 0 },
        stadium: 'Allianz Arena - Munich'
    },
    {
        id: 3,
        homeTeam: '🟡 Paris Saint-Germain',
        awayTeam: '🔵 Inter Milan',
        homeCountry: 'France',
        awayCountry: 'Italie',
        homeScore: 0,
        awayScore: 0,
        time: '0\'',
        status: 'EN DIRECT',
        possession: { home: 60, away: 40 },
        shots: { home: 0, away: 0 },
        stadium: 'Parc des Princes - Paris'
    },
    {
        id: 4,
        homeTeam: '🔵 Barcelona',
        awayTeam: '⚫ AC Milan',
        homeCountry: 'Espagne',
        awayCountry: 'Italie',
        homeScore: 0,
        awayScore: 0,
        time: '0\'',
        status: 'EN DIRECT',
        possession: { home: 65, away: 35 },
        shots: { home: 0, away: 0 },
        stadium: 'Camp Nou - Barcelone'
    }
];

// Événements de match simulés
const matchEvents = {
    1: [
        { time: 8, type: 'shot', team: 'home', text: 'Tir de Manchester City' },
        { time: 12, type: 'goal', team: 'home', text: 'GOAAAAAL! Manchester City marque!' },
        { time: 24, type: 'yellow', team: 'away', text: 'Carton jaune pour Real Madrid' },
        { time: 35, type: 'goal', team: 'away', text: 'GOAAAAAL! Real Madrid égalise!' },
        { time: 45, type: 'halftime', team: 'none', text: 'Mi-temps' }
    ],
    2: [
        { time: 5, type: 'shot', team: 'away', text: 'Tir de Liverpool' },
        { time: 18, type: 'goal', team: 'away', text: 'GOAAAAAL! Liverpool marque!' },
        { time: 28, type: 'shot', team: 'home', text: 'Tir de Bayern Munich' },
        { time: 40, type: 'goal', team: 'home', text: 'GOAAAAAL! Bayern Munich marque!' },
        { time: 45, type: 'halftime', team: 'none', text: 'Mi-temps' }
    ],
    3: [
        { time: 10, type: 'goal', team: 'home', text: 'GOAAAAAL! PSG marque!' },
        { time: 22, type: 'shot', team: 'away', text: 'Tir de Inter Milan' },
        { time: 33, type: 'goal', team: 'home', text: 'GOAAAAAL! PSG marque à nouveau!' },
        { time: 44, type: 'yellow', team: 'home', text: 'Carton jaune pour PSG' },
        { time: 45, type: 'halftime', team: 'none', text: 'Mi-temps' }
    ],
    4: [
        { time: 15, type: 'shot', team: 'home', text: 'Tir de Barcelone' },
        { time: 26, type: 'goal', team: 'home', text: 'GOAAAAAL! Barcelone marque!' },
        { time: 38, type: 'shot', team: 'away', text: 'Tir de AC Milan' },
        { time: 42, type: 'goal', team: 'away', text: 'GOAAAAAL! AC Milan marque!' },
        { time: 45, type: 'halftime', team: 'none', text: 'Mi-temps' }
    ]
};

// Initialiser les matchs
function initializeMatches() {
    const container = document.getElementById('matchesContainer');
    container.innerHTML = '';

    matches.forEach((match, index) => {
        const matchHTML = `
            <div class="match-card" data-match-id="${match.id}" onclick="goToMatchDetail(${match.id})">
                <div class="match-status">
                    <span class="status-live">● ${match.status}</span>
                    <span style="margin-left: 10px; font-size: 1.1rem; font-weight: bold;">${match.time}</span>
                </div>

                <div class="teams-container">
                    <div class="team">
                        <div class="team-logo">${match.homeTeam.substring(0, 1)}</div>
                        <div class="team-name">${match.homeTeam}</div>
                        <div class="team-country">${match.homeCountry}</div>
                    </div>

                    <div class="score-container">
                        <div class="score" data-team="home">${match.homeScore}</div>
                        <div class="separator">-</div>
                        <div class="score" data-team="away">${match.awayScore}</div>
                    </div>

                    <div class="team">
                        <div class="team-logo">${match.awayTeam.substring(0, 1)}</div>
                        <div class="team-name">${match.awayTeam}</div>
                        <div class="team-country">${match.awayCountry}</div>
                    </div>
                </div>

                <div class="match-info">
                    <div class="info-item">
                        <div class="info-label">Possession</div>
                        <div class="info-value">${match.possession.home}% - ${match.possession.away}%</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Tirs</div>
                        <div class="info-value">${match.shots.home} - ${match.shots.away}</div>
                    </div>
                </div>

                <div class="stadium-info">
                    <strong>🏟️ ${match.stadium}</strong>
                </div>
                
                <div style="text-align: center; margin-top: 15px; color: #667eea; font-weight: 600; font-size: 0.9rem;">
                    Cliquez pour voir les détails →
                </div>
            </div>
        `;

        container.innerHTML += matchHTML;
    });
}

// Naviguer vers le détail du match
function goToMatchDetail(matchId) {
    window.location.href = `match-detail.html?matchId=${matchId}`;
}

// Simuler les événements des matchs
function simulateMatches() {
    matches.forEach(match => {
        const events = matchEvents[match.id] || [];
        let eventIndex = 0;

        const simulate = () => {
            if (eventIndex >= events.length) {
                // Match terminé
                const card = document.querySelector(`[data-match-id="${match.id}"]`);
                if (card) {
                    const statusElement = card.querySelector('.status-live');
                    statusElement.textContent = '✓ TERMINÉ';
                    statusElement.style.background = '#2ed573';
                }
                return;
            }

            const event = events[eventIndex];
            const card = document.querySelector(`[data-match-id="${match.id}"]`);

            if (card) {
                // Mettre à jour le temps
                const timeDisplay = card.querySelector('.match-status span:last-child');
                match.time = event.time + "'";
                timeDisplay.textContent = match.time;

                // Traiter l'événement
                if (event.type === 'goal') {
                    if (event.team === 'home') {
                        match.homeScore++;
                        match.shots.home++;
                    } else {
                        match.awayScore++;
                        match.shots.away++;
                    }

                    // Animer le score
                    updateScore(card, event.team);

                    // Animation de but
                    showGoalAnimation(card, event.team);
                } else if (event.type === 'shot') {
                    if (event.team === 'home') {
                        match.shots.home++;
                    } else {
                        match.shots.away++;
                    }
                } else if (event.type === 'yellow' || event.type === 'red') {
                    // Pas de mise à jour majeure pour les cartons
                }

                // Mettre à jour l'affichage des tirs
                updateMatchInfo(card, match);
            }

            eventIndex++;
            setTimeout(simulate, Math.random() * 3000 + 2000); // Délai aléatoire entre 2-5s
        };

        setTimeout(simulate, 500);
    });
}

// Mettre à jour l'affichage du score
function updateScore(card, team) {
    const scoreElement = card.querySelector(`.score[data-team="${team}"]`);
    if (scoreElement) {
        // Animation de mise à jour
        scoreElement.style.animation = 'none';
        setTimeout(() => {
            scoreElement.style.animation = 'scoreUpdate 0.5s ease-out';
        }, 10);
    }
}

// Afficher l'animation de but
function showGoalAnimation(card, team) {
    const animation = document.createElement('div');
    animation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: #ff4757;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: popUp 1s ease-out forwards;
    `;
    animation.textContent = '⚽ GOAAAAAL!';

    document.body.appendChild(animation);

    setTimeout(() => animation.remove(), 1000);
}

// Mettre à jour les informations du match
function updateMatchInfo(card, match) {
    const infoItems = card.querySelectorAll('.info-item');
    infoItems[1].querySelector('.info-value').textContent = `${match.shots.home} - ${match.shots.away}`;
}

// Animation pop-up pour les buts
const style = document.createElement('style');
style.textContent = `
    @keyframes popUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -200%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    initializeMatches();
    simulateMatches();
});
