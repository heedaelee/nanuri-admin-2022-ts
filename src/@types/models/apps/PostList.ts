export interface postObj_res {
  // writer
  writer: string;
  writer_address: string;
  writer_nickname: string;
  // writer 끝
  participants: string[];
  category: string; // category: "생활용품" | "음식" | "주방" | "욕실" | "문구" | "기타";
  favored_by: string[];
  images: string[];
  uuid: string;
  title: string; //<= 255 characters
  image?: string | null;
  unit_price: number;
  quantity: number;
  description: string;
  min_participants: number;
  max_participants: number;
  num_participants: number;
  product_url: string; //<=200 characters
  trade_type?: "DIRECT" | "PARCEL";
  order_status?:
    | "WAITING"
    | "ORDERING"
    | "ORDERED"
    | "DELIVERING1"
    | "DELIVERING2"
    | "DELIVERED"
    | "CANCELLED";
  is_published?: boolean;
  published_at: Date | string | null;
  view_count: number;
  waited_from?: Date | string | null;
  waited_until?: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  /* 이건 post 통신일때
  //대표
  image?: File;
  //대표 외 이미지, 임시로 만듦. 위에 interface로 테스트하기 넘 까다로워서
  images?: File[];
  */
}

export interface postObj_req {
  title: string; //<= 255 characters
  image?: File; //NOTE: 일단 img 파일 1개만 보내는걸로..array[0]번째
  category: category["category"];
  unit_price: number;
  quantity: number;
  description: string;
  min_participants: number;
  max_participants: number;
  num_participants: number;
  product_url: string; //<=200 characters
  trade_type?: "DIRECT" | "PARCEL";
  order_status?:
    | "WAITING"
    | "ORDERING"
    | "ORDERED"
    | "DELIVERING1"
    | "DELIVERING2"
    | "DELIVERED"
    | "CANCELLED";
  is_published?: boolean;
  waited_from?: Date | string | null;
  waited_until?: Date | string | null;
}

interface category {
  category: "생활용품" | "음식" | "주방" | "욕실" | "문구" | "기타";
}

export interface PostListObj {
  count: number;
  next: string | null;
  previous: string | null;
  results: postObj_res[];
}

//임시
export interface images {
  uuid: string;
  images: File[];
}

export interface newDataType {}

/* 카테고리 코드
{
  음식: '0';
  생활용품: '1';
  주방: '2';
  욕실: '3';
  문구: '4';
  기타: '5';
}

order_status:

WAITING(인원 모집 중), 
ORDERING(주문 진행 중), 
ORDERED(주문 완료), 
DELIVERING1(1차 배송 중), 
DELIVERING2(2차 배송 중),
 DELIVERED(배송 완료), 
 CANCELLED(취소됨)
*/

// id: string;
//   userIdx: string;
//   category: "음식" | "생활용품" | "주방" | "욕실" | "문구" | "기타";
//   productName: string;
//   link?: string;
//   // productImage?: string;
//   productPrice: string;
//   totalPplCnt: string;
//   joinPplCnt: string;
//   startPeriod: string;
//   endPeriod: string;
//   deliveryMethod: "배송" | "직거래";
//   detailContent: string;
//   createdAt: string;
//   isStarred: boolean;
//   activated: string;
//   img?: [
//     {
//       id: string;
//       userId: string;
//       prodId: string;
//       name: string;
//       type: "png" | "jpg" | "jpeg" | "gif";
//       url: string;
//     }
//   ];
