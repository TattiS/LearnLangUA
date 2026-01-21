const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export default getInitials;
