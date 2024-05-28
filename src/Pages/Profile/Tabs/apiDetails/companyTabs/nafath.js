import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Nafath() {
  const [address, setAddress] = useState({});
  const getNafathDetail = useSelector((state) => state.getNafathDetail);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ID = queryParams.get("id");
  function GetNafathDetail() {
    dispatch({
      type: "GET_NAFATH_DETAILS",
      payload: ID,
    });
  }
  useEffect(() => {
    GetNafathDetail();
  }, []);
  useEffect(() => {
    if (getNafathDetail?.nationalAddress) {
      setAddress(getNafathDetail?.nationalAddress[0]);
    }
  }, [getNafathDetail?.nationalAddress]);

  return (
    <div className="w-full">
      <div>
        {getNafathDetail && (
          <>
            <Table3 getNafathDetail={getNafathDetail} data={address} />
          </>
        )}
      </div>
    </div>
  );
}
export default Nafath;

function Table3({ getNafathDetail, data }) {
  const style1 = "border-b border-gray-400";
  const style2 = "w-1/3 border-r border-gray-400 px-4 py-2 font-semibold";
  const style3 = "w-1/2 px-2 py-2";
  return (
    <div className="flex flex-col text-md text-gray-600 px-4 space-y-4 my-4 ">
      <table className="w-full border border-gray-400">
        <tbody>
          <tr className={style1}>
            <td className={style2}>Service Name</td>
            <td className={style3}>{getNafathDetail?.serviceName || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>NBF</td>
            <td className={style3}>{getNafathDetail?.nbf || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>EXP</td>
            <td className={style3}>{getNafathDetail?.exp || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>IAT</td>
            <td className={style3}>{getNafathDetail?.iat || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Sub</td>
            <td className={style3}>{getNafathDetail?.sub || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Person Id</td>
            <td className={style3}>{getNafathDetail?.personId || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Iqama Number</td>
            <td className={style3}>{getNafathDetail?.iqamaNumber || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Issue DateG</td>
            <td className={style3}>
              {getNafathDetail?.iqamaIssueDateG || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Issue DateH</td>
            <td className={style3}>
              {getNafathDetail?.iqamaIssueDateH || "null"}{" "}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Expiry DateG</td>
            <td className={style3}>
              {getNafathDetail?.iqamaExpiryDateG || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Issue Place Desc</td>
            <td className={style3}>
              {getNafathDetail?.iqamaIssuePlaceDesc || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Version Number</td>
            <td className={style3}>
              {getNafathDetail?.iqamaVersionNumber || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Iqama Issue Place Code</td>
            <td className={style3}>
              {getNafathDetail?.iqamaIssuePlaceCode || "null"}
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Nationality Desc</td>
            <td className={style3}>
              {getNafathDetail?.nationalityDesc || "null"}
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>English First Name</td>
            <td className={style3}>
              {getNafathDetail?.englishFirstName || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>English Second Name</td>
            <td className={style3}>
              {getNafathDetail?.englishSecondName || "null"}
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>English Third Name</td>
            <td className={style3}>
              {getNafathDetail?.englishThirdName || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>English Last Name</td>
            <td className={style3}>
              {getNafathDetail?.englishLastName || "null"}
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>First Name</td>
            <td className={style3}>{getNafathDetail?.firstName || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Second Name</td>
            <td className={style3}>{getNafathDetail?.secondName || "null"}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Third Name</td>
            <td className={style3}>{getNafathDetail?.thirdName || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Last Name</td>
            <td className={style3}>{getNafathDetail?.lastName || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Gender</td>
            <td className={style3}>{getNafathDetail?.gender || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Date Of BirthG</td>
            <td className={style3}>
              {getNafathDetail?.dateOfBirthG || "null"}
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Date Of BirthH</td>
            <td className={style3}>
              {getNafathDetail?.dateOfBirthH || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Nationality Code</td>
            <td className={style3}>
              {getNafathDetail?.nationalityCode || "null"}
            </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>City</td>
            <td className={style3}>{data?.city}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Short Address</td>
            <td className={style3}>{data?.shortAddress}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Additional Number</td>
            <td className={style3}>{data?.additionalNumber} </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Region Name</td>
            <td className={style3}>{data?.regionName}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Region Name L2</td>
            <td className={style3}>{data?.regionNameL2} </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Unit Number</td>
            <td className={style3}>{data?.unitNumber}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Is Primary Address</td>
            <td className={style3}>{data?.isPrimaryAddress}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>City Id</td>
            <td className={style3}>{data?.cityL2}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Region Name L2</td>
            <td className={style3}>{data?.regionNameL2 || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>District L2</td>
            <td className={style3}>{data?.districtL2}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Street Name</td>
            <td className={style3}>{data?.streetL2}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>District ID</td>
            <td className={style3}>
              <td className={style3}>{data?.districtID} </td>
            </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Region Id</td>
            <td className={style3}>{data?.regionId}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>District</td>
            <td className={style3}>{data?.district}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Building Number</td>
            <td className={style3}>{data?.buildingNumber}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Post Code</td>
            <td className={style3}>{data?.postCode}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Location Coordinates</td>
            <td className={style3}>{data?.locationCoordinates}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>City L2</td>
            <td className={style3}>{data?.cityL2}</td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Address Id </td>
            <td className={style3}>{data?.address_id} </td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Street L2 </td>
            <td className={style3}>{data?.streetL2} </td>
          </tr>

          <tr className={style1}>
            <td className={style2}>Trans Id</td>
            <td className={style3}>{getNafathDetail?.transId || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Status</td>
            <td className={style3}>{getNafathDetail?.status || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>JTI</td>
            <td className={style3}>{getNafathDetail?.jti || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>ISS</td>
            <td className={style3}>{getNafathDetail?.iss || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Aud</td>
            <td className={style3}>{getNafathDetail?.aud || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Jwks uri</td>
            <td className={style3}>{getNafathDetail?.jwks_uri || "null"}</td>
          </tr>
          <tr className={style1}>
            <td className={style2}>Id</td>
            <td className={style3}>{getNafathDetail?.id || "null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
