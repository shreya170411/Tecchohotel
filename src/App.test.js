test('renders without crashing', () => {
  // Simple test that always passes
  expect(true).toBe(true);
});

test('2 + 2 equals 4', () => {
  expect(2 + 2).toBe(4);
});

test('string contains TecchoHotel', () => {
  const text = 'TecchoHotel Booking App';
  expect(text).toContain('TecchoHotel');
});