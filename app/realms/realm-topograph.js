import {useEffect, useRef} from "react";

export default function RealmTopograph() {
  const realmTopograph = useRef();
  let topographContext = null;
  useEffect(() => {
    if (realmTopograph) {
      topographContext = realmTopograph.current.getContext('2d');
      topographContext.beginPath();
      topographContext.style='red';
      topographContext.arc(100, 100, 5, 0, Math.PI * 2);
      topographContext.fill();
    }
  }, [])


  return (
    <div className={"flex flex-col"}>
      <div className={"bg-amber-500 mb-2 mt-2 text-black pl-2"}>realm topograph:</div>
      <div className={"bg-amber-500"} style={{height: 400, width: 400}}>
        <canvas ref={realmTopograph} id="realm-topograph" style={{
          width: 400,
          height: 400
        }}></canvas>
      </div>

    </div>
  )
}