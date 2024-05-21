function getLanguage() {
  const preferredLanguage = localStorage.getItem("preferredLanguage");
  if (preferredLanguage) {
    // const lan = JSON.parse(preferredLanguage);
    // console.log(preferredLanguage);
    return preferredLanguage;
  } else {
    return "ar";
  }
}

export { getLanguage };
