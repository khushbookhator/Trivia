import { Route, Switch } from "react-router"
import { FriendsQuestions } from "../Components/FriendsQuestion"
import { LandingPage } from "../Components/LandingPage"
import { GotQuestions } from "../Components/GotQuestions"
import { HimymQuestions } from "../Components/HimymQuestion"



function Routes() {
    return(
        <Switch>
            <Route exact path="/">
                <LandingPage/>
            </Route>
            <Route exact path="/friends">
                <FriendsQuestions/>
            </Route>
            <Route exact path="/got">
                <GotQuestions/>
            </Route>
            <Route exact path="/himym">
                <HimymQuestions/>
            </Route>
        </Switch>
    )
}

export {Routes}