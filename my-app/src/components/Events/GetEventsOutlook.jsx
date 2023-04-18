import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const urlGetOutlook = 'http://localhost:3001/eventsOutlook'

const GetEventsOutlook = () => {
    //для корректного отображения даты
    window.moment = moment();
    moment.locale("ru");

    //хранение данных о событиях
    const [eventsOutlook, setEventsOutlook] = useState([]);

    //получение данных о событиях
    useEffect(() => {
        axios.get(urlGetOutlook).then((data) => {
            setEventsOutlook(data.data);
            console.log(data.data);
        });
    }, []);

    //орисовка таблицы с событиями календаря Google
    return (
        <>
            <div>События Outlook-календаря</div>
            <div></div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th
                            >
                                Название события
                            </th>
                            <th
                            >
                                Описание события
                            </th>
                            <th

                            >
                                Местоположение
                            </th>
                            <th

                            >
                                Начало события
                            </th>
                            <th

                            >
                                Конец события
                            </th>
                            <th
                            >
                                Создатель
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsOutlook.map((eventsO) => (
                            <tr key={eventsO.id}>
                                <td>{eventsO.summary}</td>
                                <td>{eventsO.description}</td>
                                <td>{eventsO.location}</td>
                                <td>{moment(eventsO.start.dateTime).format("LLL")}</td>
                                <td>{moment(eventsO.end.dateTime).format("LLL")}</td>
                                <td>{eventsO.creator.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetEventsOutlook;