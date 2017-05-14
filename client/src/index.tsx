import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/exampleStore';
import AppContainer from './containers/AppContainer';
import DashboardContainer from './containers/DashboardContainer';
import RegistrationFormContainer from './containers/RegistrationFormContainer';
import LessonCreatorContainer from './containers/LessonCreatorContainer';
import { MuiThemeProvider } from 'material-ui/styles';
import { loginCheck } from './actions/user';
import HomeContainer from './containers/HomeContainer';
import CourseContainer from './containers/CourseContainer';
import StudyContainer from './containers/StudyContainer';
import PracticeTakerContainer from './containers/PracticeTakerContainer';
import UserGradesContainer from './containers/UserGradesContainer';
import CourseGradesContainer from './containers/CourseGradesContainer';
import CourseStudentsContainer from './containers/CourseStudentsContainer';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Webpack
declare var module: any;
if (module.hot) module.hot.accept();

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(loginCheck());

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={AppContainer}>
                    <Route path='register' component={RegistrationFormContainer} />
                    <Route component={DashboardContainer}>
                        <IndexRoute component={HomeContainer} />
                        <Route path='lesson/:id' component={StudyContainer} />
                        <Route path='lesson/:id/take/:pid' component={PracticeTakerContainer} />
                        <Route path='lesson/:id/edit' component={LessonCreatorContainer} />
                        <Route path='course/:id' component={CourseContainer} />
                        <Route path='grades' component={UserGradesContainer} />
                        <Route path='course/:id/grades' component={CourseGradesContainer} />
                        <Route path='course/:id/students' component={CourseStudentsContainer} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);
