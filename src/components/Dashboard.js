import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import SidePanel from "./SidePanel";
import add from "../images/add.svg";
import Group from "../images/Group.svg";
import notes from "../images/notes.svg";
import styles from "../components_css/Dashboard.module.css";
import cx from "classnames";
import axios from "axios";
import { useHistory } from "react-router";
import { Modal, Button, Form } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";

function Dashboard({ BaseURL }) {
  const [ActiveTab] = useState("Dashboard");
  const [Drop, setDrop] = useState(false);
  const [NoAssessments, setNoAssessments] = useState(true);
  const [SortBy, setSortBy] = useState("created");
  const [OrderBy, setOrderBy] = useState("assending");
  const [ShowingResults, setShowingResults] = useState(10);
  const [Results, setResults] = useState([]);
  const [RowMessage, setRowMessage] = useState("Loading Movies");
  const [AssessmentCompleted, setAssessmentCompleted] = useState(false);
  const [Count, setCount] = useState(1);
  const [NameValue, setNameValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [DateValue, setDateValue] = useState("");
  const [DescValue, setDescValue] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setDrop(false)
  };

  const handleSubmit = () => {
    const payload = {
      movie: NameValue,
      price: PriceValue,
      show_date: DateValue,
      movie_desc: DescValue
    }
    axios.post("http://localhost:3001/create", payload)
    console.log(payload)
    setShow(false)
    alert("Movie added to Database")
  }

  const handleCancel = (id) => {
    axios.post("http://localhost:3001/cancelBooking", { id: id }).then(() => {
      axios.get("http://localhost:3001/getBooked").then((res) => {
        setResults(res.data)
        if (res.data.length === 0) {
          setNoAssessments(true)
          setRowMessage("No Movies Booked")
        }
      })
    })
  }

  const handleName = (e) => {
    setNameValue(e.target.value);
  };
  const handlePrice = (e) => {
    setPriceValue(e.target.value);
  };
  const handleDate = (e) => {
    setDateValue(e.target.value);
  };
  const handleDesc = (e) => {
    setDescValue(e.target.value);
  };

  useEffect(() => {
    axios.post("https://applybyapi.com/gentoken/", { "posting": 9 })
  }, [])


  const [Next, setNext] = useState(null);
  const [Previous, setPrevious] = useState(null);

  return (
    <div className={styles.dashboard}>
      <SidePanel ActiveTab={ActiveTab} />
      <div className={styles.dashboard_main}>
        <h1>Your Bookings</h1>
        <div className={styles.dashboard_header}>
          <div className={styles.showing_results}>
            <h5>Showing results:</h5>
            <select
              value={ShowingResults}
              onChange={(e) => setShowingResults(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={60}>60</option>
              <option value={70}>70</option>
              <option value={80}>80</option>
              <option value={90}>90</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div id={styles.new_btn_container}>
            <button
              id={styles.new_btn}
              onClick={() => {
                setDrop(!Drop);
              }}
            >
              <img alt="" src={add}></img>New
            </button>
            <div
              className={cx(styles.drop_down, {
                [styles.show_drop_down]: Drop,
              })}
            >
              <a className={styles.drop_down_btn} href="/movies">
                Book New Show
              </a>
              <a className={styles.drop_down_btn}
                style={{ cursor: 'pointer' }}
                onClick={handleShow}
              // onClick={() => {
              //   axios.post("http://localhost:3001/create", {
              //     movie: 'K.G.F Chapter 1',
              //     price: 450,
              //     show_date: Date.now(),
              //     movie_desc: 'Very Good Movie Based on Gold Fields'
              //   })
              // }}
              >
                Add a New Movie
              </a>
            </div>
          </div>
        </div>
        <div className={styles.table_head}>
          <span
            className={styles.table_head_name}
            onClick={() => setSortBy("project_name")}
          >
            Movie Name
            {/* <img
              onClick={() =>
                OrderBy === "assending"
                  ? setOrderBy("descending")
                  : setOrderBy("assending")
              }
              alt=""
              src={Group}
            ></img> */}
          </span>
          <span
            className={styles.table_head_date}
            onClick={() => setSortBy("created")}
          >
            Date
            {/* <img
              onClick={() =>
                OrderBy === "assending"
                  ? setOrderBy("descending")
                  : setOrderBy("assending")
              }
              alt=""
              src={Group}
            ></img> */}
          </span>
          <span
            className={styles.table_head_company}
            onClick={() => setSortBy("company")}
          >
            Price
            {/* <img
              onClick={() =>
                OrderBy === "assending"
                  ? setOrderBy("descending")
                  : setOrderBy("assending")
              }
              alt=""
              src={Group}
            ></img> */}
          </span>
          <span className={styles.table_head_notes}>Notes</span>
          <span
            className={styles.table_head_status}
            onClick={() => setSortBy("progress")}
          >
            Status
            {/* <img
              onClick={() =>
                OrderBy === "assending"
                  ? setOrderBy("descending")
                  : setOrderBy("assending")
              }
              alt=""
              src={Group}
            ></img> */}
          </span>
        </div>
        <div
          className={cx(styles.table_row_empty, {
            [styles.row_empty]: NoAssessments,
          })}
        >
          <p style={{ textAlign: "center", width: "100%" }}>{RowMessage}</p>
        </div>
        {Results.map((results) => {
          return (
            <div
              className={styles.table_row}
              key={results.id}
            >
              <button className={styles.cancel_booked} data-tip data-for="registerTip" onClick={() => handleCancel(results.id)}>&times;</button>
              <ReactTooltip id="registerTip" place="top" effect="solid" type="warning" offset={{ 'top': -15 }} className={styles.cancelTooltip}>
                Click to Cancel Booking
              </ReactTooltip>
              <span className={styles.table_row_name}>
                {results.movie}
              </span>
              <span className={styles.table_row_date}>
                {`${results.show_date}`.slice(0, 10)}
              </span>
              <span className={styles.table_row_company}>
                {results.price}
              </span>
              <span className={styles.table_row_notes}>
                <div className={styles.table_row_note}>
                  {results.movie_desc}
                </div>
                <img alt="" src={notes}></img>
              </span>
              <span
                className={cx(styles.table_row_status, {
                  [styles.complete]: AssessmentCompleted,
                })}
              >{`Booked`}</span>
            </div>
          );
        })}
        {/* <div className={styles.table_row}>
                    <span className={styles.table_row_name}>Lorem Ipsum</span>
                    <span className={styles.table_row_date}>12/02/2021</span>
                    <span className={styles.table_row_company}>Lorem Ipsum</span>
                    <span className={styles.table_row_notes}>
                        <div className={styles.table_row_note}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.....</div>
                        <img alt='' src={notes}></img>
                    </span>
                    <span className={styles.table_row_status}>In progress 50%</span>
                </div> */}
        <div className={styles.dashboard_footer}>
          <div className={styles.progress_bar}>
            <div className={styles.progress}></div>
          </div>
          <div className={styles.page_btn_container}>
            <span
              style={{ display: "flex", cursor: "pointer" }}
            // onClick={() => {
            //   setRequestURL(Previous);
            // }}
            >
              <ArrowLeftIcon
                color={Previous ? "inherit" : "disabled"}
                fontSize="inherit"
              />
            </span>
            <h1>{Count}</h1>
            <span
              style={{ display: "flex", cursor: "pointer" }}
            // onClick={() => setRequestURL(Next)}
            >
              <ArrowRightIcon
                color={Next ? "inherit" : "disabled"}
                fontSize="inherit"
              />
            </span>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Movie Title"
                autoFocus
                onChange={(e) => handleName(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(e) => handlePrice(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Show Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) => handleDate(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Movie Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => handleDesc(e)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSubmit} style={{ backgroundColor: '#f7941d', color: "white" }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default Dashboard;
