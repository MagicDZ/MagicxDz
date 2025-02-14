@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');

:root {
    --primary-color: #1a237e;
    --secondary-color: #0288d1;
    --accent-color: #00bcd4;
    --background-dark: #0a1929;
    --text-light: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --gold-color: #ffd700;
    --blue-color: #1e90ff;
    --red-color: #ff4444;
    --green-color: #32cd32;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif;
}

body {
    min-height: 100vh;
    background: var(--background-dark);
    background-size: cover;
    background-position: center;
    color: var(--text-light);
    transition: all 0.3s ease;
}

.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.header {
    text-align: center;
    margin-bottom: 1rem;
    background: rgba(26, 35, 126, 0.8);
    padding: 1rem;
    border-radius: 10px;
}

.header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--gold-color);
}

.standings-table {
    background: var(--glass-bg);
    border-radius: 20px;
    border: 1px solid var(--glass-border);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid var(--glass-border);
}

th {
    background: rgba(26, 35, 126, 0.9);
    font-weight: 600;
}

.controls {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    background: var(--secondary-color);
    color: var(--text-light);
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background: var(--accent-color);
}

.background-upload {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--primary-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

tr.rank-1 td:first-child {
    color: var(--gold-color);
}

tr.rank-blue td:first-child {
    color: var(--blue-color);
}

tr.rank-red td:first-child {
    color: var(--red-color);
}
