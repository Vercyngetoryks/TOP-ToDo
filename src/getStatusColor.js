const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "rgba(243, 244, 246, 0.4)"; // Szary #f3f4f6
    case "in-progress":
      return "rgba(250, 204, 21, 0.4)"; // Żółty #facc15
    case "completed":
      return "rgba(74, 222, 128, 0.4)"; // Zielony
    default:
      return "rgba(243, 244, 246, 0.4)"; // Domyślnie szary
  }
};

export default getStatusColor;
