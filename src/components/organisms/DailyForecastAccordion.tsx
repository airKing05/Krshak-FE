// components/DailyForecastAccordion.tsx
import { useState } from 'react';

type Props = {
  daily: any;
};

const DailyForecastAccordion = ({ daily }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">7-Day Forecast</h2>
      <div className="space-y-4">
        {daily.time.map((date: string, idx: number) => {
          const isOpen = expandedIndex === idx;

          return (
            <div key={idx} className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-200 ${
                  isOpen ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-lg font-medium text-gray-800">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Min: {daily.temperature_2m_min[idx]}° / Max: {daily.temperature_2m_max[idx]}°
                  </span>
                </div>

                {/* Chevron Icon */}
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Content Panel */}
              <div
                className={`transition-all duration-300 ${
                  isOpen ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden bg-gray-50`}
              >
                <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  {/* Precipitation */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3C12 3 7 8.5 7 12.5C7 15.5 9.5 18 12 18C14.5 18 17 15.5 17 12.5C17 8.5 12 3 12 3Z"
                      />
                    </svg>
                    <span>Precip: {daily.precipitation_sum[idx]} mm</span>
                  </div>

                  {/* Snowfall */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-cyan-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2V22M4.93 4.93L19.07 19.07M2 12H22M4.93 19.07L19.07 4.93"
                      />
                    </svg>
                    <span>Snow: {daily.snowfall_sum[idx]} mm</span>
                  </div>

                  {/* Rain Probability */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 15a4 4 0 010-8h1.26a6.5 6.5 0 0112.48 2H20a4 4 0 010 8H5.5A3.5 3.5 0 014 15z"
                      />
                    </svg>
                    <span>Rain Chance: {daily.precipitation_probability_max[idx]}%</span>
                  </div>

                  {/* Sunrise */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 18a5 5 0 00-10 0M12 2v6m0 0l3-3m-3 3L9 5m11 9h2m-2 0a9 9 0 01-18 0h2"
                      />
                    </svg>
                    <span>Sunrise: {daily.sunrise[idx].split('T')[1]}</span>
                  </div>

                  {/* Sunset */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 18a5 5 0 00-10 0M3 12h2m14 0h2M12 2v6m0 0l3-3m-3 3L9 5M4.22 19.78l1.42-1.42M18.36 18.36l1.42 1.42M1 22h22"
                      />
                    </svg>
                    <span>Sunset: {daily.sunset[idx].split('T')[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecastAccordion;
