import { render, screen, fireEvent } from '@testing-library/react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

it('closed and set value to localStorage after click', () => {
  render(
    <PrivacyPolicyModal
      onAccept={() => {
        localStorage.setItem('cookie_policy', 'accepted');
      }}
    />,
  );
  const closeButton = screen.getByRole('button');
  fireEvent.click(closeButton);
  expect(localStorage.getItem('cookie_policy')).toBe('accepted');
});
