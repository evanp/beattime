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

test('shows current @beat time', done => {
  let start = parseFloat(beatTime().toFixed(2))
  render(<App />);
  const beatTimeElement = screen.getByTestId('beat-time');
  let end = parseFloat(beatTime().toFixed(2))
  expect(beatTimeElement).toBeInTheDocument();
  let beatsText = beatTimeElement.textContent
  expect(beatsText).toMatch(/^@\d{0,3}\.\d{2}$/)
  let beatsTextValue = parseFloat(beatsText.slice(1))
  expect(beatsTextValue).toBeGreaterThanOrEqual(start)
  expect(beatsTextValue - start).toBeLessThanOrEqual(end - start)
  setTimeout(() => {
    try {
      start = parseFloat(beatTime().toFixed(2))
      const beatTimeElement2 = screen.getByTestId('beat-time');
      end = parseFloat(beatTime().toFixed(2))
      let beatsText2 = beatTimeElement2.textContent
      let beatsTextValue2 = parseFloat(beatsText2.slice(1))
      expect(beatsTextValue2).toBeGreaterThanOrEqual(start)
      expect(beatsTextValue2 - start).toBeLessThanOrEqual(end - start)
      done()
    } catch(err) {
      done(err)
    }
  }, 2000)
});
