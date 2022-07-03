import lindyEvents from "./db.json";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { de } from "date-fns/locale";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "./components/Event";
import EventForm from "./components/EventForm";
import { Drawer } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [events, setEvents] = useState(lindyEvents.events);
  let [openNewEventDrawer, setOpenNewEventDrawer] = useState(false);
  let [openEditEventDrawer, setOpenEditEventDrawer] = useState(false);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayEvents = events.filter((event) =>
    isSameDay(parseISO(event.startDate), selectedDay)
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/events`).then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
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
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-amber-600 ",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-amber-500 hover:bg-amber-700",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
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
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <div>
              <button
                onClick={() => setOpenNewEventDrawer(true)}
                className="bg-amber-500 px-4 py-1 rounded font-bold text-white text-sm mb-4 hover:bg-amber-700"
              >
                Neue Veranstaltung
              </button>
              <Drawer
                open={openNewEventDrawer}
                anchor={"right"}
                onClose={() => setOpenNewEventDrawer(false)}
              >
                <EventForm
                  selectedDay={selectedDay}
                  events={events}
                  setEvents={setEvents}
                  setOpenNewEventDrawer={setOpenNewEventDrawer}
                />
              </Drawer>
            </div>
            <h2 className="font-semibold text-gray-900">
              Veranstaltungen am{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "d. MMMM yyy", { locale: de })}
              </time>
            </h2>
            <div className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event) => (
                  <Event
                    key={event.id}
                    id={event.id}
                    event={event}
                    events={events}
                    setEvents={setEvents}
                    openEditEventDrawer={openEditEventDrawer}
                    setOpenEditEventDrawer={setOpenEditEventDrawer}
                  />
                ))
              ) : (
                <>
                  <p>Keine Lindy-Veranstaltungen heute 🥺</p>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];
