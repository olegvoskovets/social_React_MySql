import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./inputfile.scss";
import { updateFile } from "../../store/Users";

const InputFile = ({ image }) => {
  const filePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const dispatch = useDispatch();
  console.log("image ", image);
  //...............................
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  //'''''''''''''''''''''''''

  const handleChange = (e) => {
    e.preventDefault();
    //setSelectedFile(e.target.files[0]);

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      setSelectedFile(e.target.files[0]);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    dispatch(updateFile(selectedFile));
  };

  // const Upload = async () => {
  //   if (!selectedFile) {
  //     alert("Будь ласка, виберіть файл");
  //   }

  //   try {
  //     let formData = new FormData();
  //     formData.append("file", selectedFile);
  //     const res = await axios.post(
  //       `http://localhost:8800/api/upload`,
  //       formData
  //     );
  //     setUploaded(res.data);
  //     return res.data;
  //   } catch (error) {}
  // };

  const handlePic = (e) => {
    e.preventDefault();
    filePicker.current.click();
    // selectedFile && Upload();
    console.log("handle uploading-", file);
    // dispatch(updateFile(selectedFile));
  };
  console.log("file ", file);
  console.log("imagePreviewUrl ", imagePreviewUrl);
  console.log("selectedFile ", selectedFile);

  return (
    <>
      <div className="input_file">
        <input
          id="fileInput"
          className="hidden"
          type="file"
          ref={filePicker}
          onChange={handleChange}
          accept="image/*,.png,.jpg,.gif,.web,"
        />

        <div className="input_info">
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt=""
              width="300"
              height="200"
              className="image"
            />
          ) : (
            <img src={image && image} alt="" width="300" height="200" />
          )}
        </div>
      </div>
      <button onClick={handlePic}>Виберіть фото </button>
    </>
  );
};

export default InputFile;
