const teams = [
    "أولمبي متليلي الشعانبة", "وفاق واد سلي", "أولمبي أرزيو", "إتحاد غرداية", "أولاد المدية",
    "سيدي الشحمي", "نادي بن عكنون", "أولمبيك مغنية", "مولودية سيق", "طليعة باب الواد",
    "مولودية الجزائر", "الجزائر الوسطى", "وداد أولمبي رويبة"
];

let standings = [];

function initializeStandings() {
    standings = teams.map((team, index) => ({
        id: index + 1,
        name: team,
        logo: null,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0
    }));

    try {
        const savedData = localStorage.getItem('handballStandings');
        if (savedData) {
            standings = JSON.parse(savedData);
        }
    } catch (error) {
        console.error("LocalStorage Error:", error);
    }

    updateTable();
}

function updateTable() {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = '';

    standings.sort((a, b) => {
        const pointsA = (a.won * 2) + a.drawn;
        const pointsB = (b.won * 2) + b.drawn;
        return pointsB - pointsA || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
    });

    standings.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.goalsFor - team.goalsAgainst}</td>
            <td>${(team.won * 2) + team.drawn}</td>
        `;
        tbody.appendChild(row);
    });
}

function saveData() {
    try {
        localStorage.setItem('handballStandings', JSON.stringify(standings));
        alert('تم حفظ البيانات بنجاح');
    } catch (error) {
        console.error("LocalStorage Error:", error);
    }
}

initializeStandings();
