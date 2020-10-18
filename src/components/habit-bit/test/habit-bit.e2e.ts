import { newE2EPage } from '@stencil/core/testing';

describe('habit-bit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<habit-bit></habit-bit>');

    const element = await page.find('habit-bit');
    expect(element).toHaveClass('hydrated');
  });
});
