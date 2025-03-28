import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";
import { UserDate } from "@/types/index";
interface DatesProps {
  start: string;
  end: string;
}
interface UsersDataProps {
  dates: DatesProps;
  enabled: boolean;
}
export const useUsersData = ({ dates, enabled }: UsersDataProps) => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["record", dates.start, dates.end],
    queryFn: () => get<UserDate>(`users/date/${dates.start}/${dates.end}`),
    staleTime: 1000 * 60 * 2,
    enabled: enabled && !!dates.start && !!dates.end,
  });
};
