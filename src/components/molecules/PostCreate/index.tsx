import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { post } from "../../../@types/models/apps/PostList";
import { UserListObj } from "../../../@types/models/apps/UserList";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import {
  onCreatePost,
  // onCreateUser,
  onUpdatePost,
} from "../../../modules/postListModule";
import AppDialog from "../../atoms/AppDialog";
import AddPostForm from "./AddPostForm";

interface CreatePostProps {
  isAddPost: boolean;
  handleAddPostClose: () => void;
  totalPosts: number;
  selectedPost?: post | null;
  onGetList: (params?: any) => void;
  setSelectedPost?: (post: post) => void;
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}
const CreatePost: React.FC<CreatePostProps> = ({
  isAddPost,
  handleAddPostClose,
  selectedPost,
  totalPosts,
  onGetList,
  setSelectedPost,
}) => {
  const { setMessage, setError } = useContext(AppInfoContext);

  // const validationSchema = yup.object().shape({
  //   name: yup.string().required("이름을 입력하세요 :("),
  //   email: yup
  //     .string()
  //     .email("이메일이 유효하지 않은 형식입니다 :(")
  //     .required("이메일을 입력하세요 :("),
  //   contact: yup.string().required("폰 번호를 입력하세요 :("),
  //   address: yup.string().required("주소를 입력하세요 :("),
  //   min_participants: yup.number().min(2, "2명 이상 선택해주세요!"),
  //   max_participants: yup
  //     .number()
  //     .max(100, "100명 이하로 선택해주세요!")
  //     .when("min_participants", (min_participants): any => {
  //       if (min_participants) {
  //         return yup
  //           .number()
  //           .min(min_participants + 1, "최소인원을 넘어야 합니다");
  //       }
  //     }),
  // });

  //되는 코드, 예비용
  const validationSchema = (props: any) => {
    return yup.lazy((values) => {
      console.log("validtaion test : ", values);
      return yup.object().shape({
        title: yup.string().required("제목을 입력하세요 :("),
        product_url: yup
          .string()
          .url("유효하지 않은 url 형식입니다 :(")
          .required("url을 입력하세요 :("),
        unit_price: yup.string().required("폰 번호를 입력하세요 :("),
        min_participants: yup
          .number()
          .min(2, "2명 이상 선택해주세요!"),
        max_participants: yup
          .number()
          .min(values.min_participants, "최소인원을 넘어야 합니다")
          .max(100, "100명 이하로 선택해주세요!"),
        category: yup.string(),
      });
    });
  };

  const [postImage, setPostImage] = useState(
    selectedPost && selectedPost.image ? selectedPost.image : null
  );
  useEffect(() => {
    setPostImage(
      selectedPost && selectedPost.image ? selectedPost.image : null
    );
  }, [selectedPost]);

  return (
    <AppDialog
      fullHeight
      open={isAddPost}
      onClose={() => handleAddPostClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          title: selectedPost ? selectedPost.title : "",
          product_url: selectedPost ? selectedPost.product_url : "",
          unit_price: selectedPost ? selectedPost.unit_price : "",
          writer_address:
            selectedPost && selectedPost.writer_address
              ? selectedPost.writer_address
              : "",
          min_participants:
            selectedPost && selectedPost.min_participants
              ? selectedPost.min_participants
              : "",
          max_participants:
            selectedPost && selectedPost.max_participants
              ? selectedPost.max_participants
              : "",
          waited_from:
            selectedPost && selectedPost.waited_from
              ? selectedPost.waited_from
              : new Date().toISOString().slice(0, 10), //디폴트를 오늘로
          waited_until:
            selectedPost && selectedPost.waited_from
              ? selectedPost.waited_from
              : new Date().toISOString().slice(0, 10), //디폴트를 오늘로
          description:
            selectedPost && selectedPost.description
              ? selectedPost.description
              : "",
          category:
            selectedPost && selectedPost.category
              ? selectedPost.category
              : "",
          trade_type:
            selectedPost && selectedPost.trade_type
              ? selectedPost.description
              : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedPost) {
            // NOTE:수정 부분
            const editedPost = {
              uuid: selectedPost.uuid,
              image: postImage,
              ...data,
            };
            //FORTEST:타입스크립트 문법, !는 null/undeifned이 될수 없다, 넘어가 란 뜻
            onUpdatePost!(
              editedPost as post,
              onGetList!,
              setMessage,
              setError
            );
            setSelectedPost && setSelectedPost(editedPost as post);
            handleAddPostClose();
            resetForm();
            setSubmitting(false);
          } else {
            //NOTE:추가 부분
            const newPost = {
              uuid: uuidv4(),
              image: postImage,
              ...data,
            };
            onCreatePost!(
              newPost as post,
              onGetList!,
              setMessage,
              setError
            );
          }
          handleAddPostClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddPostForm
            type={selectedPost ? "수정" : "추가"}
            setPostImage={setPostImage}
            postImage={postImage}
            values={values as post}
            setFieldValue={setFieldValue}
            handleAddPostClose={handleAddPostClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreatePost;
