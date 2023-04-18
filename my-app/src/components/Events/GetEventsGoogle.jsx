import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const calendarId = "rushev.alexey@gmail.com";
const API_KEY = "AIzaSyDKEc_XUSpc3aQVyIg_W5lDQWktpwffkUo";
const urlGet = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`;

const GetEventsGoogle = () => {
  //для корректного отображения даты
  window.moment = moment();
  moment.locale("ru");

  //хранение данных о событиях
  const [eventsGoogle, setEventsGoogle] = useState([]);

  //сортировка по столбцам
  const sortEventsGoogle = (eventsGoogleSort) => {
    console.log(eventsGoogleSort);

    const copyEventsGoogle = eventsGoogle.concat();

    const sortEventsGoogle = copyEventsGoogle.sort((a, b) => {
      return a[eventsGoogleSort] > b[eventsGoogleSort] ? 1 : -1;
    });

    setEventsGoogle(sortEventsGoogle);
  };

  //получение данных о событиях
  useEffect(() => {
    axios.get(urlGet).then((data) => {
      setEventsGoogle(data.data.items);
      console.log(data.data.items);
    });
  }, []);

  //орисовка таблицы с событиями календаря Google
  return (
    <>
      <br />
      <h1><Link to="/calendarPage">Агрегатор каленадарей</Link></h1>
      <div>События Google-календаря</div>
      <div></div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => {
                  sortEventsGoogle("summary");
                }}
              >
                Название события
              </th>
              <th
                onClick={() => {
                  sortEventsGoogle("description");
                }}
              >
                Описание события
              </th>
              <th
                onClick={() => {
                  sortEventsGoogle("location");
                }}
              >
                Местоположение
              </th>
              <th
                onClick={() => {
                  sortEventsGoogle("start.dateTime");
                }}
              >
                Начало события
              </th>
              <th
                onClick={() => {
                  sortEventsGoogle("end.dateTime");
                }}
              >
                Конец события
              </th>
              <th
                onClick={() => {
                  sortEventsGoogle("creator.email");
                }}
              >
                Создатель
              </th>
            </tr>
          </thead>
          <tbody>
            {eventsGoogle.map((eventsG) => (
              <tr key={eventsG.id}>
                <td>{eventsG.summary}</td>
                <td>{eventsG.description}</td>
                <td>{eventsG.location}</td>
                <td>{moment(eventsG.start.dateTime).format("LLL")}</td>
                <td>{moment(eventsG.end.dateTime).format("LLL")}</td>
                <td>{eventsG.creator.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <a
        className="primary-cta"
        href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
        target="_blank"
      >
        Добавить/изменить/удалить событие Google
      </a>
    </>
  );
};

export default GetEventsGoogle;
