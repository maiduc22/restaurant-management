import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import consts from '../config/constants';
import { storage } from '../config/firebase';

import { v4 as uuidv4 } from 'uuid';
import { Callback } from '../types/helpers/callback';

export const randomArray = (number: number): number[] => Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return '0';
  const formattedNumber = _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return '';
  return string.split('T')[0];
};

export const getColorByRole = (role: string | undefined) => {
  switch (role) {
    case 'EMPLOYEE':
      return 'green';
    case 'MANAGER':
      return 'red';
    default:
      break;
  }
};

export const parserRole = (value: string | undefined) => {
  switch (value) {
    case consts.ROLE_ADMIN:
      return 'Quản lý';
    case consts.ROLE_STAFF:
      return 'Nhân viên';
    default:
      return '';
  }
};

export enum notiType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const renderNotification = (title: string, description: string, type: notiType) => {
  notifications.show({
    title: title,
    message: description,
    color: getColorByType(type),
    withCloseButton: true,
    autoClose: 1200,
  });
};

const getIconByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return IconCheck;
    case notiType.ERROR:
      return IconX;
  }
};

const getColorByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return 'green';
    case notiType.ERROR:
      return 'red';
  }
};

interface DecodedToken {
  Role?: string;
  aud?: string;
  exp?: number;
  fullname?: string;
  id?: string;
  image?: string;
  iss?: string;
  username?: string;
}

export const decodeToken = (): DecodedToken => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwt_decode(token.replace('Bearer ', ''));
  } else
    return {
      Role: '',
    };
};

export const isManager = () => {
  const decodedToken: DecodedToken | undefined = decodeToken();
  const role = decodedToken?.Role;
  return role === consts.ROLE_ADMIN ? true : false;
};

export const handleUploadImageOnFirebase = (file: File, cb?: Callback): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imageRef = ref(storage, `staffImages/${file.name} + ${uuidv4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        console.log(url); // Log the URL when it becomes available
        cb?.onSuccess?.(url);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
