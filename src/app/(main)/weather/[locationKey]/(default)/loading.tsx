import { CardCoverLoading } from "@/components/card-cover-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <CardCoverLoading className="col-span-1 row-span-2">
      <Skeleton className="h-full" />
    </CardCoverLoading>
  );
}
