import './App.css';
import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios";
import Paginate from './components/Paginate';
import Header from './components/Header';
import RowData from './components/RowData';
import EditData from './components/EditData';
import Search from './components/Search';

const config = {
    endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
};


function App() {
    const [rowData, setRowData] = useState([]);
    const [query, setQuery] = useState("");
    const keys = ["name", "email", "role"];
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage] = useState(10);
    const [editRowID, setEditRowID] = useState(null);
    const [userData, setUserData] = useState("");
    const [editRowData, setEditRowData] = useState({
        name: "",
        email: "",
        role: "",
    });



    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;

    const addIsCheckRowData = (userObject) => {
        const addedIsChecked = userObject.map((user) => {
            return { ...user, isChecked: false }
        })

        return addedIsChecked;
    }

    //Fetch data &&  Search and pagination logic 
    useEffect(() => {
        async function getRowData() {
            try {
                const res = await axios.get(`${config.endpoint}`);
                const data = await res.data;
                const editedData = addIsCheckRowData(data);

                // Searching function
                filterArr(editedData)

                //Pagination logic
                setUserData(filterArr(editedData))
                if (filterArr(editedData).length < userPerPage) {
                    setRowData(filterArr(editedData))
                } else {
                    const currentUserList = filterArr(editedData).slice(indexOfFirstUser, indexOfLastUser);
                    setRowData(currentUserList)
                }
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getRowData();
    }, [query, currentPage])

    // Search filter function
    const filterArr = (objectData) => {
        return objectData.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase())))
    }


    // Function to check if single checkbox is clicked
    const handleIsCheckedSingle = (userId) => {
        const updateIsChecked = rowData.map((user) => {
            if (user.id === userId) {
                return { ...user, isChecked: !user.isChecked };
            }
            return user;
        });

        setRowData(updateIsChecked);

    };

    //handle selection of all checkboxes
    const handleIsAllChecked = () => {
        setIsAllChecked(!isAllChecked);
        let updatedCheckedRow;
        if (!isAllChecked) {
            updatedCheckedRow = rowData.map((user) => {
                return { ...user, isChecked: true };
            });
        } else {
            updatedCheckedRow = rowData.map((user) => {
                return { ...user, isChecked: false };
            });
        }
        setRowData(updatedCheckedRow);
    };


    // Function to handle edit 
    const handleEditRowFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const filedValue = event.target.value;

        const newFormData = { ...editRowData };
        newFormData[fieldName] = filedValue;

        setEditRowData(newFormData);
    }

    // Function to edit the rowData
    const handleEditRowFormSubmit = (event) => {
        event.preventDefault();

        const editedRow = {
            id: editRowID,
            name: editRowData.name,
            email: editRowData.email,
            role: editRowData.role,
        }

        const newRowData = [...rowData];

        const index = rowData.findIndex((singleData) => singleData.id === editRowID);
        newRowData[index] = editedRow;

        setRowData(newRowData);
        setEditRowID(null);
    }

    // on clicking edit Icon

    const handleEditClick = (event, singleData) => {
        event.preventDefault();

        setEditRowID(singleData.id);

        const formValues = {
            name: singleData.name,
            email: singleData.email,
            role: singleData.role,
        }

        setEditRowData(formValues);
    };

    // On Clicking cancel button 
    const handleCancelClick = () => {
        setEditRowID(null);
    }

    // function to delete selected checkbox
    const handleDeleteSelected = () => {
        let returnedData = rowData.filter((ele) => {
            return ele.isChecked === false;
        })

        setRowData(returnedData);
    }

    // Function to delete the row using delete icon button 

    const deleteRowData = (id) => {
        let returnedData = rowData.filter((ele) => {
            return ele.id !== id;
        })
        setRowData(returnedData);
    }

    // Function to get current page number on clicking page number
    const handlePageNumber = (number) => {
        setCurrentPage(number);
    };


    return (
        <>
            <Header />
            <Search setQuery={setQuery} />
            <div className='table-list'>
                <form onSubmit={handleEditRowFormSubmit}>
                    <table className='styleTable'>
                        <thead className='tableHead'>
                            <tr>
                                <td>
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id="checkAll"
                                            value={isAllChecked}
                                            checked={isAllChecked}
                                            onChange={handleIsAllChecked}
                                        />
                                        <span className ="checkmark"></span>
                                        <label htmlFor="checkAll"></label>
                                    </div>
                                </td>
                                <td><span>Name</span></td>
                                <td><span>Email</span></td>
                                <td><span>Role</span></td>
                                <td><span>Actions</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rowData.map((singleData) => (
                                    <Fragment>
                                        {editRowID === singleData.id ? (
                                            <EditData
                                                editRowData={editRowData}
                                                handleEditRowFormChange={handleEditRowFormChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <RowData singleData={singleData}
                                                handleIsCheckedSingle={handleIsCheckedSingle}
                                                handleEditClick={handleEditClick}
                                                deleteRowData={deleteRowData} />
                                        )}
                                    </Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='footer'>
                <button className='delete-btn' onClick={() => handleDeleteSelected()}>
                    Delete Selected</button>
                <Paginate
                    userPerPage={userPerPage}
                    totalUser={userData.length}
                    handlePageNumber={handlePageNumber}
                />
            </div>
        </>
    )
}

export default App;
