document.addEventListener("DOMContentLoaded", () => {
  const contacts = [
    { name: "Rohit Sharma", company: "Acme Pvt Ltd" },
    { name: "Sneha Gupta", company: "Globex" },
    { name: "Aisha Khan", company: "Techify" }
  ];
  const opportunities = [
    { title: "Mobile App", stage: "Proposition", value: 250000 },
    { title: "Website Redesign", stage: "Won", value: 500000 },
    { title: "SEO Package", stage: "Qualification", value: 80000 }
  ];

  // KPIs
  document.getElementById("kpiRevenue").textContent =
    "₹" + opportunities.reduce((a,b)=>a+b.value,0).toLocaleString();
  document.getElementById("kpiContacts").textContent = contacts.length;
  document.getElementById("kpiOpps").textContent = opportunities.length;
  document.getElementById("kpiLeads").textContent = 3;

  // 🔹 Bar chart (with animation + tooltips + %)
  const barCtx = document.getElementById("barChart");
  const stages = ["New","Qualification","Proposition","Negotiation","Won"];
  const dataValues = [15,25,30,10,20];
  const revenueValues = [100000,200000,300000,80000,500000];

  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: stages,
      datasets: [{
        label:"Pipeline %",
        data: dataValues,
        backgroundColor:["#9b5cff","#06b6d4","#ffb86b","#ff6ec7","#3b82f6"]
      }]
    },
    options:{
      animation:{duration:1200,easing:'easeOutBounce'},
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            label:(ctx)=>`₹${revenueValues[ctx.dataIndex].toLocaleString()} (${ctx.formattedValue}%)`
          }
        },
        datalabels:{
          color:'#fff',
          anchor:'end',
          align:'top',
          formatter:(v)=> v + '%',
          font:{weight:'600'}
        }
      },
      scales:{
        y:{beginAtZero:true, ticks:{color:'#fff'}},
        x:{ticks:{color:'#fff'}}
      }
    },
    plugins:[ChartDataLabels]
  });

  // 🔸 Donut Chart (Revenue by Stage with % inside)
  const donutCtx = document.getElementById("donutChart");
  const revenueData = [250000, 500000, 80000];
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);

  new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: ["Proposition", "Won", "Qualification"],
      datasets: [{
        data: revenueData,
        backgroundColor: ["#ff6ec7","#9b5cff","#06b6d4"]
      }]
    },
    options: {
      animation:{duration:1400,easing:'easeOutQuart'},
      cutout:"75%",
      plugins:{
        legend:{
          position:"bottom",
          labels:{color:'#fff'}
        },
        tooltip:{
          callbacks:{
            label:(ctx)=>{
              const value = ctx.raw;
              const percent = ((value / totalRevenue) * 100).toFixed(1);
              return `₹${value.toLocaleString()} (${percent}%)`;
            }
          }
        },
        datalabels:{
          color:'#fff',
          formatter:(value)=>{
            const percent = (value / totalRevenue) * 100;
            return percent.toFixed(1) + '%';
          },
          font:{
            weight:'bold',
            size:13
          }
        }
      }
    },
    plugins:[ChartDataLabels]
  });

  // 🔹 Recent lists
  document.getElementById("recentContacts").innerHTML =
    contacts.map(c=>`<li>${c.name} <small class="text-muted">${c.company}</small></li>`).join("");
  document.getElementById("recentOpps").innerHTML =
    opportunities.map(o=>`<li>${o.title} <small class="text-muted">${o.stage}</small></li>`).join("");
});
