import React, { Component } from 'react';
import { ExpansionList, List, ListItem, Media, Paper, Divider } from "react-md";
import { MdArrowDropDown } from 'react-icons/md';

const AuctionsList = (props) => {
  return (
    <div
      style={{
        height: "85vh",
        width: "30%",
        overflowY: "auto",
        position: "fixed",
        zIndex: 1,
        left: 0
      }}

    >
      {

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(el => (
          <Paper className="md-cell md-cell--12 md-grid">

            <div style={{
              width:"100%",
              display:"flex",
              alignItems:"center"
            }}>
              <section className="md-cell md-cell--4">

                <img src="https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg" style={{ height: 100, width: 100, borderRadius: "50%" }} alt="" />

              </section>
              <section className="md-cell md-cell--8">
                <ul style={{
                  listStyle: "none"
                }}>
                  {["Patent Name", "Patent Type", "Patent Sub Type"].map(val => (
                    <li>{val}</li>
                  ))}
                </ul>
              </section>

            </div>
          </Paper>
        ))
      }

    </div>

  )
}

export default AuctionsList;