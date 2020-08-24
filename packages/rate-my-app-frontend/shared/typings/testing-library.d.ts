import { RenderOptions, RenderResult } from '@testing-library/react';

declare module '@testing-library/react' {
  type OverrideRenderResult = {
    getByLabelText: <T extends HTMLElement>(text: string) => T;
    getByText: <T extends HTMLElement>(text: string) => T;
    getByTestId: <T extends HTMLElement>(text: string) => T;
  } & RenderResult;

  export function render(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'queries'>,
  ): OverrideRenderResult;
}
