import React, { useEffect, useState, useContext } from 'react';
import InputId from '../components/InputId';
import axios from 'axios';
import { FeedbackToEditContext } from '../contexts/FeedbackEditContext';

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormFeedback() {
    const {
      SIDToEdit,
      setSIDToEdit,
      ClsIDToEdit,
      setClsIDToEdit,
      FeedbackToEdit,
      setFeedbackToEdit,
      editMode,
      setEditMode,
      reloadFeedback,
      setReloadFeedback,
    } = useContext(FeedbackToEditContext);
  
    function processForm() {
      const feedbackData = {
        SID: SIDToEdit,
        ClsID: ClsIDToEdit,
        Feedback: FeedbackToEdit,
      };
  
      if (editMode === 'edit') {
        axios
          .put('http://localhost:3001/classTaken', feedbackData)
          .then((response) => {
            setReloadFeedback((prevReload) => !prevReload);
            setEditMode('create');
          })
          .catch((error) => {
            console.error('Error in PUT request:', error);
          });
      } else {
        // Handle other modes like 'create', if needed
      }
  
      setSIDToEdit('');
      setClsIDToEdit('');
      setFeedbackToEdit('');
    }
  
    return (
      <>
        <h3>Student Feedback</h3>
        <table border={'1'} style={{ width: '100%', position: 'relative' }}>
          <tbody>
            <tr>
              <td width={'20%'}>
                <b>Class ID</b>
              </td>
              <td>
                <InputId label="Class ID" value={ClsIDToEdit} setValue={setClsIDToEdit} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Student ID</b>
              </td>
              <td>
                <InputId label="Student ID" value={SIDToEdit} setValue={setSIDToEdit} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Feedback</b>
              </td>
              <td>
                <InputId label="Feedback" value={FeedbackToEdit} setValue={setFeedbackToEdit} />
              </td>
            </tr>
            <tr>
              <td colSpan={'2'} style={{ textAlign: 'center' }}>
                <button type="button" onClick={processForm}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  
function TableRowsFeedback() {
    const { feedback = [], setFeedback, setSIDToEdit, setClsIDToEdit, setEditMode, reloadFeedback } = useContext(
      FeedbackToEditContext
    );
  
    function updateFeedback(event, SID, ClsID) {
      setEditMode('edit');
      const selectedFeedback = feedback.find((item) => item.ClsID === ClsID && item.SID === SID);
      setClsIDToEdit(selectedFeedback.ClsID);
      setSIDToEdit(selectedFeedback.SID);
    }
  
    useEffect(() => {
      axios.get('http://localhost:3001/classTaken').then((response) => {
        setFeedback(response.data);
      });
    }, [reloadFeedback, setFeedback]);
  
    function deleteFeedback(SID, ClsID) {
      axios
        .delete('http://localhost:3001/classTaken', { params: { SID, ClsID } })
        .then((response) => {
          setFeedback((prevFeedback) => prevFeedback.filter((item) => item.SID !== SID));
        })
        .catch((error) => {
          console.error('Error in DELETE request:', error);
        });
    }
  
    return (
      <>
        {feedback && feedback.length > 0 ? (
          feedback.map((item) => (
            <tr key={item.Feedback}>
              <td>{item.Feedback}</td>
              <td>{item.SID}</td>
              <td>{item.ClsID}</td>
              <td>
                <button onClick={(event) => updateFeedback(event, item.SID, item.ClsID)}>Update</button> |
                <button onClick={() => deleteFeedback(item.SID, item.ClsID)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No feedback available</td>
          </tr>
        )}
      </>
    );
  }
  

function TableFeedback() {
  return (
    <>
      <h3>Student Feedback</h3>
      <table id={'feedbackTable'} border={'1'} width={'100%'}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Class ID</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TableRowsFeedback />
        </tbody>
      </table>
    </>
  );
}

export default function FeedbackRegistration() {
  const { setFeedback, setReloadFeedback } = useContext(FeedbackToEditContext);
  const [editMode, setEditMode] = useState('create');
  const [FeedbackToEdit, setFeedbackToEdit] = useState('');
  const [ClsIDToEdit, setClsIDToEdit] = useState('');
  const [SIDToEdit, setSIDToEdit] = useState('');
  const [reloadFeedback, setReloadFeedbackLocal] = useState(false);

  useEffect(() => {
    setReloadFeedbackLocal((prevReload) => !prevReload);
  }, [setReloadFeedback]);

  return (
    <FeedbackToEditContext.Provider
      value={{
        editMode,
        setEditMode,
        FeedbackToEdit,
        setFeedbackToEdit,
        ClsIDToEdit,
        setClsIDToEdit,
        SIDToEdit,
        setSIDToEdit,
        reloadFeedback,
        setReloadFeedback,
        setFeedback,
      }}
    >
      <InputFormFeedback />
      <TableFeedback />
    </FeedbackToEditContext.Provider>
  );
}
