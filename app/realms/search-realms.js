import {useState} from "react";

export default function SearchRealms ({onRealms}) {
  const [search, setSearch] = useState();

  const onKeyCode = async (code) => {
    if (code === 'Enter') {
      const searchResult = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realms?search=${search}`, {
        method: 'GET'
      })

      const searchJson = await searchResult.json();
      onRealms(searchJson);
    }
  }

  return (
    <div className={"flex flex-col mt-2"}>
      <div className={"text-black ml-2"}>
        <input  onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => onKeyCode(e.code)}
                className="pl-2" type="text" placeholder="search for..."/>
      </div>
    </div>
  );
}