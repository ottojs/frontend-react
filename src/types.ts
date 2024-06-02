export interface ApiRequest {
  id?: string;
}

export interface ApiResponse {
  status: string;
  data: {
    session?: DataSession;
    sessions?: DataSession[];
    task?: DataTask;
    tasks?: DataTask[];
    user?: DataUser;
    users?: DataUser[];
    account?: DataAccount;
    accounts?: DataAccount[];
  };
}

export type CurrentSession = {
  session: DataSession;
  user: DataUser;
  accounts: DataAccount[];
};

export type DataSessionReq = {
  username: string;
  password: string;
};
export type DataSession = {
  id: string;
  user_id: number;
  max_age: number;
  deleted_reason: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type DataUser = {
  id?: string;
  username?: string;
  name_first?: string;
  name_last?: string;
  color?: string;
  picture: string | null;
  picture_prefix?: string;
};
export type DataUserReq = {
  username: string;
  password: string;
  code: string;
};

export type DataAccount = {
  id: string;
  name: string;
};

export type DataTask = {
  id?: string;
  title: string;
  description: string;
  order: number;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
};
