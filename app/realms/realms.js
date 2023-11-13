"use client"
import {useState} from "react";
import NewRealm from "@/app/realms/new-realm";
import RealmDetails from "@/app/realms/realm-details";
import SearchRealms from "@/app/realms/search-realms";
import ListRealms from "@/app/realms/list-realms";
import {io} from "socket.io-client";


export default function Realms() {
  const [realmSocket, setRealmSocket] = useState();
  const [realmHostConnected, setRealmHostConnected] = useState(false);
  const [realmHostSocketId, setRealmHostSocketId] = useState();
  const [realmData, setRealmData] = useState();
  const [mode, setMode] = useState('');
  const [realm, setRealm] = useState();
  const [realms, setRealms] = useState();

  const connectRealmHost = () => {
    const socket = io(`http://localhost:${process.env.NEXT_PUBLIC_WEBSOCKET_PORT}`)
    socket.on('connect', () => {
      setRealmHostSocketId(socket.id);
      setRealmHostConnected(true);
      console.log(`connected to realms host, id:${socket.id}`);
    });
    socket.on('disconnect', () => {
      console.log(`disconnected from realms host`);
      setRealmHostConnected(false);
    });
    setRealmSocket(socket);
    socket.on('realm-data', (realmData) => {
      console.log(`realm-data: received`);
      setRealmData(realmData);
    })
  }

  const disconnectRealmHost = () => {
    realmSocket.disconnect();
  }


  const onCreate = (created) => {
    setRealm(created);
    setMode('selected');
  }

  const onUpdate = (updated) => {
    setRealm(updated);
    setMode('selected');
  }

  const onSelectRealm = (selected) => {
    setRealm(selected);
    setMode('selected')
  }

  const onRealms = (realms) => {
    setRealms(realms);
  }

  return (
    <div className={"flex flex-col h-full"}>
      <div className={"flex flex-row"}>
        <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'new' ? 'underline' : '')}
             onClick={() => setMode('new')}>
          new
        </div>
        <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'search' ? 'underline' : '')}
             onClick={() => setMode('search')}>
          search
        </div>
        <div className={"w-128 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'search' ? ' underline' : '') + (realmHostConnected ? "text-green-500" : " text-amber-400")}
             onClick={() => setMode('search')}>
          realmsHost: {process.env.NEXT_PUBLIC_WEBSOCKET_HOST}
        </div>
        {!realmHostConnected &&
          <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline "}>
            <button className={"bg-green-600 pl-2 pr-2 "} onClick={connectRealmHost}>connect</button>
          </div>
        }
        {realmHostConnected &&
          <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline "}>
            <button className={"bg-amber-600 pl-2 pr-2 "} onClick={disconnectRealmHost}>disconnect</button>
          </div>
        }
      </div>
      <div className={"flex flex-col h-full"}>
        {mode === 'new' && <NewRealm onCreate={onCreate}></NewRealm>}
        {mode === 'selected' && <RealmDetails realm={realm} onUpdate={onUpdate} realmSocket={realmSocket}></RealmDetails>}
        {mode === 'search' &&
          <div className={"flex flex-col"}>
            <SearchRealms onRealms={onRealms}></SearchRealms>
            <div className={"mt-3 ml-2"}>
              <ListRealms realms={realms} onSelect={onSelectRealm}></ListRealms>
            </div>
          </div>
        }
      </div>
    </div>
  );
}