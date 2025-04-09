import { useClickTrackerChannel, useShortenedUrls } from "@/hooks"
import { UrlListProps } from "@/types/props";
import { useCallback } from "react";

interface UrlsContainerProps {
  children: (props: UrlListProps ) => React.ReactNode;
}

export default function UrlsContainer({ children }: UrlsContainerProps) {
  const { isLoading, isError, shortenedUrls, refetch } = useShortenedUrls();

  const memoizedRefetch = useCallback(() => refetch(), [refetch]);

  useClickTrackerChannel(memoizedRefetch);

  return (
    <div className="w-full max-w-4xl mt-8 px-4">
      {children({
        shortenedUrls,
        isLoading,
        isError,
        refetch
      })}
    </div>
  )
}