"use client";

import type { RequestForecastReturnResponse } from "@/app/api/weather/forecast/types/return";
import { convertNumberToIcon } from "@/utils/convertNumberToIcon";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { WeatherDetailsToDaysForecastDay } from "./weather-details-to-days-forecast-day";

interface WeatherDetailsToDaysForecastProps {
  data: RequestForecastReturnResponse;
}

export function WeatherDetailsToDaysForecast({
  data,
}: WeatherDetailsToDaysForecastProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  function timeToShow(data: {
    day: {
      description: string;
      weatherIcon: number;
    };
    night: {
      description: string;
      weatherIcon: number;
    };
  }) {
    const currentTime = dayjs().hour();
    const isDay = currentTime >= 6 && currentTime <= 18;

    if (isDay) {
      return data.day;
    }

    return data.night;
  }

  return (
    <div
      className="flex h-full w-full flex-col flex-nowrap gap-4 overflow-x-auto py-4 pb-8 text-center sm:grid sm:grid-cols-2 md:flex md:flex-row"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {data.map((forecast, index) => {
        const { date, tempMax, tempMin } = forecast;

        const textToDate = index === 0 ? "Amanhâ" : dayjs(date).format("ddd");
        const currentTime = timeToShow(forecast);

        return (
          <WeatherDetailsToDaysForecastDay
            key={date}
            day={textToDate}
            icon={convertNumberToIcon(currentTime?.weatherIcon ?? 0)}
            description={currentTime?.description ?? ""}
            maxTemperature={Number(tempMax?.toFixed(0))}
            minTemperature={Number(tempMin?.toFixed(0))}
          />
        );
      })}
    </div>
  );
}
