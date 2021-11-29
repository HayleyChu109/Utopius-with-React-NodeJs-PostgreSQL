import { useState, useEffect } from "react";

const GradeBall = ({ grade }) => {
  const [gradeColor, setGradeColor] = useState("");

  useEffect(() => {
    if (grade) {
      switch (grade.toUpperCase()) {
        case "S":
          setGradeColor("#fac77c");
          break;
        case "A":
          setGradeColor("#fa7c92");
          break;
        case "B":
          setGradeColor("#7c97fa");
          break;
        case "C":
          setGradeColor("#52b46e");
          break;
        case "D":
          setGradeColor("#152e87");
          break;
        case "E":
          setGradeColor("#875915");
          break;
        case "F":
          setGradeColor("#333333");
          break;
        default:
          setGradeColor("#c4c4c4");
          break;
      }
    } else {
      return;
    }
  }, [grade]);

  return (
    <span
      className="dot text-center me-2"
      style={{ backgroundColor: gradeColor }}
    >
      {grade && gradeColor ? grade.toUpperCase() : null}
    </span>
  );
};

export default GradeBall;
