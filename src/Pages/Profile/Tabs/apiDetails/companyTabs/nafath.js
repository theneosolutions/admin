import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Nafath() {
  const [address, setAddress] = useState({});
  const getNafathDetail = useSelector((state) => state.getNafathDetail);

  const dispatch = useDispatch();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const user = queryParams.get("user");
  function GetNafathDetail() {
    dispatch({
      type: "GET_NAFATH_DETAILS",
      payload: user,
    });
  }
  useEffect(() => {
    GetNafathDetail();
  }, []);
  useEffect(() => {
    console.log("national Addressss", getNafathDetail?.nationalAddress);
    if (getNafathDetail?.nationalAddress) {
      setAddress(getNafathDetail?.nationalAddress[0]);
    }
  }, [getNafathDetail?.nationalAddress]);

  console.log("getNafathDetail", address);
  return (
    <div className="w-full">
      <div>
        {getNafathDetail && (
          <div className="flex flex-row">
            <div className="w-1/3">
              <Table />
            </div>
            <Table2 getNafathDetail={getNafathDetail} />
          </div>
        )}
      </div>

      {address && <div>{<Address data={address} />}</div>}
    </div>
  );
}
export default Nafath;

function Address({ data }) {
  return (
    <div className="flex flex-col text-md text-gray-600 px-4 space-y-4 my-4 ">
      <div className="flex flex-row">
        <div className="w-1/3">Additional Number</div>
        <div className="w-1/2 font-semibold">{data?.additionalNumber}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Address Id</div>
        <div className="w-1/2 font-semibold">{data?.address_id}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Building Number</div>
        <div className="w-1/2 font-semibold">{data?.buildingNumber}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">City</div>
        <div className="w-1/2 font-semibold">{data?.city}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">City Id</div>
        <div className="w-1/2 font-semibold">{data?.cityId}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">City L2</div>
        <div className="w-1/2 font-semibold">{data?.cityL2}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">District</div>
        <div className="w-1/2 font-semibold">{data?.district}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">District ID</div>
        <div className="w-1/2 font-semibold">{data?.districtID}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">District L2</div>
        <div className="w-1/2 font-semibold">{data?.districtL2}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Is Primary Address</div>
        <div className="w-1/2 font-semibold">{data?.isPrimaryAddress}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Location Coordinates</div>
        <div className="w-1/2 font-semibold">{data?.locationCoordinates}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Post Code</div>
        <div className="w-1/2 font-semibold">{data?.postCode}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Region Id</div>
        <div className="w-1/2 font-semibold">{data?.regionId}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Region Name</div>
        <div className="w-1/2 font-semibold">{data?.regionName}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Region Name L2</div>
        <div className="w-1/2 font-semibold">{data?.regionNameL2}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Short Address</div>
        <div className="w-1/2 font-semibold">{data?.shortAddress}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Street L2</div>
        <div className="w-1/2 font-semibold">{data?.streetL2}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Street Name</div>
        <div className="w-1/2 font-semibold">{data?.streetName}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/3">Unit Number</div>
        <div className="w-1/2 font-semibold">{data?.unitNumber}</div>
      </div>
    </div>
  );
}
function Table2({ getNafathDetail }) {
  return (
    <div className="flex flex-col text-md text-gray-600 px-4 space-y-4 my-4 font-semibold">
      <a>{getNafathDetail?.aud || "null"}</a>
      <a>{getNafathDetail?.dateOfBirthG || "null"}</a>
      <a>{getNafathDetail?.dateOfBirthH || "null"}</a>
      <a>{getNafathDetail?.englishFirstName || "null"}</a>
      <a>{getNafathDetail?.englishLastName || "null"}</a>
      <a>{getNafathDetail?.englishSecondName || "null"}</a>
      <a>{getNafathDetail?.englishThirdName || "null"}</a>
      <a>{getNafathDetail?.exp || "null"}</a>
      <a>{getNafathDetail?.firstName || "null"}</a>
      <a>{getNafathDetail?.gender || "null"}</a>
      <a>{getNafathDetail?.iat || "null"}</a>
      <a>{getNafathDetail?.id || "null"}</a>
      <a>{getNafathDetail?.iqamaExpiryDateG || "null"}</a>
      <a>{getNafathDetail?.iqamaIssueDateG || "null"}</a>
      <a>{getNafathDetail?.iqamaIssueDateH || "null"}</a>{" "}
      <a>{getNafathDetail?.iqamaIssuePlaceCode || "null"}</a>
      <a>{getNafathDetail?.iqamaIssuePlaceDesc || "null"}</a>
      <a>{getNafathDetail?.iqamaNumber || "null"}</a>
      <a>{getNafathDetail?.iqamaVersionNumber || "null"}</a>
      <a>{getNafathDetail?.iss || "null"}</a>
      <a>{getNafathDetail?.jti || "null"}</a>
      <a>{getNafathDetail?.jwks_uri || "null"}</a>
      <a>{getNafathDetail?.lastName || "null"}</a>
      <a>{getNafathDetail?.nationalityCode || "null"}</a>
      <a>{getNafathDetail?.nationalityDesc || "null"}</a>
      <a>{getNafathDetail?.nbf || "null"}</a>
      <a>{getNafathDetail?.personId || "null"}</a>
      <a>{getNafathDetail?.secondName || "null"}</a>
      <a>{getNafathDetail?.serviceName || "null"}</a>
      <a>{getNafathDetail?.status || "null"}</a>
      <a>{getNafathDetail?.sub || "null"}</a>
      <a>{getNafathDetail?.thirdName || "null"}</a>
      <a>{getNafathDetail?.transId || "null"}</a>
    </div>
  );
}
function Table() {
  return (
    <div className="flex flex-col text-md text-gray-700 px-4 space-y-4 my-4">
      <a className="">Aud</a>
      <a className="">dateOfBirthG</a>
      <a className="">dateOfBirthH</a>
      <a className="">English First Name</a>
      <a className="">English Last Name</a>
      <a className="">English Second Name</a>
      <a className="">English Third Name</a>
      <a className="">exp</a>
      <a className="">firstName</a>
      <a className="">gender</a>
      <a className="">iat</a>
      <a className="">id</a>
      <a className="">iqamaExpiryDateG</a>
      <a className="">iqamaIssueDateG</a>
      <a className="">iqamaIssueDateH</a>
      <a className="">iqamaIssuePlaceCode</a>
      <a className="">iqamaIssuePlaceDesc</a>
      <a className="">iqamaNumber</a>
      <a className="">iqamaVersionNumber</a>
      <a className="">iss</a>
      <a className="">jti</a>
      <a className="">jwks_uri</a>
      <a className="">lastName</a>
      <a className="">nationalityCode</a>
      <a className="">nationalityDesc</a>
      <a className="">nbf</a>
      <a className="">personId</a>
      <a className="">secondName</a>
      <a className="">serviceName</a>
      <a className="">status</a>
      <a className="">sub</a>
      <a className="">thirdName</a>
      <a className="">transId</a>
    </div>
  );
}
