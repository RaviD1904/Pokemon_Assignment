import { Input, Select } from "antd";
import PokemanCard from "./Components/PokemanCard";
import AllPokemonList from "./Components/AllPokemonList";
import { useState,useEffect } from "react";
import PokemonSearch from "./Components/PokemonSearch";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [types,setTypes]=useState([])
  const [filter,setFilter]=useState('')
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes( response.data.results.map((el)=>{
          return ( {value:el.name,
            label:el.name})
        }));
       
        console.log(types)
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchPokemonTypes();
  }, []);
  return (
    <div className="my-8 w-full h-ful">
      <div className="flex justify-center align-middle">
        <div className="mx-6">
          <Input
            width={50}
            style={{ borderRadius: "10px" }}
            placeholder="Search Here"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                  setSearch(e.target.value);
              }}
          />
        </div>
        <div>
          <Select
            style={{
              width: 120,
            }}
            defaultValue=""
            placeholder="Select a type"
            // optionFilterProp="children"  
            onChange={(value)=>setFilter(value)}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={[{
              value:"",
              label:"Select"
            },...types]}
          />
        </div>
      </div>
      {/* <AllPokemonList/> */}
      {/* <PokemonDetails id="1"/> */}
      <div>
        {search ? <PokemonSearch search={search} /> : <AllPokemonList filter={filter}/>}
      </div>
    </div>
  );
}

export default App;
