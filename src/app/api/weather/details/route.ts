import { server } from "@/lib/axios";
import { type NextRequest, NextResponse } from "next/server";
import type { RequestCurrentResponse } from "./types/current";
import type { RequestDetailsReturnResponse } from "./types/return";

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
    const { data } = await server.get<RequestCurrentResponse>(
      "/currentconditions/v1/" + locationKey,
      {
        params,
      },
    );

    const response: RequestDetailsReturnResponse = {
      humidity: data[0].RelativeHumidity,
      uvIndex: data[0].UVIndex,
      windSpeed: data[0].WindGust.Speed.Metric.Value,
      thermalSensation: data[0].RealFeelTemperature.Metric.Value,
      visibility: data[0].Visibility.Metric.Value,
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
