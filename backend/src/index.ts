import express, {Express} from 'express';
import dotenv from "dotenv"
import cors from "cors";
import router from './routes/todo.routes';
import { Request } from 'express';

dotenv.config();


const app : Express = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors<Request>());

console.log(process.env.DATABASE_URL, "Jindagi sawar du ek nai bahaar du");
app.use("/api/todo", router);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
