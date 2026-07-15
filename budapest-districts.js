// budapest-districts.js

// Minden kerület egy polygon: tömb [lat, lng] pontokkal.
// Példa: XI. kerület (részlegesen, illusztráció)
const DISTRICTS = {
    "I": [
        [47.4975, 19.0380],
        [47.5010, 19.0405],
        [47.5030, 19.0340],
        // ... további pontok
    ],
    "II": [
        [47.5200, 19.0150],
        [47.5250, 19.0300],
        // ...
    ],
    "XI": [
        [47.4630, 19.0120],
        [47.4700, 19.0400],
        [47.4600, 19.0600],
        // ...
    ],
    // ... egészen "XXIII"-ig
};

// Ray-casting algoritmus: pont benne van-e polygonban?
function isPointInPolygon(lat, lng, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect =
            ((yi > lng) !== (yj > lng)) &&
            (lat < (xj - xi) * (lng - yi) / (yj - yi + 0.0000001) + xi);

        if (intersect) inside = !inside;
    }
    return inside;
}

function detectDistrict(lat, lng) {
    for (const code in DISTRICTS) {
        const poly = DISTRICTS[code];
        if (isPointInPolygon(lat, lng, poly)) {
            return code; // pl. "XI"
        }
    }
    return null;
}
