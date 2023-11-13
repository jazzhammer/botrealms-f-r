import {useEffect, useRef, useState} from "react";
import RealmStats from "@/app/realms/realm-stats";
import RealmBots from "@/app/realms/bots/realm-bots";

export default function RealmTopograph({realmSocket, realm}) {
  const realmTopograph = useRef();
  const DEFAULT_HEADING = 0;
  const [topographContext, setTopographicContext] = useState();
  const [sprites, setSprites] = useState([{
    x: 250,
    y: 250,
    heading: (Math.PI) * DEFAULT_HEADING / 180
  }]);
  const [canRenderSprite, setCanRenderSprite] = useState(false);
  const [canRenderTerrain, setCanRenderTerrain] = useState(false);
  const [realmStats, setRealmStats] = useState();
  const [feedOn, setFeedOn] = useState(false);

  const terrain = new Image();
  terrain.src = 'assets/realms/mars-topopgraph.gif';
  terrain.onload = () => {
    setCanRenderTerrain(true);
  }

  const navBlue = new Image();
  navBlue.src='assets/nav-blue.png';
  navBlue.onload = () => {
    setCanRenderSprite(true);
  }

  const [mode, setMode] = useState('stats');

  useEffect(() => {
    if (realmTopograph) {
      const context = realmTopograph.current.getContext('2d');
      context.canvas.width = 500;
      context.canvas.height = 500;
      setTopographicContext(context);
    }
  }, [])
  useEffect(() => {
    if (topographContext) {
      topographContext.clearRect(0, 0, topographContext.canvas.width, topographContext.canvas.height);
      if (canRenderTerrain) {
        topographContext.drawImage(terrain, 0, 0, 500, 500);
      }
      if (canRenderSprite) {
        for (const sprite of sprites) {
          const spriteCanvas = document.createElement('canvas');
          spriteCanvas.width = 16;
          spriteCanvas.height = 16;
          const spriteContext = spriteCanvas.getContext('2d');
          spriteContext.save();
          spriteContext.translate(8, 8);
          spriteContext.rotate(sprite.heading);
          spriteContext.translate(-8, -8);
          spriteContext.drawImage(navBlue, 0, 0, 128, 128, 0, 0, 16, 16);
          spriteContext.restore();
          topographContext.drawImage(spriteCanvas,
            0,    0,    16,  16,
            (sprite.x-8),    484-(sprite.y-8),  16,    16
          );
        }
      }

    }
  }, [sprites]);

  const jumpSprites = () => {
    const nextSprites = [];
    for (const sprite of sprites) {
      const nextSprite = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        heading: (Math.random() * 360) * Math.PI / 180
      }
      nextSprites.push(nextSprite);
    }
    setSprites(nextSprites);
  }

  return (
    <div className={"flex flex-row"}>
      <div className={"flex flex-col w=1/2"}>
        <div className={"flex flex-row mb-2 mt-2 text-white pl-2"}>
          <div className={"w-24"}>topograph</div>
          <div>feed: </div>
          {feedOn && <div className={"text-green-500"}>on</div>}
          {!feedOn && <div className={"text-amber-500"}>off</div>}
          {/*<div><button value={"jump"} onClick={jumpSprites}>jump</button></div>*/}
        </div>
        <div className={"bg-white"} style={{ width: 500, height: 500}}>
          <canvas ref={realmTopograph} style={{width: '500px', height: '500px', }}></canvas>
        </div>
      </div>
      <div className={"flex flex-col w=1/2"}>
        <div className={"flex flex-row"}>
          <div className={"pl-2 pr-2 hover:underline cursor-pointer" + (mode === 'stats' ? ' underline bg-blue-800': '')} onClick={()=>setMode('stats')}>stats</div>
          <div className={"pl-2 pr-2 hover:underline cursor-pointer" + (mode === 'bots' ? ' underline bg-blue-800': '')} onClick={()=>setMode('bots')}>bots</div>
        </div>
        <div className={"ml-2"}>
          {mode === 'stats' && <RealmStats stats={realmStats}></RealmStats>}
          {mode === 'bots' && <RealmBots realm={realm}></RealmBots>}
        </div>
      </div>
    </div>
  )
}