import type { RequestOneDayReturnResponse } from "@/app/api/weather/one-day/types/return";
import { CurrentClock } from "@/components/current-clock";
import { convertNumberToIcon } from "@/utils/convertNumberToIcon";
import { formatImagePerHour } from "@/utils/formatImagePerHour";
import dayjs from "dayjs";

import Image from "next/image";

interface WeatherDetailsProps {
  data: RequestOneDayReturnResponse;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const Icon = convertNumberToIcon(data.weatherIcon);

  return (
    <div className="relative h-full w-full rounded-lg border border-custom-gray-500 text-custom-gray-100">
      <div className="hidden md:absolute md:inset-0 md:block">
        <Image
          src={formatImagePerHour()}
          alt="sun"
          quality={100}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg"
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-10 rounded-lg p-12 md:absolute md:inset-0 md:z-10 md:gap-2">
        <div className="flex flex-col-reverse justify-between sm:flex-row">
          <div className="grid">
            <span className="text-xl font-bold">
              {data.cityName}, {data.uf}
            </span>
            <span className="text-lg capitalize">
              {dayjs().format("dddd, D [de] MMMM [de] YYYY")}
            </span>
          </div>

          <span className="flex justify-end text-2xl font-semibold">
            <CurrentClock />
          </span>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-10 md:gap-2 lg:flex-row">
          <div className="grid text-center md:text-start">
            <span className="text-6xl font-bold sm:text-7xl md:text-8xl">
              {Math.floor(data.tempCurrent)}ºc
            </span>
            <div className="flex flex-col-reverse justify-center gap-1 text-xl 2xl:flex-row">
              <span className="flex justify-center gap-1 md:justify-start">
                {Math.floor(data.tempMin)}ºc - {Math.floor(data.tempMax)}ºc
                <span className="hidden 2xl:block"> - </span>
              </span>

              <span>{data.weatherText}</span>
            </div>
          </div>

          <div>
            <Icon className="h-24 w-24 stroke-1 md:h-32 md:w-32 lg:h-40 lg:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
