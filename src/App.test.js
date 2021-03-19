import { render, screen } from '@testing-library/react';
import App from './App';

function beatTime(date) {
  if (!date)
    date = new Date();
  let hours = (date.getUTCHours() == 23) ? 0 : date.getUTCHours() + 1;
  let mins = date.getUTCMinutes();
  let secs = date.getUTCSeconds();
  return Math.abs(((((hours * 60) + mins) * 60) + secs) / 86.4)
}

test('includes beat time element', () => {
  let start = parseFloat(beatTime().toFixed(2))
  render(<App />);
  const beatTimeElement = screen.getByTestId('beat-time');
  expect(beatTimeElement).toBeInTheDocument();
 });
