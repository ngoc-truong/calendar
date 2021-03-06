import lindyEvents from "./lindy-events.json";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "./components/Event";
import EventForm from "./components/EventForm";
import { Drawer, Alert } from "@mui/material";
import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import lindyIllustration from "./assets/lindy-background.PNG";

export default function App() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [events, setEvents] = useState(lindyEvents.events);
  let [openNewEventDrawer, setOpenNewEventDrawer] = useState(false);
  let [openEditEventDrawer, setOpenEditEventDrawer] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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

  // If an event has a start and end date, show the event in all days
  // date-fns: https://date-fns.org/v2.28.0/docs/eachDayOfInterval
  let selectedDayEvents = events.filter((event) =>
    isSameDay(parseISO(event.startDate), selectedDay)
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/events`).then((response) => {
      setEvents(response.data);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div className="background">
      <NavBar
        user={user}
        setUser={setUser}
        setNotification={setNotification}
        setError={setError}
        setOpenNewEventDrawer={setOpenNewEventDrawer}
        background={lindyIllustration}
      />
      {notification && (
        <Alert severity={error ? "error" : "success"} className="alert">
          {notification}
        </Alert>
      )}
      <Header />

      <div className="background-color flex place-content-center">
        <div className="background-color grid grid-cols-3 p-12 gap-x-8 font w-full max-w-7xl">
          <Calendar
            firstDayCurrentMonth={firstDayCurrentMonth}
            previousMonth={previousMonth}
            nextMonth={nextMonth}
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            events={events}
          />
          <section className="col-span-2 ">
            <div>
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
                  setNotification={setNotification}
                />
              </Drawer>
            </div>
            <div className="space-y-1 text-sm leading-6 text-gray-500 ">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event) => (
                  <Event
                    user={user}
                    key={event.id}
                    id={event.id}
                    event={event}
                    events={events}
                    setEvents={setEvents}
                    setNotification={setNotification}
                    openEditEventDrawer={openEditEventDrawer}
                    setOpenEditEventDrawer={setOpenEditEventDrawer}
                  />
                ))
              ) : (
                <div className="card">
                  <h1 className="headline">Keine Veranstaltungen heute ????</h1>
                  <p>Dann lass ma' Solo-Jazz ??ben!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
