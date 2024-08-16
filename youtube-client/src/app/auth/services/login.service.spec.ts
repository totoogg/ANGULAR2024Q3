import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: 'Logger',
        useValue: {
          logMessage() {},
        },
      }],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('encode() should return "97|98|99"', () => {
    expect(service.encode('abc')).toBe('97|98|99');
  });

  it('decoder()', () => {
    const result = {
      login: 'abc',
      password: 'abc',
    };

    expect(service.decoder('97|98|99|124|116|111|107|101|110|124|97|98|99')).toStrictEqual(result);
  });

  it('userName()', () => {
    service.userName('abc');

    expect(service.user).toBe('abc');
  });

  it('userLogin()', (done) => {
    service.userLogin('abc', 'abc');

    expect(service.user).toBe('abc');
    expect(service.stor).toBe(JSON.stringify('97|98|99|124|116|111|107|101|110|124|97|98|99'));
    expect(lastValueFrom(service.isLogin$)).resolves.toEqual(true);
    done();
  });

  it('repeatedLoginUser()', (done) => {
    service.stor = JSON.stringify('97|98|99|124|116|111|107|101|110|124|97|98|99');
    service.repeatedLoginUser();

    expect(service.user).toBe('abc');
    expect(service.stor).toBe(JSON.stringify('97|98|99|124|116|111|107|101|110|124|97|98|99'));
    expect(lastValueFrom(service.isLogin$)).resolves.toEqual(true);
    done();
  });

  it('userLogout()', (done) => {
    service.userLogout();

    expect(service.user).toBe('Your Name');
    expect(service.stor).toBe(null);
    expect(lastValueFrom(service.isLogin$)).resolves.toEqual(false);
    done();
  });
});
