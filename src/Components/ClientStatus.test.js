import React from 'react';
import ReactDOM from 'react-dom';
import ClientStatus from './ClientStatus';
import { render,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test to check if the component renders without crashing
it('renders without crashing', () =>{
  const div =document.createElement('div');
  ReactDOM.render(<ClientStatus/>,div);
  ReactDOM.unmountComponentAtNode(div);
})

//test if the data is passing correctly
it('showing data correctly', () =>{
    const {getByTestId} = render(<ClientStatus name='My Signicat name' />);
    expect(getByTestId('clientName')).toHaveTextContent('My Signicat name');
  })
