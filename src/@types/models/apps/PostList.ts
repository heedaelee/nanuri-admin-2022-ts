export interface PostListObj {
  count: number;
  next: string;
  previous: string;
  results: post[];
}

export interface post {
  uuid: string;
  category: string;
  favored_by: string[];
  // writer
  writer: string;
  writer_address: string;
  writer_nickname: string;
  participants: string[];
  title: string;
  image: string;
  unit_price: number;
  quantity: number;
  description: string;
  min_participants: number;
  max_participants: number;
  num_participants: 0;
  product_url: string;
  trade_type: string;
  order_status: string;
  is_published: boolean;
  published_at: Date;
  view_count: number;
  waited_from: Date;
  waited_until: Date;
  created_at: Date;
  updated_at: Date;
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
