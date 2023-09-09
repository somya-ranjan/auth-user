import toaster from "./toaster";

export default function errorHandler({ response = "" }) {
  console.log(response);
  if (
    response !== undefined &&
    response !== undefined &&
    response.status !== undefined
  ) {
    if (response.status === 500) {
      toaster.error(response.data.error);
    }
    if (response.status === 403) {
      toaster.error(response.data.error);
    }

    if (
      response.data &&
      response.data.error !== undefined &&
      response.data.error !== "" &&
      typeof response.data.error === "string"
    ) {
      if (response.data && response.data.data && response.data.data.type) {
        toaster.error(response.data.error);
      } else {
        toaster.error(response.data.error);
      }
    } else {
      toaster.error("Server error! Please try again.");
    }
  } else {
    toaster.error("Something went wrong! Please try again.");
  }
}
