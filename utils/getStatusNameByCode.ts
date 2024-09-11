
export const getStatusNameByCode = (code: string) => {
    switch (code) {
        case "on_progress":
          return "진행중";
        case "finished":
          return "완료됨";
        case "canceled":
          return "취소됨";
        default:
          return "알 수 없음";
      }
  };
  