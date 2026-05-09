import "../styles/Certificate.css";
import { useState, useEffect } from "react";

function Certificate() {
  const [isEditing, setIsEditing] = useState(false);

  const [studentName, setStudentName] = useState("Rahul Kumar");
  const [domain, setDomain] = useState("Web Development");
  const [startDate, setStartDate] = useState("01 Jan 2026");
  const [endDate, setEndDate] = useState("30 Mar 2026");

  /* Load saved certificate data */
  useEffect(() => {
    const savedCertificate = JSON.parse(
      localStorage.getItem("certificateData")
    );

    if (savedCertificate) {
      setStudentName(savedCertificate.studentName);
      setDomain(savedCertificate.domain);
      setStartDate(savedCertificate.startDate);
      setEndDate(savedCertificate.endDate);
    }
  }, []);

  /* Save button function */
  const handleSave = () => {
    const certificateData = {
      studentName,
      domain,
      startDate,
      endDate
    };

    localStorage.setItem(
      "certificateData",
      JSON.stringify(certificateData)
    );

    setIsEditing(false);

    alert("Certificate Saved Successfully!");
  };

  return (
    <div className="certificate-page">
      <div className="certificate-box">

        <h1>Certificate of Completion</h1>

        {/* Edit Button */}
        <button
          className="edit-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <p className="sub-title">
          This is to certify that
        </p>

        {isEditing ? (
          <input
            type="text"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
          />
        ) : (
          <h2>{studentName}</h2>
        )}

        <p>
          has successfully completed the internship in
        </p>

        {isEditing ? (
          <input
            type="text"
            value={domain}
            onChange={(e) =>
              setDomain(e.target.value)
            }
          />
        ) : (
          <h3>{domain}</h3>
        )}

        <p>
          at C2C Nexora Internships from

          {isEditing ? (
            <>
              <input
                type="text"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />

              <input
                type="text"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />
            </>
          ) : (
            <>
              <strong> {startDate} </strong>
              to
              <strong> {endDate} </strong>
            </>
          )}
        </p>

        {/* Save Button */}
        {isEditing && (
          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>
        )}

        <div className="signature-section">
          <div>
            <p>Project Manager</p>
            <hr />
          </div>

          <div>
            <p>HR Manager</p>
            <hr />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Certificate;