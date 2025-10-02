"use client";

import type { RequestCitiesReturnResponse } from "@/app/api/weather/cities/types/return";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type SearchFormData, searchFormSchema } from "@/validation/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface SearchFormProps {}

export function SearchForm({}: SearchFormProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const { handleSubmit, control } = form;

  const {
    data: cities = [],
    isLoading,
    mutateAsync,
  } = useMutation({
    mutationKey: ["cities"],
    mutationFn: async (values: SearchFormData) => {
      const response = await axios
        .post<RequestCitiesReturnResponse>("/api/weather/cities", {
          params: values,
        })
        .then(({ data }) => {
          if (data.length === 0) {
            toast.error("Não foram encontradas cidades com esse nome.");
          }

          return data;
        })
        .catch((error) => {
          if (error.response.data.error.message)
            toast.error(error.response.data.error.message);

          return [] as RequestCitiesReturnResponse;
        });

      return response;
    },
  });

  async function onSubmit({ search }: SearchFormData) {
    mutateAsync({ search });
  }

  return (
    <div className="mt-7 w-full sm:mt-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-2">
            <div className="text-center">
              <div className="text-3xl font-semibold">
                <span className="text-custom-gray-100">Boas vindas ao </span>
                <span className="text-custom-blue-light-100">Weather Noow</span>
              </div>

              <div className="text-xl text-custom-gray-200">
                Escolha um local para ver a previsão do tempo
              </div>
            </div>
            <div className="grid justify-center gap-2 sm:flex">
              <FormField
                control={control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Pesquisar..."
                        className="w-full xs:w-[300px] sm:w-[430px] md:w-[500px]"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-14 bg-custom-blue-light-100 opacity-90 xs:w-[300px] sm:w-14"
                icon={<Search />}
                isLoading={isLoading}
                disabled={isLoading}
                aria-label="Search for a city"
              />
            </div>

            {isLoading ? (
              <ScrollArea className="h-full max-h-144 w-full rounded-md border p-4">
                <div className="grid w-full gap-3">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </ScrollArea>
            ) : (
              <Fragment>
                {cities.length > 0 && (
                  <ScrollArea className="h-full max-h-144 w-full rounded-md border bg-custom-gray-600 p-4 shadow-xs">
                    <div className="grid w-full gap-3">
                      {cities.map(
                        (
                          { locationKey, cityName, stateName, countryName },
                          index,
                        ) => {
                          const cityDescription = `${cityName}, ${stateName}, ${countryName}`;

                          return (
                            <div key={locationKey}>
                              <Link
                                href={"/weather/" + locationKey}
                                className={buttonVariants({
                                  className:
                                    "flex w-full items-start justify-start border-none bg-custom-gray-500 opacity-80! hover:bg-custom-gray-500/50 hover:opacity-60",
                                  variant: "outline",
                                })}
                              >
                                {cityDescription}
                              </Link>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </ScrollArea>
                )}
              </Fragment>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
