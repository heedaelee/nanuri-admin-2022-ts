import EditIcon from "@mui/icons-material/Edit";
import { alpha, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Form } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";
import { UserListObj } from "../../../@types/models/apps/UserList";
// import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Theme from "../../../lib/Theme";
import AppRadioGroup from "../../atoms/AppFormComponents/AppRadioGroup";
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
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});

const ActiveWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    // border: "1px solid",
  };
});

const ButtonWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
  };
});

const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
  };
});

interface AddUserFormProps {
  values: UserListObj;
  userImage: string;
  setUserImage: (image: string) => void;
  setFieldValue: (name: string, value: any) => void;
  handleAddUserClose: () => void;
  type: "추가" | "수정";
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  values,
  userImage,
  setUserImage,
  setFieldValue,
  handleAddUserClose,
  type,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <Form noValidate autoComplete="off">
      <HeaderWrapper>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <label htmlFor="icon-button-file">
            <AvatarViewWrapper>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                }}
                src={userImage ? userImage : ""}
              />
              <Box className="edit-icon">
                <EditIcon />
              </Box>
            </AvatarViewWrapper>
          </label>
        </div>
        {values.name ? (
          <Box
            component="h4"
            fontWeight={Theme.fonts.fontWeight.SEMI_BOLD}
            mt={2}
          >
            {values.name}
          </Box>
        ) : null}
      </HeaderWrapper>
      <Box
        sx={{
          padding: 5,
          ml: -6,
          mr: -6,
        }}
      >
        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) =>
              `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            기본정보
          </Box>

          <AppTextField
            sx={{
              width: "100%",
              mb: { xs: 4, xl: 6 },
            }}
            variant="outlined"
            label={"닉네임*"}
            name="name"
          />
          <AppTextField
            sx={{
              width: "100%",
              mb: { xs: 4, xl: 6 },
            }}
            variant="outlined"
            label={"이메일*"}
            name="email"
          />
          <AppTextField
            sx={{
              width: "100%",
              mb: { xs: 4, xl: 6 },
            }}
            variant="outlined"
            label={"전화번호*"}
            name="contact"
          />
          <AppTextField
            sx={{
              width: "100%",
            }}
            variant="outlined"
            label={"주소*"}
            name="address"
          />
          <ActiveWrapper>
            <Box
              component="h4"
              sx={{
                mt: 1,
                // mb: { xs: 4, xl: 6 },
                fontSize: 14,
                fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                // border: "1px solid",
                position: "absolute",
                top: "1rem",
                left: 0,
              }}
            >
              Active
            </Box>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                height: "6rem",
                // border: "1px solid",
              }}
            >
              <AppRadioGroup
                name="active"
                defaultValue="1"
                options={[
                  { value: "1", label: "ON" },
                  { value: "0", label: "OFF" },
                ]}
              />
            </div>
          </ActiveWrapper>
        </Box>
        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) =>
              `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            메모
          </Box>
          <AppTextField
            sx={{
              width: "100%",
              mb: { xs: 4, xl: 6 },
            }}
            variant="outlined"
            label={"Memo"}
            name="notes"
            multiline
            rows="4"
          />
        </Box>
      </Box>

      <Box
        sx={{
          pb: 4,
          mx: -1,
          textAlign: "right",
        }}
      >
        <ButtonWrapper>
          <Button type="submit" size="modal">
            {type === "추가" ? "가입하기" : "수정하기"}
          </Button>
          <Button
            size="modal"
            style={{ marginLeft: 5 }}
            color={Theme.color.gray[1]}
            onClick={() => handleAddUserClose()}
          >
            취소
          </Button>
        </ButtonWrapper>
      </Box>
    </Form>
  );
};

export default AddUserForm;
