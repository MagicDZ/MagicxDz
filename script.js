document.addEventListener("DOMContentLoaded", () => {
    const teams = [
        { name: "أولمبي متليلي الشعانبة", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 0 },
        { name: "وفاق واد سلي", played: 8, won: 8, lost: 0, draw: 0, for: 0, against: 0, points: 16, prevRank: 1 },
        { name: "أولمبي أرزيو", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 2 },
        { name: "إتحاد غرداية", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 3 },
        { name: "أولاد المدية", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 4 },
        { name: "سيدي الشحمي", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 5 },
        { name: "نادي بن عكنون", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 6 },
        { name: "أولمبيك مغنية", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 7 },
        { name: "مولودية سيق", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 8 },
        { name: "طليعة باب الواد", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 9 },
        { name: "مولودية الجزائر", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 10 },
        { name: "الجزائر الوسطى", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 11 },
        { name: "وداد أولمبي رويبة", played: 0, won: 0, lost: 0, draw: 0, for: 0, against: 0, points: 0, prevRank: 12 }
    ];

    function getRankIndicator(currentRank, prevRank) {
        if (prevRank === 0) return '<span class="rank-indicator rank-same"></span>';
        if (currentRank < prevRank) return '<span class="rank-indicator rank-up"></span>';
        if (currentRank > prevRank) return '<span class="rank-indicator rank-down"></span>';
        return '<span class="rank-indicator rank-same"></span>';
    }

    function renderTable() {
        const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";

        // Store current ranks before sorting
        teams.forEach((team, index) => {
            team.prevRank = team.currentRank || index;
        });

        teams.sort((a, b) => b.points - a.points);

        // Update current ranks
        teams.forEach((team, index) => {
            team.currentRank = index;
        });

        teams.forEach((team, index) => {
            const row = document.createElement("tr");
            
            if (index === 0) {
                row.className = 'rank-1';
            } else if (team.name === "أولمبي متليلي الشعانبة") {
                row.className = 'special-team';
            } else if (index >= teams.length - 3) {
                row.className = 'bottom-team';
            }
            
            row.innerHTML = `
                <td>${index + 1} ${getRankIndicator(index, team.prevRank)}</td>
                <td class="team-name">
                    ${team.logo ? `<img src="${team.logo}" class="team-logo" alt="${team.name}">` : ''}
                    <span>${team.name}</span>
                    <input type="file" class="logo-upload" accept="image/*" hidden>
                </td>
                <td><input type="number" value="${team.played}" class="stat-input played"></td>
                <td><input type="number" value="${team.won}" class="stat-input won"></td>
                <td><input type="number" value="${team.lost}" class="stat-input lost"></td>
                <td><input type="number" value="${team.draw}" class="stat-input draw"></td>
                <td><input type="number" value="${team.for}" class="stat-input for"></td>
                <td><input type="number" value="${team.against}" class="stat-input against"></td>
                <td>${team.for - team.against}</td>
                <td class="points-cell">${team.won * 2 + team.draw}</td>
            `;

            setupRowEventListeners(row, team);
            tbody.appendChild(row);
        });
    }

    function setupRowEventListeners(row, team) {
        row.querySelector(".team-name span").addEventListener("click", () => {
            row.querySelector(".logo-upload").click();
        });

        row.querySelector(".logo-upload").addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    team.logo = e.target.result;
                    renderTable();
                };
                reader.readAsDataURL(file);
            }
        });

        row.querySelectorAll(".stat-input").forEach(input => {
            input.addEventListener("change", () => {
                team.played = parseInt(row.querySelector(".played").value) || 0;
                team.won = parseInt(row.querySelector(".won").value) || 0;
                team.lost = parseInt(row.querySelector(".lost").value) || 0;
                team.draw = parseInt(row.querySelector(".draw").value) || 0;
                team.for = parseInt(row.querySelector(".for").value) || 0;
                team.against = parseInt(row.querySelector(".against").value) || 0;
                team.points = team.won * 2 + team.draw;
                renderTable();
            });
        });
    }

    document.getElementById("bg-upload").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    renderTable();
});
