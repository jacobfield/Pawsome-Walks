import { useState, useContext } from "react";
import postWalk from "../hooks/apiCalls/postWalk";
import { ThemeContext } from "./ThemeProvider";
import getLatLng from "../hooks/getLatLng";

export default function AddWalkForm({
  handleWalkPictureChange,
  selectedFile,
  setSelectedFile,
  walkPicture,
  setWalkPicture,
  allWalks,
  handleAddWalkSubmit,
}) {
  const [walkData, setWalkData] = useState({});
  const [walkName, setWalkName] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [walkType, setWalkType] = useState("");
  const [offLeadAreas, setOffLeadAreas] = useState("");
  const [paths, setPaths] = useState("");
  const [animalsOnRoute, setAnimalsOnRoute] = useState("");
  const [toilets, setToilets] = useState("");
  const [waterOnRoute, setWaterOnRoute] = useState("");
  const [scenic, setScenic] = useState("");
  const [parking, setParking] = useState("none");
  const [walkNameAndLocation, setWalkNameAndLocation] = useState({});
  const { darkTheme } = useContext(ThemeContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "walkname": {
        const formattedWalkName = e.target.value
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        setWalkName(formattedWalkName);
        break;
      }
      case "location": {
        const formattedLocation = e.target.value
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        setLocation(formattedLocation);
        break;
      }
      case "walktype": {
        const formattedWalkType = e.target.value
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        setWalkType(formattedWalkType);
        break;
      }
      case "offleadareas":
        setOffLeadAreas(JSON.parse(e.target.value));
        break;
      case "paths":
        setPaths(JSON.parse(e.target.value));
        break;
      case "animalsonroute":
        setAnimalsOnRoute(JSON.parse(e.target.value));
        break;
      case "toilets":
        setToilets(JSON.parse(e.target.value));
        break;
      case "wateronroute":
        setWaterOnRoute(JSON.parse(e.target.value));
        break;
      case "scenic":
        setScenic(JSON.parse(e.target.value));
        break;
      case "parking":
        setParking(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const walkNameAndLocation = {
        walkname: walkName,
        location: location,
      };
      setWalkNameAndLocation(walkNameAndLocation);
      const coordinates = await getLatLng(walkNameAndLocation);
      setLat(coordinates.lat);
      setLng(coordinates.lng);
      const walkTypeArray = walkType
        .split(/[\s,]+/)
        .filter((word) => word.length > 0)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      const walkFormData = {
        walkname: walkName,
        location: location,
        lat: coordinates.lat,
        lng: coordinates.lng,
        walktype: walkTypeArray,
        offleadareas: offLeadAreas,
        paths: paths,
        animalsonroute: animalsOnRoute,
        toilets: toilets,
        wateronroute: waterOnRoute,
        scenic: scenic,
        parking: parking,
      };
      setWalkData(walkFormData);
      // HERE ---------------------------------------------
      await handleAddWalkSubmit();

      setWalkName("");
      setLocation("");
      setLat(null);
      setLng(null);
      setWalkType([]);
      setOffLeadAreas(false);
      setPaths(false);
      setAnimalsOnRoute(false);
      setToilets(false);
      setWaterOnRoute(false);
      setScenic(false);
      setParking("none");
    } catch (error) {
      console.error("Error uploading new walk:", error);
    }
  };

  return (
    <div className="addWalkFormContainer">
      <form onSubmit={handleSubmit} className="addWalkForm">
        <label htmlFor="walkname">{/* Walk name: */}</label>
        <input
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          type="text"
          id="walkName"
          name="walkname"
          value={walkName}
          onChange={handleChange}
          minLength="5"
          placeholder="Enter walk name..."
          required
        />
        <label htmlFor="location">{/* Location: */}</label>
        <input
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleChange}
          minLength="5"
          placeholder="Enter location..."
          required
        />
        {/* <select
          name="walktype"
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          id="walktype"
          onChange={handleChange}
          value={walkType[0] || ""}
        >
          <option value="" disabled>
            Select walk type
          </option>
          {walkTypeArr.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */}
        <div>
          <label htmlFor="walktype">{/* Add New Walk Type: */}</label>
          <input
            type="text"
            className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
            id="walktype"
            name="walktype"
            value={walkType}
            maxLength="30"
            minLength="4"
            onChange={handleChange}
            placeholder="Enter walk types..."
          />
        </div>

        <select
          required
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          name="offleadareas"
          onChange={handleChange}
          id="offleadareas"
          value={offLeadAreas}
        >
          <option disabled value="">
            Off-lead areas?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          name="paths"
          onChange={handleChange}
          id="paths"
          value={paths}
        >
          <option disabled value="">
            Paved routes?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="animalsonroute"
          onChange={handleChange}
          id="animalsonroute"
          value={animalsOnRoute}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled value="">
            Animals on route?
          </option>

          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="toilets"
          onChange={handleChange}
          id="toilets"
          value={toilets}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled value="">
            Toilets available?
          </option>

          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="wateronroute"
          onChange={handleChange}
          id="waterOnRoute"
          value={waterOnRoute}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled value="">
            Water on route?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="scenic"
          onChange={handleChange}
          id="scenic"
          value={scenic}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled value="">
            Scenic views?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="parking"
          onChange={handleChange}
          id="parking"
          value={parking}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled defaultValue="">
            Is there parking?
          </option>
          <option value="none">No parking</option>
          <option value="free">Free parking</option>
          <option value="paid">Paid parking</option>
        </select>
        <div className="fileInputWrapper">
          <input
            className="uploadInput"
            type="file"
            accept="image/*"
            onChange={handleWalkPictureChange}
          />
        </div>
        {/* {selectedFile && <button onClick={handleUploadClick}>Upload</button>} */}

        <button
          className={`walkFormButton ${darkTheme ? "dark" : "light"}`}
          type="submit"
        >
          Submit for approval
        </button>
      </form>
    </div>
  );
}

// FORMS which need handle functionality: walkname, location, walktype, offleadareas, paths, animalsonroute, toilets, wateronroute, scenic, parking
