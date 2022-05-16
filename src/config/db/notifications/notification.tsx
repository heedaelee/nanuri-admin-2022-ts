export interface NotificationData {
  id: string;
  name: string;
  image: string;
  message: string;
}

const notificationData: NotificationData[] = [
  {
    id: '1000',
    name: '김혜지',
    image: '/assets/images/avatar/A3.jpg',
    message: '공통 보드에 댓글을 남겼습니다',
  },
  {
    id: '1001',
    name: '이희대',
    image: '/assets/images/avatar/A4.jpg',
    message: '쪽지를 보냈습니다',
  },
];
export default notificationData;
