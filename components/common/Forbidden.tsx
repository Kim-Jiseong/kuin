import { DoorClosed, Meh } from "lucide-react";
import React from "react";
import Typography from "./Typography";

function Forbidden() {
  return (
    <div className="flex flex-col gap-2 h-[50vh] justify-center items-center text-center">
      <div className={"flex items-end"}>
        <DoorClosed size={160} />
        <Meh size={80} />
      </div>
      <Typography variant={"text"}>
        죄송해요. 이 문을 열 열쇠를 어디에 뒀는지 까먹었어요.
        <br />
        일단 다른 곳부터 둘러보실래요?
      </Typography>
      <Typography variant="subtitle1">Access Denied</Typography>
    </div>
  );
}

export default Forbidden;
