import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-white">
                    <Link class="navbar-brand" to="#">Агрегатор календарей</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/">Главная страница</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/infoPage">Информация</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/welcomeGoogle">Авторизация Google</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/welcomeOutlook">Авторизация Outlook</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export { Navigation }