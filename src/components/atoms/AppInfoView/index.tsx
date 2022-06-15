import React from "react";
import AppMessageView from "../AppMessageView";
import AppLoader from "../AppLoader";

const AppInfoView = () => {
  // const { error, loading, message } = useSelector<
  //   AppState,
  //   AppState["common"]
  // >(({ common }) => common);

  // const showMessage = () => {
  //   return (
  //     <AppMessageView
  //       variant="success"
  //       message={message.toString()}
  //     />
  //   );
  // };

  // const showError = () => {
  //   return (
  //     <AppMessageView variant="error" message={error.toString()} />
  //   );
  // };

  return (
    <>
      {/* {loading && <AppLoader />}

      {message && showMessage()}
      {error && showError()} */}
    </>
  );
};

export default AppInfoView;
