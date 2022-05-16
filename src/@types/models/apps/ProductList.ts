export interface ProductListObj {
  id: string;
  userIdx: string;
  category: '음식' | '생활용품' | '주방' | '욕실' | '문구' | '기타';
  productName: string;
  link?: string;
  // productImage?: string;
  productPrice: string;
  totalPplCnt: string;
  joinPplCnt: string;
  startPeriod: string;
  endPeriod: string;
  deliveryMethod: '배송' | '직거래';
  detailContent: string;
  createdAt: string;
  isStarred: boolean;
  activated: string;
  img?: [
    {
      id: string;
      userId: string;
      prodId: string;
      name: string;
      type: 'png' | 'jpg' | 'jpeg' | 'gif';
      url: string;
    },
  ];
  reply?: [
    {
      id: string;
      userId: string;
      refId?: string;
      prodIdx: string;
      content: string;
      depts: '0' | '1';
      createdAt: string;
    },
  ];
}

/* 카테고리 코드
{
  음식: '0';
  생활용품: '1';
  주방: '2';
  욕실: '3';
  문구: '4';
  기타: '5';
}
*/

export interface FolderObj {
  id: number;
  name: string;
  alias: string;
  icon: string;
}
