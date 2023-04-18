import React, { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const calendarId = "rushev.alexey@gmail.com";
const API_KEY = "AIzaSyDKEc_XUSpc3aQVyIg_W5lDQWktpwffkUo";
const urlGet = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`;
const urlGoogleApi = 'http://localhost:3001/eventsGoogle'
const urlOutlookApi = 'http://localhost:3001/eventsOutlook'

const AgregatorCalendarPage = (props) => {
  //события гугл календаря
  const [eventsG, setEvents] = useState([]);

  //события из гугла для общего календаря
  const summaryEvents = eventsG.map((eventsGoogle) => eventsGoogle.summary);




  //проверка в консоли
  console.log("Название события FullCalendar: ", summaryEvents);
  //console.log("Начало события FullCalendar: ", startEvents);
  //console.log("Конец события FullCalendar: ", endEvents);

  //события Outlook
  const [eventsOutlook, setEventsOutlook] = useState([]);
  const apiOutlook = "http://localhost:3001/eventsOutlook";
  useEffect(() => {
    const getEventsOutlook = async () => {
      const { data: res } = await axios.get(apiOutlook);
      setEventsOutlook(res);
    };
    getEventsOutlook();
  }, []);
  console.log("Outlook Календарь: ", eventsOutlook)

  //события Google
  const [eventsGoogle, setEventsGoogle] = useState([])
  const apiGoogle = "http://localhost:3001/eventsGoogle"
  useEffect(() => {
    const getEventsGoogle = async () => {
      const { data: res } = await axios.get(apiGoogle)
      setEventsGoogle(res)
    }
    getEventsGoogle()
  }, [])
  console.log("Google календарь: ", eventsGoogle)



  //concat js
  const apiArrayCalendar = eventsGoogle.concat(eventsOutlook)
  console.log("apiArrayCalendar: ", apiArrayCalendar)

  const summaryEvents2 = apiArrayCalendar.map((eventsGoo) => eventsGoo.summary);
  const start2 = apiArrayCalendar.map((eventsElement) => eventsElement.start.dateTime)
  const end2 = apiArrayCalendar.map((eventsElement2) => eventsElement2.end.dateTime)
  console.log('start2: ', start2)
  console.log('end2: ', end2)

  //отрисовка календаря
  return (
    <>
      <div>Добро пожаловать на страницу Агрегатора календарей</div>
      <Fullcalendar
        locale={"ru"}
        editable
        selectable
        plugins={[dayGridPlugin, interactionPlugin]}
        buttonText={{
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День",
        }}
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        height={"90vh"}
        events={[
          { title: summaryEvents2[0], start: start2[0], end: end2[0] },
          { title: summaryEvents2[1], start: start2[1], end: end2[1] },
        ]}
      />
      <div>
      </div>
    </>
  );
};

export { AgregatorCalendarPage };








//пробное для гугла
/*useEffect(() => {
  axios.get(urlGet).then((data) => {
    if (data?.items) {
      console.log("События Google-Календаря (2): ", data.data.items);

      setEvents(formatEvents(data.data.items));
    }
  });
}, []);

const formatEvents = (list) => {
  return list.map((it) => ({
    title: it.summary,
    start: it.start.dateTime || it.start.date,
    end: it.end.dateTime || it.end.date,
  }));
};*/



  //для получения с двух серверов (Google and Outlook)
/*const [eventsAg, setEventsAg] = useState([]);

const urlsAgregator = [
  "http://localhost:3001/eventsOutlook",
  "http://localhost:3001/eventsGoogle",
];
useEffect(() => {
  async function fetchEventsAgregators() {
    const resultDataEvents = await Promise.all([
      axios.get("http://localhost:3001/eventsOutlook"),
      axios.get("http://localhost:3001/eventsGoogle"),
    ]);
    console.log("События двух календарей", resultDataEvents);
    setEventsAg(resultDataEvents);
    return resultDataEvents;
  }
  fetchEventsAgregators();
  Promise.all(urlsAgregator.map((url) => axios.get(url))).then((data) => {
    //setEventsAg(data.data);
    console.log("Получилось получить от двух серверов: ", data);
  });
}, []);
console.log("eventsAg: ", eventsAg);*/

  //получение события гугл
/*useEffect(() => {
  axios.get(urlGet).then((data) => {
    setEvents(data.data.items);
    console.log("События Google-Календаря: ", data.data.items);
  });
}, []);*/
