import { useShortenedUrls } from "@/hooks"
import { UrlListProps } from "@/types/props";

interface UrlsContainerProps {
  children: (props: UrlListProps ) => React.ReactNode;
}

export default function UrlsContainer({ children }: UrlsContainerProps) {
  const { isLoading, isError, shortenedUrls, refetch } = useShortenedUrls();
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