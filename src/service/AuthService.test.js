import AuthService from './AuthService';

jest.setTimeout(15000);

describe('Auth', () => {
  test('auth-service-login', async () => {
    var res = await AuthService.login(
      {
        username: 'aaa111',
        password: 'bbb111'
      });
    console.log(res);
    expect(res).toHaveProperty('expires_in');
  });

  test('auth-service-signup', async () => {
    var res = await AuthService.signUp(
      {
        name: 'aaaaa',
        email: 'rojarsmith@live.com',
        password: 'ccc11111'
      });
    console.log(res);
    expect(res).toHaveProperty('message');
  });
});
