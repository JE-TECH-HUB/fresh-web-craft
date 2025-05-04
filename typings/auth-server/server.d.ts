
declare interface newUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  course: string;
  id?: number;
  registrationDate?: string;
  lastLogin?: string;
  progress?: {
    course: string;
    completed: number;
    totalModules: number;
  }[];
  profileImage?: string;
}

declare interface loginCredentials {
  email: string;
  password: string;
}

declare interface userProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  registrationDate: string;
  lastLogin: string;
  progress: {
    course: string;
    completed: number;
    totalModules: number;
  }[];
  profileImage?: string;
}

declare interface authResponse {
  message: string;
  token: string;
  user: userProfile;
}

declare interface contactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date?: string;
}
