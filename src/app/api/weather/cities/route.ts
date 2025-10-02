import { server } from "@/lib/axios";
import { NextResponse } from "next/server";
import type { RequestCitiesResponse } from "./types/cities";
import type { RequestCitiesReturnResponse } from "./types/return";

// Interface para representar a estrutura do objeto de erro
interface ErrorResponse {
  response?: {
    data?: {
      Code?: string;
      Message?: string;
    };
  };
}

export async function POST(request: Request) {
  const { params } = await request.json();
  const { search } = params;

  if (!search) {
    return NextResponse.json(
      {
        error: {
          message: "Insira a cidade que deseja pesquisar",
        },
      },
      { status: 400 },
    );
  }

  try {
    const paramsCities = {
      q: search,
      language: "pt-br",
      apikey: process.env.NEXT_PUBLIC_API_ACCU_WEATHER,
    };

    const { data } = await server.get<RequestCitiesResponse>(
      "/locations/v1/cities/autocomplete",
      { params: paramsCities },
    );

    const response: RequestCitiesReturnResponse = data.map(
      ({ Key, LocalizedName, AdministrativeArea, Country }) => ({
        locationKey: Key,
        cityName: LocalizedName,
        stateName: AdministrativeArea.LocalizedName,
        countryName: Country.LocalizedName,
      }),
    );

    return NextResponse.json(response);
  } catch (error) {
    const errorTyped = error as ErrorResponse;

    if (errorTyped?.response?.data?.Code === "ServiceUnavailable") {
      return NextResponse.json(
        {
          error: {
            message:
              "Ocorreu um erro, quantidade diária de buscas foram excedidas!",
          },
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      {
        error: {
          message: "Ocorreu uma falha ao processar os dados!",
        },
      },
      { status: 500 },
    );
  }
}
