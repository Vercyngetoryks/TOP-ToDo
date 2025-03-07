const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "rgba(243, 244, 246, 0.4)";
    case "in-progress":
      return "rgba(250, 204, 21, 0.4)";
    case "completed":
      return "rgba(74, 222, 128, 0.4)";
    default:
      return "rgba(243, 244, 246, 0.4)";
  }
};

export default getStatusColor;
