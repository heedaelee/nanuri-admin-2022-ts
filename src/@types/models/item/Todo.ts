// 사용중

//걍 example, 사용안함
export interface LabelBox {
  name: string;
  color: string;
}

export interface FolderObj {
  id: number;
  name: string;
  alias: string;
  icon: string;
}

export interface LabelObj {
  id: number;
  name: string;
  alias: string;
  label: string;
  value: string;
  color: string;
}

export interface StaffObj {
  id: number;
  name: string;
  image: string;
}

export interface StatusObj {
  id: number;
  name: string;
  type: number;
}

export interface CommentObj {
  comment: string;
  name: string;
  image: string;
  date: string;
}

export interface TodoObj {
  id: number;
  title: string;
  isStarred: boolean;
  label: LabelObj[];
  isAttachment: boolean;
  sentAt: string;
  folderValue: number;
  schedule: string;
  image: string;
  assignedTo: StaffObj;
  createdBy: {
    name: string;
    image?: string;
  };
  createdOn: string;
  status: number;
  comments: CommentObj[];
  content: string;
  isReplied?: boolean;
  isRead?: boolean;
  date?: string;
}
