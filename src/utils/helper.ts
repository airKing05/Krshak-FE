// export async function getDrivingDistanceORS(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): Promise<{ distanceKm: number; durationMinutes: number }> {
// form env ORS_ROUTE_KEY
//   const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lon1},${lat1}&end=${lon2},${lat2}`;

//   const res = await fetch(url);
//   const data = await res.json();

//   const segment = data.features[0].properties.segments[0];

//   return {
//     distanceKm: segment.distance / 1000,         // meters → kilometers
//     durationMinutes: segment.duration / 60       // seconds → minutes
//   };
// }



export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


export const getUserLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    if (!navigator.geolocation) {
        return reject(new Error("Geolocation is not supported"));
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
        resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        });
        },
        (err) => {
        reject(err);
        },
        {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
        }
    );
    });
};


export async function getFallbackLocation(): Promise<{ lat: number; lng: number } | null> {

  // ✅ Hardcoded location (Chandanheli, Bundi, Rajasthan)
  if (import.meta.env.VITE_USE_DEV_LOCATION === 'true') {
    return {
     lat: 25.30221,
     lng: 75.84167
    };
  }

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      lat: data.latitude,
      lng: data.longitude,
    };
  } catch (error) {
    console.error("IP location failed", error);
    return null;
  }
}
