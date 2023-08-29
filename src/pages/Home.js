import React, { forwardRef, useEffect, useState } from "react";
import "./Home.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="example-custom-input"
    onClick={onClick}
    variant="outline-primary"
    ref={ref}
  >
    {value}
  </button>
));

const Home = () => {
  const date = new Date();

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const [startDate, setStartDate] = useState(date);
  const [selected, setSelected] = useState(startDate);
  const nextDay = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);

  const [endDate, setEndDate] = useState(nextDay);

  //   const maxDay = new Date(new Date(date).getTime() + 7 * 24 * 60 * 60 * 1000);
  //   console.log(maxDay);

  //   const max = maxDay
  //     .toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //     })
  //     .split("/")
  //     .reverse()
  //     .join("-");

  // Handle Change For the Input Field

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
      startdate: startDate,
      enddate: endDate,
    });
  };

  // Handle Submission Form for Data

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== "") {
      // Update the existing entry
      const updatedData = [...tableData];
      updatedData[editIndex] = {
        // ...updatedData[editIndex], // Spread the existing data
        ...inputs,
        // startdate: startDate,
        // enddate: endDate,
        startdate: editIndex !== "" ? startDate : inputs.startdate,
        enddate: editIndex !== "" ? endDate : inputs.enddate,
      };
      setTableData(updatedData);
      console.log(updatedData);

      //   Reset the input fields, date ranges, and edit state
      setInputs({
        name: "",
        category: "",
        value: "",
        startdate: startDate,
        enddate: endDate,
      });
      setStartDate(new Date());
      setEndDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      setEditIndex("");
      setEditClick(false);
    } else {
      // Add a new entry (this part remains the same)
      setTableData([...tableData, inputs]);

      // Reset the input fields and date ranges
      setInputs({
        name: "",
        category: "",
        value: "",
        startdate: startDate,
        enddate: endDate,
      });
      setStartDate(new Date());
      console.log(startDate);
      setEndDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      console.log(endDate);
      setEditClick(false);
      setEditIndex("");
    }
  };

  // Handle Edit Button

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setEditIndex(index);
    console.log(index);
    setEditClick(true);
    console.log(tempData);
    setInputs({
      name: tempData.name,
      startdate: tempData.startdate,
      enddate: tempData.enddate,
      category: tempData.category,
      value: tempData.value,
    });

    // Convert start and end dates to Date objects
    const startDate = new Date(tempData.startdate);
    const endDate = new Date(tempData.enddate);
    setStartDate(startDate);
    setEndDate(endDate);
    setEditClick(true);
    setEditIndex(index);
  };

  const [inputs, setInputs] = useState({
    name: "",
    startdate: startDate,
    enddate: endDate,
    category: "",
    value: "",
  });

  useEffect(() => {
    if (!editClick) {
      // Update end date to be one day after the selected start date
      const nextDay = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      setEndDate(nextDay);
    }
  }, [startDate]);

  return (
    // Container for the Page object

    <div className="min-h-screen container">
      {/* Booking Form Section Start */}

      <div className="card p-6">
        <h1 className="text-center">Booking Form</h1>
        <div className="max-w-fit m-auto p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>

              <span>
                <input
                  id="name"
                  className="form-control"
                  name="name"
                  required="required"
                  value={inputs.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="startDate">Start Date</label>
              {/* {`${format(startDate, "dd/MM/yyyy")}`} */}
              <span onChange={handleChange} className="datePick">
                <DatePicker
                  id="startDate"
                  name="startDate"
                  selected={startDate}
                  onChange={(date) => {
                    setSelected(date);
                    setStartDate(date);
                  }}
                  customInput={<ExampleCustomInput />}
                  dateFormat="dd/MM/yyyy"
                  minDate={date}
                />
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate">End Date</label>
              {/* {`${format(endDate, "dd/MM/yyyy")}`} */}
              <span onChange={handleChange}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  customInput={<ExampleCustomInput />}
                  dateFormat="dd/MM/yyyy"
                  minDate={nextDay}
                  //   maxDate={maxDay}
                />
              </span>
            </div>

            <div className="flex flex-col">
              {/* Category Input Field Section Start */}

              <label htmlFor="category">Category</label>
              <span>
                <select
                  value={inputs.category}
                  onChange={handleChange}
                  name="category"
                  id="category"
                  className="select form-control text-center"
                  required="required"
                  autoComplete="off"
                >
                  <option value="">~~~ Select Category ~~~</option>
                  <option value="Room 1">Room 1</option>
                  <option value="Room 2">Room 2</option>
                  <option value="Room 3">Room 3</option>
                  <option value="Room 4">Room 4</option>
                  <option value="Room 5">Room 5</option>
                </select>
              </span>
            </div>
            <div className="flex flex-col">
              {/* Value Input Field Section Start */}

              <label htmlFor="patternAttr">Value</label>
              <span>
                <input
                  autoComplete="off"
                  name="value"
                  required="required"
                  id="patternAttr"
                  pattern="[0-9.]+"
                  className="form-control"
                  value={inputs.value}
                  onChange={handleChange}
                />
              </span>
            </div>

            {/* Submit Button Section Start */}
            <span>
              <button type="submit" className="w-full text-white mt-3 edit">
                {editClick ? "Update" : "Booking Now"}
              </button>
            </span>
          </form>
        </div>
      </div>

      {/* Table Field Starts With  */}

      <div className="table">
        <Table className="w-full text-center" striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>
                  {/* Start Date Change to Another Format */}

                  {new Date(item.startdate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>
                  {/* End Date Change to Another Format */}

                  {new Date(item.enddate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>{item.category}</td>
                {/* Value Change to Another Format */}
                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>
                  {/* Handle Edit Button Section */}

                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
