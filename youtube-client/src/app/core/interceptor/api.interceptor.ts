import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://www.googleapis.com/youtube/v3';

// const key = 'AIzaSyDCTITxmwZEvabIToN4n2cRc0xHcVX_FZM';
// const key = 'AIzaSyAZG3aI3kw1IoSxOhauhFne4PrdW-W8SxI';
const key = 'AIzaSyAQk_6H0jPJgn0beB1UADD2B2lG6G7Az4k';
// const key = 'AIzaSyD6BPolFqadEkCkmgn5HT7SynK3igkrm6M';

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
