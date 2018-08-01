import React from "react";
import {Route, Switch} from "react-router-dom";
import LoginPage from './loginPage';
import homePage from './homePage';
import register from './register';


const AppRoutes = () => (
    <main>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/homePage" component={homePage} />
            <Route path="/register" component={register} />
        </Switch>
    </main>
);

export default AppRoutes;
