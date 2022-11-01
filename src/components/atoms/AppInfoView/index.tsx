import { useContext } from "react";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import AppLoader from "../AppLoader";
import AppMessageView from "../AppMessageView";

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
