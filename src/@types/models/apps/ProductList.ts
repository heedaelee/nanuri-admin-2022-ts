export interface ProductListObj {
  count: number;
  next: string;
  previous: string;
  result: [
    {
      uuid: string;
      category: "string";
      favored_by: ["string"];
      // writer
      writer: string;
      writer_address: string;
      writer_nickname: string;
      participants: string[];
      title: "string";
      image: "string";
      unit_price: 2147483647;
      quantity: 2147483647;
      description: "string";
      min_participants: 2147483647;
      max_participants: 2147483647;
      num_participants: 0;
      product_url: "string";
      trade_type: "DIRECT";
      order_status: "WAITING";
      is_published: true;
      published_at: "2022-06-17T09:42:39.203Z";
      view_count: 0;
      waited_from: "2022-06-17";
      waited_until: "2022-06-17";
      created_at: "2022-06-17T09:42:39.203Z";
      updated_at: "2022-06-17T09:42:39.203Z";
    }
  ];
  //
  id: string;
  userIdx: string;
  category: "음식" | "생활용품" | "주방" | "욕실" | "문구" | "기타";
  productName: string;
  link?: string;
  // productImage?: string;
  productPrice: string;
  totalPplCnt: string;
  joinPplCnt: string;
  startPeriod: string;
  endPeriod: string;
  deliveryMethod: "배송" | "직거래";
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
      type: "png" | "jpg" | "jpeg" | "gif";
      url: string;
    }
  ];
  reply?: [
    {
      id: string;
      userId: string;
      refId?: string;
      prodIdx: string;
      content: string;
      depts: "0" | "1";
      createdAt: string;
    }
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

export interface ProductListObj2 {
  count: 123;
  next: "http://api.example.org/accounts/?offset=400&limit=100";
  previous: "http://api.example.org/accounts/?offset=200&limit=100";
  results: [
    {
      writer: "string";
      writer_address: "string";
      writer_nickname: "string";
      participants: ["string"];
      category: "string";
      favored_by: ["string"];
      uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      title: "string";
      image: "string";
      unit_price: 2147483647;
      quantity: 2147483647;
      description: "string";
      min_participants: 2147483647;
      max_participants: 2147483647;
      num_participants: 0;
      product_url: "string";
      trade_type: "DIRECT";
      order_status: "WAITING";
      is_published: true;
      published_at: "2022-06-17T09:42:39.203Z";
      view_count: 0;
      waited_from: "2022-06-17";
      waited_until: "2022-06-17";
      created_at: "2022-06-17T09:42:39.203Z";
      updated_at: "2022-06-17T09:42:39.203Z";
    }
  ];
}
