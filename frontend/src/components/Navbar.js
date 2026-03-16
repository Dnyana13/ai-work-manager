import React from "react";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");
    window.location.href = "/login";

  };

  return (

    <div style={styles.navbar}>

      <h3>AI Work Manager</h3>

      <button style={styles.btn} onClick={logout}>
        Logout
      </button>

    </div>

  );
}

const styles = {

  navbar: {
    height: "60px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ddd",
    marginLeft: "220px"
  },

  btn: {
    padding: "8px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }

};

export default Navbar;