import React from 'react';
import { PieChart, Pie, Cell, Legend } from "recharts";

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
          name: "Entertainment",
          value: entertainmentList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        },
        {
          name: "Food",
          value: foodList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        },
        {
          name: "Travel",
          value: travelList.reduce((acc, cv) => acc + parseInt(cv.price),0)
        }
      )
    }
    buildCategorisedData();
    return (
            <PieChart style={{width: '355.35px', height: '181px'}} width={355.35} height={181}>
                <Pie
                    data={categorisedDataList}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                >
                    {categorisedDataList.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend wrapperStyle={{position: 'static'}} />
            </PieChart>
    )
}

export default PieChartComponent;