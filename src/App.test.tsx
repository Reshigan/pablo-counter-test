import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the DoomsdayClock component', () => {
    render(<App />);

    expect(screen.getByText("World's Best Designed Doomsday Clock")).toBeInTheDocument();
    expect(screen.getByLabelText('Doomsday Clock')).toBeInTheDocument();
  });
});