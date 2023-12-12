export interface LoginDto {
  name: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  name: string;
}
