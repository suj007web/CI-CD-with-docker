import dotenv from "dotenv"
dotenv.config();
console.log(process.env.DATABASE_URL, "Jindagi sawar du ek nai bahaar du");
import express, {Express} from 'express';
import cors from "cors";
import router from './routes/todo.routes';
import { Request } from 'express';



const app : Express = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors<Request>());


app.use("/api/todo", router);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
