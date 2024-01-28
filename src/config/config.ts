require('dotenv/config');

export const config = {
    PORT: process.env.PORT || 4000,
    DB: process.env.DB || `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.wug6n.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
}

// `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.wug6n.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`