// import LocationIcon from "../../../Assets/Images/location.svg";
import facebook from "../../../Assets/Images/facebook.svg";
import Insta from "../../../Assets/Images/insta.svg";

import Twitter from "../../../Assets/Images/twitter.svg";

import Youtube from "../../../Assets/Images/youtube.svg";
// import User from "../../../Assets/Images/user.svg";
import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbGenderNeutrois } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";

function ProfileSidebar({ userData }) {
  return (
    <div className="border border-primary px-2 	 py-6 bg-white rounded-lg">
      <div className="items-center justify-center  flex ">
        {/* <img className="h-32 w-32 rounded-full" src={User} /> */}
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-2 font-semibold underline">
          {userData?.firstName + " " + userData?.lastName}
        </div>
        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <FaMobileAlt />
            </div>
          </div>

          <a className="text-sm text-gray-700">{userData?.mobileNumber}</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <AiOutlineNumber />
            </div>
          </div>

          <a className="text-sm text-gray-700">{userData?.idNumber}</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <MdOutlineMailOutline />
            </div>
          </div>

          <a className="text-sm text-gray-700">{userData?.email}</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <TbGenderNeutrois />
            </div>
          </div>

          <a className="text-sm text-gray-700">{userData?.gender}</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <LiaBirthdayCakeSolid />
            </div>
          </div>

          <a className="text-sm text-gray-700">{userData?.dateOfBirth}</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        <div className="flex flex-row mt-6 w-full rtl:space-x-reverse items-center">
          <div className="flex flex-row justify-between w-14 ">
            <div></div>
            <div className=" font-semibold text-gray-700  text-sm   px-2">
              <IoLocationOutline />
            </div>
          </div>

          <a className="text-sm text-gray-700">4140 Rd. Allentown</a>
        </div>
        <div className=" w-full bg-gray-100 mt-3" style={{ height: 1 }}></div>

        {/* <div className="flex flex-row space-x-3 mt-12 rtl:space-x-reverse">
          <img src={facebook} />
          <img src={Insta} />
          <img src={Youtube} />
          <img src={Twitter} />
        </div> */}
      </div>
    </div>
  );
}
export default ProfileSidebar;
