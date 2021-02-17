import React, { useState } from "react";

const dataSets = [
  {
    name: "customer 1",
    purchase: [
      { month: 1, purchaseValue: 120 },
      { month: 2, purchaseValue: 50 }
    ]
  },
  {
    name: "customer 2",
    purchase: [
      { month: 1, purchaseValue: 300 },
      { month: 2, purchaseValue: 100 }
    ]
  },
  {
    name: "customer 3",
    purchase: [
      { month: 1, purchaseValue: 250 },
      { month: 2, purchaseValue: 100 },
      { month: 3, purchaseValue: 200 }
    ]
  },
  {
    name: "customer 4",
    purchase: [
      { month: 1, purchaseValue: 300 },
      { month: 2, purchaseValue: 100 }
    ]
  }
];

export default function App() {
  const [value, setValue] = useState(0);
  const [rewardPointsMonthly, setRewardPointsForMonth] = useState([]);
  const [rewardPointsTotal, setTotalRewardpoints] = useState(0);
  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };
  const calculatePoints = () => {
    let totalPoints = 0;
    let totalPointsForMonth = [];
    dataSets[value].purchase.forEach((data, index) => {
      let pointsFor50DollarsPurchase = 0;
      let pointsFor100DollarsPurchase = 0;
      if (data.purchaseValue > 50) {
        const difference = data.purchaseValue - 50;
        pointsFor50DollarsPurchase = difference * 1;
      }
      if (data.purchaseValue > 100) {
        const difference = data.purchaseValue - 100;
        pointsFor100DollarsPurchase = difference * 2;
      }
      const totalPointsForTheMonth =
        pointsFor50DollarsPurchase + pointsFor100DollarsPurchase;
      totalPointsForMonth.splice(index, 1, totalPointsForTheMonth);
      totalPoints = totalPointsForMonth.reduce((total, num) => {
        return total + num;
      });
      setTotalRewardpoints(totalPoints);
      setRewardPointsForMonth(totalPointsForMonth);
    });
  };

  const getCurrentMonth = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[monthIndex];
  };

  return (
    <div className="App">
      <h1>Customer points calculator </h1>
      <select value={value} onChange={handleChange}>
        {dataSets.map((data, index) => (
          <option key={index} value={index}>
            {data.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={calculatePoints}>Calculate</button>
      <h2>Total reward points : {rewardPointsTotal}</h2>
      <h3>
        {" "}
        {rewardPointsMonthly.map((data, index) => (
          <div key={index}>
            Reward points for the month {getCurrentMonth(index)} is {data}
          </div>
        ))}{" "}
      </h3>
    </div>
  );
}
