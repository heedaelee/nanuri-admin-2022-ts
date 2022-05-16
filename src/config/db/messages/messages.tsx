export interface MessageData {
  id: number;
  image: string;
  message: string;
  name: string;
}

const messageData: MessageData[] = [
  {
    id: 201,
    image: '/assets/images/avatar/A1.jpg',
    message: '깃헙 푸쉬 완료했습니다!',
    name: '최민경',
  },
  {
    id: 202,
    image: '/assets/images/avatar/A2.jpg',
    message: '메일 회신 부탁드립니다~!',
    name: '김서현',
  },
  
];
export default messageData;
