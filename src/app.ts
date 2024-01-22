import {connectDB} from './config/database'
import {config} from './config/config'
import {App} from './index'

//Esta es una función anónima, permite mantener controlada las ejecuciones del modulo 
(async ()=>{
    const app = new App()
    try {
        app.listen(Number(config.PORT))
        await connectDB()
    } catch (error) {
        console.log('Ocurrio un error al iniciar el servidor')
    }

})()