
export const getStatusNameByCode = (code: string| null) => {
    switch (code) {
        case "open":
          return "모집중";
        case "ongoing":
          return "진행중";
        case "done":
          return "완료됨";
        case "canceled":
          return "취소됨";
        default:
          return "알 수 없음";
      }
  };
  