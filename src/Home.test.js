test('Home test 1', () => {
  expect(1).toBe(1);
});

test('Home test 2', () => {
  const arr = [1, 2, 3];
  expect(arr).toHaveLength(3);
});

test('Home test 3', () => {
  const obj = { name: 'TecchoHotel' };
  expect(obj.name).toBe('TecchoHotel');
});