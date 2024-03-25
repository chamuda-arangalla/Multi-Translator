import React from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { font } from "../fonts/Iskoola Pota Regular-normal";
import "./popUp.css"

function ReportGeneration(props) {

  const historyData = props.value;
  const fontName = "Iskoola Pota Regular";
  const fontFileName = "Iskoola Pota Regular.ttf";

  const exportFeedbacks = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    const title = "History Report";
    const headers = [
      [
        "User Entered text",
        "User Entered text Language",
        "Translated text",
        "Translated text language",
        "date",
      ],
    ];

    const fed = historyData.map((item) => [
      item.userenterdtext,
      item.userenterdtextlanguage,
      item.translatedtext,
      item.translatedtextlanguage,
      item.date,
    ]);

    doc.addFileToVFS(fontFileName, font);
    doc.addFont(fontFileName, fontName, "normal");

    let content = {
      startY: 50,
      head: headers,
      body: fed,
      styles: { font: fontName },
    };

    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("History_report.pdf");

    props.setTrigger();
  };

  return props.trigger ? (
    <div className="popup-background">
      <div className="popup-box">
        <div className="popup-title-box">
          <span className="popup-title-text"> Do you want to download this report ? </span>
        </div>
        <button className = "confirm-button" onClick = {() => {exportFeedbacks()}}>
          Confirm
        </button>
        <button className="close-button" onClick={() => props.setTrigger()}>
          Cancel
        </button>
      </div>
    </div>
  ) : ("");
}

export default ReportGeneration;
