import { de } from "date-fns/locale";
import {
  format,
  getDay,
  isEqual,
  isToday,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

let colStartClasses = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Calendar = ({
  firstDayCurrentMonth,
  previousMonth,
  nextMonth,
  days,
  selectedDay,
  setSelectedDay,
  events,
}) => {
  return (
    <div>
      {/* <div className="bg-white p-8 rounded-lg drop-shadow-2xl bg-opacity-70 backdrop-blur-xl border-white border"> */}
      <div className="bg-white p-8 rounded-lg drop-shadow-2xl border-white border">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900">
            {format(firstDayCurrentMonth, "MMMM yyyy", { locale: de })}
          </h2>
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
          <div>MO</div>
          <div>DI</div>
          <div>MI</div>
          <div>DO</div>
          <div>FR</div>
          <div>SA</div>
          <div>SO</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) && isToday(day) && "accent",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-green",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "dd")}
                </time>
              </button>

              <div className="w-1 h-1 mx-auto mt-1">
                {events.some((event) =>
                  isSameDay(parseISO(event.startDate), day)
                ) && <div className="w-1 h-1 rounded-full bg-green"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
