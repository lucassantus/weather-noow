import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

interface WeatherDetailsToDaysForecastDayProps {
  day: string;
  icon: LucideIcon;
  maxTemperature: number;
  minTemperature: number;
  description: string;
}

export function WeatherDetailsToDaysForecastDay({
  day,
  icon: Icon,
  maxTemperature,
  minTemperature,
  description,
}: WeatherDetailsToDaysForecastDayProps) {
  return (
    <div
      className="flex h-full w-full min-w-[150px] cursor-pointer select-none flex-col justify-evenly gap-2 rounded-lg border border-custom-gray-500 bg-transparent py-5 md:cursor-default md:select-auto md:gap-0 md:py-0"
    >
      <span className="text-lg font-bold capitalize text-custom-gray-200">
        {day}
      </span>

      <div className="flex justify-center">
        <Icon className="flex h-12 w-12 items-center justify-center stroke-white stroke-1 lg:h-14 lg:w-14 xl:h-20 xl:w-20" />
      </div>

      <span className="px-4 text-sm font-medium text-custom-gray-200">
        {description}
      </span>

      <div className="grid gap-2">
        <div className="flex flex-col-reverse justify-center xl:flex-row xl:gap-4">
          <span className="text-lg font-bold text-custom-gray-100">
            {minTemperature} ºc
          </span>
          <div className="flex justify-center xl:hidden">
            <Separator className="w-5" />
          </div>

          <span className="text-lg font-bold text-custom-gray-400">
            {maxTemperature} ºc
          </span>
        </div>
      </div>
    </div>
  );
}
