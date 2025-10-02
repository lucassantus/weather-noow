import { RequestDetailsReturnResponse } from "@/app/api/weather/details/types/return";
import { CardCover } from "@/components/card-cover";
import { WeatherDetailsToDay } from "./components/weather-details-to-day";

interface DetailProps {
  params: Promise<{
    locationKey: string;
  }>;
}

async function getData({ locationKey }: { locationKey: string }) {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/weather/details?locationKey=" +
      locationKey,
    {
      method: "GET",
    },
  ).then(
    async (response) => (await response.json()) as RequestDetailsReturnResponse,
  );
}

export default async function Detail(props: DetailProps) {
  const params = await props.params;
  const data = await getData({ locationKey: params.locationKey });

  return (
    <CardCover
      title="Detalhes do clima hoje"
      className="col-span-1 row-span-1"
      animation={{ delay: 0.7 }}
    >
      <WeatherDetailsToDay data={data} />
    </CardCover>
  );
}
