
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi"
import { UserDate } from "@/types/index";
interface DatesProps {
  start:string;
  end:string; 
}
interface DataClientsProps {
  dates: DatesProps;
}
export const useDataClients = ({dates} : DataClientsProps ) => {
  const {get} = useApi();
  return useQuery({
    queryKey : ["clients", dates.start, dates.end],
    queryFn : () => get<DatesProps, UserDate>("users/date", dates)
    cacheTime : 1000*60*3;
    
  })
} 
