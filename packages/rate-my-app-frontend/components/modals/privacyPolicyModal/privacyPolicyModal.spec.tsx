import { render, screen, fireEvent } from '@testing-library/react';
import PrivacyPolicyModal from './PrivacyPolicyModal';
// beforeEach(() => {
//   localStorage.deleteItem('cookie_policy');
// });

it('closed and set value to localStorage after click', () => {
  // localStorage.removeItem('cookie_policy');
  render(
    <PrivacyPolicyModal
      onAccept={() => {
        localStorage.setItem('cookie_policy', 'accepted');
      }}
    />,
  );
  const closeButton = screen.getByRole('button');
  fireEvent(closeButton, new MouseEvent('click'));
  expect(localStorage.getItem('cookie_policy')).toBe(null);
});
