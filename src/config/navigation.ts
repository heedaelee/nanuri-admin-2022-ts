export const navigationItems = {
  sidebar: [
    {
      name: "대시보드",
      to: `${process.env.PUBLIC_URL}`,
      text: "dashboard",
    },
    {
      name: "회원 관리",
      to: `${process.env.PUBLIC_URL}/users`,
      text: "users",
    },
    {
      name: "게시물 관리",
      to: `${process.env.PUBLIC_URL}/contents`,
      text: "contents",
    },
  ],
};
