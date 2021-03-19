import { render, screen } from '@testing-library/react';
import BeatClock from './BeatClock';

function beatTime(date) {
  if (!date)
    date = new Date();
  let hours = (date.getUTCHours() == 23) ? 0 : date.getUTCHours() + 1;
  let mins = date.getUTCMinutes();
  let secs = date.getUTCSeconds();
  return Math.abs(((((hours * 60) + mins) * 60) + secs) / 86.4)
}

test('shows current @beat time', () => {
  let start = parseFloat(beatTime().toFixed(2))
  render(<BeatClock />);
  const beatTimeElement = screen.getByTestId('beat-time');
  let end = parseFloat(beatTime().toFixed(2))
  expect(beatTimeElement).toBeInTheDocument();
  let beatText = beatTimeElement.textContent
  expect(beatText).toMatch(/^@\d{0,3}\.\d{2}$/)
  let beatTextValue = parseFloat(beatText.slice(1))
  expect(beatTextValue).toBeGreaterThanOrEqual(start)
  expect(beatTextValue - start).toBeLessThanOrEqual(end - start)
});

test('@beat time updates automatically', done => {
  render(<BeatClock />);
  const beatTimeElement = screen.getByTestId('beat-time');
  expect(beatTimeElement).toBeInTheDocument();
  let beatText = beatTimeElement.textContent
  expect(beatText).toMatch(/^@\d{0,3}\.\d{2}$/)
  let beatTextValue = parseFloat(beatText.slice(1))
  setTimeout(() => {
    try {
      let start = parseFloat(beatTime().toFixed(2))
      const beatTimeElement2 = screen.getByTestId('beat-time');
      let end = parseFloat(beatTime().toFixed(2))
      let beatText2 = beatTimeElement2.textContent
      let beatTextValue2 = parseFloat(beatText2.slice(1))
      expect(beatTextValue2).toBeGreaterThan(beatTextValue)
      expect(beatTextValue2).toBeGreaterThanOrEqual(start)
      expect(beatTextValue2 - start).toBeLessThanOrEqual(end - start)
      done()
    } catch(err) {
      done(err)
    }
  }, 1000)
});
