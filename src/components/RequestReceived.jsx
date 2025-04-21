import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React, { useEffect, useState } from "react";

const RequestReceived = () => {
  const [requests, setRequests] = useState();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/requests/received`, {
        withCredentials: true,
      });
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        `${BASE_URL}request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return "...Loading";
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No requests found</h1>;
  return (
    <div className="text-center my-12">
      <h1 className="font-extrabold text-3xl text-white">
        Connection Requests
      </h1>
      {requests.map((request) => (
        <div className="flex justify-between items-center m-4 mx-auto p-4 rounded-lg bg-base-300 w-1/2">
          <div>
            <img
              alt="photo"
              className="w-20 h-20 rounded-full"
              src={request.photoUrl}
            />
          </div>
          <div className="text-left mx-4">
            <h2 className="font-bold text-xl">
              {request.firstName + " " + request.lastName}
            </h2>
            <p>{request.about}</p>
            {request.age && request.gender && (
              <p>{request.age + "," + request.gender}</p>
            )}
          </div>
          <div>
            <button
              onClick={() => reviewRequest("rejected", request._id)}
              className="btn btn-primary mx-2"
            >
              Reject
            </button>
            <button
              onClick={() => reviewRequest("accepted", request._id)}
              className="btn btn-secondary mx-2"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestReceived;
