import React from "react";

interface WeatherProps {
    temperature: string;
    rainChance: string;
}

const WeatherInfo: React.FC<WeatherProps> = ({ temperature, rainChance }) => {
    return (
        <div className="bg-white p-1 rounded-lg shadow-sm flex flex-col w-28">
            {/* First Line: Rain Chance (Full Width) */}
            <div className="text-xl font-semibold text-blue-600 w-full">{rainChance}% Rain</div>

            {/* Second Line: Temperature and Icon aligned to full width */}
            <div className="flex items-center justify-between w-full">
                {/* Temperature */}
                <div className="text-sm font-medium text-gray-700">{temperature}°C</div>

                {/* Icon */}
                <div className="w-10 h-10 bg-transparent border border-blue-500 rounded-full flex items-center justify-center text-lg text-blue-500">
                    ☁️
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;
