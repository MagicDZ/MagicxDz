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
    const savedData = localStorage.getItem('handballStandings');
    const savedBackground = localStorage.getItem('backgroundImage');
    const savedHeaderBackground = localStorage.getItem('headerBackground');
    const savedTheme = localStorage.getItem('theme');

    if (savedBackground) {
        document.body.style.backgroundImage = `url(${savedBackground})`;
    }
    
    if (savedHeaderBackground) {
        document.querySelector('.header').style.backgroundImage = `url(${savedHeaderBackground})`;
    }
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (savedData) {
        standings = JSON.parse(savedData);
    } else {
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
            row.classList.add('rank-1');
        } else if (team.name === "أولمبي متليلي الشعانبة") {
            row.classList.add('rank-blue');
        } else if (index >= standings.length - 3) {
            row.classList.add('rank-red');
        }

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
        saveData(); // Auto-save when stats are updated
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
                    saveData(); // Auto-save when logo is uploaded
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Save all data including images
function saveData() {
    try {
        localStorage.setItem('handballStandings', JSON.stringify(standings));
        
        const backgroundImage = document.body.style.backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            localStorage.setItem('backgroundImage', backgroundImage.slice(4, -1).replace(/"/g, ''));
        }
        
        const headerBackground = document.querySelector('.header').style.backgroundImage;
        if (headerBackground && headerBackground !== 'none') {
            localStorage.setItem('headerBackground', headerBackground.slice(4, -1).replace(/"/g, ''));
        }
        
        alert('تم حفظ جميع البيانات بنجاح');
    } catch (error) {
        alert('حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى');
        console.error('Save error:', error);
    }
}

// Reset table to default values
function resetTable() {
    if (confirm('هل أنت متأكد من إعادة تعيين الجدول؟ سيتم حذف جميع البيانات')) {
        try {
            localStorage.clear(); // Clear all stored data
            document.body.style.backgroundImage = '';
            document.querySelector('.header').style.backgroundImage = '';
            document.body.classList.remove('dark-mode');
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
            updateTable();
            alert('تم إعادة تعيين الجدول بنجاح');
        } catch (error) {
            alert('حدث خطأ أثناء إعادة التعيين. يرجى المحاولة مرة أخرى');
            console.error('Reset error:', error);
        }
    }
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
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
                localStorage.setItem('headerBackground', event.target.result);
                saveData(); // Auto-save when header background is changed
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
            localStorage.setItem('backgroundImage', event.target.result);
            saveData(); // Auto-save when background is changed
        };
        reader.readAsDataURL(file);
    }
});

// Initialize the table on page load
document.addEventListener('DOMContentLoaded', initializeStandings);
