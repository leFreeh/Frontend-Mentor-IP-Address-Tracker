var map;

function trackIP(){

    var ipInput = document.getElementById('ipInput').value;
    var apiToken = //ipinfo.io Token

    resetMap();

    fetch(`https://ipinfo.io/${ipInput}?token=${apiToken}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('La dirección IP no es válida');
            }
            return response.json();
        })
        .then(data => {
            updateBlockContent(data.ip, data.city + ', ' + data.region + ' ' + data.postal, data.timezone, data.org);

            map = L.map('map').setView([data.loc.split(',')[0], data.loc.split(',')[1]], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([data.loc.split(',')[0], data.loc.split(',')[1]]).addTo(map);
        })
        .catch(error => {
            alert(error.message);
        });
}

function resetMap(){
    if (map) {
        map.off();
        map.remove();
        map = null;
    }
}

window.onload = function(){
    trackIP();
};

function updateBlockContent(ip, loc, tz, dom) {

    const localTime = new Date().toLocaleTimeString('en-US', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById('ipAddress').textContent = ip;
    document.getElementById('location').textContent = loc;
    document.getElementById('timezone').textContent = localTime;
    document.getElementById('domain').textContent = dom;
}