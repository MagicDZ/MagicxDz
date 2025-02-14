const teams = [
    "أولمبي متليلي الشعانبة",
    "وفاق واد سلي",
    "أولمبي أرزيو",
    "إتحاد غرداية",
    "أولاد المدية",
    "سيدي الشحمي",
    "نادي بن عكنون",
    "أولمبيك مغنية",
    "مولودية سيق",
    "طليعة باب الواد",
    "مولودية الجزائر",
    "الجزائر الوسطى",
    "وداد أولمبي رويبة"
];

let standings = [];

// Initialize standings with default data
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

    // Load saved data from localStorage if available
    const savedData = localStorage.getItem('handballStandings');
    if (savedData) {
        standings = JSON.parse(savedData);
    }

    updateTable();
}

// Update the table with current standings
function updateTable() {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = '';

    // Sort teams by points and goal difference
    standings.sort((a, b) => {
        const pointsA = (a.won * 2) + a.drawn;
        const pointsB = (b.won * 2) + b.drawn;
        if (pointsB !== pointsA) return pointsB - pointsA;
        return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
    });

    standings.forEach((team, index) => {
        const row = document.createElement('tr');
        const points = (team.won * 2) + team.drawn;
        const goalDiff = team.goalsFor - team.goalsAgainst;

        // Apply rank-specific classes
        if (index === 0) {
            row.classList.add('rank-1'); // Rank 1: Golden
        } else if (team.name === "أولمبي متليلي الشعانبة") {
            row.classList.add('rank-blue'); // Specific team: Blue
        } else if (index >= standings.length - 3) {
            row.classList.add('rank-red'); // Last 3 ranks: Red
        }

        // Create table row content
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="team-cell">
                <div class="team-logo" onclick="uploadLogo(${team.id})">
                    ${team.logo ? `<img src="${team.logo}" alt="${team.name}">` : '<i class="fas fa-shield-alt"></i>'}
                </div>
                ${team.name}
            </td>
            <td class="played"><input type="number" class="editable" value="${team.played}" onchange="updateStats(${team.id}, 'played', this.value)"></td>
            <td class="won"><input type="number" class="editable" value="${team.won}" onchange="updateStats(${team.id}, 'won', this.value)"></td>
            <td class="drawn"><input type="number" class="editable" value="${team.drawn}" onchange="updateStats(${team.id}, 'drawn', this.value)"></td>
            <td class="lost"><input type="number" class="editable" value="${team.lost}" onchange="updateStats(${team.id}, 'lost', this.value)"></td>
            <td class="goalsFor"><input type="number" class="editable" value="${team.goalsFor}" onchange="updateStats(${team.id}, 'goalsFor', this.value)"></td>
            <td class="goalsAgainst"><input type="number" class="editable" value="${team.goalsAgainst}" onchange="updateStats(${team.id}, 'goalsAgainst', this.value)"></td>
            <td class="goalDiff">${goalDiff}</td>
            <td class="points">${points}</td>
        `;
        tbody.appendChild(row);
    });
}

// Update team stats when input values change
function updateStats(id, field, value) {
    const team = standings.find(t => t.id === id);
    if (team) {
        team[field] = parseInt(value) || 0;
        updateTable();
    }
}

// Upload team logo
function uploadLogo(id) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const team = standings.find(t => t.id === id);
                if (team) {
                    team.logo = event.target.result;
                    updateTable();
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('handballStandings', JSON.stringify(standings));
    alert('تم حفظ البيانات بنجاح');
}

// Reset table to default values
function resetTable() {
    if (confirm('هل أنت متأكد من إعادة تعيين الجدول؟')) {
        localStorage.removeItem('handballStandings');
        initializeStandings();
    }
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Handle background image upload for header
document.querySelector('.header').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.querySelector('.header').style.backgroundImage = `url(${event.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Handle background image upload for app
document.getElementById('bg-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.body.style.backgroundImage = `url(${event.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

// Initialize the table on page load
initializeStandings();
