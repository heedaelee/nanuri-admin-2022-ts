import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import {
  category,
  postObj_req,
  postObj_res,
} from "../../../@types/models/apps/PostList";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import { uuidv4 } from "../../../lib/util/otherUtills";
import {
  onCreatePost,
  onUpdatePost,
} from "../../../modules/postListModule";
import AppDialog from "../../atoms/AppDialog";
import AddPostForm from "./AddPostForm";

interface CreatePostProps {
  isAddPost: boolean;
  handleAddPostClose: () => void;
  // totalPosts: number;
  selectedPost?: postObj_res | null;
  onGetList: () => void;
  setSelectedPost?: (post: postObj_res) => void;
  // resImageObjarr: { file: string; isRep: boolean }[] | [];
}

// function uuidv4() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c === "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }

const CreatePost: React.FC<CreatePostProps> = ({
  isAddPost,
  handleAddPostClose,
  selectedPost,
  // totalPosts,
  onGetList,
  setSelectedPost,
  // resImageObjarr,
}) => {
  const { setMessage, setError } = useContext(AppInfoContext);

  let postImageObj: { file: File; isRep: boolean }[] | [] = [];
  const [postImage, setPostImage] = useState(postImageObj);

  // console.log("postImage는? : ");
  // console.dir(postImage);

  // just showing image
  let resImageObjarr: { file: string; isRep: boolean }[] = [];
  /*기능 : 선택된 post의 대표image 랑 각images 합쳐서 배열로 만들기*/

  // console.log("selectedPost : ");
  // console.dir(selectedPost);

  if (postImage.length > 0) {
    //resImage를 초기화 시켜줘야 postImage를 반영해 띄울수 있다.
    resImageObjarr = [];
  } else {
    if (selectedPost && selectedPost.image) {
      resImageObjarr.push({ file: selectedPost.image, isRep: true });
      if (selectedPost.images) {
        for (let v of selectedPost.images) {
          resImageObjarr.push({ file: v, isRep: false });
        }
      }
    }
  }

  // console.log("selectedPost : ");
  // console.dir(resImageObjarr);

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
        unit_price: yup.number().required("희망가를 입력하세요 :("),
        min_participants: yup
          .number()
          .required("최소인원을 입력하세요 :(")
          .min(2, "2명 이상 선택해주세요!"),
        max_participants: yup
          .number()
          .required("최대인원을 입력하세요 :(")
          .min(values.min_participants, "최소인원을 넘어야 합니다")
          .max(100, "100명 이하로 선택해주세요!"),
        category: yup
          .mixed<category["category"]>()
          .oneOf(["생활용품", "음식", "주방", "욕실", "문구", "기타"])
          .required("카테고리를 설정하세요 :("),
        trade_type: yup.string().required("배송방법을 설정하세요 :("),
        quantity: yup.number().required("가격을 입력하세요 :("),
      });
    });
  };

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
          quantity: selectedPost ? selectedPost.quantity : "",
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
              ? typeof selectedPost.waited_from === "string"
                ? selectedPost.waited_from.slice(0, 10)
                : selectedPost.waited_from.toLocaleDateString()
              : new Date().toISOString().slice(0, 10), //디폴트를 오늘로
          waited_until:
            selectedPost && selectedPost.waited_until
              ? typeof selectedPost.waited_until === "string"
                ? selectedPost.waited_until.slice(0, 10)
                : selectedPost.waited_until.toLocaleDateString()
              : new Date().toISOString().slice(0, 10), //디폴트를 오늘로
          description:
            selectedPost && selectedPost.description
              ? selectedPost.description
              : "",
          category:
            selectedPost && selectedPost.category
              ? selectedPost.category
              : "생활용품",
          trade_type:
            selectedPost && selectedPost.trade_type
              ? selectedPost.trade_type
              : "DIRECT",
          order_status:
            selectedPost && selectedPost.order_status
              ? selectedPost.order_status
              : "WAITING",
          is_published:
            selectedPost && selectedPost.is_published
              ? selectedPost.is_published
              : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const waited_from = new Date(data.waited_from)
            .toISOString()
            .slice(0, 10);

          //NOTE: 현재 버전에선 images는 안쓰고 image로 사진 1장만 upload
          // -> image images 다 사용하는걸로 변경 8/8
          let image: File | undefined;
          let images: File[] = [];

          image = postImage.map((val, i) => {
            if (val.isRep) {
              return val.file;
            }
            images.push(val.file);
          })[0];

          //File 객체
          console.log("업로드 되는 img : ", image);
          //File 객체 배열
          console.log("업로드 되는 imgs : ", images);

          if (selectedPost) {
            // NOTE:수정 부분
            const editedPost: any = {
              ...data,
              uuid: selectedPost.uuid,
              waited_from: waited_from,
            };

            image && (editedPost["image"] = image);
            images && (editedPost["images"] = images);

            const formData = new FormData();
            for (let key in editedPost) {
              formData.append(key, editedPost[key]);
            }

            console.log("form data in editedPost : ");
            console.dir(formData);

            for (let [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }
            // //FORTEST:타입스크립트 문법, !는 null/undeifned이 될수 없다, 넘어가 란 뜻
            // //NOTE:보류
            onUpdatePost!(
              selectedPost.uuid,
              formData,
              onGetList!,
              setMessage,
              setError
            );
            // setSelectedPost &&
            //   setSelectedPost(editedPost as postObj_req);
            handleAddPostClose();
            resetForm();
            setSubmitting(false);
          } else {
            //NOTE:추가 부분
            let newPost: any = {
              ...data,
              category: data.category as category["category"],
              // image: repImage,
              // images: images,
              // waited_from: waited_from,
            };
            image && (newPost["image"] = image);
            images && (newPost["images"] = images);
            console.log("====================================");
            console.log("newPost : ", newPost);
            console.log("====================================");

            const formData = new FormData();
            for (let key in newPost) {
              formData.append(key, newPost[key]);
            }

            console.dir(formData);

            for (let [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }

            //NOTE:보류
            onCreatePost!(
              // newPost as postObj_req,
              formData,
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
            values={values as postObj_res}
            setFieldValue={setFieldValue}
            handleAddPostClose={handleAddPostClose}
            resImageObjarr={resImageObjarr}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreatePost;
