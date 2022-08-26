import { useState } from "react";
import axios from "axios"

function App() {

  const [keyword, setKeyword] = useState([])
  const [inputFile, setInputFile] = useState('')
  const [apiResponse, setAPIResponse] = useState({})

  const onChangeHandler = (e) => {
    let keyword = e.target.value.split(",")
    setKeyword(keyword)

  }

  const onFileChangeHandler = (e) => {
    if (e.target.files[0].type === "text/plain") {
      let reader = new FileReader()
      reader.readAsText(e.target.files[0])
      setInputFile(reader)
    }
    else {
      alert("Please select a text file")
      return;
    }
  }

  const onSubmitHandler = async () => {
    const url = "http://localhost:5000/api/file/upload";
    const data = {
      "keywords": keyword,
      "fileInput": inputFile.result
    }
    const result = await axios.post(url, data)

    setAPIResponse(result.data)
    setKeyword([])

  }


  // user types keyword
  // upload keywords to backend
  //  upload files to backend

  return (
    <div >
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: "5%", display: "flex", gap: "2%" }}>
        <label style={{ color: "teal", fontSize: "1.5rem", fontWeight: "600" }}>Keywords:-</label>
        <input onChange={(e) => onChangeHandler(e)} value={keyword} type="text" placeholder="Enter keywords" style={{ outline: "none", border: "none", borderBottom: "2px solid teal", width: "50%" }} />
        <input type="file" onChange={(e) => onFileChangeHandler(e)} />
        <button onClick={onSubmitHandler}> Submit</button>
      </div>
      <br />
      <hr />
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: "2%" }}>

        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }} >
          <div style={{ width: "30%" }}>
            <label style={{ color: "teal", fontSize: "1.5rem", fontWeight: "600" }}>
              {apiResponse?.data?.keywords?.length > 0 ? "Keywords are following:-" : "Please enter keywords"}
            </label>
            <ul>
              {
                apiResponse?.data?.keywords?.length > 0 && apiResponse?.data?.keywords?.map((item) => {
                  return (
                    <li>{item}</li>
                  );
                })
              }
            </ul>
          </div>
          <div style={{
            width
              : "60%"
          }}>
            {
              apiResponse?.data?.fileInput
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
