import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth/index';
import Feed from '../Routes/Feed';
import Explore from '../Routes/Explore/index';
import Search from '../Routes/Search/index';
import Profile from '../Routes/Profile/index';
import Post from '../Routes/Post';

const LoggedInRoutes = () =>
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/:username" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch>
;

const LoggedOutRoutes = () =>
    <>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </>
;

const AppRouter = ({ isLoggedIn }) =>
    isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>
;

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;