import "./featuredInfo.css";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo( {id, name,email,message,appointmentDate}) {

  // console.log(email)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{email}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{name}</span>
          <span className="featuredMoneyRate">
            {appointmentDate}
          </span>
        </div>
        <span className="featuredSub">{message}</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
    </div>
  );
}
