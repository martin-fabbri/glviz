import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Model01 from './models/01-simple-rectangle';
import Navigation from './navigation';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <>
                    <Navigation/>
                    <Switch>
                        <Route path='/' component={Model01} exact={true} />
                        <Route component={Model01} />
                    </Switch>
                </>
            </Router>
        );
    }
}


export default App;
