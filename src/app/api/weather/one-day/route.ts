import { server } from "@/lib/axios";
import { type NextRequest, NextResponse } from "next/server";
import type { RequestCityResponse } from "./types/city";
import type { RequestCurrentResponse } from "./types/current";
import type { RequestOneDayResponse } from "./types/one-day";
import type { RequestOneDayReturnResponse } from "./types/return";

export async function GET(request: NextRequest) {
  const locationKey = request.nextUrl.searchParams.get("locationKey");

  if (!locationKey) {
    return NextResponse.json(
      {
        error: {
          message:
            "Insira o parâmetro [locationKey] para fazer a busca dos dados",
        },
      },
      { status: 400 },
    );
  }

  const params = {
    apikey: process.env.NEXT_PUBLIC_API_ACCU_WEATHER,
    language: "pt-br",
    metric: true,
  };

  try {
    const [cityResponse, currentResponse, oneDayResponse] = await Promise.all([
      server.get<RequestCityResponse>("/locations/v1/" + locationKey, {
        params: {
          details: true,
          ...params,
        },
      }),
      server.get<RequestCurrentResponse>(
        "/currentconditions/v1/" + locationKey,
        {
          params: {
            details: true,
            ...params,
          },
        },
      ),
      server.get<RequestOneDayResponse>(
        "/forecasts/v1/daily/1day/" + locationKey,
        { params },
      ),
    ]);

    const oneDay = oneDayResponse.data.DailyForecasts[0];
    const current = currentResponse.data[0];

    const response: RequestOneDayReturnResponse = {
      // city
      cityName: cityResponse.data.LocalizedName,
      state: cityResponse.data.AdministrativeArea.LocalizedName,
      uf: cityResponse.data.AdministrativeArea.ID,
      countryName: cityResponse.data.Country.LocalizedName,

      // current
      tempCurrent: current.Temperature.Metric.Value,
      weatherText: current.WeatherText,
      weatherIcon: current.WeatherIcon,

      // one day
      tempMin: oneDay.Temperature.Minimum.Value,
      tempMax: oneDay.Temperature.Maximum.Value,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: "Ocorreu uma falha ao buscar os dados!",
        },
      },
      { status: 500 },
    );
  }
}
