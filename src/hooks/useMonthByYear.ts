import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
interface YearMonthGroup {
  year: number;
  months: number[];
}
export const useMonthByYear = () => {
  const generateMonthsByYear = (startDate: Date) => {
    const start = new Date(startDate);
    start.setDate(1);
    const end = new Date();
    const groupedMonths: YearMonthGroup[] = [];

    while (start <= end) {
      const currentYear = start.getFullYear();
      const currentMonth = start.getMonth() + 1;

      const existingYear = groupedMonths.find(
        (item) => item.year === currentYear,
      );

      if (existingYear) {
        if (!existingYear.months.includes(currentMonth)) {
          existingYear.months.push(currentMonth);
        }
      } else {
        groupedMonths.push({
          year: currentYear,
          months: [currentMonth],
        });
      }
      start.setMonth(start.getMonth() + 1);
    }
    return groupedMonths;
  };
  const [groupedMonth, setGroupedMonth] = useState<YearMonthGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // <-- Guarda el unsubscribe
      const storedGroupedMonths = localStorage.getItem("groupedMonths");
      const lastUpdated = localStorage.getItem("lastUpdated");
      const now = new Date();

      if (storedGroupedMonths && lastUpdated) {
        const lastUpdatedDate = new Date(lastUpdated);
        if (
          lastUpdatedDate.getFullYear() === now.getFullYear() &&
          lastUpdatedDate.getMonth() === now.getMonth()
        ) {
          setGroupedMonth(JSON.parse(storedGroupedMonths));
          setIsLoading(false); // <-- Actualiza el estado
          return;
        }
      }

      if (user) {
        const creationDate = user.metadata.creationTime
          ? new Date(user.metadata.creationTime)
          : new Date();
        const monthsByYear = generateMonthsByYear(creationDate);
        setGroupedMonth(monthsByYear);
        localStorage.setItem("groupedMonths", JSON.stringify(monthsByYear));
        localStorage.setItem("lastUpdated", now.toISOString());
      }

      setIsLoading(false); // <-- Se ejecuta siempre
    });

    return () => unsubscribe(); // <-- Limpia el listener
  }, []);

  return {
    groupedMonth,
    setGroupedMonth,
    isLoading,
  };
};
