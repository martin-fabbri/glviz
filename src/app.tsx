import * as React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Model01 from './models/01-simple-rectangle';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <>
                    <Link to='01-simple-rectangle'>01-simple-rectangle</Link>

                    <Route path='01-simple-rectangle' component={Model01}/>
                </>
            </Router>
        );
    }
}


export default App;
