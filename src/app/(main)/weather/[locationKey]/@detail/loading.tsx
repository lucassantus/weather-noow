import { CardCoverLoading } from "@/components/card-cover-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <CardCoverLoading className="col-span-1 row-span-1 flex flex-col items-center gap-4">
      <Skeleton className="h-8 w-full" />
      <div className="grid h-full w-full grid-rows-5 gap-4">
        <Skeleton className="h-full" />
        <Skeleton className="h-full" />
        <Skeleton className="h-full" />
        <Skeleton className="h-full" />
        <Skeleton className="h-full" />
      </div>
    </CardCoverLoading>
  );
}
