import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Nafath() {
  const getNafathDetail = useSelector((state) => state.getNafathDetail);

  const dispatch = useDispatch();
  function GetNafathDetail() {
    dispatch({
      type: "GET_NAFATH_DETAILS",
      payload: 1,
    });
  }
  useEffect(() => {
    GetNafathDetail();
  }, []);
  console.log("getNafathDetail", getNafathDetail);
  return (
    <div className="w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-3 py-3">
                aud
              </th>
              <th scope="col" className="px-3 py-3">
                dateOfBirthG
              </th>
              <th scope="col" className="px-3 py-3">
                dateOfBirthH
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                English First Name
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                English Last Name
              </th>
              <th scope="col" className="px-3 py-3">
                English Second Name
              </th>
              <th scope="col" className="px-3 py-3">
                English Third Name
              </th>
              <th scope="col" className="px-3 py-3">
                exp
              </th>
              <th scope="col" className="px-3 py-3">
                firstName
              </th>
              <th scope="col" className="px-3 py-3">
                gender
              </th>
              <th scope="col" className="px-3 py-3">
                iat
              </th>
              <th scope="col" className="px-3 py-3">
                id
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaExpiryDateG
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaIssueDateG
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaIssueDateH
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaIssuePlaceCode
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaIssuePlaceDesc
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaNumber
              </th>
              <th scope="col" className="px-3 py-3">
                iqamaVersionNumber
              </th>
              <th scope="col" className="px-3 py-3">
                iss
              </th>
              <th scope="col" className="px-3 py-3">
                jti
              </th>
              <th scope="col" className="px-3 py-3">
                jwks_uri
              </th>
              <th scope="col" className="px-3 py-3">
                lastName
              </th>
              <th scope="col" className="px-3 py-3">
                nationalityCode
              </th>
              <th scope="col" className="px-3 py-3">
                nationalityDesc
              </th>
              <th scope="col" className="px-3 py-3">
                nbf
              </th>
              <th scope="col" className="px-3 py-3">
                personId
              </th>
              <th scope="col" className="px-3 py-3">
                secondName
              </th>
              <th scope="col" className="px-3 py-3">
                serviceName
              </th>
              <th scope="col" className="px-3 py-3">
                status
              </th>
              <th scope="col" className="px-3 py-3">
                sub
              </th>
              <th scope="col" className="px-3 py-3">
                thirdName
              </th>{" "}
              <th scope="col" className="px-3 py-3">
                transId
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.aud}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.dateOfBirthG}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.dateOfBirthH}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.englishFirstName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.englishLastName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.englishSecondName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.englishThirdName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.exp}</a>
              </td>{" "}
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.firstName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.gender}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iat}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.id}</a>
              </td>{" "}
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaExpiryDateG}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaIssueDateG}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaIssueDateH}</a>
              </td>{" "}
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaIssuePlaceCode}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaIssuePlaceDesc}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaNumber}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iqamaVersionNumber}</a>
              </td>{" "}
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.iss}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.jti}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.jwks_uri}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.lastName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.nationalityCode}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.nationalityDesc}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.nbf}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.personId}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.secondName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.serviceName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.status}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.sub}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.thirdName}</a>
              </td>
              <td scope="row" className="px-3 py-4">
                <a>{getNafathDetail?.transId}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Nafath;
