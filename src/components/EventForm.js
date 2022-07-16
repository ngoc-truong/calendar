import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import axios from "axios";

function EventForm({
  selectedDay,
  events,
  setEvents,
  setNotification,
  setOpenNewEventDrawer,
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(format(selectedDay, "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("20:00");
  const [endDate, setEndDate] = useState(format(selectedDay, "yyyy-MM-dd"));
  const [endTime, setEndTime] = useState("23:00");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const addEvent = (e) => {
    e.preventDefault();

    let newEvent = {
      id: uuid(),
      originalDateString: "",
      day: "",
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      title: title,
      location: location,
      description: description,
      scrapingDate: new Date(),
      scrapingDay: "",
    };

    setTitle("");
    setStartDate(format(selectedDay, "yyyy-MM-dd"));
    setStartTime("20:00");
    setEndDate(format(selectedDay, "yyyy-MM-dd"));
    setEndTime("23:00");
    setLocation("");
    setDescription("");
    setOpenNewEventDrawer(false);
    setNotification("Eine neue Veranstaltung wurde hinzugefügt.");
    setTimeout(() => {
      setNotification(null);
    }, 8000);

    axios
      .post(`http://localhost:3001/events`, newEvent)
      .then((response) => {
        console.log(response);
        setEvents([...events, newEvent]);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="font m-10 w-96" onSubmit={addEvent}>
      <h1 className="headline">Neue Veranstaltung hinzufügen</h1>
      <div className="my-6 w-full">
        <label>
          <span className="input-headline">Titel</span>
          <br></br>
          <input
            className="bg-gray-100 rounded py-2 px-4 w-full"
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-6 grid-row-3 my-6">
        <p>
          <span className="input-headline">Start</span>
          <br></br>
          <label>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full"
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <span className="input-headline">Ende</span>
          <br></br>
          <label>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full"
              required
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            ></input>
          </label>
        </p>
      </div>
      <div className="mb-6">
        <p>
          <label>
            <span className="input-headline">Ort</span>
            <br></br>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full"
              required
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </label>
        </p>
      </div>

      <div>
        <label>
          <span className="input-headline">Beschreibung</span>
          <br></br>
          <textarea
            className="bg-gray-100 rounded py-2 px-4 w-full h-60 mb-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
      </div>
      <input className="button" type="submit" value="Hinzufügen" />
    </form>
  );
}

export default EventForm;
