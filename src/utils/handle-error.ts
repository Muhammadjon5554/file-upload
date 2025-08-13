import { HttpException } from '@nestjs/common';

export const handleError = (error: any) => {
  const massage = error.response?.massage || error.massage;
  const status = error.response?.statusCode || 500;
  throw new HttpException(massage, status);
};
