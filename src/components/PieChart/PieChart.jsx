import React from 'react';
import styles from './PieChart.module.css';
import { PieChart, Pie, Cell } from "recharts";

const tempData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 }
];

const COLORS = ["#FF8042", "#0088FE", "#FFBB28"];
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
    return (
        <div className={styles.wrapper}>
            <PieChart width={400} height={400}>
                <Pie
                    data={tempData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {tempData.map((entry, index) => (
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