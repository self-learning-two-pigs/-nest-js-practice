import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      path: context.getRequest().url,
      message: exception.message,
    });
  }
}
