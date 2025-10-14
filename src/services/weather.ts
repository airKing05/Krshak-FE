// for more info
//const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=precipitation_probability_max,precipitation_probability_mean,rain_sum,precipitation_sum,precipitation_hours&timezone=auto`;

export async function getRainProbability7Days(
  lat: number,
  lng: number
): Promise<Array<{ date: string; rainChance: number }>> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=precipitation_probability_max&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();


  return data.daily.time.map((date: string, index: number) => ({
    date,
    rainChance: data.daily.precipitation_probability_max[index],
  }));
}


export async function getTodayDailyRainSummary(
  lat: number,
  lng: number
): Promise<{
  date: string;
  totalPrecipitation: number; // mm
  avgPrecipitationProbability: number; // %
}> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=precipitation_sum,precipitation_probability_mean&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  // First day = today
  return {
    date: data.daily.time[0],
    totalPrecipitation: data.daily.precipitation_sum[0],
    avgPrecipitationProbability: data.daily.precipitation_probability_mean[0],
  };
}



export async function getHourlyRainForecast(
  lat: number,
  lng: number,
  hours: number = 24
): Promise<
  Array<{
    time: Date;
    precipitation: number; // in mm
    precipitationProbability: number; // in %
  }>
> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=precipitation,precipitation_probability&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  const now = new Date();

  // Filter data for next X hours only
  const filtered = data.hourly.time
    .map((timeStr: string, idx: number) => {
      const time = new Date(timeStr);
      return {
        time,
        precipitation: data.hourly.precipitation[idx],
        precipitationProbability: data.hourly.precipitation_probability[idx],
      };
    })
    .filter(({ time }: any) => time >= now && time <= new Date(now.getTime() + hours * 60 * 60 * 1000));

  return filtered;
}







// services/weather.ts

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
// lat: 25.30221,
//      lng: 75.84167
export const getWeatherData = async (lat: number, lng: number) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current_weather: 'true',
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
      'snowfall',
      'wind_speed_10m',
      'relative_humidity_2m',
    
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weathercode',
      'precipitation_sum',
      'snowfall_sum',
      'precipitation_probability_max',
      'sunrise',
      'sunset'
    ].join(','),
    timezone: 'auto',
  });
  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};

