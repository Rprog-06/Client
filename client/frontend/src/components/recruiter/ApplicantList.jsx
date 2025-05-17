import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
//import API from "../api/axiosInstance";
const ApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch applicants");
      }
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Job Applicants</h2>
      {applicants.length === 0 ? (
        <p>No one has applied yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Marks</th>
              <th className="p-2 border">Resume</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id} className="text-center hover:bg-gray-100">
                <td className="p-2 border">{app.user.name}</td>
                <td className="p-2 border">{app.user.email}</td>
                <td className="p-2 border">{app.user.phone}</td>
                <td className="p-2 border">{app.marks}</td>
                <td className="p-2 border">
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-2 border capitalize">{app.applicationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantsList;
