import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

function Event({ event }) {
  return (
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
            um {event.startTime} Uhr
          </li>
        )}
      </ul>
      <h2 className="font-bold text text-gray-700">{event.title}</h2>
      <ul className="mb-2">
        <li className="text-sm text-gray-400/90">{event.location}</li>
      </ul>
      <p className="text-gray-600 mb-6">
        {event.description.substring(0, 300)}...
      </p>
    </div>
  );
}

export default Event;
