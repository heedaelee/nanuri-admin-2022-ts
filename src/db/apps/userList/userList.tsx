import { UserObj_res } from "../../../@types/models/apps/UserList";
const userList: UserObj_res[] = [];
// const userList: UserObj[] = [
//   {
//     uuid: "be69c340-723b-4be1-a552-913cb3637140",
//     name: "최민경",
//     email: "jubin.chawla@xyz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A1.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "서울시 용산구 테헤란로 3길 115번지",
//   },
//   {
//     uuid: "9e508495-7642-483a-b158-20329342595d",
//     name: "김서현",
//     email: "mark.johnson@abc.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A2.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "17cfbd3b-3648-4cbe-b40e-ec4e4512a13b",
//     name: "김혜지",
//     email: "shane.lee@mnz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A3.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "2a783b2d-4ed0-4173-be6f-d353eb9fc16e",
//     name: "이희대",
//     email: "chris.crains@cde.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A4.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "917ddcc4-32ad-4285-92c6-b9f331ba7c46",
//     name: "김철수",
//     email: "jonathan.trott@ewr.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A5.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "144cc1eb-73e8-453a-bb94-fe1a3e08ec84",
//     name: "한똘똘",
//     email: "rohit.sharma@xcr.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A6.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "a3ca04f5-ad1f-4a74-a28c-b0dfee209334",
//     name: "박대리",
//     email: "mark.lee@cdf.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A7.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "a3ca04f5-ad1f-4a74-a28c-b0dfee209334",
//     name: "순이",
//     email: "sain.williams@gww.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A8.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "cbe3e32d-905b-4722-8695-ad7a3f47b209",
//     name: "꿀제이",
//     email: "parth.aulins@ddd.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A9.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "7c1e3a8c-83ed-4073-a5fa-b20a64ea9198",
//     name: "김초이",
//     email: "rahul.bose@xyz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A10.jpg",
//     regDate: "2022.5.29",
//   },
//   {
//     uuid: "10b38365-0a50-4fdc-80e1-ddca03a7bc19",
//     name: "박현수",
//     email: "rohan.bopanna4@red.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A11.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "bb02b5fe-397c-49d6-bf90-964497979493",
//     name: "김진구",
//     email: "nikit.panwar@xyz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A12.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "b053100e-dacc-4b8f-8e6b-acdd2e9beda1",
//     name: "이린",
//     email: "vijay.murli@xyz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A13.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "e03cbeb7-0ef2-4f9b-ba9f-d86eb5891877",
//     name: "정석",
//     email: "david.boon@xyz.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A14.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "6e15f239-dc92-43b3-9fcd-e896c4969d71",
//     name: "천상계",
//     email: "saurabh.shukla@sdd.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A15.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "291c8243-22f7-449b-92ef-9c761f4a5648",
//     name: "커피",
//     email: "saurabh.shukla@sdd.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A16.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
//   {
//     uuid: "1db96187-fd42-49ed-ac42-9208e1d47593",
//     name: "핫라떼",
//     email: "saurabh.shukla@sdd.com",
//     contact: "010-000-000",
//     active: "1",
//     image: "/assets/images/avatar/A17.jpg",
//     regDate: "2022.5.29",
//     notes: "",
//     address: "",
//   },
// ];
export default userList;
