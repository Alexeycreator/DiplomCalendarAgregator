import React, { useState, useEffect } from "react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { Agenda, Login } from "@microsoft/mgt-react";
import GetEventsOutlook from "../Events/GetEventsOutlook";
import { Link } from "react-router-dom";

Providers.globalProvider = new Msal2Provider({
  clientId: "c57dfc54-2b21-4460-b42b-94025bada62b",
  scopes: [
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
  ],
});

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);
  return [isSignedIn];
}

function OutlookCalendar() {
  const [isSignedIn] = useIsSignedIn();

  return (
    <>
      <div>
        <header>
          <Login />
        </header>
      </div>
      <div>{isSignedIn && <h1><Link to="/calendarPage">Агрегатор каленадарей</Link></h1>}</div>
      <div>{isSignedIn && <Agenda />}</div>
      <div>{isSignedIn && <GetEventsOutlook />}</div>
    </>
  );
}

export default OutlookCalendar;







/*
старая версия авторизации Outlook календаря

import React, { Component } from "react";
import { config } from "./Config";
import { PublicClientApplication } from "@azure/msal-browser";
import { Button } from 'reactstrap';

class AuthOutlook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isAuthenticated: false,
      user: [],
    };
    this.login = this.login.bind(this);

    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    });
  }
  async login() {
    try {
      await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
      this.setState({ isAuthenticated: true });
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err,
      });
    }
  }

  logout() {
    this.publicClientApplication.logout();
  }

  render() {
    return (
      <div>
        <h1>Авторизация Outlook</h1>
        <p className='lead'>Нажмите кнопку ниже, чтобы авторизироваться</p>
        <div>
          {this.state.isAuthenticated ? (
            <p>Вы вошли</p>
          ) : (
            <p>
            <Button color='primary' onClick={() => this.login()}>Нажмите для входа</Button>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default AuthOutlook

*/