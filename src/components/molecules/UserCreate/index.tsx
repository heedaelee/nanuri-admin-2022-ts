import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { UserObj_req } from "../../../@types/models/apps/UserList";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import {
  onCreateUser,
  onUpdateUser,
} from "../../../modules/userListModule";
import AppDialog from "../../atoms/AppDialog";
import AddUserForm from "./AddUserForm";

interface CreateUserProps {
  isAddUser: boolean;
  handleAddUserClose: () => void;
  totalUsers: number;
  selectedUser?: UserObj_req | null;
  onGetList: (params?: any) => void;
  setSelectedUser?: (user: UserObj_req) => void;
}

const UserCreate: React.FC<CreateUserProps> = ({
  isAddUser,
  handleAddUserClose,
  selectedUser,
  totalUsers,
  onGetList,
  setSelectedUser,
}) => {
  const { setMessage, setError } = useContext(AppInfoContext);

  const validationSchema = yup.object({
    nickname: yup.string().required("이름을 입력하세요 :("),
    email: yup
      .string()
      .email("이메일이 유효하지 않은 형식입니다 :(")
      .required("이메일을 입력하세요 :("),
    password: yup.string().required("비밀번호을 입력하세요 :("),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호를 확인하세요 :("),
  });

  const [profile, setProfile] = useState(
    selectedUser && selectedUser.profile ? selectedUser.profile : null
  );
  useEffect(() => {
    setProfile(
      selectedUser && selectedUser.profile
        ? selectedUser.profile
        : null
    );
  }, [selectedUser]);

  return (
    <AppDialog
      fullHeight
      open={isAddUser}
      onClose={() => handleAddUserClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          nickname: selectedUser ? selectedUser.nickname : "",
          email: selectedUser ? selectedUser.email : "",
          // contact: selectedUser ? selectedUser.contact : "",
          password:
            selectedUser && selectedUser.password
              ? selectedUser.password
              : "",
          passwordConfirm: undefined,
          is_active:
            selectedUser && selectedUser.is_active
              ? selectedUser.is_active
              : true,
          is_admin:
            selectedUser && selectedUser.is_admin
              ? selectedUser.is_admin
              : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          delete data.passwordConfirm;
          if (selectedUser) {
            // NOTE:수정 부분
            const editedUser = {
              profile: profile,
              ...data,
            };
            //TODO: 수정 데이터 처리
            // dispatch(onUpdateSelectedContact(newUser as UserListObj));
            //FORTEST:타입스크립트 문법, !는 null/undeifned이 될수 없다, 넘어가 란 뜻
            onUpdateUser!(
              editedUser,
              onGetList!,
              setMessage,
              setError
            );
            setSelectedUser &&
              setSelectedUser(editedUser as UserObj_req);
            handleAddUserClose();
            resetForm();
            setSubmitting(false);
          } else {
            //NOTE:추가 부분
            const newUser = {
              profile: profile,
              ...data,
            };
            onCreateUser!(
              newUser as UserObj_req,
              onGetList!,
              setMessage,
              setError
            );
          }
          handleAddUserClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddUserForm
            type={selectedUser ? "수정" : "추가"}
            setUserImage={setProfile}
            userImage={profile}
            values={values as UserObj_req}
            setFieldValue={setFieldValue}
            handleAddUserClose={handleAddUserClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default UserCreate;
