import "./reel.scss";

const Reel = () => {
  return (
    <div className="reel">
      <div className="reel_avatar">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5JwuhsTEjbNkWjcANFPUgc2DZBrJjIeMxQ&usqp=CAU"></img>
      </div>
      <div className="reel_img">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKlFq1Nq5jMSRO5FmOVZcxSaCOCyEMIMN6Ww&usqp=CAU"></img>
      </div>

      <div className="reel_info">
        <span> Terehova Oksana</span>
      </div>
    </div>
  );
};

export default Reel;
