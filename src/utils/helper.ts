export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    console.log("111", lat1, lon1, "222", lat2, lon2)
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
