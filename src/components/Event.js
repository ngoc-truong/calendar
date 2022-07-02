import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";

function Event({ event }) {
  const [textIsOpen, setTextIsOpen] = useState(false);

  let description = "";

  console.log(event.description);
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
    <div className="Moin">
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

      {/* <p className="text-gray-600">{textIsOpen ? longText : shortText}</p> */}
      {textIsOpen && event.description.length > 300 ? (
        <>
          <p className="transition ease-in-out delay-150 whitespace-pre-wrap">
            {longText}
          </p>
          <button
            className="font-bold"
            onClick={() => setTextIsOpen(!textIsOpen)}
          >
            Weniger anzeigen
          </button>
        </>
      ) : (
        <>
          <p className="transition ease-in-out delay-150 whitespace-pre-wrap">
            {shortText}
          </p>
          {event.description.length > 300 ? (
            <button
              className="font-bold"
              onClick={() => setTextIsOpen(!textIsOpen)}
            >
              Mehr anzeigen
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
