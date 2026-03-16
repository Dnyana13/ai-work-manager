import React from "react";
import { Link } from "react-router-dom";
import { FaProjectDiagram, FaTasks, FaHome } from "react-icons/fa";

function Sidebar() {

  return (

    <div style={styles.sidebar}>

      <h2 style={styles.logo}>AI Manager</h2>

      <Link to="/dashboard" style={styles.link}>
        <FaHome /> Dashboard
      </Link>

      <Link to="/projects" style={styles.link}>
        <FaProjectDiagram /> Projects
      </Link>

      <Link to="/tasks" style={styles.link}>
        <FaTasks /> Tasks
      </Link>

    </div>
  );
}

const styles = {

  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1f2937",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "fixed"
  },

  logo: {
    marginBottom: "40px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    marginBottom: "20px",
    fontSize: "18px"
  }

};

export default Sidebar;