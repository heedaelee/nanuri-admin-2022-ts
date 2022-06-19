import { ProductListObj } from "../../../@types/models/apps/ProductList";

const productList: ProductListObj[] = [
  {
    id: "1",
    userIdx: "1",
    productName: "야옹이 장난감 셋트",
    category: "생활용품",
    link: "",
    // productImage?: '',
    productPrice: "57,000",
    totalPplCnt: "5",
    joinPplCnt: "2",
    startPeriod: "2022/1/1",
    endPeriod: "2022/1/6",
    deliveryMethod: "배송",
    detailContent: "고양이 장난감을 구매해봅시다. 집사님들 모여라!!",
    createdAt: "2021/12/30",
    activated: "0",
    isStarred: true,
    img: [
      {
        id: "1",
        userId: "1",
        prodId: "1",
        name: "장난감",
        type: "png",
        url: "/assets/images/product/catPlay.png",
      },
    ],
    reply: [
      {
        id: "1",
        userId: "2",
        refId: "",
        prodIdx: "1",
        content: "참여했습니당!😃",
        depts: "0",
        createdAt: "2022/1/2",
      },
    ],
  },
];

export default productList;
