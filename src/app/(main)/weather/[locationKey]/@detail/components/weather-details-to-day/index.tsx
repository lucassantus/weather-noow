"use client";

import type { RequestDetailsReturnResponse } from "@/app/api/weather/details/types/return";
import { Droplet, Eye, SunMedium, Thermometer, Wind } from "lucide-react";
import { WeatherDetailsToDayInfo } from "./weather-details-to-day-info";

interface WeatherDetailsToDayProps {
  data: RequestDetailsReturnResponse;
}

export function WeatherDetailsToDay({ data }: WeatherDetailsToDayProps) {
  return (
    <div className="grid h-full items-center divide-y divide-custom-gray-600">
      <WeatherDetailsToDayInfo
        icon={Thermometer}
        title="Sensação térmica"
        content={`${data.thermalSensation.toFixed(0)} ºc`}
      />
      <WeatherDetailsToDayInfo
        icon={Eye}
        title="Visibilidade"
        content={`${data.visibility.toFixed(0)} km`}
      />
      <WeatherDetailsToDayInfo
        icon={Wind}
        title="Velocidade do vento"
        content={`${data.windSpeed.toFixed(0)} km/h`}
      />
      <WeatherDetailsToDayInfo
        icon={Droplet}
        title="Umidade do ar"
        content={`${data.humidity} %`}
      />
      <WeatherDetailsToDayInfo
        icon={SunMedium}
        title="Índice UV"
        content={`${data.uvIndex}`}
      />
    </div>
  );
}
