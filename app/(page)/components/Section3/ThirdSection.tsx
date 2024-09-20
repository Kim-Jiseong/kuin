import Typography from "@/components/common/Typography";
import React from "react";

function ThirdSection() {
  return (
    <section
      className={
        "w-full px-6 py-12 flex flex-col justify-center min-h-[600px] "
      }
    >
      <div className={`w-full flex flex-col items-center gap-4`}>
        <div className="flex gap-4">
          <Typography variant={"subtitle1"} color="primary">
            No 수수료
          </Typography>
          <Typography variant={"subtitle1"} color="primary">
            No 광고비
          </Typography>
        </div>
        <Typography variant={"headings"} className={`text-center`}>
          KUIN은 완전히 무료입니다
        </Typography>
        <Typography variant={"text"} className={`text-center mt-4`}>
          쿠인은 그 어떤 비용도 받지 않습니다
          <br />
          이용자분들께 충분한 가치를 제공하는 것이 먼저이기에, 수수료나 광고비
          없이 완전히 무료로 제공하고 있습니다
          <br />더 많은 클라이언트와 전문가들을 부담없이 연결하는것이 쿠인의
          목표입니다
        </Typography>
      </div>
    </section>
  );
}

export default ThirdSection;
