import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to={'/model1'}>01 Simple Rect</NavLink>
            <NavLink to={'/model2'}>02 Mozilla</NavLink>
            <NavLink to={'/model3'}>03 FWGL[01] 1st Vertex</NavLink>
        </div>
    );
};

export default Navigation;