import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {

  return (

    <div>

      <Sidebar />

      <Navbar />

      <div style={styles.content}>
        {children}
      </div>

    </div>

  );

}

const styles = {

  content: {
    marginLeft: "220px",
    marginTop: "60px",
    padding: "30px"
  }

};

export default DashboardLayout;