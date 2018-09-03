import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Header from '../components/Header';


describe('Header'. () => {
    it('should render correctly in "DEBUG" mode', () => {
        const component = shallow(<Header debug />);
        expect(component).toMatchSnapshot();
    })
}) 