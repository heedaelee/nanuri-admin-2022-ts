import { useState, useCallback } from "react";

const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(
    (active: boolean) => setValue(active),
    []
  );

  return [value, toggle] as [boolean, typeof toggle];
};

export default useBoolean;
