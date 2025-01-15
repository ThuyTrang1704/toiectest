import React from "react";
export const special = (value) => {
  if (value.includes("@") || value.includes("#")) return true;
  return false;
};
export const uppercase = (value) => {
  if (value && /[A-Z]/.test(value)) return true;
  return false;
};
export const spaceBetween = (value) => {
  if (value && value.trim().indexOf(" ") !== -1) return true;
  return false;
};
export const spaceLeft = (value) => {
  const regex = /^\s/;
  if (value && regex.test(value)) return true;
  return false;
};
export const confimPassword = (value, form) => {
  if (value && value === form) return true;
  return false;
};
export const structureMail = (value) => {
  const emailRegex = /^[a-zA-Z0-9]+@[gmail]+\.[a-zA-Z]{2,4}$/;
  if (value && emailRegex.test(value)) return true;
  return false;
};

//   return Promise.resolve();
