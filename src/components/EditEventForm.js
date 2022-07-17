import { useState } from "react";
import axios from "axios";

function EditEventForm({
  id,
  events,
  setEvents,
  setNotification,
  setOpenEditEventDrawer,
}) {
  let myEvent = events.filter((event) => event.id === id);
  myEvent = myEvent[0];
  console.log(myEvent);
  const [title, setTitle] = useState(myEvent.title);
  const [startDate, setStartDate] = useState(myEvent.startDate);
  const [startTime, setStartTime] = useState(myEvent.startTime);
  const [endDate, setEndDate] = useState(myEvent.endDate);
  const [endTime, setEndTime] = useState(myEvent.endTime);
  const [location, setLocation] = useState(myEvent.location);
  const [description, setDescription] = useState(myEvent.description);

  const updateEvent = (e) => {
    e.preventDefault();

    let updatedEvent = {
      id: id,
      originalDateString: myEvent.originalDateString,
      day: "",
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      title: title,
      location: location,
      description: description,
      scrapingDate: myEvent.scrapingDate,
      scrapingDay: myEvent.scrapingDate,
    };

    setOpenEditEventDrawer(false);

    axios
      .put(`http://localhost:3001/events/${id}`, updatedEvent)
      .then((response) => {
        console.log(response.data);
        setEvents(
          events.map((event) => (event.id !== id ? event : response.data))
        );
        setNotification("Das Event wurde aktualisiert.");
        window.scrollTo(0, 0);
        setTimeout(() => {
          setNotification(null);
        }, 8000);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="font m-10 w-96" onSubmit={updateEvent}>
      <p>ID ist {id}</p>
      <h1 className="headline">"{title}" ändern</h1>
      <div className="my-6">
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
      <div>
        <p>
          <label>
            <span className="input-headline">Ort</span>
            <br></br>
            <input
              className="bg-gray-100 rounded py-2 px-4 w-full mb-6"
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
      <input className="button" type="submit" value="Aktualisieren" />
    </form>
  );
}

export default EditEventForm;
