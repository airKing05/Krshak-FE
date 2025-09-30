import { useEffect, useState } from "react";
import Card from "./Card";
import { getHourlyRainForecast } from "../../services/weather";
import { getRainEmoji } from "../../utils/common";

interface NearestMarketCardProps {
  imageUrl?: string | undefined;
  title: string;
  distance?: string;
  handleClick?: () => void;
  latitude: number;
  longitude: number;
}

export default function NearestMarketCard({
  imageUrl,
  title,
  distance,
  handleClick,
  latitude,
  longitude
}: NearestMarketCardProps) {
    const [rainInfo, setRainInfo] = useState('')
  useEffect(() => {
    if (latitude && longitude) {
      async function fetchHourlyRain() {
        const data = await getHourlyRainForecast(latitude, longitude, 1);
        const info = `Possibility of rain - ${getRainEmoji(data[0]?.precipitationProbability)} ${
          data[0]?.precipitationProbability
        }%`;
        setRainInfo(info)
      }
      fetchHourlyRain();
    }
  }, [latitude, longitude]);
  return (
    <Card
      title={title}
      subtitle={distance}
      imageUrl={imageUrl}
      handleClick={handleClick}
      info={rainInfo}
    />
  );
}
