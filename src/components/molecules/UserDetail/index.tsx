import React from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";



interface UserDetailProps {
  isShowDetail: boolean;
  selectedUser: UserListObj | null;
  onShowDetail: (show: boolean) => void;
  onSelectUsersForDelete: (ids: number[]) => void;
  onOpenEditUser: (contact: UserListObj | null) => void;
}

const UserDetail = ({}: UserDetailProps) => {
  return <div>UserDetailProps</div>;
};

export default UserDetail;
