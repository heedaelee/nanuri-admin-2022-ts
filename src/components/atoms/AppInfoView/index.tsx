import React, { useContext } from "react";
import AppMessageView from "../AppMessageView";
import AppLoader from "../AppLoader";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";

const AppInfoView = () => {
  const {
    message,
    setMessage,
    error,
    setError,
    loading,
    setLoading,
  } = useContext(AppInfoContext);

  const showMessage = () => {
    return (
      <AppMessageView
        variant="success"
        message={message.toString()}
        setMessage={setMessage}
      />
    );
  };

  const showError = () => {
    return (
      <AppMessageView variant="error" message={error.toString()} />
    );
  };

  return (
    <>
      {loading && <AppLoader />}
      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default AppInfoView;
