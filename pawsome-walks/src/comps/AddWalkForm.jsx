import { useState } from "react";
import postWalk from "../hooks/apiCalls/postWalk";

export default function AddWalkForm({
  handleWalkPictureChange,
  handleUploadWalkPictureClick,
  selectedFile,
  setSelectedFile,
  walkPicture,
  setWalkPicture,
  handelSubmit,
}) {
  const [walkData, setWalkData] = useState({});
  const [walkName, setWalkName] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [walkType, setWalkType] = useState([""]);
  const [offLeadAreas, setOffLeadAreas] = useState(false);
  const [paths, setPaths] = useState(false);
  const [animalsOnRoute, setAnimalsOnRoute] = useState(false);
  const [toilets, setToilets] = useState(false);
  const [waterOnRoute, setWaterOnRoute] = useState(false);
  const [scenic, setScenic] = useState(false);
  const [parking, setParking] = useState(["Paid", "Free"]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "walkname":
        setWalkName(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "walktype":
        setWalkType(e.target.value);
        break;
      case "offleadareas":
        setOffLeadAreas(e.target.value);
        break;
      case "paths":
        setPaths(e.target.value);
        break;
      case "animalsonroute":
        setAnimalsOnRoute(e.target.value);
        break;
      case "toilets":
        setToilets(e.target.value);
        break;
      case "wateronroute":
        setWaterOnRoute(e.target.value);
        break;
      case "scenic":
        setScenic(e.target.value);
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
      const walkFormData = {
        walkname: walkName,
        location: location,
        lat: lat,
        lng: lng,
        walktype: walkType,
        offleadareas: offLeadAreas,
        paths: paths,
        animalsonroute: animalsOnRoute,
        toilets: toilets,
        wateronroute: waterOnRoute,
        scenic: scenic,
        parking: parking,
      };

      await postWalk(walkFormData);

      setWalkName("");
      setLocation("");
      setLat();
      setLng();
      setWalkType([""]);
      setOffLeadAreas(false);
      setPaths(false);
      setAnimalsOnRoute(false);
      setToilets(false);
      setScenic(false);
      setWaterOnRoute(false);
      setParking(["Paid", "Free"]);
    } catch (error) {
      console.error(
        "Error uploading new walk (AddWalkForm.jsx Handle Submit):",
        error
      );
    }
    return <></>;
  };
}

// FORMS which need handle functionality: walkname, location, walktype, offleadareas, paths, anumalsonroute, toilets, wateronroute, scenic, parking
