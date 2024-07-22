import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, key } from '../../environments/environments';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const reqUrl = req.clone({
    url: `${API_URL}/${req.url}`,
    params: req.params.set('key', key),
  });
  return next(reqUrl);
};
