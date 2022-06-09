import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import AddUserForm from "./AddUserForm";
import AppDialog from "../../atoms/AppDialog";
import { UserListObj } from "../../../@types/models/apps/UserList";
import { Axios } from "../../../services/apis/MockConfig";

interface CreateUserProps {
  isAddUser: boolean;
  handleAddUserClose: () => void;
  onCreateUser?: (user: UserListObj) => void;
  totalUsers: number;
  selectedUser?: UserListObj | null;
  onUpdateUser?: (newUser: UserListObj) => void;
}

const CreatUser: React.FC<CreateUserProps> = ({
  isAddUser,
  handleAddUserClose,
  selectedUser,
  onUpdateUser,
  onCreateUser,
  totalUsers,
}) => {
  const validationSchema = yup.object({
    name: yup.string().required("이름을 입력하세요 :("),
    email: yup
      .string()
      .email("이메일이 유효하지 않은 형식입니다 :(")
      .required("이메일을 입력하세요 :("),
    contact: yup.string().required("폰 번호를 입력하세요 :("),
    address: yup.string().required("주소를 입력하세요 :("),
  });

  const [userImage, setUserImage] = useState(
    selectedUser && selectedUser.image
      ? selectedUser.image
      : "/assets/images/placeholder.jpg"
  );
  useEffect(() => {
    setUserImage(
      selectedUser && selectedUser.image
        ? selectedUser.image
        : "/assets/images/placeholder.jpg"
    );
  }, [selectedUser]);
console.log(113);

  return (
    <AppDialog
      fullHeight
      open={isAddUser}
      onClose={() => handleAddUserClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectedUser ? selectedUser.name : "",
          email: selectedUser ? selectedUser.email : "",
          contact: selectedUser ? selectedUser.contact : "",
          address:
            selectedUser && selectedUser.address
              ? selectedUser.address
              : "",
          active:
            selectedUser && selectedUser.active
              ? selectedUser.active
              : "1",
          notes:
            selectedUser && selectedUser.notes
              ? selectedUser.notes
              : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedUser) {
            // NOTE:수정 부분
            const newUser = {
              id: selectedUser.id,
              image: userImage,
              ...data,
            };
            //TODO: 수정 데이터 처리
            // dispatch(onUpdateSelectedContact(newUser as UserListObj));
            //FORTEST:타입스크립트 문법, !는 null/undeifned이 될수 없다, 넘어가 란 뜻
            onUpdateUser!(newUser as UserListObj);
          } else {
            //NOTE:추가 부분
            const newContact = {
              id: totalUsers + 1,
              image: userImage,
              ...data,
            };
            console.log("====================================");
            console.log("호충ㄹ함수 ", newContact);
            console.log("====================================");

            onCreateUser!(newContact as UserListObj);
          }
          handleAddUserClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddUserForm
            type={selectedUser ? "수정" : "추가"}
            setUserImage={setUserImage}
            userImage={userImage}
            values={values as UserListObj}
            setFieldValue={setFieldValue}
            handleAddUserClose={handleAddUserClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreatUser;
