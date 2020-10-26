import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

test('', () => {
  render(<PrivacyPolicyModal />);
  expect(screen.getByTestId('div')).toBeDefined();
});
