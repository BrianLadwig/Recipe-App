import Nav from "./Nav";
import { BsSearch } from "react-icons/bs";
import { FilterContext } from "../contexts/FilterContext.js";
import { useContext } from "react";
import { NavLink } from "react-router-dom";


export default function Header() {
    const { searchTerm,setSearchTerm } = useContext(FilterContext);

    function searchHandler(e){
        setSearchTerm((e.target.value).toLowerCase())
        console.log(searchTerm);
    }
  return (
    <div className="Header">
      <div id="Logo">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/289/627/non_2x/brain-character-illustration-as-a-chef-is-cooking-free-vector.jpg"
          width="150"
        />
        <h1 className="chefB">Chef Brain</h1>
      </div>
      <div id="search">
        <input type="text" onChange={searchHandler}/>
       
        <NavLink to="/recipes"><BsSearch id="lookingGlass" /></NavLink>
       
      </div>
      <Nav />
    </div>
  );
}