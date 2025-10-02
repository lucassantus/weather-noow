import { server } from "@/lib/axios";
import { type NextRequest, NextResponse } from "next/server";
import type { RequestForecastResponse } from "./types/forecasts";
import type { RequestForecastReturnResponse } from "./types/return";

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
    details: true,
  };

  try {
    const { data } = await server.get<RequestForecastResponse>(
      "/forecasts/v1/daily/5day/" + locationKey,
      {
        params,
      },
    );

    const response: RequestForecastReturnResponse = data.DailyForecasts.filter(
      (_, index) => index !== 0,
    ).map(({ Date, Temperature, Day, Night }) => ({
      date: Date,
      tempMin: Temperature.Minimum.Value,
      tempMax: Temperature.Maximum.Value,
      day: {
        description: Day.IconPhrase,
        weatherIcon: Day.Icon,
      },
      night: {
        description: Night.IconPhrase,
        weatherIcon: Night.Icon,
      },
    }));

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
