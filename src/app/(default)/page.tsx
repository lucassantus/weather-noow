import { Framing } from "@/components/framing";
import { LogoIcon } from "@/components/icons/Logo";
import { WeatherLayout } from "@/components/weather-layout";
import { bounceAnimationVerticalDislocate } from "@/utils/animation/bounceAnimationVerticalDislocate";
import { SearchForm } from "./components/search-form";

export default function Home() {
  return (
    <WeatherLayout>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <Framing {...bounceAnimationVerticalDislocate({ delay: 0.4 })}>
            <LogoIcon className="mt-3 flex h-16 w-full items-center justify-center sm:mt-10" />
          </Framing>

          <SearchForm />
        </div>
      </div>
    </WeatherLayout>
  );
}
