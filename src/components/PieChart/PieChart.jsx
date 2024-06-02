import React from 'react';
import styles from './PieChart.module.css';
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];
const RADIAN = Math.PI/180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

function PieChartComponent({data}) {
    let categorisedDataList = [];
    const buildCategorisedData = () => {
      let entertainmentList = data.filter((val) => val.category === "Entertainment");
      let foodList = data.filter((val) => val.category === "Food");
      let travelList = data.filter((val) => val.category === "Travel");
      categorisedDataList.push(
        {
          category: "Entertainment",
          value: entertainmentList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        },
        {
          category: "Food",
          value: foodList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        },
        {
          category: "Travel",
          value: travelList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        }
      )
    }
    buildCategorisedData();
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={categorisedDataList}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {categorisedDataList.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className={styles.legendContainer}>
                <div className={styles.food}></div>
                <p>Food</p>
                <div className={styles.entertainment}></div>
                <p>Entertaiment</p>
                <div className={styles.travel}></div>
                <p>Travel</p>
            </div>
        </div>
    )
}

export default PieChartComponent;