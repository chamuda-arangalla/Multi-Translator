import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Spineer from "../components/Spinner";
import Edit from "../components/Historyedit";
import ReportGeneration from "../components/ReportGeneration";
import Popup from "../components/PopUp";
import "../components/popUp.css";

const TranslatorHistory = () => {
  const [translatorData, setTranslatorData] = useState([]);
  const [translatorData2, setTranslatorData2] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingOne, setIsDeletingOne] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteAllPopupOpen, setDeleteAllPopupOpen] = useState(false);
  const [reportGenerationPopupOpen, setReportGenerationPopupOpen] =
    useState(false);
  const [data, setData] = useState("");
  const [inputdate, setInputdate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(localStorage.getItem('userid'));
  })

  useEffect(() => {
    if (user) {
    fetch(`http://localhost:3017/api/translaterhistory?userid=${encodeURIComponent(user)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the received data
        setTranslatorData2(data.items.reverse());
        setTranslatorData(data.items);
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
      });
    }
  }, [isOpen,user]);

  const filterDataByDate = (dateToFilter) => {
    if (dateToFilter == null) {
      setErrorMessage('Please fill in the date before filtering.');
    } else {
      const filteredItems = translatorData2.filter(
        (item) => item.date === dateToFilter
      );
      setTranslatorData(filteredItems);
      setErrorMessage('');
    }
  };

  const resetData = () => {
    setTranslatorData(translatorData2);
  };

  const handleDelete = (itemId) => {
    setIsDeletingOne(true);

    fetch(`http://localhost:3017/api/translaterhistory/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        // Filter out the deleted item from the state
        setTranslatorData((prevData) =>
          prevData.filter((item) => item._id !== itemId)
        );
        setIsDeletingOne(false);
      })
      .catch((error) => {
        // Handle delete errors
        setError(error.message);
      });

    setDeletePopupOpen(false);
  };

  const handleDeleteall = () => {
    setIsDeleting(true);

    fetch(`http://localhost:3017/api/translaterhistory`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete all item");
        }
        // Clear the translatorData state
        setTranslatorData([]);
        setIsDeleting(false);
      })
      .catch((error) => {
        // Handle delete errors
        setError(error.message);
      });

    setDeleteAllPopupOpen(false);
  };

  const openedit = (id) => {
    setData(id);
    setIsOpen(true);
  };

  const openpopup = (alldata) => {
    setData(alldata);
    setReportGenerationPopupOpen(true);
  };

  const openpopup2 = (id) => {
    setData(id);
    setDeletePopupOpen(true);
  };

  return (
    <div>
      {isDeleting && <Spineer />}
      {isDeletingOne && <Spineer />}
      {isOpen && <Edit trigger={isOpen} setTrigger={setIsOpen} value={data} />}

      {reportGenerationPopupOpen && (
        <ReportGeneration
          trigger={reportGenerationPopupOpen}
          setTrigger={setReportGenerationPopupOpen}
          value={data}
        />
      )}

      {deleteAllPopupOpen && (
        <Popup
          trigger={deleteAllPopupOpen}
          setTrigger={setDeleteAllPopupOpen}
          popup_description="Are you sure you want to clear all history ?"
        >
          <button
            className="confirm-button"
            onClick={() => {
              handleDeleteall();
            }}
          >
            confirm
          </button>
        </Popup>
      )}

      {deletePopupOpen && (
        <Popup
          trigger={deletePopupOpen}
          setTrigger={setDeletePopupOpen}
          popup_description="Are you sure you want to delete this ?"
        >
          <button
            className="confirm-button"
            onClick={() => {
              handleDelete(data);
            }}
          >
            confirm
          </button>
        </Popup>
      )}

      <div className="topictext">
        <h1>Translator History</h1>
      </div>
      <div className="headingrow">
        <div className="filterbox">
          <button
            className="btn-ad-downloadreport"
            onClick={() => {
              openpopup(translatorData);
            }}
          >
            Download Report <FaFileDownload className="down_icon" />
          </button>

          <button
            className="btn-ad-deleteall"
            onClick={() => {
              setDeleteAllPopupOpen(true);
            }}
          >
            Delete All
          </button>
        </div>

        <div className="upperbuttons">
          <input
            className="historydatebox"
            type="date"
            onChange={(e) => setInputdate(e.target.value)}
          />

          <button
            className="historyfilterbutton"
            onClick={() => {
              filterDataByDate(inputdate);
            }}
          >
            Filter
          </button>
          
          <button
            className="historyclearbutton"
            onClick={() => {
              resetData();
            }}
          >
            Clear
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        
      </div>
      
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="historytablebox">
          <table className="historytable">
            <thead>
              <tr id="tableHeader">
                <th scope="col">User Entered Text</th>
                <th scope="col">Translated Text</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {translatorData.map((item, index) => (
                <tr key={index}>
                  <td>{item.userenterdtext}</td>
                  <td>{item.translatedtext}</td>
                  <td>{item.date}</td>
                  <td>
                    <p
                      className="historyediticon"
                      onClick={() => {
                        openedit(item._id);
                      }}
                    >
                      {" "}
                      <MdModeEdit />{" "}
                    </p>
                  </td>

                  <td>
                    <p
                      className="historydeleteicon"
                      onClick={() => {
                        openpopup2(item._id);
                      }}
                    >
                      {" "}
                      <MdDeleteForever />{" "}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TranslatorHistory;
