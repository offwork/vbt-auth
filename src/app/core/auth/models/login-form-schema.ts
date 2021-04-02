export interface LoginFormSchema {
  userName: string;
  password: string;
  companyCode: string;
}

export interface Company {
  userID: number;
  key: string;
  url: string;
  createdTokenTime: Date;
  exceptionMessage: string;
}

export interface Response<T> {
  hasExceptionError: boolean;
  exceptionMessage: string;
  list: Array<T>;
  entity: T;
  isSuccessful: boolean;
}
