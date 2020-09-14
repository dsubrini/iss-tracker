const map = document.getElementById('map');

setInterval(() => {
  const data = fetch('http://api.open-notify.org/iss-now.json', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const issPosition = {
        name: 'ISS',
        lat: data.iss_position.latitude,
        lng: data.iss_position.longitude,
        fill: 'red',
      };

      function coorToPixel(lat, lng) {
        const MAP_WIDTH = 1200;
        const MAP_HEIGHT = 666;

        const x = (lng + 180) * (MAP_WIDTH / 360);
        const y = ((90 - lat) * MAP_HEIGHT) / 180;

        return { x, y };
      }

      const position = coorToPixel(+issPosition.lat, +issPosition.lng);
      const marker = document.createElement('div');

      marker.className = 'marker';
      marker.style.left = position.x + 'px';
      marker.style.top = position.y + 'px';
      marker.style.width = '7px';
      marker.style.height = '7px';
      marker.style.borderRadius = '50px';
      marker.style.position = 'absolute';
      marker.style.backgroundColor = issPosition.fill;

      map.appendChild(marker);
    });
}, 5000);
