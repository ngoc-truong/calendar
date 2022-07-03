import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { Drawer, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import EditEventForm from "./EditEventForm";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";

function Event({
  event,
  id,
  events,
  setEvents,
  openEditEventDrawer,
  setOpenEditEventDrawer,
}) {
  const [textIsOpen, setTextIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteEvent = () => {
    // events state noch aktualisieren!!!

    if (
      window.confirm(`Möchtest du wirklich "${event.title}" löschen?`) === true
    ) {
      axios
        .delete(`http://localhost:3001/events/${id}`)
        .then((response) => {
          console.log(`Vorher waren's ${events.length} Events.`);
          setEvents(events.filter((event) => event.id !== id));
          return console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(`Jetzt ham' wa nur noch ${events.length} Events`);
  };

  const editEvent = () => {
    setOpenEditEventDrawer(true);
    setAnchorEl(null);
  };

  let description = "";

  if (event.description.includes("Mehr anzeigen")) {
    description = event.description.substring(
      0,
      event.description.indexOf("Mehr anzeigen")
    );
  } else if (event.description.includes("Weniger anzeigen")) {
    description = event.description.substring(
      0,
      event.description.indexOf("Weniger anzeigen")
    );
  } else {
    description = event.description;
  }

  const longText = description;
  const shortText = description.substring(0, 300);

  return (
    <div>
      <Drawer
        open={openEditEventDrawer}
        anchor={"right"}
        onClose={() => setOpenEditEventDrawer(false)}
      >
        <EditEventForm
          id={id}
          events={events}
          setEvents={setEvents}
          setOpenEditEventDrawer={setOpenEditEventDrawer}
        />
      </Drawer>
      <div className="flex justify-between items-start">
        <div>
          <ul className="text-amber-600">
            {event.endTime ? (
              <li>
                {format(parseISO(event.startDate), "EEEE, dd. MMMM yyyy", {
                  locale: de,
                })}{" "}
                von {event.startTime} bis {event.endTime}
              </li>
            ) : (
              <li>
                {format(parseISO(event.startDate), "EEEE, dd. MMMM yyyy", {
                  locale: de,
                })}{" "}
                um {event.startTime}
              </li>
            )}
          </ul>
          <h2 className="font-bold text text-gray-700">{event.title}</h2>
          <ul className="mb-2">
            <li className="text-sm text-gray-400/90">{event.location}</li>
          </ul>
        </div>
        <button onClick={handleClick}>
          <DotsVerticalIcon className="w-5 h-5" />
        </button>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
          <MenuItem onClick={editEvent}>Ändern</MenuItem>
          <MenuItem onClick={deleteEvent}>Löschen</MenuItem>
        </Menu>
      </div>
      {/* <p className="text-gray-600">{textIsOpen ? longText : shortText}</p> */}
      {textIsOpen && event.description.length > 300 ? (
        <>
          <p className="transition ease-in-out delay-150 whitespace-pre-wrap">
            {longText}
          </p>
          <button
            className="font-bold mr-2 mb-4 flex items-center"
            onClick={() => setTextIsOpen(!textIsOpen)}
          >
            Weniger anzeigen
            <ChevronUpIcon className="w-4 h-4 ml-1" aria-hidden="true" />
          </button>
        </>
      ) : (
        <>
          <p className="transition ease-in-out delay-150 whitespace-pre-wrap">
            {shortText}
          </p>
          {event.description.length > 300 ? (
            <button
              className="font-bold mr-2 mb-4 flex items-center"
              onClick={() => setTextIsOpen(!textIsOpen)}
            >
              Mehr anzeigen{" "}
              <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default Event;
