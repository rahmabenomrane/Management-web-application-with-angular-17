import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
   
  const token = localStorage.getItem('token');

  let headers = new HttpHeaders()
    .set("DEVICE-ID", "web")
    .set("APP-ID", "cc9259a2df493dbe9314c53fe8fdd902")


  if (token !== null) {
    headers = headers.append("Authorization", token)
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};