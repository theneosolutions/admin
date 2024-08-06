function getLanguage() {
  const preferredLanguage = localStorage.getItem("preferredLanguage");
  if (preferredLanguage) {
    return preferredLanguage;
  } else {
    return "ar";
  }
}

export { getLanguage };
