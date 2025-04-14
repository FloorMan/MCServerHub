const bootMessages = [
"[BOOT] Initializing system...",
"[OK] Loading modules...",
"[OK] Establishing network interface...",
"[OK] Running diagnostics...",
"[OK] Fetching IP address...",
];

const bootContainer = document.getElementById('boot-sequence');
const ipSection = document.getElementById('ip-section');

async function simulateBoot() {
for (let msg of bootMessages) {
    await typeLine(msg);
}
// Delay before showing IP section
setTimeout(() => {
    bootContainer.style.display = 'none';
    ipSection.classList.remove('hidden');
    fetchIP();
}, 200);
}

function typeLine(text) {
return new Promise(resolve => {
    let i = 0;
    const line = document.createElement('div');
    bootContainer.appendChild(line);

    const interval = setInterval(() => {
    line.textContent += text[i];
    i++;
    if (i === text.length) {
        clearInterval(interval);
        line.innerHTML += '<span class="cursor">_</span>';
        setTimeout(() => {
        line.querySelector('.cursor')?.remove();
        resolve();
        }, 300);
    }
    }, 10); // typing speed
});
}

function fetchIP() {
fetch('/api/ip')
    .then(res => res.json())
    .then(data => {
    document.getElementById('ip-box').textContent = data.ip || "Unavailable";
    })
    .catch(() => {
    document.getElementById('ip-box').textContent = "Error fetching IP";
    });
}

document.getElementById('copy-btn').addEventListener('click', () => {
const ipText = document.getElementById('ip-box').textContent;
navigator.clipboard.writeText(ipText).then(() => {
    const status = document.getElementById('status-msg');
    status.textContent = "✔ IP copied to clipboard!";
    setTimeout(() => status.textContent = "", 2000);
});
});

simulateBoot();
