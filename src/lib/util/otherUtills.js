const browserFontSize = 10;

/**
 * NOTE: rem 계산기
 * parms에 pixel 입력시 루트 브라우저 폰트사이즈에 대비해 rem을 계산해준다.
 * */

export const rem = (pixel, defaultFontSize) => {
  if (defaultFontSize) {
    return `${pixel / defaultFontSize}rem`;
  }
  return `${pixel / browserFontSize}rem`;
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
};
