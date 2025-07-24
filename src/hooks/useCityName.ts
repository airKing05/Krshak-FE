import { useEffect, useState } from 'react';

export function useCityName(): string | null {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        // 1. Get position
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          })
        );

        const { latitude, longitude } = position.coords;
        console.log('Coordinates:', latitude, longitude); // Debugging

        // 2. Fetch city from LocationIQ
        const token = 'pk.372bc1e88593d5294bb0ebfae6ba67aa';
        const res = await fetch(
          `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${latitude}&lon=${longitude}&format=json`
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API response not OK: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log('Reverse geocode data:', data); // Debugging

        const resolvedCity =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state_district ||
          null;

        setCity(resolvedCity);
      } catch (error) {
        console.error('Failed to get city name:', error);
      }
    };

    fetchCity();
  }, []);

  return city;
}
