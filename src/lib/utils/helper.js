// export const getAccessToken = () => {
//   const user = localStorage.getItem("user") || sessionStorage.getItem("user");
//   const token = JSON.parse(user).token;
//   return token;
// };


// export const getAccessRole = () => {
//   const user = getAccessUser();
//   return user ? user.role : null; // Trả về role hoặc null nếu không có
// };

export const getAccessUser = () => {
    // Ưu tiên lấy từ localStorage trước, nếu không thì từ sessionStorage
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (user) {
      return JSON.parse(user); // Trả về đối tượng người dùng
    }
    return null; // Trả về null nếu không có thông tin người dùng
  };
  
  export const getAccessToken = () => {
    const user = getAccessUser(); // Lấy user từ hàm getAccessUser
    return user ? user.token : null; // Trả về token hoặc null nếu không có
  };
  
  export const getAccessRole = () => {
    const user = getAccessUser(); // Lấy user từ hàm getAccessUser
    return user ? user.role : null; // Trả về role hoặc null nếu không có
  };
  