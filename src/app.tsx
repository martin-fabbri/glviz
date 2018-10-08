import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Model01 from './models/01-simple-rectangle';
import Model02 from './models/02-ff-colors';
import Model03 from './models/03-fwwgl-vertex';
import Navigation from './navigation';

const Container = styled.div`
    background: DeepSkyBlue ;
    width: 100%
    height: 100vh;
`;

class App extends React.Component {
    public render() {
        return (
            <Router>
                <Container>
                    <Navigation/>
                    <Switch>
                        <Route path='/model1' component={Model01} exact={true} />
                        <Route path='/model2' component={Model02} exact={true} />
                        <Route path='/model3' component={Model03} exact={true} />
                        <Route component={Model01} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}


export default App;
