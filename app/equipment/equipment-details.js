"use client"

import {useState} from "react";

export default function EquipmentDetails({equipment, onUpdate}) {
  const [mode, setMode] = useState('view');
  const [name, setName] = useState(equipment.name);
  const [type, setType] = useState(equipment.type);
  const [description, setDescription] = useState(equipment.description);
  const updateEquipment = async () => {
    const updateResult = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/equipments`, {
      method: 'PUT',
      body: JSON.stringify({
        ... equipment,
        name, type, description
      })
    });
    const updateJson = await updateResult.json();
    onUpdate(updateJson);
    setMode('view');
    setName(updateJson.name)
  }
  return (
    <div>
      {mode === 'view' &&
        <div className={"flex flex-col border border-1 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>id</div>
            <div className={"w-108"}>{equipment.equipment_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>name</div>
            <div className={"w-108"}>{equipment.name}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>type</div>
            <div className={"w-108"}>{equipment.type}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>description</div>
            <div className={"w-108"}>{equipment.description}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-124"}><button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={() => setMode('edit')}>edit</button></div>
          </div>
        </div>
      }
      {mode === 'edit' &&
        <div className={"flex flex-col border border-1 border-amber-600 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>id</div>
            <div className={"w-108"}>{equipment.equipment_id}</div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-24"}>name</div>
            <div className={"w-108 text-black"}>
              <input className="pl-2" onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-24"}>type</div>
            <div className={"w-108 text-black"}>
              <input className="pl-2" onChange={(e)=>setType(e.target.value)} value={type}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-24"}>description</div>
            <div className={"w-108 text-black"}>
              <textarea className="pl-2" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-124"}>
              <button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={updateEquipment}>
                update
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}