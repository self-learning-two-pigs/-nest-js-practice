import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CountTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    console.log('start handle~~');
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        console.log('consume time in ms: ', end - start);
      }),
    );
  }
}
