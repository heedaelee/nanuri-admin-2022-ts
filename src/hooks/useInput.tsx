import { useState, useCallback } from "react";

//NOTE: useCallback : 사용하면서
// onChange 처럼 비어있는 배열을 넣게 되면
// 컴포넌트가 렌더링 될 때 단 한번만 함수가 "생성"되게 함

export default function useInput(defaultValue: string) {
  const [input, setInput] = useState(defaultValue);

  const onChange = useCallback((text: string) => {
    setInput(text);
    console.log(`useInput에서 text 값 : ${text}`);
  }, []);

  const onReset = useCallback(() => setInput(""), []);
  return [input, onChange, onReset] as [
    any,
    typeof onChange,
    typeof onReset
  ];
}
