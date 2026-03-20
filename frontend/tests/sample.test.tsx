import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/app/App';

test('renders app root', () => {
  render(<App />);
  expect(screen.getByText(/daily puzzle/i)).toBeInTheDocument();
});
