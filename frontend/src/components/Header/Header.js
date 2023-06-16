import RightArrow from "../../assets/RightArrow.png";
import LeftArrow from "../../assets/LeftArrow.png";
import Avatar from "../../assets/Avatar.png";

export const Header = () => {
  return (
    <div className="flex justify-between items-center bg-header_bg py-6 px-12
    border-b-2 border-header_border">
      <h2 className="text-bold text-booked_clicked">BUSY TUTOR</h2>
      <div className="flex justify-between items-center">
        <img src={LeftArrow} alt="left arrow" />
        <h1 className="px-6 text-xl">JUNE 2023</h1>
        <img src={RightArrow} alt="right arrow" />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="pr-6 text-booked_clicked">AS TUTOR</h1>
        <img src={Avatar} alt="avatar" />
        <h3 className="pl-4">Logout</h3>
        </div>
    </div>
  );
}

