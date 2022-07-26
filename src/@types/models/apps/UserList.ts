export interface UserObj {
  address: string | null;
  auth_provider: string;
  created_at: string;
  email: string;
  favorite_posts: any[];
  is_active: boolean;
  is_admin: boolean;
  last_login: string | null;
  latitude: string | null;
  longitude: string | null;
  nickname: string | null;
  posts: [];
  profile: string | null;
  updated_at: string;
  uuid: string;
}

export interface userListObj {
  count: number;
  next: string;
  previous: string;
  results: UserObj[];
}
