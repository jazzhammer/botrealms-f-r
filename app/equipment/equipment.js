"use client"
import {useState} from "react";
import NewEquipment from "@/app/equipment/new-equipment";
import EquipmentDetails from "@/app/equipment/equipment-details";
import SearchEquipments from "@/app/equipment/search-equipments";
import ListEquipments from "@/app/equipment/list-equipments";

export default function Equipments() {
  const [mode, setMode] = useState('');
  const [equipment, setEquipment] = useState();
  const [equipments, setEquipments] = useState();

  const onCreate = (created) => {
    setEquipment(created);
    setMode('selected');
  }

  const onUpdate = (updated) => {
    setEquipment(updated);
    setMode('selected');
  }

  const onSelectEquipment = (selected) => {
    setEquipment(selected);
    setMode('selected')
  }

  const onEquipments = (equipments) => {
    setEquipments(equipments);
    console.log(`equipments: ${JSON.stringify(equipments)}`);
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
      </div>
      <div className={"flex flex-col h-full"}>
        {mode === 'new' && <NewEquipment onCreate={onCreate}></NewEquipment>}
        {mode === 'selected' && <EquipmentDetails equipment={equipment} onUpdate={onUpdate}></EquipmentDetails>}
        {mode === 'search' &&
          <div className={"flex flex-col"}>
            <SearchEquipments onEquipments={onEquipments}></SearchEquipments>
            <div className={"mt-3 ml-2"}>
              <ListEquipments equipments={equipments} onSelect={onSelectEquipment}></ListEquipments>
            </div>
          </div>
        }
      </div>
    </div>
  );
}