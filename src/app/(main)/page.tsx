import { LogoIcon } from "@/components/icons/Logo";
import { WeatherLayout } from "@/components/weather-layout";
import { SearchForm } from "./_components/search-form";

export default function Home() {
  return (
    <WeatherLayout>
        <LogoIcon className="flex size-14 w-full items-center justify-center sm:mt-10" />

        <SearchForm />
    </WeatherLayout>
  );
}
