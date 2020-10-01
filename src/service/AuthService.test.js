import AuthService from './AuthService';
var uuid = require('uuid');

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
    let suuid4 = uuid.v1().substring(0, 4);
    let suuid8 = uuid.v1().substring(0, 8);

    var res = await AuthService.signUp(
      {
        name: 'aaaaa' + suuid4,
        email: suuid4 + 'rojarsmith@live.com',
        password: 'ccc11111'
      });
    if (res.data) {
      console.log(res.data);
    }
    expect(res).toHaveProperty('message');
  });
});
