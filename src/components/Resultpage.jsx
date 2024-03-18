import { Button, Typography } from "@mui/material";
import { useParams } from "react-router";
import gify from "../assets/sheep.gif";
function Resultpage() {
    const {score}=useParams();
    return <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }} >
        <div>
            <Typography variant="h2" style={{ fontWeight: 400, textAlign: "center" }}>Congratulations!!</Typography>
            <br />
            <div >
                <img src={gify} alt="" style={{ width: 600 }} />
            </div>
            <br />
            <Button variant="contained" size="large" style={{ marginTop: 20, marginLeft: "40%" }}>Score : {score}</Button>
        </div>
    </div>
}
export default Resultpage;