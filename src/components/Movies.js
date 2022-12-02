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
import { RegionDropdown } from "react-country-region-selector";

function Movies({ BaseURL }) {
  const [ActiveTab] = useState("Dashboard");
  const [Location, setLocation] = useState(false);
  const [SortBy, setSortBy] = useState("created");
  const [OrderBy, setOrderBy] = useState("assending");
  const [ShowingResults, setShowingResults] = useState(10);
  const [Results, setResults] = useState([]);
  const [RowMessage, setRowMessage] = useState("Loading Movies");
  const [Count, setCount] = useState(1);
  const [State, setState] = useState()
  // const [RequestSuccess, setRequestSuccess] = useState(false)

  const [Next, setNext] = useState(null);
  const [Previous, setPrevious] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/getMovies").then((res) => {
      setResults(res.data)
    })
  }, [])

  useEffect(() => {
    setCount(
      Next
        ? new URLSearchParams(new URL(Next).search).get("offset") /
        new URLSearchParams(new URL(Next).search).get("limit")
        : Previous
          ? new URLSearchParams(new URL(Previous).search).get("offset") /
          new URLSearchParams(new URL(Previous).search).get("limit") +
          2
          : 1
    );
  }, [Next, Previous]);

  const handleBooking = (id) => {
    axios.post("http://localhost:3001/bookMovie", { id: id }).then((res) => {
      console.log(res)
      alert("Movie Booked!")
    }).catch((err) => {
      alert("You've already booked this Movie")
    })
  }

  return (
    <div className={styles.dashboard}>
      <SidePanel ActiveTab={ActiveTab} />
      {
        Location ?
          <div className={styles.dashboard_main}>
            <h1>Available Movies</h1>
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
            </div>
            <div className={styles.table_head}>
              <span
                className={styles.table_head_name}
                onClick={() => setSortBy("project_name")}
              >
                Movie Name
                <img
                  onClick={() =>
                    OrderBy === "assending"
                      ? setOrderBy("descending")
                      : setOrderBy("assending")
                  }
                  alt=""
                  src={Group}
                ></img>
              </span>
              <span
                className={styles.table_head_date}
                onClick={() => setSortBy("created")}
              >
                Date
                <img
                  onClick={() =>
                    OrderBy === "assending"
                      ? setOrderBy("descending")
                      : setOrderBy("assending")
                  }
                  alt=""
                  src={Group}
                ></img>
              </span>
              <span
                className={styles.table_head_company}
                onClick={() => setSortBy("company")}
              >
                Price
                <img
                  onClick={() =>
                    OrderBy === "assending"
                      ? setOrderBy("descending")
                      : setOrderBy("assending")
                  }
                  alt=""
                  src={Group}
                ></img>
              </span>
              <span className={styles.table_head_notes}>Notes</span>
              <span
                className={styles.table_head_status}
                onClick={() => setSortBy("progress")}
              >
                Action
              </span>
            </div>
            <div
              className={cx(styles.table_row_empty, {
                // [styles.row_empty]: NoAssessments,
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
                      {
                        results.movie_desc
                      }
                    </div>
                    <img alt="" src={notes}></img>
                  </span>
                  <span
                    className={cx(styles.table_row_status)}
                  >
                    <button onClick={() => handleBooking(results.id)}>Book Now</button>
                  </span>
                </div>
              );
            })}
            <div className={styles.dashboard_footer}>
              <div className={styles.progress_bar}>
                <div className={styles.progress}></div>
              </div>
              <div className={styles.page_btn_container}>
                <span
                  style={{ display: "flex", cursor: "pointer" }}
                //   onClick={() => {
                //     setRequestURL(Previous);
                //   }}
                >
                  <ArrowLeftIcon
                    color={Previous ? "inherit" : "disabled"}
                    fontSize="inherit"
                  />
                </span>
                <h1>{Count}</h1>
                <span
                  style={{ display: "flex", cursor: "pointer" }}
                //   onClick={() => setRequestURL(Next)}
                >
                  <ArrowRightIcon
                    color={Next ? "inherit" : "disabled"}
                    fontSize="inherit"
                  />
                </span>
              </div>
            </div>
          </div> :
          <div className={styles.popup_location_container}>
            <div className={styles.popup_location}>
              <h1>Please Select Location</h1>
              <RegionDropdown
                country={'IN'}
                countryValueType="short"
                value={State}
                classes={styles.client_info_select}
                onChange={(val) => setLocation(true)}>
              </RegionDropdown>
            </div>
          </div>
      }
    </div>
  );
}

export default Movies;
