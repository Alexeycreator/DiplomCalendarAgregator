import React from "react";
import { Button } from "reactstrap";
import GetEventsGoogle from "../Events/GetEventsGoogle";
import { Link } from "react-router-dom";
import { CalendarPage } from "../../pages/CalendarPage";


class GoogleAuthBtn extends React.Component {
  state = {
    name: null,
  };

  componentDidMount() {
    window.gapi.load("auth2", function () {
      window.gapi.auth2
        .init({
          client_id:
            "792545294844-ileqc9i3mfs3h0uut7tou347j93onggp.apps.googleusercontent.com",
        })
        .then(
          () => console.log("init OK"),
          () => console.log("init ERR")
        );
    });
  }

  signIn = () => {
    const _authOk = (googleUser) => {
      this.setState({
        name: googleUser.getBasicProfile().getName(),
      });
    };

    const _authErr = () => {
      console.log("Auth Err");
    };

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signIn({
      scope: "profile email",
    }).then(_authOk, _authErr);
  };

  signOut = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(
      () => {
        this.setState({
          name: null,
        });
      },
      () => console.log("Err")
    );
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        {!name && (
          <Button color="primary" onClick={this.signIn}>
            Нажмите для входа
          </Button>
        )}
        {name && (
          <Button color="primary" onClick={this.signOut}>
            Нажмите для выхода
          </Button>
        )}
        {name && <GetEventsGoogle />}
      </div>
    );
  }
}

export default GoogleAuthBtn;












/*
старая версия авторизации гугл


import React from "react";

import { Button } from 'reactstrap';

class AuthG extends React.Component {
    state = {
        name: null,
    }

    componentDidMount() {
        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({
                    client_id: '792545294844-ileqc9i3mfs3h0uut7tou347j93onggp.apps.googleusercontent.com'
                })
                .then(() => console.log('init OK'), () => console.log('init ERR'))
        });
    }


    signIn = () => {
        const _authOk = (googleUser) => {
            this.setState({
                name: googleUser.getBasicProfile().getName()
            })
        }

        const _authErr = () => {
            console.log('Auth Err')
        }

        const GoogleAuth = window.gapi.auth2.getAuthInstance()
        GoogleAuth.signIn(
            {
                scope: 'profile email'
            }
        ).then(_authOk, _authErr)
    }

    signOut = () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance()
        GoogleAuth.signOut().then(() => {
            this.setState({
                name: null
            })
        }, () => console.log('Err'))
    }

    render() {
        const { name } = this.state
        return (
            <div>
                {name && <p>Добро пожаловать, {name}!</p>}
                <h1>Авторизация Google</h1>
                <p className='lead'>Нажмите кнопку ниже, чтобы авторизироваться</p>
                {!name && <Button color='primary' onClick={this.signIn}>Нажмите для входа</Button>}
                {name && <Button color='primary' onClick={this.signOut}>Нажмите для выхода</Button>}
            </div>
        )
    }
}

export default AuthG
*/