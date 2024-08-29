import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuid} from "uuid";

const app = express();

// multer middleware

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + uuid() + Path2D.extname)
    }
});

// multer configuration
const upload = multer({storage: storage});

app.use(
    cors({
        origin: ["http://localhost:8000", "http://localhost:5173"],
        credentials: true
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //watch it
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
});

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send({message: "Hello"});   
});

app.post("/upload", upload.single('file'), function(req, res){
    console.log("file uploaded");
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})