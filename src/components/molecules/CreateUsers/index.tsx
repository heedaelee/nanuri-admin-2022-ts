import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import {
  onCreateContact,
  onUpdateSelectedContact,
} from "../../../../redux/actions/ContactApp";
import AddContactForm from "./AddContactForm";
import AppDialog from "@crema/core/AppDialog";
import { UserListObj } from "../../../@types/models/apps/UserList";

interface CreateUserProps {
  isAddUser: boolean;
  handleAddUserClose: () => void;
  selectedUser?: UserListObj | null;
  onUpdateUser?: (newUser: UserListObj) => void;
}

const CreatUser: React.FC<CreateUserProps> = ({
  isAddUser,
  handleAddUserClose,
  selectedUser,
  onUpdateUser,
}) => {
  const validationSchema = yup.object({
    name: yup.string().required("이름을 입력하세요 :("),
    email: yup
      .string()
      .email("이메일이 유효하지 않은 형식입니다 :(")
      .required("이메일을 입력하세요 :("),
    contact: yup.string().required("폰 번호를 입력하세요 :("),
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
          notes:
            selectedUser && selectedUser.notes
              ? selectedUser.notes
              : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedUser) {
            const newUser = {
              id: selectedUser.id,
              image: userImage,
              ...data,
            };
            dispatch(onUpdateSelectedContact(newUser as UserListObj));
            onUpdateUser!(newUser as UserListObj);
          } else {
            const newContact = {
              id: Math.floor(Math.random() * 1000),
              isStarred: false,
              isFrequent: Math.random() > 0.5,
              image: userImage,
              ...data,
            };
            dispatch(onCreateContact(newContact as UserListObj));
          }
          handleAddUserClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddContactForm
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
