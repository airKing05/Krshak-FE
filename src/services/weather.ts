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


