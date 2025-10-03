import { CardCoverLoading } from "@/components/card-cover-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <CardCoverLoading className="col-span-1 row-span-1 flex flex-col gap-4">
      <Skeleton className="h-12 w-full" />
      <div className="grid h-full w-full grid-cols-4 gap-4">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
    </CardCoverLoading>
  );
}
