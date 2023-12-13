module.exports = {
    index: function (req,res){
        return res.status(200).json({
            local:{
                api: 'http://localhost:4000/api',
                "Lista de árboles": 'http://localhost:4000/api/trees'
            }
        })
    }
}