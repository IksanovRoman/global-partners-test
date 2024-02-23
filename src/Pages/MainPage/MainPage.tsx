import { useQuery } from '@tanstack/react-query';
import { getContributionData } from '../../Services/http';
import { format, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  getCellColor,
  getContributionsMessage,
  getFirstLetterCapital,
  isFirstDateAfterSecondDate,
  parseDatetime,
} from './utils';
import { Tooltip } from '@mui/material';
import { days, formatString } from './const';
import {
  DataInterface,
  DateWithMonthsInterface,
  GroupedArrayInterface,
} from './types';

function MainPage() {
  const { isPending, isError, data, error } = useQuery<DataInterface>({
    queryKey: ['contribution'],
    queryFn: () => getContributionData(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const currentDate = new Date();
  const formattedCurrentDate = format(currentDate, formatString);

  const dates = [formattedCurrentDate];

  for (let i = 1; i <= 50; i++) {
    const newDateByWeeks = subWeeks(currentDate, i);
    const formattedDateByWeeks = format(newDateByWeeks, formatString);
    dates.push(formattedDateByWeeks);
  }

  const datesWithMonths: DateWithMonthsInterface[] = dates.map(date => {
    return {
      date: date,
      month: format(date, 'LLLL', { locale: ru }),
      contribution: [],
    };
  });

  const filteredBackendData = Object.entries(data);

  filteredBackendData.map(date => {
    const date1 = parseDatetime(date[0]);
    for (let i = 0; i < datesWithMonths.length; i++) {
      const date2 = parseDatetime(datesWithMonths[i].date);
      if (isFirstDateAfterSecondDate(date1, date2)) {
        datesWithMonths[i].contribution.push({
          date: format(date1, 'yyyy-MM-dd'),
          dateForHover:
            format(date1, 'EEEE', { locale: ru }) +
            ', ' +
            format(date1, 'LLLL dd, yyyy', { locale: ru }),
          day: format(date1, 'EEEE', { locale: ru }),
          value: date[1],
        });
        return;
      }
    }
  });

  // @ts-expect-error ignore groupBy function
  const groupedMonth: GroupedArrayInterface = Object.groupBy(
    datesWithMonths,
    ({ month }: { month: string }) => month,
  );
  const groupedMonthArray = Object.entries(groupedMonth);

  return (
    <div className="page">
      Главный экран
      <table>
        <tr>
          <td></td>
          {groupedMonthArray
            .slice()
            .reverse()
            .map(month => {
              return (
                <td colSpan={month[1].length} key={month[0]}>
                  {getFirstLetterCapital(month[0])}
                </td>
              );
            })}
        </tr>
        {days.map(day => {
          return (
            <tr key={day.short}>
              <td>{day.short}</td>
              {datesWithMonths
                .slice()
                .reverse()
                .map(date => {
                  const rightDay = date.contribution.find(
                    value => value.day === day.long,
                  );
                  return rightDay ? (
                    <Tooltip
                      title={
                        <div>
                          <div>{getContributionsMessage(rightDay?.value)}</div>
                          <div>
                            {getFirstLetterCapital(rightDay?.dateForHover)}
                          </div>
                        </div>
                      }
                      arrow
                      key={date.date}
                      placement="top"
                    >
                      <td
                        style={{
                          background: getCellColor(Number(rightDay?.value)),
                          cursor: 'pointer',
                        }}
                      ></td>
                    </Tooltip>
                  ) : (
                    <td></td>
                  );
                })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default MainPage;
