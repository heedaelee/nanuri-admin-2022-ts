import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parseISO } from "date-fns";
import { Form } from "formik";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { postObj_res } from "../../../@types/models/apps/PostList";
import Theme from "../../../lib/Theme";
import { rem } from "../../../lib/util/otherUtills";
import AppSelectField from "../../atoms/AppFormComponents/AppSelectField";
import AppTextField from "../../atoms/AppFormComponents/AppTextField";
import Button from "../../atoms/Button";

const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.divider}`,
  };
});

const ButtonWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
  };
});

interface AddPostFormProps {
  values: postObj_res;
  postImage: { file: File; isRep: boolean }[];
  setPostImage: (image: { file: File; isRep: boolean }[]) => void;
  setFieldValue: (name: string, value: any) => void;
  handleAddPostClose: () => void;
  type: "추가" | "수정";
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  values,
  postImage,
  setPostImage,
  setFieldValue,
  handleAddPostClose,
  type,
}) => {
  const [error, setErrors] = useState("");

  // console.log(`PostForm 테스트 : `);
  console.dir(postImage);
  console.dir("error : ", error);

  useEffect(() => {
    return () => {
      setPostImage([]);
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    accept: { "image/*": [".jpeg", ".png"] },
    onDrop: (acceptedFiles, fileRejections) => {
      // setPostImage(URL.createObjectURL(acceptedFiles[0]));
      console.log("====================================");
      console.log("acceptedFiles : ", acceptedFiles);
      console.log("=============ㅌ=======================");

      //에러 처리
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (!error && err.code === "too-many-files") {
            console.log("에러 지점");
            setErrors(`Error: ${err.message}
            `);
          }
        });
      });

      let postImageObj = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        if (i === 0) {
          postImageObj.push({ file: acceptedFiles[i], isRep: true });
          continue;
        }
        postImageObj.push({ file: acceptedFiles[i], isRep: false });
      }

      console.log("postImageObj : ", postImageObj);
      //사진 추가
      setPostImage(postImageObj);
      error && postImageObj.length > 0 && setErrors("");
    },
  });

  //Img 클릭시, repImg 선택 함수
  const selectRegImg = (targetIdx: number) => {
    const newPostImage = postImage.map((value, index) =>
      index === targetIdx
        ? { file: value.file, isRep: true }
        : { file: value.file, isRep: false }
    );

    console.log("postImage In selectRepImg : ");
    console.dir(newPostImage);

    setPostImage(newPostImage);
  };

  //이미지 삭제 함수
  const removePostImg = (index: number) => {
    postImage && setPostImage(postImage.filter((value, i) => i !== index));
  };

  //종료기간 maximum 계산 함수
  const calMaximumMonths = (waited_until: string | Date) => {
    let date = waited_until
      ? typeof waited_until === "string"
        ? parseISO(waited_until)
        : new Date(waited_until)
      : new Date();
    date.setMonth(date.getMonth() + 3);
    return date;
  };

  return (
    <Form noValidate autoComplete="off">
      <HeaderWrapper>
        <Box
          component="h6"
          sx={{
            mb: { xs: 4, xl: 6 },
            fontSize: rem(18),
            fontWeight: 900,
          }}
        >
          게시물 추가 페이지
        </Box>
        {/* img리스트 행 시작 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <label htmlFor="icon-button-file">
              <Box
                component="div"
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed grey",
                  height: "fit-content",
                  // mr: "1rem",
                  cursor: "pointer",
                }}
              >
                <CameraAltOutlinedIcon sx={{ fontSize: 40 }} />
                <Box component={"h4"}>이미지 업로드</Box>
              </Box>
            </label>
          </div>
          {/* postImage가 있으면.. */}
          {postImage && (
            <ImageList
              gap={6}
              sx={{
                width: 150 * postImage.length,
                // height: 150,
                objectFit: "cover",
                padding: "6px",
                overflowY: "visible",
              }}
              cols={postImage.length}
              rowHeight={164}
            >
              {postImage.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    position: "relative",
                    outline: item.isRep ? "4px solid green" : undefined,
                  }}
                >
                  {/* 대표사진, 녹색 박스(when isRep===true,) */}
                  {item.isRep && (
                    <Box
                      component={"div"}
                      sx={{
                        display: "flex",
                        top: -20,
                        left: -4,
                        pl: 2,
                        pr: 2,
                        position: "absolute",
                        backgroundColor: "green",
                      }}
                    >
                      <Typography variant="h4" color={"white"}>
                        대표사진
                      </Typography>
                    </Box>
                  )}
                  <img
                    src={`${URL.createObjectURL(item.file)}`}
                    onClick={() => selectRegImg(index)}
                    alt={item.file.name}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, " +
                        "rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
                      pt: 1,
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`delete ${item.file.name}`}
                        onClick={() => removePostImg(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
        {/* img리스트 행 끝 */}
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {error && (
            <Typography color={"red"} variant="h5">
              {error}
            </Typography>
          )}
        </Box>
      </HeaderWrapper>

      <Box
        component="h6"
        sx={{
          mt: { xs: 6, xl: 8 },
          mb: { xs: 4, xl: 6 },
          fontSize: 14,
          fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
        }}
      >
        기본정보
      </Box>
      <AppTextField
        sx={{
          width: "50%",
          mb: { xs: 4, xl: 6 },
        }}
        variant="outlined"
        label={"상품명*"}
        name="title"
        align="right"
      />
      <AppTextField
        sx={{
          width: "50%",
          mb: { xs: 4, xl: 6 },
        }}
        variant="outlined"
        label={"가격*"}
        name="unit_price"
        align="right"
      />
      <AppTextField
        sx={{
          width: "100%",
          mb: { xs: 4, xl: 6 },
        }}
        variant="outlined"
        label={"구매링크*"}
        placeholder={"링크만 입력"}
        name="product_url"
        align="right"
      />
      {/* 모집기간 row */}
      <Box component={"div"}>
        <Box
          component="h6"
          sx={{
            // mb: { xs: 4, xl: 6 },
            fontSize: rem(14),
            fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
          }}
        >
          모집 기간
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // mb: { xs: 4, xl: 6 },
          }}
        >
          <AppTextField
            sx={{
              width: "30%",
            }}
            variant="outlined"
            label={"시작기간"}
            disabled
            helperText={" "}
            name="waited_from"
            // value={
            //   typeof values.waited_from === "string"
            //     ? values.waited_from.slice(0, 10)
            //     : values.waited_from.toLocaleDateString()
            // }
          />
          <Box component={"h4"} sx={{ mx: 2 }}>
            ~
          </Box>
          <Box
            sx={{
              width: "30%",
            }}
          >
            <DatePicker
              maxDate={calMaximumMonths(values.waited_until)}
              minDate={
                values.waited_from
                  ? typeof values.waited_from === "string"
                    ? parseISO(values.waited_from)
                    : values.waited_from
                  : new Date()
              }
              label={"종료기간"}
              inputFormat={"yyyy-MM-dd"}
              value={values.waited_until}
              renderInput={(params) => (
                <TextField
                  sx={{ textAlign: "right" }}
                  helperText="최장 3개월"
                  {...params}
                />
              )}
              onChange={(value) => {
                setFieldValue("waited_until", value);
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* 모집인원 row */}
      <Box component={"div"}>
        <Box
          component="h6"
          sx={{
            // mb: { xs: 4, xl: 6 },
            fontSize: rem(14),
            fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
          }}
        >
          모집 인원
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // mb: { xs: 4, xl: 6 },
          }}
        >
          <AppTextField
            sx={{
              width: "30%",
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{"명"}</InputAdornment>
              ),
            }}
            placeholder={"숫자만 입력"}
            label={"최소인원"}
            min={2}
            align={"right"}
            helperText={"최소 2명 이상"}
            name="min_participants"
          />
          <Box component={"h4"} sx={{ mx: 2 }}>
            ~
          </Box>
          <AppTextField
            sx={{
              width: "30%",
            }}
            variant="outlined"
            placeholder={"숫자만 입력"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{"명"}</InputAdornment>
              ),
            }}
            label={"최대인원"}
            align={"right"}
            helperText={"최대 100명 이하"}
            name="max_participants"
          />
        </Box>
      </Box>

      {/* 카테고리 & 배송방법 row */}
      <Box component={"div"} sx={{ display: "flex", mt: 2 }}>
        {/* 카테고리 row*/}
        <Box component={"div"} sx={{ width: "50%", paddingRight: 3 }}>
          <Box
            component="h6"
            sx={{
              // mb: { xs: 4, xl: 6 },
              pl: "100px",
              fontSize: rem(14),
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            카테고리
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppSelectField
              FormControlProps={{ sx: { width: "64%" } }}
              name="category"
              defaultValue={"생활용품"}
              // label="선택하세요"
              menus={["생활용품", "음식", "주방", "욕실", "문구", "기타"]}
            />
          </Box>
        </Box>
        {/* 배송방법 row*/}
        <Box component={"div"} sx={{ width: "50%", pl: 2 }}>
          <Box
            component="h6"
            sx={{
              // mb: { xs: 4, xl: 6 },
              fontSize: rem(14),
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            배송방법
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              // justifyContent: "flex-end",
            }}
          >
            <AppSelectField
              FormControlProps={{ sx: { width: "64%" } }}
              name="trade_type"
              defaultValue={"배송"}
              // label="선택하세요"
              selectionKey={["배송", "직거래"]}
              menus={[{ 배송: "DIRECT" }, { 직거래: "PARCEL" }]}
            />
          </Box>
        </Box>
      </Box>

      {/* 작성 내용 */}
      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "column", mt: 2 }}
      >
        <Box
          component="h6"
          sx={{
            // mb: { xs: 4, xl: 6 },
            fontSize: rem(14),
            fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
          }}
        >
          작성 내용
        </Box>
        <AppTextField
          sx={{ mt: 2, height: "" }}
          multiline
          rows={6}
          variant="outlined"
          placeholder={"내용을 작성하세요"}
          helperText={`현재 ${
            values.description.length ? values.description.length : "0"
          }자 / 최대 1000자`}
          align={"right"}
          name="description"
        />
      </Box>

      {/* 하단 버튼(추가하기, 취소) 시작 */}
      <Box
        sx={{
          pb: 4,
          mx: -1,
          // border: "1px solid green",
        }}
      >
        <ButtonWrapper>
          <Button type="submit" size="modal">
            {type === "추가" ? "추가하기" : "수정하기"}
          </Button>
          <Button
            size="modal"
            style={{ marginLeft: 5 }}
            color={Theme.color.gray[1]}
            onClick={() => handleAddPostClose()}
          >
            취소
          </Button>
        </ButtonWrapper>
      </Box>
    </Form>
  );
};

export default AddPostForm;
