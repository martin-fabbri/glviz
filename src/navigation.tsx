import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to={'/model1'}>01 Simple Rect</NavLink>
            <NavLink to={'/model2'}>02 Mozilla</NavLink>
        </div>
    );
};

export default Navigation;